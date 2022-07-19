// SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;
// 导入Funding合约
// import "./funding.sol";

// 合约工厂
contract FundingFactory {
    // 0. 平台管理员：address platformManager

    // 1. 所有的众筹合约集合：	address[] allFundings
    // 2. 创建人的合约集合:  mapping(address => address[]) creatorFundings ; //key是创建人，value是所创建的所有合约的地址集合
    // 3. 参与人的合约集合：mapping(address => address[]) supportorFundings ; //key是创建人，value是所参与的合约的地址集合
    address public platformManager;
    // 创建的合约集合  -- 使用合约工厂创建的Funding合约地址数组
    // 创建人创建的所有合约地址 映射
    mapping(address => address[]) creatorFundings;
    // // 参与人的合约集合  -- 一个人可以投资多个众筹  -- 由于不能将map传递到Funding合约 因此使用一个合约来做
    // mapping(address => address[]) supportorFundings;
    address[] allFundings;

    // supportorFundingContract 类型变量
    SupportorFundingContract supportorFundings;

    constructor() {
        platformManager = msg.sender;
        // 实例化supportorFundingContract
        supportorFundings = new SupportorFundingContract();
    }

    // 使用合约工厂的函数创建Funding合约
    function createFunding(string memory _projectName, uint _targetMoney, uint _supportMoney, uint _duration) public {
        //创建一个合约，使用new方法，同时传入参数，返回一个地址, 在一个合约中创建另一个合约  -- 将创建合约人的地址传递过去，因为Funding合约中要对合约发起人赋值，而这个人的地址就是调用create函数的地址
        Funding funding = new Funding (_projectName, _targetMoney, _supportMoney, _duration, msg.sender, supportorFundings); // 这里funding为实例化Funding的地址但不能使用address修饰必须使用Funding修饰

        // 将创建的合约加入到allFundins数组,转换一下 否则就会报错 funding本身就是一个地址
       allFundings.push(address(funding));

       // 将发起众筹人发起的众筹的合约加入到createFundings
       creatorFundings[msg.sender].push(address(funding));
    }

    // 返回合约工厂创建的所有合约地址  -- 所有的众筹项目合约地址  
    function getAllFundings()public view returns (address[] memory) {
        // 只有平台管理员 -- 创建合约工厂的人
        require(msg.sender == platformManager, "you not platformManager not have authority");
        return allFundings;
    }

    // 返回当前账户创建的所有合约  -- 使用合约工厂发起的所有的众筹项目
    function getCreateFundings() public view returns (address[] memory) {
        return creatorFundings[msg.sender];
    }

    // 返回参与者 所参加的所有众筹项目
    function getSupportFundings() public view returns (address[] memory) {
        return supportorFundings.getFundings(msg.sender);
    }
    
}

// 这个合约维护者全局所有参与人所参与的所有众筹合约
contract SupportorFundingContract {
    // 功能：mapping(address => address[]) supportorFundings
    // 方法1，添加合约到集合：setFunding(address _supptor, address _funding)
    // 方法2, 读取合约数据：getFundings(address _supptor) returns(address[])
    
    // 参与人的合约集合  -- 一个人可以投资多个众筹  -- 由于不能将map传递到Funding合约 因此使用一个合约来做
    mapping(address => address[]) supportorFundingsMap;

    function setFunding(address _supptor, address _funding) public {
        supportorFundingsMap[_supptor].push(_funding);
    }

    function getFundings(address _supptor) public view returns (address[] memory) {
        return supportorFundingsMap[_supptor];
    }
}

// 解决使用solc库编译时 not found file import funding.sol  使用remix则不用

// pragma solidity ^0.8.7;
// import "./fundingFactory.sol";

contract Funding {
// 1. 管理员（项目发起人）
// 2. 项目名称
// 3. 项目目标筹集金额
// 4. 每个人支持多少钱
// 5. 项目持续多少天

    // 管理员地址
    address public manager; 
    // 众筹项目名称
    string public projectName;
    // 众筹金额
    uint public targetMoney;
    // 参与众筹的人，每人投入的钱
    uint public supportMoney;
    // 众筹持续时间 秒
    // uint public duration;
    // 众筹结束时间
    uint public endTime;

    // 参与玩家集合
    address[] investors;
    SupportorFundingContract supportorFundings;

// "买宠物",3,1,1000000
    constructor (string memory _projectName, uint _targetMoney, uint _supportMoney, uint _duration, address _managerAddress, SupportorFundingContract _supportorFundings)  {
        projectName = _projectName;
        targetMoney = _targetMoney;
        // 将eth转换为wei
        supportMoney = _supportMoney * 10 ** 18;
        // 众筹结束时间 = 当前时间 + 持续时间
        endTime = block.timestamp + _duration;
        // 获取合约工厂中传递的众筹发起人的地址
        manager = _managerAddress;
        // 获取合约实例
        supportorFundings = _supportorFundings;
    }

    // 众筹投资人地址映射 -- 方便判断是否是投资人
    mapping(address => bool) isInvestors;

    // 投资函数 这个函数需要发送主币到合约，因此为payable类型  -- 转入的钱直接就在合约中不用显示调用方法
    function investor() payable public {
        // 判断投资的钱是否满足 规定金额
        require(msg.value == supportMoney, "you must investment supportMonery");
        // 判断当前众筹是否结束
        require(block.timestamp <= endTime, "sorry funding is end");
        // 当前众筹是否已经达到众筹目标 注意：targetMoney 为ETH 需要转换为wei
        require(address(this).balance <= targetMoney * 10 **18, " thank you this funding was success");
        // 将众筹参与者加入investors
        investors.push(msg.sender);
        // 确定投资人的身份
        isInvestors[msg.sender] = true;

        // 将投资人与当前合约的地址传递到FundingFactory中  address(this) 合约的地址
        supportorFundings.setFunding(msg.sender, address(this));
    }

    // 退款函数  --规定时间未筹集到足够的金额
    function refund() public {
        for (uint i = 0; i < investors.length; i ++) {
            payable(investors[i]).transfer(supportMoney);
        }
        // 清除记录的投资人信息  - 保证安全
        delete investors;
    }

    // 产品转态枚举 ： 0：进行中； 1： 已批准  2：已完成    -- 众筹发起方筹集到足够的钱时，由于钱在合约中，众筹方想花钱需要指定投资项目的产品
    enum RequestStatus {
        Voting, Approved, Completed
    }

    // 定义花费请求，一个请求由项目方发起。由投资人投票  -- 众筹方（项目方）筹集到钱现在要花费钱，则提交需要使用钱的项目让投资人（参与众筹的人）进行投票，只要一般以上的投资人同一才能花费这一笔钱
    struct Request {
        // 花费请求唯一Id
        uint reqId;
        // 花费请求描述 -- 花这笔钱是干嘛的
        string purpose;
        // 花费的金额
        uint cost;
        // 接收方的地址 -- 接收这笔钱人的地址
        address seller;
        // 当前这个请求赞成的投票数量
        uint approvedCount;
        // 花费请求当前的转态
        RequestStatus status;
        //  //记录投资人对这个请求的投票状态，只有未投票的才能投票，每人仅限一票
        // mapping(address => bool) isVotedMap;  -- 最新的solidity 中去掉了这种不安全的写法
    }
     //记录投资人对这个请求的投票状态，只有未投票的才能投票，每人仅限一票  请求id => 投资人 => 是否投过票
    mapping(uint => mapping(address => bool)) isVotedMap;

    // 项目方所有花费请求集合
    Request[] public allRequests;

    // 修饰器只有管理员才有资格  --- 多个函数需要写成修饰器
    modifier onlyManager() {
        require(msg.sender == manager, "you not manager do ont authority");
        _;
    }

    uint  _reqId;
    // 创建花费请求函数
    function createRequest(string memory _purops, uint _cost, address _seller) onlyManager public {
        // 初始化一个Request结构体
         // 花费请求id自增
        _reqId ++;
        Request memory req = Request({
            reqId: _reqId,
            purpose: _purops,
            cost: _cost,
            seller: _seller,
            // 初始化请求花费项目批准数为0
            approvedCount: 0,
            // 状态为待投票或正在投票
            status: RequestStatus.Voting
        });
        // 将初始化的request 加入到allRequest数组
        allRequests.push(req);
    }

    // 投资人批准项目方发起的第 i 个花钱项目
    function approveRequest(uint i) public {
        // 1. 检验这个人是否投过票，若未投过，则允许投票，反之退出
        // 2. voteCount数据加1。
        // 3. 将该投票人在investorVotedMap映射中的值设置为true。

        // 手否有投票资格
        require(isInvestors[msg.sender], "you not authority to voting");
        //一定要使用storage类型，引用类型，否则无法修改allRequests里面的数据
        Request storage req = allRequests[i];

        // 判断投资人对当前花费请求是否已经投票  true：以投票  false 未投票
        require(isVotedMap[req.reqId][msg.sender] == false, "you is voted");
        // 投资人赞成当前花费请求
        isVotedMap[req.reqId][msg.sender] = true;
        // 花费请求赞成投票数自增  
        req.approvedCount ++;
    }

    // 确认花费函数 ： 众筹方请求花费执行函数：已经投票通过的函数  -- 只有众筹发起方才能调用
    function finalizeRequest(uint i) onlyManager public {
        Request  storage req = allRequests[i];
        // 判断当前请求的转态  -- 排除已完成请求
        require(req.status != RequestStatus.Completed, "this request is completed");
        //1. 合约中的金额足够使用
        require(address(this).balance >= req.cost, "The contract balance not enough");

        //2. 投资人赞成票过半
        require(req.approvedCount * 2 > investors.length, "the request not authority");

        // 执行花费 -- 将合约中的钱转到 花费请求的地址seller
        payable(req.seller).transfer(req.cost);
        // 更新花费请求的转态 -- 花费请求未完成
        req.status = RequestStatus.Completed;
    }

    // 获取当前众筹剩余时间
    function getRemainderTime() public view returns(uint256) {
        return endTime - block.timestamp;
    }

    // 获取投资人数量函数
    function getInvestorsCount() public view returns(uint256) {
        return investors.length;
    }

    // 返回当前项目方发起花费的请求数量
    function getRequestCount() public view returns(uint256) {
        return allRequests.length;
    }

    // 通过allRequest中的索引来查询花费请求的详细信息 --不定长的字符串 bytes ，结构体等作为参数都要使用calldata 或者 memory 
    function getRequestByIndex(uint _index) public view returns(uint, string memory, uint, address, uint, RequestStatus) {
        Request memory req = allRequests[_index];
        return (req.reqId, req.purpose, req.cost, req.seller, req.approvedCount, req.status);
    }

    // 获取合约中的金额 -- 众筹的金额
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    // 获取所有参与众筹人的数组
    function getInvestors() public view returns(address[] memory) {
        return investors;
    }
}

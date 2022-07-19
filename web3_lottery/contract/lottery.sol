// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Lottery {
    // 业务分析
    // 1. 管理员：负责开奖和退奖
    // 2. 彩民池：address[] players
    // 3. 当前期数： round,每期结束加一

    // 在前端，可以通过函数访问函数得到 manger, round, winner 的信息 manger() round() winner()

    // 玩家
    address[] public players;
    // 管理员
    address public manger;
    // 期数
    uint public round;
    // 赢家
    address public winner;

    // 部署合约人的地址为管理员
    constructor() {
        manger = msg.sender;
    }

    // 每个彩民可以投注多次，每一次投注0.1 ether
    function play() payable public {
        require(msg.value == 1 ether);
        // 把参与的玩家加入到彩民池
        players.push(msg.sender);
    }

    // 开奖函数：
    // 目标：从彩民池中找到一个随机彩民（找一个随机数）
    // 找到一个特别大的数（随机），对我们的彩民数组长度求余数。
    // 用哈希数值来实现大的随机数
    // 哈希内容的随机：当前时间， 区块的挖矿难度，彩民数量作为输入

    function kaijiang() public {
        bytes memory v1 = abi.encodePacked(block.timestamp, block.difficulty, players.length);
        bytes32 v2 = keccak256(v1);
        uint v3 = uint(v2);
        // 随机获得获奖玩家下标
        uint index = v3 % (players.length);
        winner = players[index];
        // 分钱逻辑：管理员获得奖金池的%1，剩下有玩家获得
        uint money_players = address(this).balance * 90 / 100;
        uint money_manger = address(this).balance - money_players;
        // 发送和接收主币的地址类型因为payable修饰
        payable(winner).transfer(money_players);
        payable(manger).transfer(money_manger);
        round ++;
        // 清除这一期的玩家信息
        delete players;
    }

    //退奖函数： 有权限控制 -- 只能是管理员才能调用
    // 1.遍历payable数组，逐一退款 0.1ether
    // 2.期数加一
    // 3.彩民池清零
    function tuijiang() public onlyManger {
        for (uint i = 0; i < players.length; i ++) {
            payable(players[i]).transfer(0.1 ether);
        }
        // 期数增加
        round ++;
        delete players;
    }

    // 修饰器 只能管理员调用
    modifier onlyManger {
        require(msg.sender == manger, "only manger");
        _;
    }

    // 获取彩民人数
    function getPlayersCount() public view returns (uint) {
        return players.length;
    }

    //获取余额
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // 获取彩民数组
    function getPlayers() public view returns(address[] memory) {
        return players;
    }

}
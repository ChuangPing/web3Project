// 导入web3并完成初始化
let Web3 = require("web3")
const web3 = new Web3()
web3.setProvider("http://localhost:7545") // -- 使用本地测试网  使用这个代替上面两个

// 获取编译的abi和bytecode
let {bytecode, abi} = require("./01.compile")

// 拼接合约数据 interface
let contract = new web3.eth.Contract(abi)

// 部署合约的地址  -- 部署人的地址
account = "0x23F107765Eac46DC7959599A683049E22b0cCf54"
//部署合约函数
let deploy = async() => {
    // 获取账户
    // let accounts = await web3.eth.getAccounts()
    // console.log("通过助记词获取到的账户：", accounts)
//    执行部署
    let instance = await contract.deploy({
        data: bytecode,
    //    由于lottery合约没有构造函数，不需要传递参数  arguments：
    }).send({
        // from: accounts[0],
        from: account,
        gas: '4000000'
    })
//    打印合约部署后的地址、
    console.log("instance address:", instance.options.address) // 合约地址：0xA50CD7e0d99E752f7c2eF22f3F1b98c781A206A8
}

deploy()

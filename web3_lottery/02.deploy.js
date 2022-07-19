// 导入初始化好的web3
let web3 = require("./util/initWeb3")
// 导入编译好的bytecode和abi
const {bytecode, abi} = require("./01-compile")

// 拼接合约数据
let contract = new web3.eth.Contract(abi)

// 部署函数
let deploy = async() => {
    // 获取本地网络中的账户
    let accounts = await web3.eth.getAccounts()
    console.log("本地账户：", accounts)
    // 执行部署
    let instance = await contract.deploy({
        data: bytecode,
        //    由于lottery合约没有构造函数，不需要传递参数  arguments：
    }).send({
        from: accounts[0],
        gas: 3000000
    })
    // 部署成功打印合约的地址
    // console.log("instance address:", instance.options.address)//  0x80bA82Dc9A2C51c36233A4c43E6B57D771f85274

}
deploy()

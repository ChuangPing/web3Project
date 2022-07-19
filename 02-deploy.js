let {bytecode, abi} = require("./01-compile")

// 导入web3
let Web3 = require("web3")
//产生web3 实例
let web3 = new Web3()
//设置网络
web3.setProvider("http://localhost:7545")
//部署合约的地址
const account = "0x23F107765Eac46DC7959599A683049E22b0cCf54"

//1.拼接合约数据
let contract = new web3.eth.Contract(abi)
//2. 拼接bytecode
contract.deploy({
    // 合约的bytecode
    data: bytecode,
    arguments: ["hello world"] //给构造函数传递参数，使用数组
}).send({
    from: account,
    gas: '3000000', // 不要使用默认值，一定要写大一点，要使用单引号
}).then(abi => {
    //打印部署的合约地址
    console.log("address:", abi.options.address)  // 0xE66d24c85B4CaB6358474D220a2790041A7317A4
})
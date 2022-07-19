let {bytecode, abi} = require("./01-compile")
let HDWalletProvider = require("truffle-hdwallet-provider")
// 导入web3
let Web3 = require("web3")
//产生web3 实例
let web3 = new Web3()
//设置网络  -- 部署到真实的测试网
let netIp = "https://ropsten.infura.io/v3/2c0678c71a6c4ae080677fd7153d60a1"
// 账户助记词
let terms = "shell oak message slogan weather toy hood february scan drink onion wagon"
let provider = new HDWalletProvider(terms, netIp)
// web3.setProvider("http://localhost:7545")
web3.setProvider(provider)
//部署合约的地址
const account = "0x6378ea9C78C4BA5299E6d2c6Eb6f193c0Ac54202"
//1.拼接合约数据
let contract = new web3.eth.Contract(abi)
// //2. 拼接bytecode
// contract.deploy({
//     // 合约的bytecode
//     data: bytecode,
//     arguments: ["hello world"] //给构造函数传递参数，使用数组
// }).send({
//     from: account,
//     gas: '3000000', // 不要使用默认值，一定要写大一点，要使用单引号
// }).then(abi => {
//     //打印部署的合约地址
//     console.log("address:", abi.options.address)  // 0xB5fbfDAcc553aB8a9aA8F67D3D3d09fB7EE335E6
// })
let deploy = async () => {
//    获取所有的账户

    // let accounts = await  web3.getAccounts()
    // console.log("accounts:", accounts)
//    执行部署
    let instance = await contract.deploy({
        data: bytecode,
        arguments: ["hello ropsten"]
    }).send({
        from: account,
        // from: accounts[0],
        gas: '3000000'
    })
    //打印合约的地址  0x415219988F28A91f7dc163059a1f70402fed5B33
    console.log("instance address:", instance.options.address)
}
//调用部署函数
deploy()
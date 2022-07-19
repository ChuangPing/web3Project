// 获取合约实例 ，导出去  -- 从区块链上根据合约地址拿到合约的abi编码  -- 方便与合约进行交互
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
// 获取合约编译产生的abi编码
let {bytecode, abi} = require("./01-compile")
// 合约地址
let address = "0x415219988F28A91f7dc163059a1f70402fed5B33"

let contractInstance = new web3.eth.Contract(abi, address)
// console.log("address:", contractInstance.options.address)  打印合约地址： 0x415219988F28A91f7dc163059a1f70402fed5B33
//将合约实例进行导出
module.exports = contractInstance
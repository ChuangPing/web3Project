let web3 = require("../util/initWeb3")
// let Web3 = require("web3")
// let web3 = new Web3()
// web3.setProvider("http://127.0.0.1:7545")
// 这是一个巨大的坑-- abi的编码只能从remix中获取  -- 不然会出问题
let abi = [ { "inputs": [ { "internalType": "string", "name": "_data", "type": "string" } ], "name": "setData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "data", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getData", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" } ]
// let contractAddress = "0xcd09836B5BDcEeA80be098bE64a9c40A15763fBd" // 本地测试部署合约地址
let contractAddress_ropsten = "0x5d8dBf0BDBdf3d921B77c6d3Ad938f3F23D633a4"  //reposten 部署合约，
// 根据合约地址 合约的abi 拿到合约的交互实例
// let contractInstance = new web3.eth.Contract(abi, contractAddress) // 本地测试部署合约地址
let contractInstance = new web3.eth.Contract(abi, contractAddress_ropsten) // //reposten 部署合约，
console.log('contract_address :', contractInstance.options.address)
// console.log("lotteryInstance:",contractInstance)
module.exports = contractInstance
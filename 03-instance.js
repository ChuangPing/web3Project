// 获取合约实例 ，导出去  -- 从区块链上根据合约地址拿到合约的abi编码  -- 方便与合约进行交互
let Web3 = require("web3")
let web3 = new Web3()
web3.setProvider("http://127.0.0.1:7545")
// 获取合约编译产生的abi编码
let {bytecode, abi} = require("./01-compile")
let address = "0xE66d24c85B4CaB6358474D220a2790041A7317A4"

let contractInstance = new web3.eth.Contract(abi, address)
// console.log("address:", contractInstance.options.address)  打印合约的地址
//将合约实例进行导出
module.exports = contractInstance
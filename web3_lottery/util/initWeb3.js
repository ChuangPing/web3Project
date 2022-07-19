// 引入web3库
let Web3 = require("web3")
// 实例化web3
const web3 = new Web3()
// 设置本地网络
web3.setProvider("http://127.0.0.1:7545")
module.exports = web3
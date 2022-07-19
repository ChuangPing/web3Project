const Web3 = require("web3")
// window.ethereum.enable();
// const web3 = new Web3(window.ethereum)
const web3 = new Web3()
// 导入浏览器makeMask插件的provider  -- 这样可以和当前登录钱包的账户进行交互
// web3.setProvider(window.web3.currentProvider)  // 这种方式马上要被matemask 废弃 使用下面最新的写法
web3.setProvider(window.ethereum)
module.exports = web3
// 根据合约实例与合约进行交互  -- 此时合约部署在ropsten 测试网络中
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
//1. 导入合约实例
let instance = require("./03-instance")
// 部署合约的人地址
const from = "0x6378ea9C78C4BA5299E6d2c6Eb6f193c0Ac54202"
//2. 读取数据
// instance.methods.getData().call().then(data => {  // 只是读取不改变任何数据 使用call方法
//     console.log(data)
// //    继续写入数据、
//     instance.methods.setData("hello Ethereum").send({
//         from: from,
//         value: 0,
//     }).then(
//         res => {
//             console.log("res:", res)
//         }
//     )
// //   读取刚刚设置的值
//     instance.methods.getData().call().then(res => console.log("获取设置的值：", res))
//
// })
//3. 写入数据

//4. 读取数据
// 使用promise的方式  返回形式都是promise类型
let test = async() => {
    //这些代码都可能出错，因此要是使用try catch包裹一下
    try{
        let v1 = await instance.methods.getData().call()
        console.log("v1:", v1)
        let res = await instance.methods.setData("hello etherum Ropsten").send({
            from: from,
            value: 0
        })
        console.log("res: ", res)
        let v2 = await instance.methods.getData().call()
        console.log("v2:", v2)
    }catch (e) {
        console.log("err:", e)
    }
}

test()
// 根据合约实例与合约进行交互

//1. 导入合约实例
let instance = require("./03-instance")
const from = "0x23F107765Eac46DC7959599A683049E22b0cCf54"
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
        let res = await instance.methods.setData("hello etherum").send({
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
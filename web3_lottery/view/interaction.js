// 导入获取的合约实例
let {lottery_instance, lottery_address} = require("../03-instance")
// 使用promise的方式  返回形式都是promise类型
let test = async() => {
    //这些代码都可能出错，因此要是使用try catch包裹一下
    try{
        let v1 = await lottery_instance.methods.manger().call()
        console.log("v1:", v1)
        // let res = await instance.methods.setData("hello etherum").send({
        //     from: from,
        //     value: 0
        // })
        // console.log("res: ", res)
        // let v2 = await instance.methods.getData().call()
        // console.log("v2:", v2)
    }catch (e) {
        console.log("err:", e)
    }
}
test()

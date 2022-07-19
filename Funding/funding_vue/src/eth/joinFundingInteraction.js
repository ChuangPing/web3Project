const {fundingFactoryInstance, newFundingInstance } = require("../eth/instance")
// 获取当前账户参与的众筹项目
let getJoinFundingInstances = async ()=> {
   
    let onlyFundinginteractions = []
    // 获取加入的众筹合约地址数组
    let fundingAddresses = await fundingFactoryInstance.methods.getSupportFundings().call()
    console.log("fundingAddresses", fundingAddresses)
    // 使用js方法去重 -- 因为一个人可以多次参加同一个众筹项目
    let onlyFundingAddresses = Array.from(new Set(fundingAddresses))
    console.log("onlyFundingAddresses", onlyFundingAddresses)
    // 通过众筹合约地址拿到交互实例数组
    onlyFundingAddresses.forEach(element => {
        let newInstance = newFundingInstance()
        newInstance.options.address = element
        onlyFundinginteractions.push(newInstance)
    });
   
    return onlyFundinginteractions
}
// let Fundinginteractions = getJoinFundingInstances()
// console.log("333333333:", Fundinginteractions)

module.exports = {
    getJoinFundingInstances
}
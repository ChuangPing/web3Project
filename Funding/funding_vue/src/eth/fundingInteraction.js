const {fundingFactoryInstance, newFundingInstance } = require("../eth/instance")
// const {web3} = require("../util/initWeb3")

let getCreatorFundingInstances = async () => { 
    let fundingAddresses = await fundingFactoryInstance.methods.getAllFundings().call()
    let fundingsIntance = []
    fundingAddresses.forEach(element => {
        let newInstance = newFundingInstance()
        newInstance.options.address = element
        fundingsIntance.push(newInstance)
    });
    return fundingsIntance
    //  let fundingInstances = fundingAddresses.map(fundingAddress => {
    //   //  return new Promise( (resolve, reject) => {
    //          //2. 对实例进行填充地址，可以使用了
    //          //这个instance是只有一个，后面的地址把前面的地址覆盖了，导致每次只能获取到最后一个合约的详情
    //          //解决办法：每一个地址来的时候，都创建一个新的合约实例。
    //          fundingInstance.options.address = fundingAddress
    //  })
    //  return fundingInstances
}
// let fundingInstances = getCreatorFundingInstances()
// console.log(fundingInstances)


module.exports = {
    getCreatorFundingInstances,
}
// const {fundingFactoryInstance, newFundingInstance } = require("../eth/instance")
// let getCreatorFundingDetails = async () => { 

//      // 获取通过fundingFactory创建的funding合约地址
//      let fundingAddresses = await fundingFactoryInstance.methods.getAllFundings().call()
//      let fundingDetailPromise = fundingAddresses.map(fundingAddress => {
//       //  return new Promise( (resolve, reject) => {
//              //2. 对实例进行填充地址，可以使用了
//              //这个instance是只有一个，后面的地址把前面的地址覆盖了，导致每次只能获取到最后一个合约的详情
//              //解决办法：每一个地址来的时候，都创建一个新的合约实例。
//              fundingInstance.options.address = fundingAddress
//         //  try {
//            let newInstance = newFundingInstance()
//            // 设置合约地址
//            newInstance.options.address = fundingAddress
 
//            // 获取funding合约信息
//            let manager =  newInstance.methods.manager().call()
//            let projectName =  newInstance.methods.projectName().call()
//            let targetMoney =  newInstance.methods.targetMoney().call()
//            let supportMoney =  newInstance.methods.supportMoney().call()
//            let endTime =  newInstance.methods.endTime().call()
//           //  const fundingDetail = {fundingAddress, manager, projectName, targetMoney, supportMoney, endTime}
//           //  resolve(fundingDetail)
//         //  } catch (error) {
//         //   //  reject(error)
//         //  }
//       //  })
//      })
//     //  同时等待多个promise完成在返回
//     //  let fundingDeatilPromiseAll = Promise.all(fundingDetailPromise)
//     //  console.log("fundingDeatilPromiseAll:", fundingDeatilPromiseAll)
//     //  return fundingDeatilPromiseAll
//     return fundingDetailPromise
// }
// module.exports = {
//   getCreatorFundingDetails
// }
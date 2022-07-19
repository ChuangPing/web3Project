let web3 = require("../util/initWeb3")
async function  getFundingContractDetail(createFundingInstances) {
let createFundingDeatils = [];
    createFundingInstances.forEach(async (createFundingInstance) => {
      // 获取funding合约信息
      let manager = await createFundingInstance.methods.manager().call();
      let projectName = await createFundingInstance.methods
        .projectName()
        .call();
      let targetMoney = await createFundingInstance.methods
        .targetMoney()
        .call();
      let supportMoney_wei = await createFundingInstance.methods
        .supportMoney()
        .call();
        // 利用web3工具将wei转换为以太
        let supportMoney = web3.utils.fromWei(supportMoney_wei, "ether")
        let investorsCount = await createFundingInstance.methods.getInvestorsCount().call()
        let balance_wei = await createFundingInstance.methods.getBalance().call()
        let balance = web3.utils.fromWei(balance_wei, "ether")
      let endTime = await createFundingInstance.methods.endTime().call();
      const fundingDetail = {
        manager,
        projectName,
        targetMoney,
        supportMoney,
        investorsCount,
        balance,
        endTime,
      };
      createFundingDeatils.push(fundingDetail);
    })
    return createFundingDeatils
}

module.exports = {
    getFundingContractDetail
}

<template>
  <div>
    <el-row>
      <el-col
        :span="5"
        v-for="(o, index) in createFundingsDeatil.length"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '12px' }" shadow="hover">
          <img
            :src="imageSrcs[index]"
            class="image"
          />
          <el-form
            :label-position="labelPosition"
            label-width="110px"
            :model="formLabelAlign"
          >
            <el-form-item label="众筹发起人地址">
              <el-input v-model="formLabelAlign[index].manager" class="mangerInp"></el-input>
            </el-form-item>
            <el-form-item label="众筹项目名称">
              <el-input v-model="formLabelAlign[index].projectName"></el-input>
            </el-form-item>
            <el-form-item label="众筹目标ETH">
              <el-input v-model="formLabelAlign[index].targetMoney"></el-input>
            </el-form-item>
            <el-form-item label="支付金额ETH">
              <el-input v-model="formLabelAlign[index].supportMoney"></el-input>
            </el-form-item>
            <el-form-item label="参与人数">
              <el-input v-model="formLabelAlign[index].investorsCount"></el-input>
            </el-form-item>
            <el-form-item label="已筹金额 ETH">
              <el-input v-model="formLabelAlign[index].balance"></el-input>
            </el-form-item>
            <el-form-item label="众筹结束时间">
              <el-input v-model="formLabelAlign[index].endTime"></el-input>
            </el-form-item>
          </el-form>
          <div style="padding: 14px">
            <span>参与众筹 实现梦想</span>
            <div class="bottom clearfix">
              <el-button type="primary" class="button" style="margin: 10px " @click="joinFunding(index)">加入众筹</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const web3 = require("../util/initWeb3");
const { getCreatorFundingInstances } = require("../eth/fundingInteraction");

export default {
  async beforeCreate() {
    let createFundingInstances = await getCreatorFundingInstances();
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
    });
    this.createFundingsDeatil = createFundingDeatils;
    this.formLabelAlign = createFundingDeatils
  },
  methods: {
    joinFunding: async function(index){
      let money = web3.utils.toWei(this.formLabelAlign[index].supportMoney, "ether")
      let currentAccounts = await web3.eth.getAccounts()
      let from = currentAccounts[0]
      let createFundingInstances = await getCreatorFundingInstances();
      let createFundingInstance = createFundingInstances[index]
      createFundingInstance.methods.investor().send({
        from: from,
        value: money,
        gas: '3000000'
      }).then(() => {
        alert("您已成功加入众筹")
      }).catch(() => {
        alert("众筹已完成，加入失败")
      })
    }
  },
  data() {
    return {
      createFundingsDeatil: "",
      labelPosition: 'left',
      // 表单数据绑定
      formLabelAlign: [{
          manager: "",
          projectName: "",
          targetMoney:"",
          supportMoney: "",
          endTime:""
        }],
        // 图片途径
        imageSrcs: [
          "images/0.jpg",
          "images/1.png",
          "images/2.jpg",
          "images/3.png",
          "images/4.jpg"
        ]
    };
  },
  props: {
    // fundingsDetails: Object
  },
};
</script>

<style>
img {
  width: 200px;
  height: 200px;
}
.mangerInp input {
  border: none;
  text-overflow: ellipsis;
  background-color: #ccc;
}
.button {
  width: 100px;
  /* height: 20px; */
}
</style>

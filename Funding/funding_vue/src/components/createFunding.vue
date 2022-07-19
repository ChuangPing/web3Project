<template>
  <!-- string memory _projectName, uint _targetMoney, uint _supportMoney, uint _duration -->
  <div>
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="众筹项目名称">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item label="众筹目标金额(ETH)">
        <el-input v-model="form.targetMoney"></el-input>
      </el-form-item>
      <el-form-item label="参与金额(ETH)">
        <el-input v-model="form.supportMoney"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 50%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 50%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button type="danger">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const web3 = require("../util/initWeb3");
// 导入funding合约交互实例 -- 不完整缺少funding类型的地址
const { fundingFactoryInstance } = require("../eth/instance");
export default {
  name: "createFunding",
  data() {
    return {
      form: {
        projectName: "",
        targetMoney: "",
        supportMoney: "",
        date1: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      let fundingDetail = this.form;
      let projectName = fundingDetail.projectName;
      // 将字符数字转换成int类型
      let targetMoney = parseInt(fundingDetail.targetMoney);
      let supportMoney = parseInt(fundingDetail.supportMoney);
      // 获取表单传递的标准时间
      let date = fundingDetail.date1;
      // 将标准时间转换为秒
      let duration = new Date().getTime(date);
      // let [projectName, targetMoney, supportMoney, date1, date2] = {...fundingDetail}

      // 获取连接当前小狐狸的账户
      let currentAccounts = await web3.eth.getAccounts();
      let currentAccount = currentAccounts[0];
      // 调用工厂合约中的方法创建众筹项目
      console.log(fundingFactoryInstance);
      let manager = await fundingFactoryInstance.methods
        .platformManager()
        .call();
      alert(manager);
      fundingFactoryInstance.methods
        .createFunding(projectName, targetMoney, supportMoney, duration)
        .send({
          from: currentAccount,
          gas: "3000000",
        })
        .then(() => {
          alert("发布众筹项目成功");
        })
        .catch(() => {
          alert("发布失败");
        });
    },
  },
};
</script>
<style></style>

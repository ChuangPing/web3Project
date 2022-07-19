<template>
   <div>
    <el-row>
      <el-col
        :span="5"
        v-for="(o, index) in createFundingsDeatil.length"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '12px' }" shadow="hover" >
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
            <span>感谢参与 助力梦想</span>
            <div class="bottom clearfix">
              <el-button type="success" icon="el-icon-check" circle style="margin: 10px "  @click="joinFunding(index)" ></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <h2>众筹项目花费详情</h2>
    <!-- 众筹项目申请花费详情 -->
    <el-descriptions class="margin-top" :column="6" :size="size" border v-show="isClicked" v-for="(request, index) in requestDetails" :key="index">
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        花费描述
      </template>
      {{request.purpose}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        花费金额(ETH)
      </template>
      {{request.cost}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        转账账户
      </template>
      {{request.seller}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        批准人数
      </template>
      {{request.approvedCount}}/{{investorsCount}}
    </el-descriptions-item>
     <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        状态
      </template>
      {{request.status}}
  </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        操作
      </template>
       <el-button type="success" style="margin-left: 10px;" @click="approvedHandle(request.reqId)">批准</el-button>
    </el-descriptions-item>
  </el-descriptions>
  </div>
</template>
<script>
const web3 = require("../util/initWeb3");
const { getJoinFundingInstances } = require("../eth/joinFundingInteraction");
const {getFundingContractDetail} = require("../eth/getFundingDetail")
export default {
    name: "myJoinFunding",
    async  beforeCreate() {
       let fundinginteractions = await getJoinFundingInstances();
       let details = await getFundingContractDetail(fundinginteractions)
        this.createFundingsDeatil = details;
        this.formLabelAlign = details
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
          // "images/3.png",
          "images/4.jpg"
        ],
        isClicked: false,
        requestDetails: [
            {
                reqId: "",
                purpose: "",
                cost: "",
                seller: "",
                approvedCount: "",
                status: "",
                getInvestorsCount: ""
            }
        ],
        investorsCount: "",
        // 当前用户查看的众筹合约交互实例
        currentFundinginteraction: "",
    };
  },
  methods: {
    joinFunding: async function(index){
        // 显示众筹项目花费详情
        this.isClicked = true
        // 获取当前用户所参与的所有众筹合约交互实例
        let fundinginteractions = await getJoinFundingInstances();
        // 获取当前点击查看的众筹合约实例
        let fundinginteraction = fundinginteractions[index]
        // 储存当前查看众筹合约交互实例
        this.currentFundinginteraction = fundinginteraction
        // 获取当前众筹项目参与人数
        this.investorsCount = await fundinginteraction.methods.getInvestorsCount().call()
        // 获取当前众筹合约所有的花费数量
        let requestLengths = await fundinginteraction.methods.getRequestCount().call()
        // 遍历获取每一个花费请求详情
        const requestDetails = [] 
        const statusArr = ["Voting", "Approved", "Completed"]
        for (let i = 0; i < requestLengths; i ++ ) {
            let requestDetail = await fundinginteraction.methods.getRequestByIndex(i).call()
            console.log("requestDetails", requestDetail)

            //  return (req.reqId, req.purpose, req.cost, req.seller, req.approvedCount, req.status);
            let index = requestDetail[0]
            let reqId = index - 1
            let purpose = requestDetail[1]
            let cost = requestDetail[2]
            let seller = requestDetail[3]
            let approvedCount = requestDetail[4]
            let statusindex = requestDetail[5]
            let status = statusArr[statusindex]
            let detail = {reqId, purpose, cost, seller, approvedCount, status}
            requestDetails.push(detail)
        }
        this.requestDetails = requestDetails
    },
    //   投资人批准花费函数
    async approvedHandle(reqId) {
        alert(reqId)
        // 获取当前账户
        let accounts = await web3.eth.getAccounts()
        let currentAcount = accounts[0]
        // 获取当前用户所参与的所有众筹合约交互实例 根据reqID批准众筹项目花费请求
        this.currentFundinginteraction.methods.approveRequest(reqId).send({
            from: currentAcount,
            gas: '3000000'
        }).then(() => {
            alert("您已批准成功！")
        }).catch((err) =>{
            alert("批准失败！！:", err)
        })
  }
  },

}
</script>
<style>

</style>
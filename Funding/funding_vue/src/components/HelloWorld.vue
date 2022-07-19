<template>
  <div class="hello">
    <p>当前用户地址：{{currentAccount}}</p>
    <p>众筹平台管理员地址：{{platformManager}}</p>
  </div>
</template>

<script>
const web3 = require("../util/initWeb3")
// 导入funding合约交互实例 -- 不完整缺少funding类型的地址
const {fundingFactoryInstance} = require("../eth/instance")

export default {
  name: 'HelloWorld',
  data() {
    return {
      currentAccount: "",
      platformManager: "",
      fundingAddress: ""
    }
  },
  async beforeCreate() {

    // 获取连接当前小狐狸的账户
    let currentAccounts = await web3.eth.getAccounts()
    this.currentAccount = currentAccounts[0]
    // 获取fundingFactory的地址
    this.platformManager = await fundingFactoryInstance.methods.platformManager().call()
    // console.log(typeof(getCreatorFundingDetails))

   
   
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div id="app">
    <HelloWorld />
    <el-tabs type="border-card">
      <el-tab-pane label="我发起的众筹项目">  
          <myFunding  />
      </el-tab-pane>
      <el-tab-pane label="我参与的众筹项目">
          <my-join-funding />
      </el-tab-pane>
      <!-- <el-tab-pane label="我发布的众筹">
        <myCreateFunding/>
      </el-tab-pane> -->
      <el-tab-pane label="创建众筹项目">
          <createFunding/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// 导入查看合约工厂创建的所有众筹
import myFunding from "./components/myFundings.vue"
// 导入我参与的众筹合约组件
import myJoinFunding from "./components/myJoinFunding.vue"
// 导入创建合约页面
import createFunding from "./components/createFunding.vue"
// 导入当前账户创建的合约页面
// import myCreateFunding from "./components/myCreateFunding.vue"

export default {
  name: 'App',
  components: {
    HelloWorld,
    myFunding,
    myJoinFunding,
    createFunding,
    // myCreateFunding
  },
  data() {
    return {
      // fundingsDetails: "" 
    }
  },
  async beforeCreate() {
    // //  this.fundingsDetails = await getCreatorFundingDetails()
    //  let createFundingPromise = await getCreatorFundingDetails()
    //  createFundingPromise.forEach(async (element) => {
    //   console.log(element)
    //     // let manager =  await element.manager()
    //     // let projectName =  newInstance.methods.projectName().call()
    //     // let targetMoney =  newInstance.methods.targetMoney().call()
    //     // let supportMoney =  newInstance.methods.supportMoney().call()
    //     // let endTime =  newInstance.methods.endTime().call()
    //     // let fundingDetail = {fundingAddress, manager, projectName, targetMoney, supportMoney, endTime}
    //   // console.log(manager)
    //  });
    // console.log("app:", typeof(this.fundingsDetails))
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px auto;
  width: 1756px;
  background-color: beige;

}
</style>

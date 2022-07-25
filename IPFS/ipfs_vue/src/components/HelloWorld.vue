<template>
  <div class="container">
    <input type="file" name="upload" id="upload" ref="uploadFile" />
     <el-button type="primary" @click="uploadHandle">点击上传图片</el-button>
    <div v-if="isOk" class="buttom">
      <span>文件上传成功文件哈希：<b>{{file}}</b>  </span>  
      <el-button type="success"  @click="getImgHandle">点击查看上传的图片</el-button>
      <img :src=fileURL >
    </div>
  </div>
</template>

<script>
// import web3 from "../util/initWeb3";
let web3 = require("../util/initWeb3")
// import contractInstance from "../eth/eth";
let contractInstance = require("../eth/eth.js");
import { create } from "ipfs-http-client";
const ipfs = create({ host: "localhost", port: "5001", protocol: "http" });
export default {
  name: "HelloWorld",
  data() {
    return {
      fileURL: "",
      file: "",
      isOk: false
    };
  },
  methods: {
    // 获取图片信息函数
    uploadHandle() {
      const that = this
      // 获取文件描述信息
      let fileInfo = this.$refs.uploadFile.files[0];
      upload(fileInfo);

      // 上传函数
      function upload(fileInfo) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(fileInfo);
        reader.onload = async () => {
          let fileHash = await saveTOIpfs(reader.result);
          fileHash = fileHash.toString()
          // 将文件hash上传到以太坊
          saveToEth(fileHash)
          // console.log("11111111", reader.result)
          // 调用函数上传到ipfs
        };
      }

      // 保存到ipfs
      async function saveTOIpfs(fileArray) {
        // 将文件转换为buffer
        let buffer = Buffer.from(fileArray);
        let result = await ipfs.add(buffer);
        let fileHash = result.path
        return fileHash
      }

      // 将文件hash上传到repose测试网
      async function saveToEth(fileHash) {
        // 获取当前登录账户
        let account = await web3.eth.getAccounts()
        // 将文件哈希保存到以太坊
        await contractInstance.methods.setData(fileHash).send({
          from: account[0]
        }).then( () => {
          alert("文件上传成功")
          that.file = fileHash
          that.isOk = true
        }).catch(() => {
          alert("文件上传失败")
           that.isOk = false
        })
        // let res = await contractInstance.methods.getData().call()
        // console.log(res)
        // .then(() => {
        //   console.log("图片上传成功");
        // }).catch(() => {
        //   console.log("图片上传失败")
        // })
      }
    },
    async getImgHandle() {
      let fileHash = await contractInstance.methods.getData().call()
      this.fileURL = "http://127.0.0.1:8080/ipfs/" + fileHash

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 20px auto;
}
.buttom {
  margin-top: 20px;
  height: 300px;
}
img {
  position: absolute;
  left: 464px;
  top: 165px;
}
</style>

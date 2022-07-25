const SimpleStorage = artifacts.require("./SimpleStorage");

//  部署脚本  ： 每个sol文件写一个部署脚本  --命名方式按照给的 1_init_migration  --> 2_名称_migration.js
module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
const Migrations = artifacts.require("Migrations");

//  部署脚本  ： 每个sol文件写一个部署脚本
module.exports = function (deployer) {
  deployer.deploy(Migrations);
};

 // SPDX-License-Identifier: GPL-3.0
// pragma solidity ^0.8.7;

// import "truffle/Assert.sol";
// import "truffle/DeployedAddresses.sol";  // 报错
// // import "../contracts/MetaCoin.sol"
// // 导入自己要测试的合约
// import "../contracts/SimpleStorage.sol";

// // 合约名字使用Test开头
// contract TestSimpleStorage {
//     // 测试函数，小写test开头
//     function testSetData() public {
//         //获取合约实例
//         SimpleStorage ss = SimpleStorage(DeployAddress.SimpleStorage());
//         ss.setData(100);
//         uint res = ss.getData();
//         Assert.equal(res, 100, "res should be 100");
//     }
// }
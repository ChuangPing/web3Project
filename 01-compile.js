// 导入solc编辑器
let solc = require("solc")

let fs = require("fs")

//读取合约
let sourceCode = fs.readFileSync("./contract/myContract.sol", "utf-8")
// console.log(sourceCode)
// fs.readfileSync()
// 将合约进行编码
// let output = solc.compile(sourceCode, 1)  -- 这种方法过时
var input = {
    language: 'Solidity',
    sources: {
        'myContract.sol': {
            content: sourceCode
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

// `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['myContract.sol']) {
//     console.log(
//         contractName +
//         ': ' +
//         output.contracts['myContract.sol'][contractName].evm.bytecode.object
//     );
// }
// 获取abi编码
console.log(output.contracts['myContract.sol']["MyContract"].abi)
// 获取byteCode
// console.log(output.contracts['myContract.sol']["MyContract"].evm.bytecode.object)
//将产生的ABI 和 byteCode 进行导出
module.exports = {
    bytecode: output.contracts['myContract.sol']["MyContract"].evm.bytecode.object,
    abi: output.contracts['myContract.sol']["MyContract"].abi
}
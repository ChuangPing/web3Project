let solc = require("solc")
let fs = require("fs")

// 读取合约
const fundingFactory = fs.readFileSync("./contract/fundingFactory.sol", "utf-8")

var input = {
    language: 'Solidity',
    sources: {
        'fundingFactory.sol': {
            content: fundingFactory
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
// console.log(output) // 查看编译的结果
// console.log(output.contracts['fundingFactory.sol']["FundingFactory"].evm.bytecode.object)
module.exports = {
    bytecode: output.contracts['fundingFactory.sol']["FundingFactory"].evm.bytecode.object,
    abi: output.contracts['fundingFactory.sol']["FundingFactory"].abi
}
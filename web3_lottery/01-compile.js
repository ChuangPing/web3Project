// 导入node读取文件模块
let fs = require("fs")
// 导入编译solidity库
let solc = require("solc")
// 读取合约
let lotteryContract = fs.readFileSync("F:/Goland_Learn/Go_Learn/web3_project/web3_lottery/contract/lottery.sol", "utf-8")
var input = {
    language: 'Solidity',
    sources: {
        'lottery.sol': {
            content: lotteryContract
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
// console.log(output.contracts['lottery.sol']["Lottery"].abi)
//let lottery_abi = [ { inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, { inputs: [], name: 'getBalance', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'getPlayers', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'getPlayersCount', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'kaijiang', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'manger', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'play', outputs: [], stateMutability: 'payable', type: 'function' }, { inputs: [ [Object] ], name: 'players', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'round', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'tuijiang', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'winner', outputs: [ [Object] ], stateMutability: 'view', type: 'function' } ]
//将产生的ABI 和 byteCode 进行导出
module.exports = {
    bytecode: output.contracts['lottery.sol']["Lottery"].evm.bytecode.object,
    abi: output.contracts['lottery.sol']["Lottery"].abi
}


let web3 = require("./util/initWeb3")
// 合约编译好的abi
//let lottery_abi = [ { inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, { inputs: [], name: 'getBalance', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'getPlayers', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'getPlayersCount', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'kaijiang', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'manger', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'play', outputs: [], stateMutability: 'payable', type: 'function' }, { inputs: [ [Object] ], name: 'players', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'round', outputs: [ [Object] ], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'tuijiang', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'winner', outputs: [ [Object] ], stateMutability: 'view', type: 'function' } ]
let {abi} = require("./01-compile")

//合约部署的地址
const lottery_address = "0x53F234F92c319642A8cE1153b08a2c9C07AA080B"
// 根据合约地址 合约的abi 拿到合约的交互实例
let instance = new web3.eth.Contract(abi, lottery_address)
// var contract = new web3.eth.Contract(lottery_abi) //Instance contract with json abi
// var instance = contract.at("0x53F234F92c319642A8cE1153b08a2c9C07AA080B")
// 打印获取的合约地址
console.log("contract address:", instance.options.address)
console.log("web3 version", web3.version)

// 导出合约实例和地址
module.exports = {
    lottery_instance: instance,
    lottery_address: instance.options.address
}

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract MyContract {
    string public data;
    string str;
    constructor(string memory _str) public {
        data = _str;
    }
    function setData(string memory _data) public {
        data = _data;
    }
    function getData() view public  returns(string memory){
        return data;
    }
}
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract IpfsStorage {
    string public data;
    function setData(string memory _data) public {
        data = _data;
    }
    function getData() view public  returns(string memory){
        return data;
    }
}
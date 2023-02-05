// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;

import "./contract7.sol";

interface IHandler2{
    function addToMedHistory(address _key,string memory _prescriptionHash) external;
    function addToDiseaseList(string memory _disaese) external;
    function addToAddressToDisease(address _key,string memory _disease) external;
    function addToPresName(address _key,string memory _prescriptionName) external;
    }

contract Add {
    // address public owner;

    // constructor(){
    //     owner = msg.sender;
    // }

    // modifier onlyOwner() {
    //     require(msg.sender == owner, "not owner");
    //     _;
    // }

    // function setOwner(address _newOwner) external onlyOwner {
    //     require(_newOwner != address(0), "invalid address");
    //     owner = _newOwner;
    // }

    // function add(address _key,string memory _prescriptionHash) public{
    //     string[] storage ar = Handler.medHistory[_key];
    //     ar.push(_prescriptionHash);
    // }

    //string public hash;
    address testHandler;
    constructor(address _testHandler){
        testHandler = _testHandler;
    }
    function addToMedHistory(address _key,string memory _prescriptionHash) public{
        IHandler2(testHandler).addToMedHistory(_key,_prescriptionHash);
    }
    // function addToDiseaseList(string memory _disease) public{
    //     IHandler2(testHandler).addToDiseaseList(_disease);
    // }
    function addToAddressToDisease(address _key,string memory _disease) public{
        IHandler2(testHandler).addToAddressToDisease(_key,_disease);
    }
    function addToPresName(address _key,string memory _prescriptionName) public{
        IHandler2(testHandler).addToPresName(_key,_prescriptionName);
    }

}
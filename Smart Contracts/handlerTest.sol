// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Handler2{
    mapping(address => string[]) public medHistory; //_walletAddr to _presHash
    mapping(string => uint) public slabs; // _disaese to _slabNo
    mapping(uint=>uint) public paymentSlabs;// _slabNo to _paymentAmt
    string[] public diseasList;//list of diseases indexed acc to medHistory
    mapping(address => string[]) public addressToDisease; //_walletAddr to _diseases
    mapping(string => bool) public claimStatus; //_presHash to claim status 
    mapping(address => string[]) public presName; // _walletAddr to _presName(fileName)

    constructor(){
        slabs["alzheimer"]=3; // cost is 1.6 lakh per month
        slabs["cancer"]=3; // cost is 2.3 lakh per month
        slabs["fibrosis"]=3; // cost is 2.1 lakh per month
        slabs["diabetes"]=2; // cost is 8k per month
        slabs["epilepsy"]=2; // cost is 6k per month
        slabs["jaundice"]=2; // cost is 8.5k for 15 days (treatment period) 
        slabs["aids"]=1; // cost is 3k per month
        slabs["bipolar"]=1; // cost is 1k per month
        slabs["schizophrenia"]=1; // cost is 1k per month
        slabs["asthma"]=1; // cost is 1k per month
        paymentSlabs[3]=30; //10000*100000; // approx 350k 
        paymentSlabs[2]=20; //10000*10000; // approx 35k
        paymentSlabs[1]=10; //10000*1000; // approx 3.5k
    }

    function addToMedHistory(address _key,string memory _prescriptionHash) public{
        string[] storage ar = medHistory[_key];
        ar.push(_prescriptionHash);
        claimStatus[_prescriptionHash] = false;
        //medHistory[_key].push(_prescriptionHash);
    }
    function fetchFromMedHistory(address _key,uint _index) public view returns(string memory){
        return medHistory[_key][_index];
    }
    function fetchMedHistoryList(address _key) public view returns(string[] memory){
        string[] memory ar2 = medHistory[_key];
        return ar2;
    }

    function addToSlabs(string memory _disease,uint _slabNo) public{
        slabs[_disease]=_slabNo;
    }
    function fetchFromSlabs(string memory _disease) public view returns(uint){
        return slabs[_disease];
    }

    function addToPaymentSlabs(uint _slabNo, uint _paymentAmt) public{
        paymentSlabs[_slabNo]=_paymentAmt;
    }
    function fetchFromPaymentSlabs(uint _slabNo) public view returns(uint){
        return paymentSlabs[_slabNo];
    }

    function addToDiseaseList(string memory _disaese) public{
        diseasList.push(_disaese);
    }
    function fetchDiseaseList() public view returns(string[] memory){
        return diseasList;
    }
    function fetchFromDiseaseList(uint _index) public view returns(string memory){
        return diseasList[_index];
    }

    function addToAddressToDisease(address _key,string memory _disease) public{
        string[] storage ar3 = addressToDisease[_key];
        ar3.push(_disease);
    }
    function fetchFromAddressToDisease(address _key) public view returns(string[] memory){
        return addressToDisease[_key];
    }

    function setClaimStatus(string memory _prescriptionHash) public {
        claimStatus[_prescriptionHash]=true;
    }
    function fetchClaimStatus(string memory _prescriptionHash) public view returns(bool){
        return claimStatus[_prescriptionHash];
    }

    function addToPresName(address _key,string memory _prescriptionName) public{
        string[] storage ar3 = presName[_key];
        ar3.push(_prescriptionName);
    }
    function fetchPresName(address _key) public view returns(string[] memory){
        string[] memory ar4 = presName[_key];
        return ar4;
    }


}
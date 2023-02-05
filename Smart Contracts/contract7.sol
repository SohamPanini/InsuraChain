// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Handler{
    //data related
    // mapping(address => string[]) public medHistory; //_walletAddr to _presHash
    // mapping(string => uint) public slabs; // _disaese to _slabNo
    // mapping(uint=>uint) public paymentSlabs;// _slabNo to _paymentAmt
    
    //Payment related
    struct Plan {
        address merchant;
        address token;
        uint amount;
        uint frequency;
    } // This is the insurance plan structure
    struct Subscription {
        address subscriber;
        uint start;
        uint nextPayment;
    } // this is the structure to store subscriber plan initiation and due time
    mapping(address=>uint) public subscribedPlan; //_walletAddr to _planID mapping 
  mapping(uint => Plan) public plans; // _planNo to plan struct mapping
  mapping(address => mapping(uint => Subscription)) public subscriptions; // map of subscriptions
}
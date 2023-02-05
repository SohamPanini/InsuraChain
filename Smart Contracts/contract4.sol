// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
//import "./contract7.sol";

interface IHandler2{
    function fetchFromSlabs(string memory _disease) external view returns(uint);
    function fetchFromPaymentSlabs(uint _slabNo) external view returns(uint);
    }
interface IPayments{
  //function fetchSubscriptionTime(address _key) external view returns(uint);
  function nextPayment(address subscriber, uint planId) external view returns(uint);
}


contract settlements{
    address public tokenAddr;
    address public merchantAddr;
    address testHandler;
    address paymentAddr;

    uint public amount=0;
    event Log(string message);
    event Log2(uint placeholder);
    modifier zeroTransaction(){
        require(amount>0,"amount is either 0 or less");
        _;
    }

    constructor(address _token, address _merchantAddr,address _testHandler,address _paymentAddr){
      tokenAddr=_token;
      merchantAddr = _merchantAddr;
      testHandler = _testHandler;
      paymentAddr=_paymentAddr;
    }

    function claimVerification(string memory _disease, uint _planSubscribedTo) external{
      try IHandler2(testHandler).fetchFromSlabs(_disease) returns(uint _slabNo) {
        emit Log("Try 1 executed log 2 is _slabNo");
        emit Log2(_slabNo);
        if( _slabNo!=0 && _planSubscribedTo>=_slabNo){
          try IHandler2(testHandler).fetchFromPaymentSlabs(_slabNo) returns (uint amt){
            emit Log("Try 2 executed log 2 is amt");
            //emit Log2(amt);
            amount=amt;
            //settlement(msg.sender);
            // uint variable =  IPayments(testHandler).nextPayment(msg.sender,_planSubscribedTo);
            // emit Log2(variable);
            try IPayments(paymentAddr).nextPayment(msg.sender,_planSubscribedTo) returns (uint nextPaymentTimestamp){
              if(!(block.timestamp > nextPaymentTimestamp)){
                settlement(msg.sender);
                emit Log("settlement called");
              }
              else{
                emit Log("Payment is due");
              }
            }catch{
              emit Log("error with fetching next payment");
              emit Log2(_planSubscribedTo);
            }
          }catch{
            emit Log("Problem with amt");
          }
        }
        else{
          if(_slabNo==0){
            emit Log("Slab 0 ");
          }
          else{
            emit Log("Not covered Disease for the Subscription plan");
          }
        }
        
      }catch{
        emit Log("Error while fetching _slabNo");
      }
    }

    function settlement(address _subscriber) private zeroTransaction {
        IERC20 token = IERC20(tokenAddr);
        token.transferFrom(merchantAddr, _subscriber, amount);
        amount = 0;  
        // emit PaymentSent(
        //     subscriber,
        //     plan.merchant, 
        //     plan.amount, 
        //     planId, 
        //     block.timestamp
        // );
  }
}

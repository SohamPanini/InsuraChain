// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;

//import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "./contract7.sol";


contract Payment is Handler{
  uint public nextPlanId=1;
  mapping(address => uint) public subscriptionTime;

  event PlanCreated(
    address merchant,
    uint planId,
    uint date
  );
  event SubscriptionCreated(
    address subscriber,
    uint planId,
    uint date
  );
  event SubscriptionCancelled(
    address subscriber,
    uint planId,
    uint date
  );
  event PaymentSent(
    address from,
    address to,
    uint amount,
    uint planId,
    uint date
  );

  function createPlan(address token, uint amount, uint frequency) external {
    require(token != address(0), 'address cannot be null address');
    require(amount > 0, 'amount needs to be > 0');
    require(frequency > 0, 'frequency needs to be > 0');
    plans[nextPlanId] = Plan(
      msg.sender, 
      token,
      amount, 
      frequency
    );
    nextPlanId++;
  }

  function subscribe(uint planId) external {
    IERC20 token = IERC20(plans[planId].token);
    Plan storage plan = plans[planId];
    require(plan.merchant != address(0), 'this plan does not exist');

    token.transferFrom(msg.sender, plan.merchant, plan.amount);  
    emit PaymentSent(
      msg.sender, 
      plan.merchant, 
      plan.amount, 
      planId, 
      block.timestamp
    );

    subscriptions[msg.sender][planId] = Subscription(
      msg.sender, 
      block.timestamp, 
      block.timestamp + plan.frequency
    );
    emit SubscriptionCreated(msg.sender, planId, block.timestamp);
    //add here
    subscribedPlan[msg.sender]=planId;
    subscriptionTime[msg.sender]=block.timestamp;
  }

  function cancel(uint planId) external {
    Subscription storage subscription = subscriptions[msg.sender][planId];
    require(
      subscription.subscriber != address(0), 
      'this subscription does not exist'
    );
    delete subscriptions[msg.sender][planId]; 
    emit SubscriptionCancelled(msg.sender, planId, block.timestamp);
    if(subscribedPlan[msg.sender]!=0){
      subscribedPlan[msg.sender]=0;
    }
    subscriptionTime[msg.sender]=0;
  }

  function pay(address subscriber, uint planId) external {
    Subscription storage subscription = subscriptions[subscriber][planId];
    Plan storage plan = plans[planId];
    IERC20 token = IERC20(plan.token);
    require(
      subscription.subscriber != address(0), 
      'this subscription does not exist'
    );
    require(
      block.timestamp > subscription.nextPayment,
      'not due yet'
    );

    token.transferFrom(subscriber, plan.merchant, plan.amount);  
    emit PaymentSent(
      subscriber,
      plan.merchant, 
      plan.amount, 
      planId, 
      block.timestamp
    );
    subscription.nextPayment = subscription.nextPayment + plan.frequency;
  }

  function nextPayment(address subscriber, uint planId) external view returns(uint){
    Subscription storage subscription = subscriptions[subscriber][planId];
    return subscription.nextPayment;
  }
  function subscribedTO(address subscriber) external view returns(uint){
    return subscribedPlan[subscriber];
  }
  function subscriptionAmt(uint _planId) external view returns(uint){
    return plans[_planId].amount;
  }
  function planFrequency(uint _planId) external view returns(uint){
    return plans[_planId].frequency;
  }
  function fetchSubscriptionTime(address _key) external view returns(uint){
    return subscriptionTime[_key];
  }

}
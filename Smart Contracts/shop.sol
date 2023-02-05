// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MockToken.sol";

contract Shop{
  InsuraCoin yourToken;
  address payable public owner;

  // token price for Wei
  uint256 public tokensPerWei = 100;

  // Event that log buy operation
  event BuyTokens(address buyer, uint256 amountOfWei, uint256 amountOfTokens);
  event SellTokens(address seller, uint256 amountOfTokens, uint256 amountOfWei);

  constructor(address tokenAddress) {
    yourToken = InsuraCoin(tokenAddress);
    owner = payable(msg.sender);
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "not owner");
    _;
  }

function shopBalance() public view returns (uint256){
  return IERC20(yourToken).balanceOf(address(this));
} 

function checkBalance() public view returns (uint256){
  return IERC20(yourToken).balanceOf(msg.sender);
}

function buyTokens() public payable returns (uint256 tokenAmount) {
    require(msg.value > 0, "Send Wei to buy some tokens");

    uint256 amountToBuy = msg.value * tokensPerWei;

    // check if the Vendor Contract has enough amount of tokens for the transaction
    uint256 vendorBalance = yourToken.balanceOf(address(this));
    require(vendorBalance >= amountToBuy, "Vendor contract has not enough tokens in its balance");

    // Transfer token to the msg.sender
    (bool sent) = yourToken.transfer(msg.sender, amountToBuy);
    require(sent, "Failed to transfer token to user");

    // emit the event
    emit BuyTokens(msg.sender, msg.value, amountToBuy);

    return amountToBuy;
  }

  function sellTokens(uint256 tokenAmountToSell) public {
    // Check that the requested amount of tokens to sell is more than 0
    require(tokenAmountToSell > 0, "Specify an amount of token greater than zero");

    // Check that the user's token balance is enough to do the swap
    uint256 userBalance = yourToken.balanceOf(msg.sender);
    require(userBalance >= tokenAmountToSell, "Your balance is lower than the amount of tokens you want to sell");

    // Check that the Vendor's balance is enough to do the swap
    uint256 amountOfWeiToTransfer = tokenAmountToSell / tokensPerWei;
    uint256 ownerWeiBalance = address(this).balance;
    require(ownerWeiBalance >= amountOfWeiToTransfer, "Vendor has not enough funds to accept the sell request");

    (bool sent) = yourToken.transferFrom(msg.sender, address(this), tokenAmountToSell);
    require(sent, "Failed to transfer tokens from user to vendor");


    (sent,) = msg.sender.call{value: amountOfWeiToTransfer}("");
    require(sent, "Failed to send Wei to the user");
  }
}
//   function withdraw() public onlyOwner {
//     uint256 ownerBalance = address(this).balance;
//     require(ownerBalance > 0, "Owner has not balance to withdraw");

//     (bool sent,) = msg.sender.call{value: address(this).balance}("");
//     require(sent, "Failed to send user balance back to the owner");
//   }
// }
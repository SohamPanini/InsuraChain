// SPDX-License-Identifier: MIT
pragma solidity^0.8.7;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract InsuraCoin is ERC20 {
  ERC20 coin;
  address payable public owner;
  constructor() ERC20('InsuraCoin', 'IC') {
    _mint(msg.sender, 10000);
    owner = payable(msg.sender);
  }
  modifier onlyOwner() {
    require(msg.sender == owner, "not owner");
    _;
    }
    function mintMore() public onlyOwner{
      _mint(msg.sender, 10000);
    }

}

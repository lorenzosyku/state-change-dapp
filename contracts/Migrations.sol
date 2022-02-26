// SPDX-License-Identifier: MIT
pragma solidity >=0.4.26 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgradeted = Migrations(new_address);
    upgradeted.setCompleted(last_completed_migration);
  }
}

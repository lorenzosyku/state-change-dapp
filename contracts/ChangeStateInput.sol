// SPDX-License-Identifier: MIT

pragma solidity >=0.4.26 <0.9.0;

contract ChangeStateInput {
    uint256 stateInput;

    function set(uint256 v) public {
        stateInput = v;
    }

    function get() public view returns (uint256) {
        return stateInput;
    }
}
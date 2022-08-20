//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SpinPayment {

    ERC20 gametoken;
    address owner;

    constructor (address _tokenAddress, address _owner)  {
        gametoken =ERC20(_tokenAddress);
        owner = _owner;
    }

    function lotterySuccess (uint amount) public payable {
        
        gametoken.approve(msg.sender, amount);
        gametoken.transferFrom(msg.sender, owner , amount);
    }

    function lotteryBadluck (uint amount) public payable {
        gametoken.transferFrom( owner , msg.sender, amount);
    }

}
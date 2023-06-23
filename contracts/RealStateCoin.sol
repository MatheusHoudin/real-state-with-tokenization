// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract RealStateCoin is ERC20, Ownable {

    uint public constant COIN_PRICE = 0.0001 ether;

    constructor(
        uint256 initialSupply,
        string memory coinName,
        string memory coinSymbol,
        address owner
    ) ERC20(coinName, coinSymbol) {
        _transferOwnership(owner);
        _mint(owner, initialSupply);
    }

    function buyCoins(address to) public payable {
        uint256 coinAmount = msg.value / COIN_PRICE;
        _transfer(owner(), to, coinAmount);
    }
}
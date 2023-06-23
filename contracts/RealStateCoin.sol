// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealStateCoin is ERC20, Ownable {

    uint public constant COIN_PRICE = 0.1 ether;

    constructor(
        uint256 initialSupply,
        string memory coinName,
        string memory coinSymbol
    ) ERC20(coinName, coinSymbol) {
        _mint(address(this), initialSupply);
    }

    function buyCoins(address to) public payable {
        uint256 coinAmount = msg.value / COIN_PRICE;
        transfer(to, coinAmount);
    }
}
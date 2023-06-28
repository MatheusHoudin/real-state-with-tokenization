// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract RealStateCoin is ERC20, Ownable {

    uint public constant COIN_PRICE = 0.0001 ether;
    uint256 public lockedAmount;
    uint256 public availableTokenAmount;

    event BuyToken(address buyer, uint256 amount);

    modifier isARoundValue {
      require(msg.value % COIN_PRICE == 0, "Value of this coin is exactly 0.0001 ETH, it is not possible to buy less than 1 unit!");
      _;
    }

    constructor(
        uint256 initialSupply,
        uint256 lockedCoinAmount,
        string memory coinName,
        string memory coinSymbol,
        address owner
    ) ERC20(coinName, coinSymbol) {
        lockedAmount = lockedCoinAmount;
        availableTokenAmount = initialSupply - lockedAmount;
        _transferOwnership(owner);
        _mint(owner, initialSupply);
    }

    function buyCoins(address to) public payable isARoundValue {
        uint256 coinAmount = msg.value / COIN_PRICE;

        require(coinAmount <= availableTokenAmount, "There are not enough available tokens to complete this operation");

        _transfer(owner(), to, coinAmount);
        
        availableTokenAmount -= coinAmount;
        emit BuyToken(msg.sender, coinAmount);
    }

    function getHolderPercentage(address holder) public view returns(uint256) {
        return (balanceOf(holder) * 100) / totalSupply();
    }

    receive() external payable {}

    fallback() external payable {}
}
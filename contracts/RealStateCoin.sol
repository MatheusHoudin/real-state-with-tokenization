// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract RealStateCoin is ERC20, Ownable {

    uint public constant COIN_PRICE = 0.0001 ether;
    uint256 public lockedAmount;
    uint256 public availableTokenAmount;
    uint256 public totalRentIncomeReceived;

    mapping(address => uint256) public lastWithdrawalBase;

    event BuyToken(address buyer, uint256 amount);
    event DividendPaid(address receiver, uint256 amount);

    modifier isARoundValue {
      require(msg.value % COIN_PRICE == 0, "Value of this coin is exactly 0.0001 ETH, it is not possible to buy less than 1 unit!");
      _;
    }

    modifier isATokenHolder {
      require(balanceOf(msg.sender) > 0, "You are not a token holder, thus cannot call this function!");
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

        payable(owner()).call{value: msg.value}("");

        emit BuyToken(msg.sender, coinAmount);
    }

    function getHolderPercentage(address holder) public view returns(uint256) {
        return (balanceOf(holder) * 100) / totalSupply();
    }

    function withdrawDividends() public payable isATokenHolder returns (bool) {
        uint contractBalance = address(this).balance;
        uint256 withdrawalAmount = (((totalRentIncomeReceived - lastWithdrawalBase[msg.sender]) / 100) * getHolderPercentage(msg.sender));

        require(contractBalance > 0, "There is no balance available!");
        require(withdrawalAmount > 0, "Holder does not have any dividend to withdraw now!");

        lastWithdrawalBase[msg.sender] = totalRentIncomeReceived;

        (bool status,) = payable(msg.sender).call{value: withdrawalAmount}("");

        emit DividendPaid(msg.sender, withdrawalAmount);

        return status;
    }

    fallback() external payable {}

    receive() external payable {
        totalRentIncomeReceived += msg.value;
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RealStateToken is ERC20 {
    constructor(
        uint256 initialSupply,
        string memory tokenName,
        string memory tokenSymbol,
        address owner
    ) ERC20(tokenName, tokenSymbol) {
        _mint(owner, initialSupply);
    }
    
}
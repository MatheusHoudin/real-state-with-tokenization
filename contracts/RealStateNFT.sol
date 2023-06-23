// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./RealStateCoin.sol";

contract RealStateNFT is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _nftIds;

    uint public constant NFT_VALUE = 0.5 ether;
    mapping(uint256 => RealStateCoin) public tokenCoin;

    event NewNFT(uint256 nftId, string nftURI, address realStateCoinContract, address owner);

    constructor() ERC721("RealStateNFT", "RST") {}

    function createNFT(
        string memory nftURI,
        uint256 initialSupply,
        string memory coinName,
        string memory coinSymbol
    ) payable public {
        require(msg.value == NFT_VALUE, "Value sent is not equals to the required ETH value.");

        uint256 newTokenId = _nftIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, nftURI);

        _nftIds.increment();

        tokenCoin[newTokenId] = new RealStateCoin(
            initialSupply,
            coinName,
            coinSymbol
        );
        
        emit NewNFT(newTokenId, nftURI, address(tokenCoin[newTokenId]), msg.sender);
    }

    function buyCoins(uint256 nftId, address to) public payable {
        tokenCoin[nftId].buyCoins{ value:msg.value }(to);
    }
}
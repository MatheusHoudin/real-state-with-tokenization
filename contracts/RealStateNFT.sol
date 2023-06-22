// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RealStateNFT is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint public constant NFT_VALUE = 0.5 ether;

    event NewNFT(uint256 tokenId, string tokenURI);

    constructor() ERC721("RealStateNFT", "RST") {}

    function createNFT(string memory nftURI) payable public {
        require(msg.value == NFT_VALUE, "Value sent is not equals to the required ETH value.");

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, nftURI);

        _tokenIds.increment();
        
        emit NewNFT(newTokenId, nftURI);
    }
}
import RealStateNFT from '../../artifacts/contracts/RealStateNFT.sol/RealStateNFT.json';
import RealStateCoin from '../../artifacts/contracts/RealStateCoin.sol/RealStateCoin.json';
import Web3 from 'web3';

const RealStateNFTAbi = RealStateNFT.abi;
const RealStateNFTAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const RealStateCoinAbi = RealStateCoin.abi;

const web3 = new Web3("ws://localhost:8545")
const rstNFTContract = new web3.eth.Contract(RealStateNFTAbi, RealStateNFTAddress);

const blockchain = {
    nftContract: rstNFTContract,
    web3: web3
}

export default blockchain
import RealStateNFT from '../../artifacts/contracts/RealStateNFT.sol/RealStateNFT.json';
import RealStateCoin from '../../artifacts/contracts/RealStateCoin.sol/RealStateCoin.json';
import Web3 from 'web3';

const RealStateNFTAbi = RealStateNFT.abi;
const RealStateNFTAddress = "0x49b74EaFB05Df38354F81EcB3854035c2cB2A4BF";

const RealStateCoinAbi = RealStateCoin.abi;

const web3 = new Web3("wss://eth-sepolia.g.alchemy.com/v2/F7bRp3SKEAfXi_nXBw9aDa-DXwBUY_Bj")
const rstNFTContract = new web3.eth.Contract(RealStateNFTAbi, RealStateNFTAddress);

const blockchain = {
    nftContract: rstNFTContract,
    web3: web3
}

export default blockchain
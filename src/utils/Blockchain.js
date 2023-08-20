
import RealStateNFT from '../../artifacts/contracts/RealStateNFT.sol/RealStateNFT.json';
import RealStateCoin from '../../artifacts/contracts/RealStateCoin.sol/RealStateCoin.json';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
    apiKey: "F7bRp3SKEAfXi_nXBw9aDa-DXwBUY_Bj",
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

const RealStateNFTAbi = RealStateNFT.abi;
const RealStateNFTAddress = "0xd9f8B406d91486298915b9b6eE189Cc77dCE2C59";

const RealStateCoinAbi = RealStateCoin.abi;

const web3 = createAlchemyWeb3("wss://eth-sepolia.g.alchemy.com/v2/F7bRp3SKEAfXi_nXBw9aDa-DXwBUY_Bj"); 

const rstNFTContract = new web3.eth.Contract(RealStateNFTAbi, RealStateNFTAddress);

const blockchain = {
    nftContract: rstNFTContract,
    web3: web3,
    alchemy: alchemy,
    realStateCoinAbi: RealStateCoinAbi
}

export default blockchain
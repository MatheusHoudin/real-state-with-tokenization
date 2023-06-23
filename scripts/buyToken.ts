import { ethers } from "hardhat";

async function main() {
  const REAL_STATE_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const COIN_CONTRACT_ADDRESS = "0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968"
  const DEPLOYER = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  const NFT_ID = 0

  const [owner, user1, user2] = await ethers.getSigners();

  const RealStateNFT = await ethers.getContractFactory("RealStateNFT");
  const RealStateCoin = await ethers.getContractFactory("RealStateCoin");

  const realStateNFT = await RealStateNFT.attach(REAL_STATE_CONTRACT_ADDRESS);
  const coinContract = await RealStateCoin.attach(COIN_CONTRACT_ADDRESS);

  await realStateNFT.connect(user1).buyCoins(0, { value: ethers.parseEther("0.01") });
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
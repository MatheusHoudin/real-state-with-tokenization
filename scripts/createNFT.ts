import { ethers } from "hardhat";

async function main() {
  const REAL_STATE_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const DEPLOYER = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  const NFT_ID = 0

  const RealStateNFT = await ethers.getContractFactory("RealStateNFT");

  const deployedContract = await RealStateNFT.attach(REAL_STATE_CONTRACT_ADDRESS);

  await deployedContract.createNFT(
    "www.uri.com",
    50000,
    "RealState",
    "RST",
    {
        value: ethers.parseEther("0.5")
    }
  );

  const realStateCoin = await deployedContract.tokenCoin(NFT_ID);

  console.log("--------- RealStateCoin ---------")
  console.log("Coin address "+realStateCoin)


  const balanceOfOwner = await deployedContract.balanceOf(DEPLOYER)
  const realStateNFTOwner = await deployedContract.ownerOf(NFT_ID)

  console.log("--------- RealStateNFT ---------")
  console.log("Balance of owner: " + balanceOfOwner)
  console.log("Owner of NFT 0: " + realStateNFTOwner)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
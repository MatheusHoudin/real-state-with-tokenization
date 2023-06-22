import { ethers } from "hardhat";

async function main() {
  const realStateNFT = await ethers.deployContract("RealStateNFT");

  await realStateNFT.waitForDeployment();

  console.log(`RealStateNFT deployed with this address: ${realStateNFT.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

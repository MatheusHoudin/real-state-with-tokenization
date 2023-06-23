import { ethers } from "hardhat";

async function main() {
  const COIN_CONTRACT_ADDRESS = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be"
  const DEPLOYER = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

  const RealStateCoin = await ethers.getContractFactory("RealStateCoin");
  const coinContract = await RealStateCoin.attach(COIN_CONTRACT_ADDRESS);


  const ownerCoinBalance = await coinContract.balanceOf(DEPLOYER)

  console.log("--------- RealStateToken ---------")
  console.log("Coin address "+COIN_CONTRACT_ADDRESS)
  console.log("Deployer coin balance: " + ownerCoinBalance)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
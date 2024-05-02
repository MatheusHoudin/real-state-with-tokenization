import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import dotenv from 'dotenv';

dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    "version": "0.8.18",
    "settings": {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.ALCHEMY_KEY,
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  },
  gasReporter: {
    enabled: true
  
  }
};

export default config;

require('dotenv').config({path:__dirname+'/.env'});
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";

const { API_URL, PRIVATE_KEY } = process.env;

console.log("sadsa")
console.log(API_URL);
console.log(PRIVATE_KEY);


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
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  gasReporter: {
    enabled: true
  
  }
};

export default config;

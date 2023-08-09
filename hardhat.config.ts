import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";

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
      url: "https://eth-sepolia.g.alchemy.com/v2/F7bRp3SKEAfXi_nXBw9aDa-DXwBUY_Bj",
      accounts: [`0x1ab7b7144da91aeab90be40f1f9157a86e196226202bc82bf90b1a958e6ce7d7`]
    }
  },
  gasReporter: {
    enabled: true
  
  }
};

export default config;

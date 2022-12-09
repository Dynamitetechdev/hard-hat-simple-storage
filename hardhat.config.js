require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("../hard-hat-simple-storage/task/accounts");
require("hardhat-gas-reporter");
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_APIKEY = process.env.ETHERSCAN_APIKEY;
const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL;
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY;
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",

  networks: {
    goerli: {
      url: GOERLI_RPC_URL, // achemy GOERLI RPC
      accounts: [PRIVATE_KEY], // My MetaMask Acount Private
      chainId: 5, // Goerli Chain Id
    },
    localhost: {
      url: LOCALHOST_RPC_URL,
      // accounts: handled by hardhat
      chainId: 31337, // still using hardhat chainId
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_APIKEY, // etherscan apiKey
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
    token: "ETH",
  },
};

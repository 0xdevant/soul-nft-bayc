require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const { RINKEBY_MNEMONIC, ETHEREUM_PRIVATE_KEY, INFURA_API_KEY } = process.env;
const rinkebyUrl = `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`;
const ethereumUrl = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;

module.exports = {
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(RINKEBY_MNEMONIC, rinkebyUrl),
      network_id: 4,
      gas: 10000000,
      gasPrice: 10000000000,
      skipDryRun: true,
    },
    mainnet: {
      provider: () => new HDWalletProvider(ETHEREUM_PRIVATE_KEY, ethereumUrl),
      network_id: 1,
      gas: 5000000,
      gasPrice: 70e9, //80 gwei
      skipDryRun: true,
    },
  },
};

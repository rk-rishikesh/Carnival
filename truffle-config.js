require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      networkCheckTimeout: 10000,
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/27dc839854c045bb879cb7c4345bf56a`),
      network_id: 3,
      gas: 4042643,
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 50000,
      networkCheckTimeout: 10000000,
      skipDryRun: true
    },
    kovan: {
      networkCheckTimeout: 10000,
      provider: () => {
         return new HDWalletProvider(
          mnemonic,
           `wss://kovan.infura.io/ws/v3/84516a8d18fe4958bd33f09a8b2daad9`
         );
      },
      network_id: "42",
   },
  },
  
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // compilers: {
  //   solc: {
  //     version: "^0.5.0"
  //   }
  // }
  mocha: {
    timeout: 20000
  },
  compilers: {
    solc: {
      version: "^0.8.0",    //<==========CHANGED THAT from "0.5.1"
      docker: false,        
      settings: {         
       optimizer: {
         enabled: false,
         runs: 200
       },
      }
    }
  }
}
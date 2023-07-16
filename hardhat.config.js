require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL
const TESTNET_ASTAR_RPC_URL = process.env.TESTNET_ASTAR_RPC_URL
const MAINNET_ASTAR_RPC_URL = process.env.MAINNET_ASTAR_RPC_URL
const TESTNET_MOONBEAM_RPC_URL = process.env.TESTNET_MOONBEAM_RPC_URL
const MAINNET_MOONBEAM_RPC_URL = process.env.MAINNET_MOONBEAM_RPC_URL

const PRIVATE_KEY_MOONBEAM = process.env.PRIVATE_KEY_MOONBEAM
const PRIVATE_KEY_ASTAR = process.env.PRIVATE_KEY_ASTAR
const PRIVATE_KEY_MOONBEAM_TEST = process.env.PRIVATE_KEY_MOONBEAM_TEST
const PRIVATE_KEY_ASTAR_TEST = process.env.PRIVATE_KEY_ASTAR_TEST
const PRIVATE_KEY_DEV = process.env.PRIVATE_KEY_DEV

const SCAN_API_KEY_MOONBEAM = process.env.SCAN_API_KEY_MOONBEAM
const SCAN_API_KEY_ASTAR = process.env.SCAN_API_KEY_ASTAR
const SCAN_API_KEY_MOONBEAM_TEST = process.env.SCAN_API_KEY_MOONBEAM_TEST
const SCAN_API_KEY_ASTAR_TEST = process.env.SCAN_API_KEY_ASTAR_TEST

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

// Your API key for Etherscan
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        localchain: {
            url: LOCALHOST_RPC_URL,
            accounts: PRIVATE_KEY_DEV !== undefined ? [PRIVATE_KEY_DEV] : [],
            saveDeployments: true,
            chainId: 1281,
        },
        testchainastar: {
            url: TESTNET_ASTAR_RPC_URL,
            chainId: 81,
            accounts: PRIVATE_KEY_ASTAR_TEST !== undefined ? [PRIVATE_KEY_ASTAR_TEST] : [],
        },
        livechainastar: {
            url: MAINNET_ASTAR_RPC_URL,
            accounts: PRIVATE_KEY_ASTAR !== undefined ? [PRIVATE_KEY_ASTAR] : [],
            saveDeployments: true,
            chainId: 592,
        },
        testchainmoonbeam: {
            url: TESTNET_MOONBEAM_RPC_URL,
            chainId: 1287,
            accounts: PRIVATE_KEY_MOONBEAM_TEST !== undefined ? [PRIVATE_KEY_MOONBEAM_TEST] : [],
        },
        livechainmoonbeam: {
            url: MAINNET_MOONBEAM_RPC_URL,
            accounts: PRIVATE_KEY_MOONBEAM !== undefined ? [PRIVATE_KEY_MOONBEAM] : [],
            saveDeployments: true,
            chainId: 1284,
        },
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            testchainastar: SCAN_API_KEY_ASTAR_TEST,
            livechainastar: SCAN_API_KEY_ASTAR,
            testchainmoonbeam: SCAN_API_KEY_MOONBEAM_TEST,
            livechainmoonbeam: SCAN_API_KEY_MOONBEAM,
            moonbaseAlpha: SCAN_API_KEY_MOONBEAM_TEST,
        },
        customChains: [
            {
                network: "testchainastar",
                chainId: 81,
                urls: {
                    apiURL: "https://blockscout.com/shibuya/api",
                    browserURL: "https://blockscout.com/shibuya",
                },
            },
        ],
    },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        token: "MOVR",
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
        user: {
            default: 1,
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./build/cache",
        artifacts: "./build/artifacts",
    },
    solidity: {
        version: "0.8.17",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
}

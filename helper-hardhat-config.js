const networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },
    31337: {
        name: "localdev",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        callbackGasLimit: "500000", // 500,000 gas
    },
    1281: {
        name: "localchain",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    },
    81: {
        name: "testchainastar",
        keepersUpdateInterval: "30",
    },
    592: {
        name: "livechainastar",
        keepersUpdateInterval: "30",
    },
    1287: {
        name: "testchainmoonbeam",
        keepersUpdateInterval: "30",
    },
    1284: {
        name: "livechainmoonbeam",
        keepersUpdateInterval: "30",
    },
}

const developmentChains = ["hardhat", "localhost", "localchain"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndContractsFile = "../casino-frontend/constants/contractAddresses.json"
const frontEndAbiFile = "../casino-frontend/constants/abi.json"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractsFile,
    frontEndAbiFile,
}

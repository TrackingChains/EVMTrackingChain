const { getNamedAccounts, deployments, network, run, ethers } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const FUND_AMOUNT = "1000000000000000000000"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    log(deployer)
    if (chainId == 31337) {
    } else {
    }
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")

    // Tracking
    const argumentsTracking = []
    const tracking = await deploy("Tracking", {
        from: deployer,
        args: argumentsTracking,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log("Deployed tracking: " + tracking.address)
    // Nft
    /*const argumentsNft = []
    const nft = await deploy("MyNFT", {
        from: deployer,
        args: argumentsNft,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log("Deployed nft: " + nft.address)*/

    // Verify the deployment
    if (!developmentChains.includes(network.name)) {
        log("Verifying tracking... " + tracking.address)
        await verify(tracking.address, argumentsTracking)
        //await verify(nft.address, argumentsNft)
    }
}

module.exports.tags = ["all", "raffle"]

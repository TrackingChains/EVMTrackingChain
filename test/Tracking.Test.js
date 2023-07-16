const { assert, expect } = require("chai")
const { ethers, waffle } = require("hardhat")
const { developmentChains, INITIAL_SUPPLY } = require("../helper-hardhat-config")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { time } = require("@nomicfoundation/hardhat-network-helpers")

describe("Deploy all contracts", function () {
    let trackingFactory, tracking
    beforeEach(async function () {
        trackingFactory = await ethers.getContractFactory("Tracking")
        tracking = await trackingFactory.deploy()
    })

    it("Should accept single data encypted SIMPLE", async function () {
        const insertTrackTx = await tracking.InsertTrack(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e",
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b",
            false
        )
    })

    it("Should accept multi data SIMPLE", async function () {
        const insertTrackTx = await tracking.MultiInsertTrack(
            [
                "0x4173616973694153616273626153416273626175614249534153414e6e6f6e71",
                "0x4173616973694153616273626153416273626175614249534153414e6e6f6e72",
                "0x4173616973694153616273626153416273626175614249534153414e6e6f6e73",
                "0x4173616973694153616273626153416273626175614249534153414e6e6f6e74",
                "0x4173616973694153616273626153416273626175614249534153414e6e6f6e75",
            ],
            [
                "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b",
                "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b",
                "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b",
                "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b",
                "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b",
            ],
            [false, false, true, false, true]
        )
    })

    it("Get correct data from product code with single track", async function () {
        const insertTrackTx = await tracking.InsertTrack(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e",
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b",
            false
        )

        const productResult = await tracking.GetCodeTracking(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e"
        )

        expect(productResult.length).to.equal(1)
        expect(productResult[0].dataValue).to.equal(
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b"
        )
    })

    it("Get correct data from product code with multi track", async function () {
        const insertTrackTx = await tracking.InsertTrack(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e",
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b",
            false
        )
        const insertTrackTx2 = await tracking.InsertTrack(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e",
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61c",
            true
        )

        const productResult = await tracking.GetCodeTracking(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e"
        )
        expect(productResult.length).to.equal(2)
        expect(productResult[0].dataValue).to.equal(
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b"
        )
        expect(productResult[1].dataValue).to.equal(
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61c"
        )
    })

    it("Get correct data from product code with multi track and multi code", async function () {
        const insertTrackTxProductOne = await tracking.InsertTrack(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656a",
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61d",
            true
        )
        const insertTrackTxProductTwo = await tracking.InsertTrack(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656b",
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61e",
            false
        )
        const insertTrackTx = await tracking.InsertTrack(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e",
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b",
            false
        )
        const insertTrackTx2 = await tracking.InsertTrack(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e",
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61c",
            false
        )

        //0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656a
        const productResultOne = await tracking.GetCodeTracking(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656a"
        )
        expect(productResultOne.length).to.equal(1)
        expect(productResultOne[0].closed).to.equal(true)
        expect(productResultOne[0].dataValue).to.equal(
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61d"
        )

        //0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656b
        const productResultTwo = await tracking.GetCodeTracking(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656b"
        )
        expect(productResultTwo.length).to.equal(1)
        expect(productResultTwo[0].closed).to.equal(false)
        expect(productResultTwo[0].dataValue).to.equal(
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61e"
        )

        //0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e
        const productResult = await tracking.GetCodeTracking(
            "0x50726f64756374436f64654772616e64654772616e64697373696d6f5069656e"
        )
        expect(productResult.length).to.equal(2)
        expect(productResult[0].dataValue).to.equal(
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61b"
        )
        expect(productResult[1].dataValue).to.equal(
            "0xec294e40a27dac2ede2bda8a1755e9b6f5013063a6444362f653992b413947ef4305631ee614f445fabfd336c05b7591f5d260dfedc71b05fcd12dc853643ed61c"
        )
        expect(productResult[0].closed).to.equal(false)
        expect(productResult[1].closed).to.equal(false)
    })
})

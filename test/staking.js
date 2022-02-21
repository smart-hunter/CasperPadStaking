const { time } = require('@openzeppelin/test-helpers');
const { expect } = require("chai");
const { ethers } = require('hardhat');

const BN = ethers.BigNumber;

const Name = "Test Token";
const Symbol = "TEST";
const Decimals = BN.from(18);
const OneToken = BN.from(10).pow(Decimals);
const moment = require('moment')

describe("Token test", function () {
    let tokenInst, staking;

    // const inititalSupply = OneToken.mul(100000000);
    // const lockedTotalSupply = OneToken.mul(75000000);

    const inititalSupply = OneToken.mul(500000000);
    const totalReward = OneToken.mul(200000000);
    const rewardPerBlock = OneToken.div(1000);

    beforeEach(async () => {
    	const [owner, user1, user2, user3, user4, feeWallet] = await ethers.getSigners();
        // deploy Token
        const Token = await ethers.getContractFactory("CasperPadWhitelisted");
        tokenInst = await Token.deploy();


		const MasterChefStaking = await ethers.getContractFactory("MasterChef");
		staking = await MasterChefStaking.deploy(tokenInst.address, rewardPerBlock, 1, feeWallet.address);


    });

    it("Staking test", async () => {
        await tokenInst.approve(staking.address, totalReward);
        await staking.depositReward(totalReward);

    });
});

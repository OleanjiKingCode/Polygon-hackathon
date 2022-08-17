const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return ", async function () {
    const Ogx = await ethers.getContractFactory("GameToken");
    const ogx = await Ogx.deploy(5000, 1367, 10);
    await ogx.deployed();
    let today = new Date().toISOString().slice(0, 10);
    console.log(today)
    const [_, second,thirdone] = await ethers.getSigners()
    // expect(await greeter.greet()).to.equal("Hello, world!");

    const firstmemeber = await ogx.connect(second).NewPlayer(today, "mundo");
    await firstmemeber.wait();
    const secondmemeber = await ogx.connect(thirdone).NewPlayer(today, "frenny");
    await secondmemeber.wait();
    const playerYesORNo = await ogx.connect(second).areYouAPlayer();
    console.log(playerYesORNo);
    let getMember = await ogx.connect(second).GetAplayerdetails()
    console.log(getMember)
    const getMember2 = await ogx.connect(thirdone).GetAplayerdetails()
    console.log(getMember2)
    const gameEnded = await ogx.connect(second).gameEnded(1, 200, 400);
    getMember = await ogx.connect(second).GetAplayerdetails()
    console.log(getMember);
  

    const addr = await ogx.signer.getAddress()
    const values = await ogx.balanceOf(addr);
    const newValue =ethers.utils.formatEther(values);
    console.log(newValue);
    const values1 = await ogx.balanceOf(second.address);
    const newValue1 =ethers.utils.formatEther(values1);
    console.log(newValue1);
    const CA= ogx.address;
    console.log("this is this contract address",CA);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const spin  = await ogx.connect(second).SpinBoard(200);
    await delay(10000);
   
    console.log(await ogx.s_randomLuck())
    getMember = await ogx.connect(second).GetAplayerdetails()
    console.log(getMember);
  });
});

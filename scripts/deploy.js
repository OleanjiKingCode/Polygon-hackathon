
const hre = require("hardhat");
const filesys = require("fs");

async function main() {

  // const Token = await hre.ethers.getContractFactory("GameToken")
  // const token = await Token.deploy(5000, 1367, 10);
  // await token.deployed();

  // console.log("Token  deployed to:", token.address);

  // const Dex = await hre.ethers.getContractFactory("OleanjiGamesToken")
  // const dex = await Dex.deploy(token.address);
  // await dex.deployed();

  // console.log("Dex  deployed to:", dex.address);

  // filesys.writeFileSync('./constant.js' , `
  // export const GAMETOKENAddress ="${token.address}"
  // export const DEXAddress = "${dex.address}"

  // `)

  const Spin = await hre.ethers.getContractFactory("SpinPayment")
  const spin = await Spin.deploy("0x52Ed4E39187905cFd1Da36D34be357616e518303","0xf2445f8FEEfef350ac1756F67C62938a37eDa375");
  await spin.deployed();

  console.log("Spin deployed to:", spin.address);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

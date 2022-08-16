
const hre = require("hardhat");
const filesys = require("fs");

async function main() {

  const Token = await hre.ethers.getContractFactory("GameToken")
  const token = await Token.deploy(5000, 1367, 10);
  await token.deployed();

  console.log("Token  deployed to:", token.address);

  const Dex = await hre.ethers.getContractFactory("OleanjiGamesToken")
  const dex = await Dex.deploy(token.address);
  await dex.deployed();

  console.log("Dex  deployed to:", dex.address);

  filesys.writeFileSync('./constant.js' , `
  export const GAMETOKENAddress ="${token.address}"
  export const DEXAddress = "${dex.address}"

  `)

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

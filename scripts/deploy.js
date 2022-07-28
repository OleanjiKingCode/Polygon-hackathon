
const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.getContractFactory("GameToken")
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token  deployed to:", token.address);

  const Dex = await hre.ethers.getContractFactory("OleanjiGamesToken")
  const dex = await Dex.deploy();
  await dex.deployed();

  console.log("Dex  deployed to:", dex.address);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

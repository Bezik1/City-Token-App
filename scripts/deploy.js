// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function deploy() {
  const CityToken = await hre.ethers.getContractFactory("CityToken");
  const cityToken = await CityToken.deploy();

  await cityToken.deployed();

  console.log(
    `CityToken deployed to ${cityToken.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
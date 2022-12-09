// Deployment in hardhat
const { ethers, run, network } = require("hardhat");
const colors = require("colors");

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorageContract = await simpleStorageFactory.deploy();
  console.log("deploying Contract...");
  console.log(`Contract Address: ${simpleStorageContract.address}`.bgYellow);

  if (network.config.chainId === 5 && process.env.ETHERSCAN_APIKEY) {
    console.log(`Waiting 6 block....`);
    await simpleStorageContract.deployTransaction.wait(6);
    await verify(simpleStorageContract.address, []);
  }

  const currentValue = await simpleStorageContract.viewNumber();
  console.log(`Current Number: ${currentValue}`.bgBlue);
  const storeNumber = await simpleStorageContract.storeNumber(7);

  console.log(`Waiting Two Blocks...`);
  await storeNumber.wait(1);
  const updateNumber = await simpleStorageContract.viewNumber();
  console.log(`New Current Value: ${updateNumber}`.bgYellow);
}
// this function is to verify our contract on etherscan
async function verify(contractAddress, args) {
  try {
    // the name of the task we want to perform and task we want to perform
    await run("verify:verify", {
      address: contractAddress,
      constructorArgs: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Aleady Verified".bgGreen);
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

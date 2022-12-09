require("colors");
task("accounts", "prints list of accounts", async (taskArg, hre) => {
  const accounts = await hre.ethers.getSigners();

  accounts.map((account, index) => {
    console.log(`0${index + 1}.${account.address}`.bgGreen);
  });
});

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await ethers.getSigners();
  console.log(accounts[0]);

  for (const account of accounts) {
    // console.log(account);
    // console.log(account.address);
  }
});

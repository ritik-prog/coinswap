const fs = require("fs");

const main = async () => {
  const transactionFactory = await hre.ethers.getContractFactory(
    "Transactions"
  );
  const transactionContract = await transactionFactory.deploy();

  await transactionContract.deployed();

  console.log("Transactions deployed to: ", transactionContract.address);

}

main()
.then(async()=>{
      await main();
      process.exit(0);
}).catch((error)=>{
      console.log(error);
      process.exit(1);
})

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZombieAttack Contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("ZombieAttack");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatToken = await Token.deploy();
    // await hardhatToken.deployed(); // not sure if this is needed
    const transactionResponse1 = await hardhatToken
      .connect(owner)
      .createRandomZombie("Special Zombie1");
    await transactionResponse1.wait(1);
    const transactionResponse2 = await hardhatToken
      .connect(addr1)
      .createRandomZombie("Special Zombie2");
    await transactionResponse2.wait(1);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should level up zombie if win on attack", async function () {
      // const transactionResponse1 = await hardhatToken
      //   .connect(owner)
      //   .createRandomZombie("Special Zombie1");
      // await transactionResponse1.wait(1);
      // const transactionResponse2 = await hardhatToken
      //   .connect(addr1)
      //   .createRandomZombie("Special Zombie2");
      // await transactionResponse2.wait(1);
      myZombie = await hardhatToken.zombies(0);
      // myZombie.readyTime = new Date().getTime() + 100;
      enemyZombie = await hardhatToken.zombies(1);
      // myZombie.readyTime = new Date().getTime() + 100;
      await hardhatToken.connect(owner).attack(0, 1);
      newMyZombie = await hardhatToken.zombies(0);
      newEnemyZombie = await hardhatToken.zombies(1);
      expect(myZombie.dna).to.equal(newMyZombie.dna);
      expect(enemyZombie.dna).to.equal(newEnemyZombie.dna);
    });

    it("Should revert if zombie is not ready", async function () {
      // const transactionResponse1 = await hardhatToken
      //   .connect(owner)
      //   .createRandomZombie("Special Zombie1");
      // await transactionResponse1.wait(1);
      // const transactionResponse2 = await hardhatToken
      //   .connect(addr1)
      //   .createRandomZombie("Special Zombie2");
      // await transactionResponse2.wait(1);
      await expect(hardhatToken.connect(owner).attack(0, 1)).to.be.revertedWith(
        "zombie is having some peace time!"
      );
    });

    it("Should revert if not the owner of zombie", async function () {
      // const transactionResponse1 = await hardhatToken
      //   .connect(owner)
      //   .createRandomZombie("Special Zombie1");
      // await transactionResponse1.wait(1);
      // const transactionResponse2 = await hardhatToken
      //   .connect(addr1)
      //   .createRandomZombie("Special Zombie2");
      // await transactionResponse2.wait(1);
      await expect(hardhatToken.connect(addr1).attack(0, 1)).to.be.revertedWith(
        "not the owner of zombie"
      );
    });
  });
});

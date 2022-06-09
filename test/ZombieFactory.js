const { expect } = require("chai");

describe("ZombieFactory Contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("ZombieFactory");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatToken = await Token.deploy();

    await hardhatToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should create random Zombie", async function () {
      await hardhatToken.connect(owner).createRandomZombie("Special Zombie");
      const zombie = await hardhatToken.zombies(0);
      expect(zombie.name).to.equal("Special Zombie");
    });
  });
});

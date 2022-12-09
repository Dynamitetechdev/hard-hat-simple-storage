const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorageContract;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorageContract = await simpleStorageFactory.deploy();
  });
  it("should start with 0", async () => {
    // 1. current Value vs the expected value
    const currentValue = await simpleStorageContract.viewNumber();
    const expectedValue = "0";
    // we are using assert to macth our current value to our expected value
    // and also we are setting our current value to string because it will always return a bigNumber
    assert.equal(currentValue.toString(), expectedValue);
  });

  it.only("should result to newValue of 67", async () => {
    const expectedValue = "67";
    const storeNumber = await simpleStorageContract.storeNumber(67);
    await storeNumber.wait(1);
    const newValue = await simpleStorageContract.viewNumber();
    assert.equal(newValue.toString(), expectedValue);
  });

  it("should be an empty array of person", async () => {
    const currentArraylength = await simpleStorageContract.arrayOfPerson.length;
    const expectArrayLength = currentArraylength.length < 1;

    assert.equal(currentArraylength, expectArrayLength);
  });
});

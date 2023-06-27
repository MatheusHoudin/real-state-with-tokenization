import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("RealStateNFT", function () {
    async function deployRealStateNFT() {
        const [owner, user1, user2] = await ethers.getSigners();

        const RealStateNFT = await ethers.getContractFactory("RealStateNFT");
        const nftContract = await RealStateNFT.deploy();
        return {nftContract, owner, user1, user2};
    }

    describe("Deployment", async function() {
        it("Should verify the owner", async function () {
            const {nftContract, owner} = await loadFixture(deployRealStateNFT);

            expect(await nftContract.owner()).to.equal(owner.address);
        });

        it("Should verify the name", async function () {
            const {nftContract, owner} = await loadFixture(deployRealStateNFT);

            expect(await nftContract.name()).to.equal("RealStateNFT");
        });

        it("Should verify the symbol", async function () {
            const {nftContract, owner} = await loadFixture(deployRealStateNFT);

            expect(await nftContract.symbol()).to.equal("RST");
        });
    });

    describe("Minting", async function() {

        it("Should mint a new NFT", async function() {
            const {nftContract, owner} = await loadFixture(deployRealStateNFT);

            await nftContract.createNFT("www.google.com", 10, 2, "", "", {
                value: ethers.parseEther("0.5")
            });

            const rstCoinContractAddress = await nftContract.tokenCoin(0);

            const RealStateCoin = await ethers.getContractFactory("RealStateCoin");
            const rstCoinContract = await RealStateCoin.attach(rstCoinContractAddress);

            const balance = await nftContract.balanceOf(owner);
            const lockedAmount = await rstCoinContract.lockedAmount()
            
            expect(balance).to.equal(1);
            expect(lockedAmount).to.equal(2);
        });

        it("Should emit new created NFT event", async function() {
            const {nftContract, owner} = await loadFixture(deployRealStateNFT);

            await expect(await nftContract.createNFT("www.google.com", 0, 0, "", "", {
                value: ethers.parseEther("0.5")
            }))
            .to.emit(nftContract, "NewNFT")
            .withArgs(0, "www.google.com", anyValue, owner.address); // We accept any value as `when` arg
        });

        it("Should validate the token owner", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);

            await nftContract.connect(user1).createNFT("www.google.com", 0, 0, "", "", {
                value: ethers.parseEther("0.5")
            });

            const tokenOwner = await nftContract.ownerOf(0);    
            
            expect(tokenOwner).to.equal(user1.address);
        });

        it("Should show error when ETH value is less than minimum required", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);

            await expect(nftContract.connect(user1).createNFT("www.google.com", 0, 0, "", "", {
                value: ethers.parseEther("0.49")
            })).to.be.revertedWith("Value sent is not equals to the required ETH value (0.5 ETH).");
        });

        it("Should show error when ETH value is more than minimum required", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);

            await expect(nftContract.connect(user1).createNFT("www.google.com", 0, 0, "", "", {
                value: ethers.parseEther("0.501")
            })).to.be.revertedWith("Value sent is not equals to the required ETH value (0.5 ETH).");
        });

        it("Should show error when locked amount of tokens is bigger than initial supply", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);

            await expect(nftContract.connect(user1).createNFT("www.google.com", 0, 1, "", "", {
                value: ethers.parseEther("0.5")
            })).to.be.revertedWith("Locked amount of tokens is not allowed, it is bigger than the provided initial supply.");
        });

        it("Should validate the contract balance increases after a Mint", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);

            const previousContractBalance = await ethers.provider.getBalance(nftContract);

            ethers.provider.getBalance(nftContract);

            await nftContract.connect(user1).createNFT("www.google.com", 0, 0, "", "", {
                value: ethers.parseEther("0.5")
            });

            const contractBalanceAfterTransaction = await ethers.provider.getBalance(nftContract);  
            
            expect(previousContractBalance).to.be.equal(0);
            expect(contractBalanceAfterTransaction).to.be.equals(ethers.parseEther("0.5"));
        });
    });

    describe("Buying tokens", async function() {
        it("Should validate the user and owner balances are correct after buying tokens", async function() {
            const {nftContract, owner, user1, user2} = await loadFixture(deployRealStateNFT);
            
            await nftContract.connect(user1).createNFT("www.google.com", 150, 50, "", "", {
                value: ethers.parseEther("0.5")
            });

            const rstCoinContractAddress = await nftContract.tokenCoin(0);

            const RealStateCoin = await ethers.getContractFactory("RealStateCoin");
            const rstCoinContract = await RealStateCoin.attach(rstCoinContractAddress);

            let user1CoinBalance = await rstCoinContract.balanceOf(user1.address)

            expect(user1CoinBalance).to.equal(150);
            
            await nftContract.connect(user2).buyCoins(0, user2.address,  {
                value: ethers.parseEther("0.0021")
            });

            const user2CoinBalance = await rstCoinContract.balanceOf(user2.address)
            user1CoinBalance = await rstCoinContract.balanceOf(user1.address)

            expect(user1CoinBalance).to.equal(129);
            expect(user2CoinBalance).to.equal(21);
            expect(rstCoinContractAddress).to.not.equal("0x0000000000000000000000000000000000000000")

        });

        it("Should validate the holder percentage is correct after buying some coins", async function() {
            const {nftContract, owner, user1, user2} = await loadFixture(deployRealStateNFT);
            
            await nftContract.connect(user1).createNFT("www.google.com", 150, 50, "", "", {
                value: ethers.parseEther("0.5")
            });

            const rstCoinContractAddress = await nftContract.tokenCoin(0);

            const RealStateCoin = await ethers.getContractFactory("RealStateCoin");
            const rstCoinContract = await RealStateCoin.attach(rstCoinContractAddress);
            
            await nftContract.connect(user2).buyCoins(0, user2.address,  {
                value: ethers.parseEther("0.0021")
            });

            const holderPercentage = await rstCoinContract.getHolderPercentage(user2.address);
        
            expect(holderPercentage).to.equal(14)
        });

        it("Should revert buyCoin operation when value sent is not allowed", async function() {
            const {nftContract, owner, user1, user2} = await loadFixture(deployRealStateNFT);
            
            await nftContract.connect(user1).createNFT("www.google.com", 150, 50, "", "", {
                value: ethers.parseEther("0.5")
            });

            const rstCoinContractAddress = await nftContract.tokenCoin(0);

            const RealStateCoin = await ethers.getContractFactory("RealStateCoin");
            const rstCoinContract = await RealStateCoin.attach(rstCoinContractAddress);
            
            await expect(nftContract.connect(user2).buyCoins(0, user2.address,  {
                value: ethers.parseEther("0.00211")
            })).to.be.revertedWith("Value of this coin is exactly 0.0001 ETH, it is not possible to buy less than 1 unit!");
        });
    });

    describe("Rent", async function() {
        it("Should validate rentee is alocated in the property", async function() {
            const {nftContract, owner, user1, user2} = await loadFixture(deployRealStateNFT);
            
            await nftContract.connect(user1).createNFT("www.google.com", 150, 50, "", "", {
                value: ethers.parseEther("0.5")
            });

            await nftContract.connect(user1).setPropertyClient(user2.address, 0, ethers.parseUnits("0.5", "ether"));


            expect((await nftContract.propertyClient(0)).client).to.equal(user2.address);
            expect((await nftContract.propertyClient(0)).rentValue).to.equal(ethers.parseUnits("0.5", "ether"));
        });

        it("Should revert when trying to setup a client on a property that the caller does not own", async function() {
            const {nftContract, owner, user1, user2} = await loadFixture(deployRealStateNFT);
            
            await nftContract.connect(user1).createNFT("www.google.com", 150, 50, "", "", {
                value: ethers.parseEther("0.5")
            });

            await expect(nftContract.connect(owner).setPropertyClient(user2.address, 0, ethers.parseUnits("0.5", "ether")))
                .to.be.revertedWith("You are not the property owner, thus cannot do this action!");

        });

        it("Should validate rent payment is successful", async function() {
            const {nftContract, owner, user1, user2} = await loadFixture(deployRealStateNFT);
            
            await nftContract.connect(user1).createNFT("www.google.com", 150, 50, "", "", {
                value: ethers.parseEther("0.5")
            });

            const rstCoinContractAddress = await nftContract.tokenCoin(0);

            const RealStateCoin = await ethers.getContractFactory("RealStateCoin");
            const rstCoinContract = await RealStateCoin.attach(rstCoinContractAddress);
            const rstCoinAddress = await rstCoinContract.getAddress()

            let rstBalance = await ethers.provider.getBalance(rstCoinAddress)

            console.log("RSTCoin balance before: "+ rstBalance)

            await nftContract.connect(user2).payRent(0);

            rstBalance = await ethers.provider.getBalance(rstCoinAddress)

            console.log("RSTCoin balance before: "+ rstBalance)
        });
    });
});
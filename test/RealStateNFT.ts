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

            await nftContract.createNFT("www.google.com", 0, "", "", {
                value: ethers.parseEther("0.5")
            });

            const balance = await nftContract.balanceOf(owner);
            
            expect(balance).to.equal(1);
        });

        it("Should emit new created NFT event", async function() {
            const {nftContract, owner} = await loadFixture(deployRealStateNFT);

            await expect(await nftContract.createNFT("www.google.com", 0, "", "", {
                value: ethers.parseEther("0.5")
            }))
            .to.emit(nftContract, "NewNFT")
            .withArgs(0, "www.google.com", anyValue, owner.address); // We accept any value as `when` arg
        });

        it("Should validate the token owner", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);

            await nftContract.connect(user1).createNFT("www.google.com", 0, "", "", {
                value: ethers.parseEther("0.5")
            });

            const tokenOwner = await nftContract.ownerOf(0);    
            
            expect(tokenOwner).to.equal(user1.address);
        });

        it("Should show error when ETH value is less than minimum required", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);

            await expect(nftContract.connect(user1).createNFT("www.google.com", 0, "", "", {
                value: ethers.parseEther("0.49")
            })).to.be.revertedWith("Value sent is not equals to the required ETH value.");
        });

        it("Should show error when ETH value is more than minimum required", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);

            await expect(nftContract.connect(user1).createNFT("www.google.com", 0, "", "", {
                value: ethers.parseEther("0.501")
            })).to.be.revertedWith("Value sent is not equals to the required ETH value.");
        });

        it("Should validate the contract balance increases after a Mint", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);

            const previousContractBalance = await ethers.provider.getBalance(nftContract);

            ethers.provider.getBalance(nftContract);

            await nftContract.connect(user1).createNFT("www.google.com", 0, "", "", {
                value: ethers.parseEther("0.5")
            });

            const contractBalanceAfterTransaction = await ethers.provider.getBalance(nftContract);  
            
            expect(previousContractBalance).to.be.equal(0);
            expect(contractBalanceAfterTransaction).to.be.equals(ethers.parseEther("0.5"));
        });

        it("Should validate the contract balance increases after a Mint", async function() {
            const {nftContract, owner, user1} = await loadFixture(deployRealStateNFT);
            
            await nftContract.connect(user1).createNFT("www.google.com", 0, "", "", {
                value: ethers.parseEther("0.5")
            });

            const nftTokenAddress = await nftContract.nftTokens(0);

            expect(nftTokenAddress).to.not.equal("0x0000000000000000000000000000000000000000")

        });
    });

});
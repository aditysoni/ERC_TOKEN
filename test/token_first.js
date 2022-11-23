const {expect } = require ("chai");

const { ethers } = require("hardhat");

const {isCallTrace} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");


describe ("token deployment " , function(){
    let Token ; 
    let hardhatToken ;
    let addr1 ; 
    let owner ;
    let addr2 ;
    let addrs ;
    
    beforeEach(async function ()
    { 
        Token = await ethers.getContractFactory("Token");            // creates an instance of the contract Token 
        [owner,addr1,addr2, ...addrs] = await ethers.getSigners();     // assigns the adddress in a order
        hardhatToken = await Token.deploy();                         // delpoys the instance on the hardhat token  , we can call any fucntion of Token contract by using----- hardhatToken.funciton_name()

    });

    describe("Deployment " , function (){
        it("should set the right owner " , async function (){
            expect(await hardhatToken.owner()).to.equal(owner.address);          
        });
        it ("should assign the total supply of token to the owner " ,async function (){
            const ownerBalance = await hardhatToken.balanceOf(owner.address) ;
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
            
        });

    });

     describe("transactions " , function (){
        it("should transfer tokens between accounts " , async function (){
            
            await hardhatToken.transfer(addr1.address , 5 ) ;
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5) ;

            await hardhatToken.connect(addr1).transfer(addr2.address,5 );        
            const addr2Balance = await hardhatToken.balanceOf(addr2.address) ;
            expect(addr2Balance).to.equal(5);



        });

        it ("should update balances after transfers " , async function (){
           
           
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address , 1);
            await hardhatToken.transfer(addr2.address , 10);
            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - 11);

            const addr1Balance = await hardhatToken.balanceOf(addr1.balance);
            expect(addr1Balance).to.equal(5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address) ;
            expect(addr2Balance).to.equal(10);

        });

         it("should fail if sender doers not have enough tokens " , async function ()
         {
            
             const intialOwnerBalance = await hardhatToken.balanceOf(owner.address);
             await  expect (hardhatToken.connect(addr1).transfer(owner.address, 1 )).to.be.revertedWith("not enough tokens "); 
             expect(await hardhatToken.balanceOf(owner.address)).to.equal(intialOwnerBalance);
            
        });
        

 
     });

});
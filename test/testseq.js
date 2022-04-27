var assert = require('chai').assert;

var TokensArtifact = artifacts.require('MyNFT');

contract('MyNFT', function(accounts) {

  let myTokens;

  //1) Selection of the Test Blockchain of interest (use ETH or another Blockchain) and 2) Selection of the type of Token and 3) Selection of the token name, symbol and decimals 
  //Assuming myTokens(MyNFT) blockchain running on ERC20 (ethereum) has been selected in this case.
  before(async () => {  
    myTokens = await TokensArtifact.deployed();
  });

  it('Sequence', async () => { 

   // Selection of the Wallet used to pay for the Smart Contract on Blockchain. Usually address is passed in from front end.
    let client = accounts[1]; //also the payment wallet

    //1) Selection of token minting (possible or not once the Contract is deployed). Assume that there is a limit set to check if mintable or not.
    //2) Selection of the token quantity -> mint the quantity selected
   await myTokens.myMinting(client,100, {from: client}
    ).catch((rsl) => {     
    assert.fail("method 'mint' failed for myTokens "+rsl);
  });

  //Selection of Airdrop: Wallet(s) to deliver the token (recipient wallet) -> deliver the token to the recipient's wallet
  let myRecipient = accounts[2];
  let transferAmount = 10;
  recipient_tk_initial = await myTokens.balanceOf(myRecipient);

  await myTokens.transfer(myRecipient, transferAmount, {from: client})
  //assert.equal(balanceOf(myRecipient), transferAmount, "Receipient didnt receive");
  recipient_tk_after = await myTokens.balanceOf(myRecipient);
  changeAmt =   recipient_tk_after.words[0] - recipient_tk_initial.words[0]
  console.log("Change amt is: ", changeAmt);
  assert.equal(changeAmt, transferAmount, "Transfer amount is wrong");
})
});

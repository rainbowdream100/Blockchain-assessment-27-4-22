// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyNFT is ERC20 {

    address _owner = msg.sender;
    uint256 myLimit = 1000000;

    //By default, ERC20 uses a value of 18 for decimals
    constructor() ERC20("Gold", "GLD") {
    }

    function checkMintable(uint256 amountToBeMinted) public view returns (bool){
        bool mintable;
        if (totalSupply() > (myLimit + amountToBeMinted)){
            mintable = false;
        } else{
             mintable = true;
        }
        return mintable;
    }

     function myMinting(address destination, uint256 amount) public returns (bool){
        require(checkMintable(amount));
        _mint(destination,100);
        return true;
    }

}
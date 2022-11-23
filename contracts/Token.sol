//SPDX -License - identifier : UNLICENESED 
pragma solidity >=0.5.0 <0.9.0 ; 


import "hardhat/console.sol";         //  for debugging use , wr can console log details


contract Token
{
    string public name = "NUKEEELAR" ;               // token name 
    string public symbol = "NUKE";
    uint256 public totalSupply = 10000;             // total supply of the token is 10000 
    address public owner ;
    
    mapping (address => uint256) balances ;
    
    constructor ()
    {                                               // total supply is assigned to the owner 
      balances[msg.sender] = totalSupply ; 
      owner = msg.sender ;
    
    }
   

    //  transfer function , to transfer token form one account to other 

     
    function transfer (address to , uint amount) external 
    {
        console.log("-------sender have balance " , balances[msg.sender]);
        require (balances[msg.sender] >= amount , " not enough tokens ");
        balances[msg.sender]-=amount ;                                       //balances[msg.sender] = balacnes [msg.semde] - amount ;
        balances[to]+=amount; 
        
        // for debugging use 


        console.log("----sender balance is " ,balances[msg.sender] );        
        console.log("-----Sender is sending %s tokens to %s address", amount , to);
    }

     
    //  retruns total balance of the the accoung passed as the argumne to the function

    function balanceOf(address account ) external view returns (uint)
   
    {
        return balances[account];
    }
     
}
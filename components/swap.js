import { Contract } from "ethers";
import {
  DEX_abi,
  DEXAddress,
  GAMETOKENAddress,
  GAMETOKEN_abi
} from "../constant";
/*
    getAmountOfTokensReceivedFromSwap:  Returns the number of Eth/Crypto Dev tokens that can be recieved 
    when the user swaps `_swapAmountWEI` amount of Eth/Crypto Dev tokens.
*/
export const getAmountOfTokensReceivedFromSwap = async (
  _swapAmountWei,
  provider,
  ethSelected,
  ethBalance,
  reservedCD
) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(
    DEXAddress,
    DEX_abi,
    provider
  );
  let amountOfTokens;
  // If ETH is selected this means our input value is `Eth` which means our input amount would be
  // `_swapAmountWei`, the input reserve would be the `ethBalance` of the contract and output reserve
  // would be the  `Crypto Dev token` reserve
  if (ethSelected) {
    amountOfTokens = await exchangeContract.getAmountOfTokens(
      _swapAmountWei,
      ethBalance,
      reservedCD
    );
  } else {
    // If ETH is not selected this means our input value is `Crypto Dev` tokens which means our input amount would be
    // `_swapAmountWei`, the input reserve would be the `Crypto Dev token` reserve of the contract and output reserve
    // would be the `ethBalance`
    amountOfTokens = await exchangeContract.getAmountOfTokens(
      _swapAmountWei,
      reservedCD,
      ethBalance
    );
  }

  return amountOfTokens;
};

/*
  swapTokens: Swaps  `swapAmountWei` of Eth/Crypto Dev tokens with `tokenToBeRecievedAfterSwap` amount of Eth/Crypto Dev tokens.
*/
export const swapTokens = async (
  signer,
  swapAmountWei,
  tokenToBeRecievedAfterSwap,
  ethSelected
) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(
    DEXAddress,
    DEX_abi,
    signer
  );
  const tokenContract = new Contract(
    GAMETOKENAddress,
    GAMETOKEN_abi,
    signer
  );
  let tx;
  // If Eth is selected call the `ethToCryptoDevToken` function else
  // call the `cryptoDevTokenToEth` function from the contract
  // As you can see you need to pass the `swapAmount` as a value to the function because
  // It is the ether we are paying to the contract, instead of a value we are passing to the function
  if (ethSelected) {
    tx = await exchangeContract.SwapMaticToOgt(
      tokenToBeRecievedAfterSwap,
      {
        value: swapAmountWei,
      }
    );
  } else {
    // User has to approve `swapAmountWei` for the contract because `Crypto Dev Token`
    // is an ERC20
    tx = await tokenContract.approve(
      DEXAddress,
      swapAmountWei.toString()
    );
    await tx.wait();
    // call cryptoDebTokenToEth function which would take in `swapAmounWei` of crypto dev tokens and would send back `tokenToBeRecievedAfterSwap` amount of ether to the user
    tx = await exchangeContract.SwapOgtToMatic(
      swapAmountWei,
      tokenToBeRecievedAfterSwap
    );
  }
  await tx.wait();
};
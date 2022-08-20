import { Contract, providers, utils, BigNumber } from "ethers";

import {
  DEXAddress,
  DEX_abi,
  GAMETOKENAddress
} from "../constant";
/**
 * removeLiquidity: Removes the `removeLPTokensWei` amount of LP tokens from
 * liquidity and also the calculated amount of `ether` and `CD` tokens
 */
export const removeLiquidity = async (signer, removeLPTokensWei) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(
    DEXAddress,
    DEX_abi,
    signer
  );
  const tx = await exchangeContract.WithdrawLiquidity(removeLPTokensWei);
  await tx.wait();
};

/**
 * getTokensAfterRemove: Calculates the amount of `Ether` and `CD` tokens
 * that would be returned back to user after he removes `removeLPTokenWei` amount
 * of LP tokens from the contract
 */
export const getTokensAfterRemove = async (
  provider,
  removeLPTokenWei,
  _ethBalance,
  cryptoDevTokenReserve
) => {
  try {
    // Create a new instance of the exchange contract
    const exchangeContract = new Contract(
      DEXAddress,
      DEX_abi,
      provider
    );
    // Get the total supply of `Crypto Dev` LP tokens
    const _totalSupply = await exchangeContract.totalSupply();
    const _removeEther = _ethBalance
      .mul(removeLPTokenWei)
      .div(_totalSupply);
    const _removeCD = cryptoDevTokenReserve
      .mul(removeLPTokenWei)
      .div(_totalSupply);
    return {
      _removeEther,
      _removeCD,
    };
  } catch (err) {
    console.error(err);
  }
};
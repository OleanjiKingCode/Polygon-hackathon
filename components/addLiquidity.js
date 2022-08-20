import { Contract, utils } from "ethers";
import {
  DEXAddress,
  GAMETOKENAddress,
  GAMETOKEN_abi,
  DEX_abi
} from "../constant";
export const addLiquidity = async (
  signer,
  addCDAmountWei,
  addEtherAmountWei
) => {
  try {
    console.log("sdjkhdsc")
    const tokenContract = new Contract(
      GAMETOKENAddress,
      GAMETOKEN_abi,
      signer
    );
    const exchangeContract = new Contract(
      DEXAddress,
      DEX_abi,
      signer
    );
    let tx = await tokenContract.approve(
      DEXAddress,
      addCDAmountWei.toString()
    );
    console.log("sdjkhdsc")
    await tx.wait();
    console.log("sdjkkljfgsgidgjojegjhdsc")
    tx = await exchangeContract.AddLiquidity(addCDAmountWei, {
      value: addEtherAmountWei,
    });
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

/**
 * calculateCD calculates the CD tokens that need to be added to the liquidity
 * given `_addEtherAmountWei` amount of ether
 */
export const calculateCD = async (
  _addEther = "0",
  etherBalanceContract,
  cdTokenReserve
) => {
  // `_addEther` is a string, we need to convert it to a Bignumber before we can do our calculations
  // We do that using the `parseEther` function from `ethers.js`
  const _addEtherAmountWei = utils.parseEther(_addEther);
  // Ratio needs to be maintained when we add liquiidty.
  // We need to let the user know who a specific amount of ether how many `CD` tokens
  // he can add so that the price impact is not large
  // The ratio we follow is (Amount of Crypto Dev tokens to be added)/(Crypto Dev tokens balance) = (Ether that would be added)/ (Eth reseve in the contract)
  // So by maths we get (Amount of Crypto Dev tokens to be added) = (Ether that would be added*rypto Dev tokens balance)/ (Eth reseve in the contract)
  const cryptoDevTokenAmount = _addEtherAmountWei
    .mul(cdTokenReserve)
    .div(etherBalanceContract);
  return cryptoDevTokenAmount;
};
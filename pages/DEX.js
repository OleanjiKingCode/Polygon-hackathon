import {useState, useEffect} from 'react'
import Image from 'next/image'
import ethLogo from '../public/eth.png'
import styles from "../styles/DEX.module.css"
import { TbArrowsRandom, TbSettings } from 'react-icons/tb'
import {motion} from "framer-motion"
import {FcExpand} from 'react-icons/fc'
import { BigNumber, providers, utils } from "ethers";
// import Footer from '../components/Footer'
import { addLiquidity, calculateCD } from "../components/addLiquidity";
import {
  getCDTokensBalance,
  getEtherBalance,
  getLPTokensBalance,
  getReserveOfCDTokens,
} from "../components/getAmounts";
import {
  getTokensAfterRemove,
  removeLiquidity,
} from "../components/removeLiquidity";
import { swapTokens, getAmountOfTokensReceivedFromSwap } from "../components/swap";
import { useProvider , useSigner, useConnect, useAccount  } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function DEX() {

    const { connector: activeConnector, isConnected, address} = useAccount()
  
    const [liquidityTab, setLiquidityTab] = useState(true);
    const [loading, setLoading] = useState(false);
   
    const zero = BigNumber.from(0);
  
    const [ethBalance, setEtherBalance] = useState(zero);
    
    const [reservedCD, setReservedCD] = useState(zero);
   
    const [etherBalanceContract, setEtherBalanceContract] = useState(zero);
    
    const [cdBalance, setCDBalance] = useState(zero);
   
    const [lpBalance, setLPBalance] = useState(zero);

    const [addEther, setAddEther] = useState(zero);

    const [addCDTokens, setAddCDTokens] = useState(zero);
   
    const [removeEther, setRemoveEther] = useState(zero);
   
    const [removeCD, setRemoveCD] = useState(zero);

    const [removeLPTokens, setRemoveLPTokens] = useState("0");

    const [swapAmount, setSwapAmount] = useState("");

    const [tokenToBeRecievedAfterSwap, setTokenToBeRecievedAfterSwap] = useState(zero);
   
    const [ethSelected, setEthSelected] = useState(true);

    const { data: signer, isError, isLoading } = useSigner()

    const provider = useProvider()

    


    const getAmounts = async () => {
        try {
          const _ethBalance = await getEtherBalance(provider, address);
         
          const _cdBalance = await getCDTokensBalance(provider, address);
        
          const _lpBalance = await getLPTokensBalance(provider, address);
          
          const _reservedCD = await getReserveOfCDTokens(provider);
         
          const _ethBalanceContract = await getEtherBalance(provider, null, true);
          setEtherBalance(_ethBalance);
          setCDBalance(_cdBalance);
          setLPBalance(_lpBalance);
          setReservedCD(_reservedCD);
          setReservedCD(_reservedCD);
          setEtherBalanceContract(_ethBalanceContract);
        } catch (err) {
          console.error(err);
        }
    };



    const _swapTokens = async () => {
        try {
          // Convert the amount entered by the user to a BigNumber using the `parseEther` library from `ethers.js`
          const swapAmountWei = utils.parseEther(swapAmount);
          // Check if the user entered zero
          // We are here using the `eq` method from BigNumber class in `ethers.js`
          if (!swapAmountWei.eq(zero)) {

            setLoading(true);
            // Call the swapTokens function from the `utils` folder
            await swapTokens(
              signer,
              swapAmountWei,
              tokenToBeRecievedAfterSwap,
              ethSelected
            );
            setLoading(false);
            // Get all the updated amounts after the swap
            await getAmounts();
            setSwapAmount("");
          }
        } catch (err) {
          console.error(err);
          setLoading(false);
          setSwapAmount("");
        }
      };



      const _getAmountOfTokensReceivedFromSwap = async (_swapAmount) => {
        try {
          // Convert the amount entered by the user to a BigNumber using the `parseEther` library from `ethers.js`
          const _swapAmountWEI = utils.parseEther(_swapAmount.toString());
          // Check if the user entered zero
          // We are here using the `eq` method from BigNumber class in `ethers.js`
          if (!_swapAmountWEI.eq(zero)) {
           
            // Get the amount of ether in the contract
            const _ethBalance = await getEtherBalance(provider, null, true);
            // Call the `getAmountOfTokensReceivedFromSwap` from the utils folder
            const amountOfTokens = await getAmountOfTokensReceivedFromSwap(
              _swapAmountWEI,
              provider,
              ethSelected,
              _ethBalance,
              reservedCD
            );
            setTokenToBeRecievedAfterSwap(amountOfTokens);
          } else {
            setTokenToBeRecievedAfterSwap(zero);
          }
        } catch (err) {
          console.error(err);
        }
      };



      const _addLiquidity = async () => {
        try {
            console.log(addCDTokens)
          const addEtherWei = utils.parseEther(addEther.toString());
          // Check if the values are zero
          if (!addCDTokens.eq(zero) && !addEtherWei.eq(zero)) {
           
            setLoading(true);
            await addLiquidity(signer, addCDTokens, addEtherWei);
            setLoading(false);
            // Reinitialize the CD tokens
            setAddCDTokens(zero);
            // Get amounts for all values after the liquidity has been added
            await getAmounts();
          } else {
            setAddCDTokens(zero);
          }
        } catch (err) {
          console.error(err);
          setLoading(false);
          setAddCDTokens(zero);
        }
      };


      const _removeLiquidity = async () => {
        try {
        
          // Convert the LP tokens entered by the user to a BigNumber
          const removeLPTokensWei = utils.parseEther(removeLPTokens);
          setLoading(true);
          // Call the removeLiquidity function from the `utils` folder
          await removeLiquidity(signer, removeLPTokensWei);
          setLoading(false);
          await getAmounts();
          setRemoveCD(zero);
          setRemoveEther(zero);
        } catch (err) {
          console.error(err);
          setLoading(false);
          setRemoveCD(zero);
          setRemoveEther(zero);
        }
      };

      const _getTokensAfterRemove = async (_removeLPTokens) => {
        try {
        
          // Convert the LP tokens entered by the user to a BigNumber
          const removeLPTokenWei = utils.parseEther(_removeLPTokens);
          // Get the Eth reserves within the exchange contract
          const _ethBalance = await getEtherBalance(provider, null, true);
          // get the crypto dev token reserves from the contract
          const cryptoDevTokenReserve = await getReserveOfCDTokens(provider);
          // call the getTokensAfterRemove from the utils folder
          const { _removeEther, _removeCD } = await getTokensAfterRemove(
            provider,
            removeLPTokenWei,
            _ethBalance,
            cryptoDevTokenReserve
          );
          setRemoveEther(_removeEther);
          setRemoveCD(_removeCD);
        } catch (err) {
          console.error(err);
        }
      };




      useEffect(() => {
          getAmounts();
      }, [isConnected]);
    
    
    

    const renderPage = () => {
        if (!isConnected) {
            return (
              <ConnectButton/>
            );
        }
        if(liquidityTab){
            return (    
        <motion.div initial={{y:"100vh"}} animate={{y:0}} transition={{type:"spring", duration:1.5, bounce:0.3,}} className={styles.dex_content}>
                
            <div className={styles.mainSwap}>
                <div className={styles.firstInput}>
                    <motion.input whileFocus={{scale:1.5}} type="number" placeholder="0.0"
                        onChange={async (e) => {
                            setSwapAmount(e.target.value || "");
                            await _getAmountOfTokensReceivedFromSwap(e.target.value || "0");
                        }}      
                         />
                </div>
            </div>

            <div className={styles.firstInput}>
                <motion.select
                    name="dropdown"
                    id="dropdown"
                    onChange={async () => {
                        setEthSelected(!ethSelected);
                        await _getAmountOfTokensReceivedFromSwap(0);
                        setSwapAmount("");
                    }}
                >
                    <option value="eth">
                        <div className={styles.tokenSelector}>
                                <div className={styles.tokenSelectorContent}>
                                    <div className={styles.tokenSelectorImage}>
                                    
                                    </div>
                                    <div> Matic </div>
                                </div>
                        </div>
                    </option>
                    <option value="cryptoDevToken">
                        <div className={styles.tokenSelector}>
                                <div className={styles.tokenSelectorContent}>
                                    <div className={styles.tokenSelectorImage}>
                                        <div>Ξ Game TOKEN</div>
                                    </div>
                                </div>
                        </div>
                    </option>
            </motion.select>
          </div>

          <br />
          <br />
          <br />

            <div className={styles.mainSwap}>
            <div className={styles.inputDiv}>
            {ethSelected
              ? `You will get ${utils.formatEther(
                  tokenToBeRecievedAfterSwap
                )} GAME TOKENS Tokens`
              : `You will get ${utils.formatEther(
                  tokenToBeRecievedAfterSwap
                )} Matic`}
          </div>
                <div className={styles.swapBtn}>
                    <motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1, boxShadow:'0px 1px 5px #fff8e7',}} onClick={_swapTokens}>SWAP</motion.button>
                </div>
            </div>
        </motion.div>
        )} else{
            return (
                <div  className={styles.liquidityPage}>
                    <div className={styles.liquidity}>
                        <div className={styles.dexTitle}>
                            <motion.h4 whileHover={{scale:1.3, originX: 0,color:"#0B6623"}}>GAME TOKENS : {utils.formatEther(cdBalance)}</motion.h4>
                            <motion.h4 whileHover={{scale:1.3, originX: 0,color:"#0B6623"}}>POLYGON TOKENS :  {utils.formatEther(ethBalance)}</motion.h4>
                            <motion.h4 whileHover={{scale:1.3, originX: 0,color:"#0B6623"}}>OGT LP TOKENS : {utils.formatEther(lpBalance)}</motion.h4>
                        </div>
                    <div className={styles.formHeader}> <h4> ADD LIQUIDITY </h4></div>
                        <div className={styles.liquidMain}>
                        {utils.parseEther(reservedCD.toString()).eq(zero) ? (
                            <>
                            <h3>AMOUNT OF POLYGON</h3>
                            <motion.input whileFocus={{scale:1.5}} type="number"  placeholder="Amount of Matic"   onChange={(e) => setAddEther(e.target.value || "0")} ></motion.input>
                            <h3>AMOUNT OF GAME TOKENS</h3>
                            <motion.input whileFocus={{scale:1.5}} 
                                type="number"  
                                placeholder="Amount of Game tokens" 
                                onChange={(e) =>
                                    setAddCDTokens(
                                        BigNumber.from((utils.parseEther(e.target.value || "0")))
                                    )
                                    // {console.log(e.target.value)}
                                } ></motion.input>
                            <motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1, boxShadow:'0px 1px 5px #fff8e7',}} className={styles.liquidBtn} onClick={_addLiquidity}>ADD</motion.button>
                            </>
                        ) : (
                            <>
                            <h3>AMOUNT OF POLYGON</h3>
                            <motion.input whileFocus={{scale:1.5}} 
                                type="number"  
                                placeholder="Amount of Matic"  
                                onChange={async (e) => {
                                    setAddEther(e.target.value || "0");
                                    
                                    const _addCDTokens = await calculateCD(
                                      e.target.value || "0",
                                      etherBalanceContract,
                                      reservedCD
                                    );
                                    setAddCDTokens(_addCDTokens);
                                  }} ></motion.input>
                            <h3>AMOUNT OF GAME TOKENS</h3> {`You will need ${utils.formatEther(addCDTokens)} Game Tokens`}
                            <motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1, boxShadow:'0px 1px 5px #fff8e7',}} className={styles.liquidBtn} onClick={_addLiquidity}>ADD</motion.button>
                            </>
                        ) }
                        </div>
                    </div>
                    <div className={styles.remove}>
                        <div className={styles.dexTitle}>
                            <h3>REMOVE LIQUIDITY</h3>
                        </div>
                        <div className={styles.removeMain}>
                            <h3>IN EXCHANGE YOU WILL GET: </h3>
                            <h3>{utils.formatEther(removeEther)} POLYGON </h3>
                            <h3>{utils.formatEther(removeCD)} GAME TOKENS</h3>
                            <motion.input whileFocus={{scale:1.5}} 
                                type="number" placeholder='0.0' 
                                pattern="^[0-9]*[.,]?[0-9]*$"  
                                onChange={async (e) => {
                                setRemoveLPTokens(e.target.value || "0");
                                await _getTokensAfterRemove(e.target.value || "0");
                                }}
                            ></motion.input>
                            <motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1, boxShadow:'0px 1px 5px #fff8e7',}} className={styles.removeBtn} onClick={_removeLiquidity}> REMOVE </motion.button>
                        </div>
                    </div>
                </div>
            )
        }
    }


  return (
    <>
    <div className={styles.dex}>
        <div className={styles.dexOptions}>
            <div className={styles.dexOption}>
                <motion.button whileTap={{ scale:0.5 }} onClick={() => {setLiquidityTab(true)}}>SWAP</motion.button>
                <motion.button whileTap={{ scale:0.5 }} onClick= {() => {setLiquidityTab(false)}}>LIQUIDITY</motion.button>
            </div>
        </div>
        {renderPage()}
    </div>
    </>

  )
}

export default DEX
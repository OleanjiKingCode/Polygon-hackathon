import {useState} from 'react'
import Image from 'next/image'
import ethLogo from '../public/eth.png'
import styles from "../styles/DEX.module.css"
import { TbArrowsRandom, TbSettings } from 'react-icons/tb'
import {motion} from "framer-motion"
import {FcExpand} from 'react-icons/fc'
// import Footer from '../components/Footer'

function DEX() {

    const [liquidityTab, setLiquidityTab] = useState(true);

    const renderPage = () => {
        if(liquidityTab){
            return (    
        <motion.div initial={{y:"100vh"}} animate={{y:0}} transition={{type:"spring", duration:1.5, bounce:0.3,}} className={styles.dex_content}>
            {/* <div className={styles.dexTitle}>
                <h2>HELLO SHITHEADS</h2>
                <p>SWAP YOUR TOKENS HERE</p>
            </div> */}
            {/* <div className={styles.formHeader}>
                <h3>SWAP</h3>
                <div> <TbSettings size={25} className={styles.settings}/> </div>

            </div> */}
                <div className={styles.tokenSelector}>
                    <div className={styles.tokenSelectorContent}>
                        <div className={styles.tokenSelectorImage}>
                            <Image src={ethLogo} height={20} width={20}/>
                        </div>
                        <div> ETH <FcExpand/></div>
                    </div>
                </div>
            <div className={styles.mainSwap}>
                <div className={styles.firstInput}>
                    <motion.input whileFocus={{scale:1.5}} type="number" placeholder="0.0" pattern="^[0-9]*[.,]?[0-9]*$" />
                </div>
                <div>
                    <TbArrowsRandom size={35} className={styles.swapIcon}/>
                </div>
            </div>

            <div className={styles.tokenSelector}>
                    <div className={styles.tokenSelectorContent}>
                        <div className={styles.tokenSelectorImage}>
                            <div>Ξ EXC <FcExpand/></div>
                        </div>
                    </div>
            </div>
            <div className={styles.mainSwap}>
                <div className={styles.secondInput}>
                    <motion.input whileFocus={{scale:1.5}} type="number" placeholder="0.0" pattern="^[0-9]*[.,]?[0-9]*$"/>
                </div>
                <div className={styles.swapBtn}>
                    <motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1, boxShadow:'0px 1px 5px #fff8e7',}}>SWAP</motion.button>
                </div>
            </div>
        </motion.div>
        )} else{
            return (
                <div  className={styles.liquidityPage}>
                    <div className={styles.liquidity}>
                        <div className={styles.dexTitle}>
                            <motion.h4 whileHover={{scale:1.3, originX: 0,color:"#0B6623"}}>EXC TOKENS : 0.0</motion.h4>
                            <motion.h4 whileHover={{scale:1.3, originX: 0,color:"#0B6623"}}>POLYGON TOKENS : 0.0</motion.h4>
                            <motion.h4 whileHover={{scale:1.3, originX: 0,color:"#0B6623"}}>EXC LP TOKENS : 0.0</motion.h4>
                        </div>
                    <div className={styles.formHeader}> <h4> ADD LIQUIDITY </h4></div>
                        <div className={styles.liquidMain}>
                            <h3>AMOUNT OF POLYGON</h3>
                            <motion.input whileFocus={{scale:1.5}} type="number" placeholder="0.0" pattern="^[0-9]*[.,]?[0-9]*$"></motion.input>
                            <h3>AMOUNT OF EXC TOKENS</h3>
                            <motion.input whileFocus={{scale:1.5}} type="number" placeholder="0.0" pattern="^[0-9]*[.,]?[0-9]*$"></motion.input>
                            <motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1, boxShadow:'0px 1px 5px #fff8e7',}} className={styles.liquidBtn}>ADD</motion.button>
                        </div>
                    </div>
                    <div className={styles.remove}>
                        <div className={styles.dexTitle}>
                            <h3>REMOVE LIQUIDITY</h3>
                        </div>
                        <div className={styles.removeMain}>
                            <h3>IN EXCHANGE YOU WILL GET: </h3>
                            <h3>0.0 POLYGON </h3>
                            <h3>0.0 EXC TOKENS</h3>
                            <motion.input whileFocus={{scale:1.5}} type="number" placeholder='0.0' pattern="^[0-9]*[.,]?[0-9]*$"></motion.input>
                            <motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1, boxShadow:'0px 1px 5px #fff8e7',}} className={styles.removeBtn}> REMOVE </motion.button>
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
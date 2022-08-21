import {useState, useEffect} from 'react'
import styles from '../styles/Spin.module.css'
import { motion } from 'framer-motion';
import swal from 'sweetalert';
import { Contract, utils, ethers } from "ethers";
import {
  SpinAddress,
  GAMETOKENAddress,
  GAMETOKEN_abi,
  Spin_abi
} from "../constant";
import { useProvider , useSigner, useConnect, useAccount  } from 'wagmi'



function Spin() {

    const [start, setStart] = useState(styles.circle);
    const { data: signer, isError, isLoading } = useSigner()
    const { connector: activeConnector, isConnected, address} = useAccount()
    const provider = useProvider()
   
    const[rand,setRand]= useState(0)

/////////////For When Player joins////////////////////////

    // const NewPlayer= async (_name) => {
    //     try {
    //         const tokenContract = new Contract(
    //             GAMETOKENAddress,
    //             GAMETOKEN_abi,
    //             signer
    //         );
    //         let today = new Date().toISOString().slice(0, 10);
    //         const PlayerAdded = await tokenContract.NewPlayer(today, _name);
    //         await PlayerAdded.wait()
    //         window.alert(`You are now a player and you have received ogt Tokens with this Contract Address ${ GAMETOKENAddress}`)
    //     } catch (error) {
    //         console.log(error)
    //     }
      
        
    // }

/////////////For When Player loses////////////////////////

    // const EndGame= async (_id,score) => {
    //     try {
    //         //////////////////_id is the id of the playr that just lost the game////
    //         ////////////////score its the last recorded score in the game///////////////
    //         const tokenContract = new Contract(
    //             GAMETOKENAddress,
    //             GAMETOKEN_abi,
    //             signer
    //         );
            
    //         const GameEnded = await tokenContract.gameEnded(_id, score,score);
    //         await GameEnded.wait()
        
    //     } catch (error) {
    //         console.log(error)
    //     }
      
        
    // }


    
    const spin = async () =>{
        try {
            setStart(styles.spin);
        const tokenContract = new Contract(
            GAMETOKENAddress,
            GAMETOKEN_abi,
            signer
        );
        const SpinContract = new Contract(
            SpinAddress,
            Spin_abi,
            signer
        );
         const transact = 200
         console.log(transact)
      
        console.log(amount)
       
    
        const utils = transact.toString();
        const amount =  ethers.utils.parseEther(utils)
        const start = await tokenContract.SpinBoard(200);
        await start.wait()

        if (rand && rand > 0) {
            console.log(rand)
            const randomConsequence = (rand * rand) - (2 * rand) - 10;
            if (randomConsequence < 0) {
                const trans = randomConsequence * -1;
                const utils = trans.toString();
                const amount =  ethers.utils.parseEther(utils)
                console.log(amount.toString())
                const happy = await tokenContract.approve(GAMETOKENAddress,randomConsequence );
                await happy.wait()
                const pay = await SpinContract.lotterySuccess(amount.toString())
                await pay.wait()

                setStart(styles.circle)
                swal("Sorry", `You lost  ${randomConsequence} tokens` , "error")

            }
            else {
                const utils = randomConsequence.toString();
                const amount =  ethers.utils.parseEther(utils)
                console.log(amount.toString())
                const happy = await tokenContract.approve(GAMETOKENAddress,randomConsequence );
                await happy.wait()
                const pay = await SpinContract.lotteryBadluck(amount.toString())
                await pay.wait()

                setStart(styles.circle)
                swal("Congratulations", `You won ${randomConsequence} tokens` , "success")
            }
            setRand(0)
        }
        } catch (error) {
            console.log(error)
        }
        
    };

    const test = () => {
        spin(); 
    };

    useEffect(() => {
       
        const EndedInterval = setInterval(async function () {
            await CheckIfSetRandNum(); 
            if(rand > 0) {
                clearInterval(EndedInterval);
            }
        },
         5* 1000);
    }, [isConnected]);
    

    const CheckIfSetRandNum = async () => {
        try {
          
            const contract = new Contract(
                GAMETOKENAddress,
                GAMETOKEN_abi,
                provider
            );
            const get  = await contract.s_randomLuck();
            const random = get.toNumber();
            console.log(random)
            if(random == 0){
                return false;
            }
           else{
              
               setRand(random);
               return true;
           }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
  return (
    <>
    <div className={styles.spinPage}>
    <div className={styles.spinContainer}>
        <ul className={start}>
            <li>
                <div className={styles.content}>✖</div>
            </li>
            <li>
                <div className={styles.content}>⚪</div>
            </li>
            <li>
                <div className={styles.content}>✖</div>
            </li>
            <li>
                <div className={styles.content}>⚪</div>
            </li>
            <li>
                <div className={styles.content}>✖</div>
            </li>
            <li>
                <div className={styles.content}>⚪</div>
            </li>
            <li>
                <div className={styles.content}>✖</div>
            </li>
            <li>
                <div className={styles.content}>⚪</div>
            </li>
            <li>
                <div className={styles.content}>✖</div>
            </li>
            <li>
                <div className={styles.content}>⚪</div>
            </li>
            <li>
                <div className={styles.content}>✖</div>
            </li>
            <li>
                <div className={styles.content}>⚪</div>
            </li>
        </ul>
    </div>
    <div className={styles.spinBtnContainer}>
        <motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1}} className={styles.spinBtn} onClick={test}>GET LUCKY</motion.button>
    </div>
    </div>
    </>
  )
}

export default Spin
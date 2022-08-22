import Head from 'next/head'
import Link from 'next/link'
import {motion} from "framer-motion"
import styles from '../styles/Home.module.css'
import {AiFillThunderbolt}from 'react-icons/ai'
import { BsController } from 'react-icons/bs'
import Footer from '../components/Footer';



export default function Home() {

  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Hackathon DEX Project</title>
        <meta name="description" content="Hackathon DEX Project" />
        <link rel="icon" href="/gameboy.png" />
      </Head>
        <motion.div initial={{y:"100vh"}} animate={{y:0}} transition={{type:"spring", duration:1, bounce:0.3,}}>
          <div className={styles.main}>
            <div className={styles.main_content}>
              <h1>AN ENGAGING DECENTRALIZED TRADING AND GAMING PROTOCOL</h1>
              <p>Empowers traders, liquidity providers & developers to participate in an open financial exchange and get the chance to play and earn more tokens</p>
              <div className={styles.main_button}>
                <Link href="/DEX" passHref><motion.button className={styles.first_button} whileHover={{scale:1.1, textShadow:'0px 0px 5px #fff8e7', boxShadow:'0px 0px 8px black'}}>Get Started <AiFillThunderbolt className={styles.icon}/> </motion.button></Link>
                <Link href="/P2E" passHref><motion.button className={styles.second_button} whileHover={{scale:1.1, boxShadow:'0px 0px 8px black',}}><BsController className={styles.icon} /> Play2Earn</motion.button></Link>
              </div>
            </div>
            <div className={styles.mainImage}>
              <motion.img src='/pad6.png' initial="hidden" animate="visible" variants={{
          hidden:{
            scale:.8,
            y:-4,
            opacity:0
          },
          visible:{
            scale:1,
            y:4,
            opacity:1,
            transition:{
              delay:1,
              bounce:0.1,
              type:"spring",
            }
          }
        }}></motion.img>
            </div>
          </div>
          </motion.div>
          <div>
          <div className={styles.secondMain}>
              <div className={styles.secondImg}>
                <img src="/arcade.png"></img>
              </div>
            <div className={styles.secondContent}>
              <div>
                <h3> A DECENTRALIZED ARCADE-TYPE WEBSITE FOR NOSTALGIC AND RETRO GAME AVAILABLE. </h3>
                <p> THESE GAMES CAN BE ACCESSED THROUGH THE USE OF A DECENTRALIZED TOKEN PAYMENT SYSTEM SIMILAR TO COINS USED IN A ARCADE. </p>
                <p>POLYGON TEST TOKENS CAN BE EXCHANGED FOR THESE TOKENS WHICH CAN BE USED TO ACCESS A VARIETY OF GAMES WHICH WILL BE ADDED OVERTIME</p>
              </div>
            </div>
          </div>
          </div>
    </div>
    <Footer/>
    </>
  )
}

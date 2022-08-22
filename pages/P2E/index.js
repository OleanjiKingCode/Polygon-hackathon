import React from 'react'
import Link from 'next/link'
import styles from '../../styles/P2E.module.css'
import Footer from '../../components/Footer';
import {motion} from "framer-motion"

function P2E() {
  return (
    <>
      <motion.div initial={{y:"100vh"}} animate={{y:0}} transition={{type:"spring", duration:1, bounce:0.3,}} className={styles.gameHome}>
        <div className={styles.shooterCard}>
          <img className={styles.shooterImg} src='/spaceinvdrs.png'></img>
          <div className={styles.shooterBtn}>
            <p>CLICK THE BUTTON BELOW TO PLAY [UNFORTUNATELY GAME IS ONLY AVAILABLE ON DESKTOP]</p>
            <p>USE THE DIRECTION BUTTONS TO MOVE, SPACEBAR TO FIRE</p>
            <Link href="/P2E/Shooter" ><motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1, boxShadow:'0px 1px 5px #fff8e7',}}>PLAY SPACE INVADERS GAME</motion.button></Link>
          </div>
        </div>
        <div className={styles.breakerCard}>
        <img className={styles.breakerImg}  src='/breaker2.png'></img>
        <div className={styles.breakerBtn}>
          <p>CLICK THE BUTTON BELOW TO PLAY [UNFORTUNATELY GAME IS ONLY AVAILABLE ON DESKTOP]</p>
          <p>MOVE THE MOUSE FOR DIRECTION</p>
          <Link href="/P2E/Paddle" ><motion.button whileTap={{scale:0.5}} whileHover={{scale:1.1, boxShadow:'0px 1px 5px #fff8e7',}}>PLAY PADDLE GAME</motion.button></Link>
        </div>
        </div>
      </motion.div>
      <div className={styles.more}>
        <h1>PACMAN, MORE COMING SOON...</h1>
      </div>
      <Footer/>
    </>
      )
}

export default P2E
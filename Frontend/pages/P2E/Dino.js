import {useState, useEffect, useRef} from 'react';
import NoSSR from "../../Components/nossr-wrapper"
import Phaser from "phaser";
import styles from "../../styles/Dino.module.css";


function Dino() {
  const phaserRef = useRef(null);

  useEffect(() => {
    const game = new Phaser.Game({
      width:500,
      height:500,
      parent: phaserRef.current,
      type: Phaser.AUTO,
      dom: {createContainer: true}
    })
    return () => game.destroy()
  },[])

  return(
    <NoSSR>
      <div className={styles.game} ref={phaserRef}></div>
    </NoSSR>
  )
}

export default Dino
import styles from "../styles/Navbar.module.css"
import Link from 'next/link'
import {motion} from "framer-motion"
import {useState} from 'react'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri'
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Navbar() {

  const [toggleMenu, setToggleMenu] = useState(false)


  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.nav_links}>
        <Link href="/" passhref><div className={styles.nav_logo}>
            <img src="/fidget3.png" width={35} height={35}/><h1 onClick={() => (setToggleMenu(false))}>EXC DEX</h1>
          </div></Link>
          <div className={styles.nav_links_container}>
            <Link href="/DEX" passhref><p>DEX</p></Link>
            <Link href="/P2E" passHref><p>P2E</p></Link>
            <Link href="/Spin" passHref><p>GET LUCKY!</p></Link>
            <a href='#footer'><p>CONTACT</p></a>
          </div>
        </div>
        <div className={styles.nav_button}>
        <ConnectButton/>
        </div>
        <div className={styles.nav_menu}>
          {toggleMenu
          ? <RiCloseLine color="black" size={26} onClick ={() => (setToggleMenu(false))}/>
          : <RiMenu3Line color="black" size={26} onClick ={() => (setToggleMenu(true))}/>
          }

          {toggleMenu && (
            <motion.div initial="hidden" animate="visible" variants={{
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
                  delay:0.1,
                  bounce:0.1,
                  type:"spring",
                }
              }
            }} className={styles.navbar_menu_container}>
              <div className={styles.navbar_menu_links}>
                <>
                  <Link href="/DEX" passhref><p onClick={() => (setToggleMenu(false))}>DEX</p></Link>
                  <Link href="/P2E" passHref onClick={() => (setToggleMenu(false))}><p>P2E</p></Link>
                  <Link href="/Spin" passHref><p onClick={() => (setToggleMenu(false))}>GET LUCKY!</p></Link>
                  <a href='#footer' onClick={() => (setToggleMenu(false))}><p>CONTACT</p></a>
                </>
                <div className={styles.nav_menu_button}>
                <ConnectButton />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import Link from 'next/link'
import styles from '../../styles/P2E.module.css'

function P2E() {
  return (
      <div className={styles.gameHome}>
      <Link href="/P2E/Dino"><button>Play Dino Game</button></Link>
      </div>
      )
}

export default P2E
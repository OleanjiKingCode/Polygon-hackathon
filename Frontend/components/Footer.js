import styles from '../styles/Footer.module.css'
import Link from 'next/link'

function Footer() {
  return (
    <>
        <div className = {styles.footer} id="footer">
            <div className = {styles.title}>
            <Link href="/" passHref><h1> EXC DEX TEAM</h1></Link>
            </div>
            <div className={styles.footer_links}>
                <h4>ALAMINXAB</h4>
                <a href="https://twitter.com/alaminxab" target="_blank" rel="noreferrer"><p>Twitter</p></a>
                <a href="https://linkedin.com/in/alaminxab" target="_blank" rel="noreferrer"><p>LinkedIn</p></a>
                <a href="https://github.com/excaliose777" target="_blank" rel="noreferrer"><p>GitHub</p></a>
                <a href="https://excaliose.hashnode.dev" target="_blank" rel="noreferrer"><p>Blog</p></a>
            </div>
            <div className={styles.footer_links}>
                <h4>ADEBAYO OLAMILEKAN</h4>
                <a href="https://twitter.com/Oleanji_sol" target="_blank" rel="noreferrer"><p>Twitter</p></a>
                <a href="https://linkedin.com/in/Adebayo-olamilekan-oleanji" target="_blank" rel="noreferrer"><p>LinkedIn</p></a>
                <a href="https://github.com/OleanjiKingCode" target="_blank" rel="noreferrer"><p>GitHub</p></a>
                <a href="https://oleanji.hashnode.dev" target="_blank" rel="noreferrer"><p>Blog</p></a>
                <a href="https://adebayo-s-portfolio.vercel.app" target="_blank" rel="noreferrer"><p>Portfolio</p></a>
            </div>
            <div className={styles.footer_links}>
                <h4>ABDULMUIZZ</h4>
                <a href="https://twitter.com/innbuld" target="_blank" rel="noreferrer"><p>Twitter</p></a>
                <a href="https://linkedin.com/in/olanrewaju-abdulmuizz-140a9a216" target="_blank" rel="noreferrer"><p>LinkedIn</p></a>
                <a href="https://github.com/innbuld" target="_blank" rel="noreferrer"><p>GitHub</p></a>
                <a href="https://abdulmuizz-portfolio.vercel.app" target="_blank" rel="noreferrer"><p>Portfolio</p></a>
            </div>
            
        </div>
        <div className={styles.copyright}>
            <p>@2022 Contributions by All Above. All rights reserved.</p>
        </div>
    </>
  )
}

export default Footer
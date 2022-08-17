import {useState} from 'react'
import styles from '../styles/Spin.module.css'
import { motion } from 'framer-motion';
import swal from 'sweetalert';

function Spin() {

    const [start, setStart] = useState(styles.circle);

    const spin = () =>{
        setStart(styles.spin);
        setTimeout(()=>{
            setStart(styles.circle)
        },4500);
    };

    const test = () => {
        spin();
        setTimeout(() => {
            swal("TESTING", "Yeah im just testing this sexy ass notifier" , "success")
        }, 4500);
    };

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
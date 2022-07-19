import React from "react";
import styles from './navBar.module.css';
import iconbtn from '../assets/img/iconbtn.png';


export default function NavBar() {
    return (
        <div className={styles.navContainer}>
            <header className={styles.header}>
                <div className={styles.icon}>
                    <img src={iconbtn} alt="icono-marca"/>
                </div>                 
            </header>
        </div>
    )
}
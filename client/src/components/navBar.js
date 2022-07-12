import React from "react";
import styles from './navBar.module.css';
import iconbtn from '../assets/img/iconbtn.png';


export default function NavBar( {onSearch }) {
    return (
        <div className={styles.navContainer}>
            <header className={styles.header}>
                <div className={styles.icon}>
                    <img src={iconbtn} alt="icono-marca"/>
                </div>
                <h3 className={styles.tittle}>Somos Raza</h3>
                <div className={styles.container}>
                    <div className={styles.inBusca}>
                    <input onChange={(e) => {
                        onSearch(e.target.value)
                    }}
                        type="text"
                        placeholder="Busca  tu  raza"
                    />
                    </div>
                </div>
                    
            </header>
        </div>
    )
}
import React from 'react';
import { Link } from "react-router-dom";
import styles from './landingPage.module.css';
import iconbtn from '../assets/img/iconbtn.png';



export default function LandingPage() {
  return (
        <div className={styles.landingPage}>
          <div className={styles.container}>
            <span className={styles.text}>Bienvenido</span>
            <span className={styles.text2}> Somos Raza</span>
          </div>
          <Link to="/dogs">
            <div className={styles.login}>
              <img src={iconbtn} className={styles.icon} alt="icono-huella" />
              <button className={styles.btnHome}> 
                <h4 className={styles.textBtn}> Ingresar </h4>
              </button>
            </div>
          </Link>
        </div>
  )
}

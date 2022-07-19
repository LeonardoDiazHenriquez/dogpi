import React from "react";
import styles from './dogloading.module.css';

const DogLoading = () => {
    return (
        <div className={styles.dogCard}>
          <div className={styles.skeleton}>
              <div className={styles.imgBx}>
                <img/>
              </div> 
              <div className={styles.raza}>
                    <span></span>
              </div>
              <div className={styles.estadisticas}> 
                  <div className={styles.individual}>
                    <p>Weight</p>
                    <span></span>
                  </div>
                  <div className={styles.individual}>
                    <p>Lifespan</p>
                    <span></span>
                  </div>  
              </div>
          </div>
        </div>  
      );
}

export default DogLoading;
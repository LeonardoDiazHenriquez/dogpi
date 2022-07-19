import React from 'react';
import styles from './dogCard.module.css'
import { Link } from "react-router-dom";


const DogCard = ({id, name, weight, image, lifespan}) => {
    return (
      <div className={styles.dogCard}>
        <div className={styles.skeleton}>
          <Link to={`/dogs/${id}`}>
            <div className={styles.imgBx}>
              <img src={image} alt="dogImage"/>
            </div> 
            <div className={styles.raza}>
                  <span>{name}</span>
            </div>
            <div className={styles.estadisticas}> 
                <div className={styles.individual}>
                  <p>Weight</p>
                  <span>{weight} Kg</span>
                </div>
                <div className={styles.individual}>
                  <p>Lifespan</p>
                  <span>{lifespan}</span>
                </div>  
            </div>
          </Link>
        </div>
      </div>  
    );
};

export default DogCard;
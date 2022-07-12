import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styles from './dogDetails.module.css'
import iconbtn from '../assets/img/iconbtn.png';
import imgTest from '../assets/img/imgTest.jpg';
import { Link } from "react-router-dom";

export { imgTest };

const backendUrl = process.env.REACT_APP_BACKEND_URL;


const DetailDog = () => {
    const { id } = useParams();
    const [dog, setDog] = useState();

    useEffect(() => {
        getDog(id);
    },[id])

    const getDog = (id) => {
        return fetch(backendUrl + `/dogs/${id}`)
        .then(res => res.json())
        .then(res => setDog(res.dog));
    }

    if(dog === undefined) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <Link to ={"/dogs"}>
                <img src={iconbtn} className={styles.icon} alt="icono-huella" />
                </Link>
            </div>
            <div className={styles.content}>
                
                <div className={styles.imgBx}>
                    <img src={dog.image} alt="dogImage"/>
                </div> 
                <div className={styles.raza}>
                    <p>{dog.name}</p>
                </div> 

                <div className={styles.estadisticas}>
                    <div className={styles.individual}>
                        <p>Weight</p>
                        <span>{dog.weight} kg</span>
                    </div>
                    <div className={styles.individual}>
                        <p>Height</p>
                        <span>{dog.height} cm</span>
                    </div>
                    <div className={styles.individual}>
                        <p>Lifespan</p>
                        <span>{dog.lifespan} </span>
                    </div>  
                </div>
                
                <div className={styles.showtemperament}>
                    <p>Temperament</p>
                    <div className={styles.temperamentIndi}>
                        {dog.temperaments.split(',')
                            .map((temperament) => temperament.trim())
                            .map((temperament) => <span key={temperament}> ● {temperament}</span>)}
                    </div>
                </div>
        </div>
    </div>
    )
} 

export default DetailDog;
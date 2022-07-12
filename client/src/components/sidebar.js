import React, { useEffect, useState } from "react";
import styles from './sidebar.module.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Sidebar = ({onTemperamentChange, onBreedChange, dogs, dogSelected}) => {
    const [temperaments, setTemperaments] = useState([]);

    useEffect(()=> {
        getTemperaments();
    }, []);

    const getTemperaments = () => {
        return fetch(backendUrl + '/temperaments')
        .then(res => res.json())
        .then(res => setTemperaments(res.temperaments));
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span> Temperamento </span>
                <select onChange={(e) => {
                    onTemperamentChange(e.target.value);
                }}>
                    <option value="default">Seleccionar</option>
                    {temperaments.map(temperament => <option value={temperament.name}>{temperament.name}</option>)}
                </select>
                <i></i>
            </div>
            <div className={styles.content}>
                <span> Raza </span>
                <select onChange={(e) => {
                    onBreedChange(e.target.value);
                }}
                value={dogSelected === "" ? "default" : dogSelected}
                >
                    <option value="" defaultValue>Seleccionar</option>
                    {dogs.map(dog => <option value={dog.id}>{dog.name}</option>)}
                </select>
                <i></i>
            </div>
        </div>
    )
}

export default Sidebar;
import React from "react";
import { Link } from "react-router-dom";
import styles from './createdog.module.css';


const Createdog = () => {
    return (
        <div className={styles.container}>
            <Link to = "/dogs/form">
                <div className={styles.select}>
                    Create Breed
                </div>  
            </Link>
        </div>
    )
}

export default Createdog;
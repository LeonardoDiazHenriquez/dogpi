import React from "react";
import styles from './search.module.css';



export default function Search( {onSearch }) {
    return (
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
    )
}
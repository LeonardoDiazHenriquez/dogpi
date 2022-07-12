import React, { useState } from "react";
import styles from './order.module.css'

const Order = ({onChange}) => {
    const [field, setField] = useState('name');
    const [type, setType] = useState('asc');
    return(
        <div className={styles.content}>
            <p>Ordenar por</p>
            <div className={styles.container}>
                <select id="order" onChange={(e) => {
                    setField(e.target.value);
                    onChange({field: e.target.value, type: type});
                }}>
                    <option value={"name"} defaultValue>Alfabeto</option>
                    <option value={"weight"}>Peso</option>
                    <option value={"height"}>Altura</option>
                    <option value={"lifespan"}>Años</option>
                </select>
                <select onChange={(e) => {
                    setType(e.target.value);
                    onChange({field: field, type: e.target.value});
                }}>
                    <option value={"asc"} defaultValue>Ascendente</option>
                    <option value={"desc"}>Descendente</option>
                </select>
            </div>
        </div>
    )
}

export default Order;
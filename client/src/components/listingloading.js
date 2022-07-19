import React from "react";
import DogLoading from "./dogloading";
import styles from './listingloading.module.css';

const ListingLoading = () => {
    return (
        <div className={styles.container}>
            <DogLoading /> 
            <DogLoading /> 
            <DogLoading /> 
            <DogLoading /> 
            <DogLoading /> 
            <DogLoading /> 
            <DogLoading /> 
            <DogLoading /> 
        </div>
    )
}

export default ListingLoading;
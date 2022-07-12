import DogCard from "./dogCard";
import styles from './listDogs.module.css';
import dogWanted from '../assets/img/dogWanted.png';


const ListDog = ({ dogs }) => {
    if(dogs.length === 0) {
        return (
            <div className={styles.dogCard}>
                <div className={styles.imgBx}>
                    <img src={dogWanted}/>
                </div>
                <div className={styles.raza}>
                  <span>No breed of dog with that name was found</span>
                </div>
                <div className={styles.individual}>
                    <span>You can create your dog breed on the "Create Breed" button.</span>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            {dogs.map((dog) => (
                <DogCard 
                    id={dog.id}
                    key={dog.id}
                    name={dog.name}
                    weight={dog.weight}
                    height={dog.height}
                    lifespan={dog.lifespan}
                    image={dog.image}
                />
            ))},
        </div>
    )
}

export default ListDog;
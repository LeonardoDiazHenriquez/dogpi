import { useEffect, useState } from 'react';
import Createdog from '../components/createdog';
import ListDog from '../components/listDogs';
import NavBar from '../components/navBar';
import Order from '../components/order';
import Sidebar from '../components/sidebar';
import Pagination from '../components/pagination';
import styles from './listingdog.module.css'
import CircleLoader from "react-spinners/CircleLoader";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ListingDogs = ()  => {
  const [dogs, setDogs] = useState([]);
  const [orderByField, setOrderByField] = useState("name");
  const [orderByType, setOrderByType] = useState("asc");
  const [nameFilter, setNameFilter] = useState("");
  const [temperamentFilter, setTemperamentFilter] = useState("");
  const [dogIdFilter, setDogIdFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalDogs, setTotalDogs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const size = 8;

  useEffect(() => {
    getDogs(orderByField);
  }, []);
  
  useEffect(() => {
    getDogs();
  }, [orderByField, orderByType, nameFilter, temperamentFilter, dogIdFilter, page]);


const getDogs = () => {
  let queryParams = "";

  if(orderByField !== undefined) {
    queryParams += ("?order_by="+ orderByField + "&order_by_type=" + orderByType);
  }

  if(nameFilter !== undefined) {
    queryParams  += "&name="+ nameFilter;
  }

  if(temperamentFilter !== undefined) {
    queryParams += "&temperament=" + temperamentFilter;
  }

  if(page !== undefined) {
    queryParams += "&page=" + page;
  }

  setIsLoading(true);

  return fetch(backendUrl + '/dogs' + queryParams)
  .then(res => res.json())
  .then(res => {
    setDogs(res.dogs);
    setTotalDogs(res.pagination.total);
    setIsLoading(false);
  });
}

return <div className={styles.app}>
          <NavBar onSearch={(name) => setNameFilter(name)}/>
          <div className={styles.container}>
            <div className={styles.left}>
              <Sidebar onTemperamentChange={(temperament) => {
                setTemperamentFilter(temperament);
                setDogIdFilter("");
              }} onBreedChange={(dogId) => {
                setDogIdFilter(dogId);
              }} dogs={dogs} dogSelected={dogIdFilter} />
            </div>
            <div className={styles.right}>
              <div className={styles.topRight}>
                <Createdog />
                <Order onChange={({field, type}) =>{
                  setOrderByField(field);
                  setOrderByType(type);
                }} />
              </div>
              {isLoading ? <div className={styles.loaderWrapper}>
                <CircleLoader
                  color="#fff"
                  cssOverride={{}}
                  loading
                  speedMultiplier={1}
                /> 
                <span> Loading...</span>
                          </div> : 
                <ListDog dogs={dogs.filter(dog => dogIdFilter === "" || dog.id === dogIdFilter)}/>}
              <Pagination total={totalDogs} size={size} actualPage={page} onPageChange={(page) => {
                setPage(page);
              }}/>
            </div>
          </div>  
        </div>  

}
    




export default ListingDogs;

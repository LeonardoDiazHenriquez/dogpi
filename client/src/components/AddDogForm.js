import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Select from 'react-select'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import iconbtn from '../assets/img/iconbtn.png';

import styles from './AddDogForm.module.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AddDogSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'The breed name is too short! (min 2 characters)')
    .max(50, 'The breed name is too long! (max 2 characters)')
    .required('The breed name is required'),
  heightMin: Yup.number()
    .min(1, 'The height min is too short! (min 1)')
    .max(110, 'The height min is too long! (max 100)')
    .required('The height min is required'),
  heightMax: Yup.number()
    .min(1, 'The height max is too short! (min 1)')
    .max(110, 'The height max is too long! (max 110)')
    .required('The height max is required'),
  weightMin: Yup
    .number()
    .min(1, 'The weight min is too short! (min 1)')
    .max(110, 'The weight min is too long! (max 110)')
    .required('The weight min is required'),
  weightMax: Yup
    .number()
    .min(1, 'The weight max is too short! (min 1)')
    .max(110, 'The weight max is too long! (max 110)')
    .required('The weight max is required'),
  lifespanMin: Yup
    .number()
    .min(1, 'The lifespan min is too short! (min 1)')
    .max(110, 'The lifespan min is too long! (max 110)')
    .required('The lifespan min is required'),
  lifespanMax: Yup
    .number()
    .min(1, 'The lifespan max is too short! (min 1)')
    .max(110, 'The lifespan max is too long! (max 110)')
    .required('The lifespan max is required'),
  image: Yup
    .string()
    .required('The image is required'),
  temperaments: Yup
    .string()
    .required('The breed temperament should have at least one element')
});


const AddDogForm = () => {
  let navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [temperaments, setTemperaments] = useState("");
  const [temperamentList, setTemperamentList] = useState([]);

  useEffect(()=> {
    getTemperaments()
    .then(res => setTemperamentList(res.temperaments));
  }, []);

  const getTemperaments = () => {
    return fetch(backendUrl + `/temperaments`)
    .then(res => res.json());
  }

  const createBreed = (formData) => {
    return fetch(backendUrl + '/dogs', {
      body: formData,
      method: 'POST',
    }).then(res => res.json());
  };

  if(temperamentList === undefined || temperamentList.length === 0) {
    return null;
  }

  let options = temperamentList.map(temperament => { return {value: temperament.name, label: temperament.name}; });

  const onSubmit = async (data) => {
    const {name, heightMin, heightMax, lifespanMin, lifespanMax, weightMin, weightMax, image} = data;

    // Validate
    try {
      await AddDogSchema.validate({
        name, heightMin, heightMax, lifespanMin, lifespanMax, weightMin, weightMax, image, temperaments
      });
    } catch(error) {
      toast.error(error.toString().replace('ValidationError: ', ''), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("height", heightMin + " - " + heightMax);
    formData.append("lifespan", lifespanMin + " - " + lifespanMax);
    formData.append("weight", weightMin + " - " + weightMax);
    formData.append("temperaments", temperaments);
    formData.append("image", image[0]);

    const { dog: {id} } = await createBreed(formData);
    navigate('/dogs/'+ id);
  };
  
  const watchImage = watch("image");
  let selectedImage;
  if(watchImage !== undefined) {
    selectedImage = URL.createObjectURL(watchImage[0]); 
  }

  return (
  <div>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <div className={styles.container}>
      <div className={styles.icon}>
          <Link to ={"/dogs"}>
            <img src={iconbtn} className={styles.icon} alt="icono-huella" />
          </Link>
      </div>
      <div className={styles.content}>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.imgcontainer}>
            <div className={styles.imgBx}>
              <img src={selectedImage}/>
            </div>
          </div>

          <div className={styles.imgfoot}>
            <div className={styles.addimg}>
            <label htmlFor='image'>
                  <input name='image' type={"file"} accept=".jpg,.gif,.png,.jpeg" {...register("image")}/>
            </label>
            </div>
            <div className={styles.raza}>
            <p>Breed</p> 
            <label htmlFor='name'>
              <input name='name' id='name' type={"text"} {...register("name")}/>
            </label>
            </div>
          </div>

          <div className={styles.estadisticas}>
            <div className={styles.individual}>
            <p>Weight</p> 
            <label htmlFor='weight'> 
              <input name='weight_min' id='weight' type={"number"} placeholder='Weight min' {...register("weightMin")}/> 
              <input name='weight_max' id='weight' type={"number"} placeholder='Weight max' {...register("weightMax")}/>
            </label>
          </div>
            <div className={styles.individual}>
            <p>Height</p>
            <label htmlFor='height'> 
              <input name='height_min' id='height' type={"number"} placeholder='Height min' {...register("heightMin")}/> 
              <input name='height_max' id='height' type={"number"} placeholder='Height max' {...register("heightMax")}/>
            </label>
          </div>  
            <div className={styles.individual}>
            <p>Lifespan</p>
            <label htmlFor='lifespan'>
              <input name='lifespan_min' id='lifespan' type={"number"} placeholder='Lifespan min' {...register("lifespanMin")}/>  
              <input name='lifespan_max' id='lifespan' type={"number"} placeholder='Lifespan max' {...register("lifespanMax")}/>
            </label>
          </div>
        </div>

          <div className={styles.showtemperament}>
            <p>Temperament</p>
            <label htmlFor='temperament'>
              <Select isMulti={true} options={options} onChange={(e) => {
                setTemperaments(e.map(selected => selected.value).join(','));
              }}/>
            </label>
            <div className={styles.btn}>
            <button type="submit">Create breed</button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  </div>);
};

export default AddDogForm;
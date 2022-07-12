const fetch = require('node-fetch');

const transformDogApiToDog = (dog) => {
    const newDogFormat = {
        id: dog.reference_image_id,
        name: dog.name,
        height: dog.height.metric,
        weight: dog.weight.metric,
        lifespan: dog.life_span,
        image: dog.image.url,
        temperaments: ''
    };

    if(dog.temperament !== undefined) {
        newDogFormat.temperaments = dog.temperament
    }
    
    return newDogFormat;
};

const transformImageAPIToDog = (image) => {
    const { breeds, url } = image;
    const dog = breeds[0];
    const newDogFormat = {
        id: dog.reference_image_id,
        name: dog.name,
        height: dog.height.metric,
        weight: dog.weight.metric,
        lifespan: dog.life_span,
        image: url,
    };

    if(dog.temperament !== undefined) {
        newDogFormat.temperaments = dog.temperament;
    } else {
        newDogFormat.temperaments = "";
    }
    
    return newDogFormat;
};

const getDogsFromAPI = async () => {
    let dogs = await fetch("https://api.thedogapi.com/v1/breeds", {headers: {'x-api-key': '7015ffd6-6280-47a8-ade5-e49ce415c606'}})
    .then(res => res.json());
    dogs = dogs.map(transformDogApiToDog);

    return dogs;
};

const getTemperamentsFromAPI = async () => {
    let dogs = await fetch("https://api.thedogapi.com/v1/breeds", {headers: {'x-api-key': '7015ffd6-6280-47a8-ade5-e49ce415c606'}})
    .then(res => res.json());
    const temperaments = [];
    dogs.forEach(dog => {
        if(dog.temperament !== undefined) {
            dog.temperament.split(",").forEach(temperamentName => {
                temperaments.push({
                    "name": temperamentName.trim()
                  });
            })
        }
    });

    return temperaments;
};

const getDogFromAPI = async (id) => {
    let response = await fetch("https://api.thedogapi.com/v1/images/" + id, {headers: {'x-api-key': '7015ffd6-6280-47a8-ade5-e49ce415c606'}})
    .then(res => res.json());

    return transformImageAPIToDog(response);
};


module.exports = {
    getDogsFromAPI,
    getTemperamentsFromAPI,
    getDogFromAPI
};
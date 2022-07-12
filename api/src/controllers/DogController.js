const { Dog, Temperament, Dog_temperaments } = require('../db.js');
const TheDogAPI = require('../services/the-dog-api'); 

async function createDog(req, res) {
    const {name, height, weight, lifespan, temperaments} = req.body;
    const dog = await Dog.create({
        name,
        height,
        weight,
        lifespan,
        image: 'http://localhost:3001/' + req.file.path,
        temperaments: temperaments.split(",").map(temperament => temperament.trim()).join(",")
    });

    return res.status(201).send({dog: dog});
}

async function listingDogs(req, res) {
    let { name, order_by, order_by_type = "desc", temperament, page = "1", size = "8" } = req.query;
    page = parseInt(page);
    size = parseInt(size);


    
    // Query db
    let dogsFromDB = await Dog.findAll({include: Temperament});

    // Query TheDogAPI
    let dogsFromAPI = await TheDogAPI.getDogsFromAPI(); 

    let dogs = dogsFromDB.concat(dogsFromAPI);
    
    // Filters
    if(name !== undefined && name.trim() != "") {
        dogs = dogs.filter((dog) => dog.name.includes(name));
    }

    if(temperament !== undefined && temperament.trim() != "") {
        dogs = dogs.filter((dog) => dog.temperaments.includes(temperament));
    }
    

    // Order by
    if(["name", "weight", "height", "lifespan"].includes(order_by)) {
        dogs.sort((a, b) => {
            if(a[order_by] < b[order_by]) {
                return (order_by_type==="desc")? 1: -1;
            }
            if(a[order_by] > b[order_by]) {
                return (order_by_type==="desc")? -1: 1;
            }
            return 0;
        });
    }
    
    const total = dogs.length;
    // Paginado
    // Size por default es 8.
    // Page si no esta definida, es 1.
    // Pagina 1 (size * (page -1)) = 0, (size * page) = 8.
    // Pagina 2 (size * (page -1)) = 8, (size * page) = 16.
    // Pagina 3 (size * (page -1)) = 16, (size * page) = 24.
    dogs = dogs.slice(size * (page -1), size * page);

    return res.send({dogs: dogs, pagination: {total, page, size}});
}

async function listOneDog(req, res) {
    const { id } = req.params;
    let dog;
    if(isNaN(id)) {
        dog = await TheDogAPI.getDogFromAPI(id);
    } else {
        dog = await Dog.findOne({ where: {id: id}});
    }
    return res.send({dog: dog});
}

module.exports = {
    createDog,
    listingDogs,
    listOneDog,
};
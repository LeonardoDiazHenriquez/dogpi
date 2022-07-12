async function createSeeds(dog) {
    for(let i = 0; i < 10; i++) {
        await dog.create({
            name: 'Firulais #' + (i + 1),
            height: Math.floor(Math.random() * 499) + 'cm - 500cm',
            weight: Math.floor(Math.random() * 50) + 1 + 'kg - 3000kg',
            lifespan: Math.floor(Math.random() * 49) + 1 + ' años - 50 años',
            image: 'http://localhost:3000/static/media/imgTest.2f53adf2.jpg',
            temperaments: 'Fun,Loving'
        });
    }
    
}


module.exports = {
  createSeeds  
};
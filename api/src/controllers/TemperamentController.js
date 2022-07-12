const TheDogAPI = require('../services/the-dog-api'); 


async function listingTemperaments(req, res) {
    const temperamentsFromAPI = await TheDogAPI.getTemperamentsFromAPI();
    return res.send({temperaments: temperamentsFromAPI});
}

module.exports = {
    listingTemperaments,
};
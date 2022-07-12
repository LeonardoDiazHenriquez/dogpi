const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
const upload = multer({ dest: './uploads/', storage });
const { createDog, listingDogs, listOneDog } = require('../controllers/DogController');
const { listingTemperaments } = require('../controllers/TemperamentController');

const router = Router();

router.post('/dogs', upload.single('image'), createDog);
router.get('/dogs', listingDogs);
router.get('/dogs/:id', listOneDog);
router.get('/temperaments', listingTemperaments);

module.exports = router;

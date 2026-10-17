const express = require('express');
const router = express.Router();
const animalsController = require('../controllers/animalsController');

// GET routes for general  and id params searching
router.get('/', animalsController.getAnimals);
router.get('/:id', animalsController.getAnimalById);

//POST
router.post('/', animalsController.createAnimal);

//PUT - UPDATE
router.put('/:id', animalsController.updateAnimal);

//DELETE
router.delete('/:id', animalsController.deleteAnimal);

module.exports = router;

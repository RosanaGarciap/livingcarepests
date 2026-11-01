const express = require('express');
const router = express.Router();
const adoptersController = require('../controllers/adoptersController');
// GET
router.get('/', adoptersController.getAdopters);
router.get('/:id', adoptersController.getAdopterById);
// POST
router.post('/', adoptersController.createAdopter);
// PUT - UPDATE
router.put('/:id', adoptersController.updateAdopter);
// DELETE
router.delete('/:id', adoptersController.deleteAdopter);
module.exports = router;
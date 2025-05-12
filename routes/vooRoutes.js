const express = require('express');
const router = express.Router();
const vooController = require('../controllers/vooController');

router.post('/', vooController.create);
router.get('/', vooController.getAll); 
router.get('/:id', vooController.getById);
router.put('/:id', vooController.update);
router.delete('/:id', vooController.remove); 

module.exports = router;

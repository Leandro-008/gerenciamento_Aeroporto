const express = require('express');
const router = express.Router();
const controller = require('../controllers/passageiroController'); 

router.post('/', controller.create); e
router.get('/', controller.getAll); 
router.get('/:id', controller.getById); 
router.put('/:id', controller.update); 
router.delete('/:id', controller.remove); 

module.exports = router;

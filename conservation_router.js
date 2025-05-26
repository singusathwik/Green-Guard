const express = require('express');
const router = express.Router();
const conservationController = require('../controllers/conservation_controller');


// POST /conservations - create a new event
router.post('/', conservationController.createConservation);

// GET /conservations - list all events
router.get('/', conservationController.getConservations);

module.exports = router;

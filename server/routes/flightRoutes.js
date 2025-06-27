const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

router.get('/', flightController.getFlights);
router.get('/:id', flightController.getFlightById);

module.exports = router;
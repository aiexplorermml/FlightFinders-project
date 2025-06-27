const Flight = require('../models/Flight');

exports.getFlights = async (req, res) => {
  try {
    const { source, destination } = req.query;
    if (!source || !destination) {
      return res.status(400).json({ error: 'Source and destination are required' });
    }

    const flights = await Flight.find({
      source: new RegExp(`^${source}$`, 'i'),
      destination: new RegExp(`^${destination}$`, 'i')
    }).select('airline flightNumber source destination date time duration basePrice seating');

    res.json(flights.length ? flights : { message: 'No flights found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
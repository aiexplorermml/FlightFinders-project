const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    uppercase: true,
    match: [/^[0-9]+[A-Z]$/, 'Invalid seat number format']
  },
  type: {
    type: String,
    required: true,
    enum: ['Economy', 'Premium Economy', 'Business', 'First Class']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  isBooked: {
    type: Boolean,
    default: false
  }
});

const flightSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  airline: {
    type: String,
    required: true,
    trim: true
  },
  flightNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  date: {
    type: String,
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD format']
  },
  time: {
    type: String,
    required: true,
    match: [/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, 'Use HH:MM AM/PM format']
  },
  duration: {
    type: String,
    required: true,
    match: [/^\d+h \d+m$/, 'Use format like "2h 30m"']
  },
  seating: {
    type: [seatSchema],
    required: true,
    validate: {
      validator: seats => seats.length > 0,
      message: 'At least one seat required'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
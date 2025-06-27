const mongoose = require('mongoose');
const Flight = require('./models/Flight');

mongoose.connect('mongodb+srv://flightuser:flight123@cluster0.eufiwmn.mongodb.net/flightdb?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    console.log('Connected to MongoDB');
    await Flight.deleteMany({});

    const flights = [
      // Delhi to Mumbai
      {
        source: "Delhi",
        destination: "Mumbai",
        basePrice: 3500,
        airline: "Air India",
        flightNumber: "AI-101",
        date: "2025-07-01",
        time: "09:00 AM",
        duration: "2h 10m",
        seating: [
          { number: "1A", type: "Business", price: 5000 },
          { number: "1B", type: "Business", price: 5000 },
          { number: "2A", type: "Premium Economy", price: 4000 },
          { number: "2B", type: "Premium Economy", price: 4000 },
          { number: "3A", type: "Economy", price: 3500 }
        ]
      },
      // Delhi to Hyderabad
      {
        source: "Delhi",
        destination: "Hyderabad",
        basePrice: 3800,
        airline: "IndiGo",
        flightNumber: "6E-202",
        date: "2025-07-01",
        time: "11:30 AM",
        duration: "2h 5m",
        seating: [
          { number: "1A", type: "Premium Economy", price: 4500 },
          { number: "1B", type: "Premium Economy", price: 4500 },
          { number: "2A", type: "Economy", price: 3800 }
        ]
      },
      // Add other flights similarly...
    ];

    await Flight.insertMany(flights);
    console.log(`Successfully seeded ${flights.length} flights`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
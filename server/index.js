const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flights', require('./routes/flightRoutes'));

app.get('/', (req, res) => {
  res.send('FlightFinder backend is running 🚀');
});

// MongoDB connection
mongoose.connect('mongodb+srv://flightuser:flight123@cluster0.eufiwmn.mongodb.net/flightdb?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB ✅');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed ❌', err);
    process.exit(1);
  });

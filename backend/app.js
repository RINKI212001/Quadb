const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tickerRoutes = require('./routes/tickerRoutes');
const { fetchAndStoreTickers } = require('./services/apiService');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database connection error:', error));

// Fetch data periodically
setInterval(fetchAndStoreTickers, 10 * 60 * 1000); // Fetch every 10 minutes
fetchAndStoreTickers();

// Routes
app.use('/api/tickers', tickerRoutes);

module.exports = app;

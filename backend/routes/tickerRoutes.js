const express = require('express');
const router = express.Router(); // Initialize router
const Ticker = require('../models/Ticker');

// Route to fetch all tickers
router.get('/', async (req, res) => {
  try {
    const tickers = await Ticker.find(); // Fetch tickers from MongoDB
    res.status(200).json(tickers); // Send tickers as JSON
  } catch (error) {
    console.error('Error fetching tickers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router; // Export the router

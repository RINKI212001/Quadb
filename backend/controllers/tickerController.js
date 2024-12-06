const Ticker = require('../models/Ticker');

// Get all tickers from the database
exports.getAllTickers = async (req, res) => {
  try {
    const tickers = await Ticker.find();
    res.json(tickers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickers', error });
  }
};

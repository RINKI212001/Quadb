const axios = require('axios');
const Ticker = require('../models/Ticker');

exports.fetchAndStoreTickers = async () => {
  try {
    const { data } = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const top10 = Object.values(data).slice(0, 10);

    console.log('Fetched Data:', top10); // Log fetched data to verify

    await Ticker.deleteMany({});
    const tickers = top10.map((ticker) => ({
      name: ticker.name,
      last: parseFloat(ticker.last),
      buy: parseFloat(ticker.buy),
      sell: parseFloat(ticker.sell),
      volume: parseFloat(ticker.volume),
      base_unit: ticker.base_unit,
    }));

    await Ticker.insertMany(tickers);
    console.log('Tickers stored successfully');
  } catch (error) {
    console.error('Error fetching tickers:', error);
  }
};

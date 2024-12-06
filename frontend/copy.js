let refreshInterval = 60; // Countdown starts at 60 seconds

// Fetch ticker data from the backend API
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/tickers');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      updateTable(data);
      updateBestPrice(data);
    } else {
      displayNoDataMessage();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    displayNoDataMessage();
  }
};

// Update the table with the ticker data
const updateTable = (tickers) => {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // Clear existing data

  tickers.forEach((ticker, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${ticker.name}</td>
      <td>₹ ${ticker.last}</td>
      <td>₹ ${ticker.buy} / ₹ ${ticker.sell}</td>
      <td>${ticker.volume}</td>
      <td>${ticker.base_unit}</td>
    `;
    tableBody.appendChild(row);
  });
};

// Update the best price to trade
const updateBestPrice = (tickers) => {
  const bestPrice = tickers.reduce((acc, curr) => acc + parseFloat(curr.last), 0) / tickers.length;
  document.getElementById('best-price').textContent = `₹ ${bestPrice.toFixed(2)}`;
};

// Display "No data found" message
const displayNoDataMessage = () => {
  document.getElementById('best-price').textContent = 'No data found';

  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align: center; color: #f44336;">
        No data available. Please check the server or try again later.
      </td>
    </tr>
  `;
};

// Start the countdown timer and refresh data
const startTimer = () => {
  const timerElement = document.getElementById('countdown-text');

  const countdown = setInterval(() => {
    if (refreshInterval > 0) {
      refreshInterval--;
      timerElement.textContent = refreshInterval; // Update countdown text
    } else {
      refreshInterval = 60; // Reset countdown
      timerElement.textContent = refreshInterval;
      fetchData(); // Refresh data
    }
  }, 1000); // Update every second
};

// Initial data fetch and start the timer
fetchData();
startTimer();
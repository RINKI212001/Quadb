async function fetchTickers() {
    try {
      const response = await fetch('http://localhost:5000/api/tickers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Debugging: Log fetched data
      const tableBody = document.querySelector('#tickers tbody');
  
      // Clear existing table rows
      tableBody.innerHTML = '';
  
      // Populate table rows
      data.forEach((ticker, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${ticker.name}</td>
            <td>₹${ticker.last.toLocaleString()}</td>
            <td>₹${ticker.buy.toLocaleString()} / ₹${ticker.sell.toLocaleString()}</td>
            <td>${ticker.difference.toFixed(2)}%</td>
            <td>₹${ticker.savings.toLocaleString()}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    } catch (error) {
      console.error('Error fetching tickers:', error);
    }
  }
  
  // Call fetchTickers when DOM is loaded
  document.addEventListener('DOMContentLoaded', fetchTickers);
  
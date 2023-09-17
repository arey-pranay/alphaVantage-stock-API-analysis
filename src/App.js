// App.js
import React, { useEffect, useState } from "react";
import "./App.css"; // Import any global CSS or Tailwind CSS here
import StockList from "./components/StockList"; // Import your stock list component
import StockData from "./components/StockData"; // Import the StockData component

function App() {
  const [stocks, setStocks] = useState([]); // List of stocks
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the function to fetch stock data for multiple stocks
  const fetchStockData = () => {
    // Replace with your actual Alpha Vantage API endpoint
    const baseUrl =
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";
    const apiKey = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your Alpha Vantage API key
    const stockSymbols = ["AAPL", "GOOGL", "TSLA"]; // Example list of stock symbols

    // Create an array to hold the promises for fetching data
    const fetchPromises = stockSymbols.map((symbol) => {
      // Construct the API endpoint URL for each stock symbol
      const apiUrl = `${baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

      return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(`API Response for ${symbol}:`, data); // Log the API response
          if (!data || !data["Time Series (5min)"]) {
            throw new Error("Invalid or empty response from API");
          }

          // Extract and prepare stock data
          const timeSeriesData = data["Time Series (5min)"];
          const latestTimestamp = Object.keys(timeSeriesData)[0];
          const latestData = timeSeriesData[latestTimestamp];

          const stockName = data["Meta Data"]["2. Symbol"];
          const stockPrice = parseFloat(latestData["4. close"]);
          const stockVolume = parseInt(latestData["5. volume"]);
          const lastTradedPrice = parseFloat(latestData["4. close"]);
          const isGreen = stockPrice > parseFloat(latestData["1. open"]);

          return {
            name: stockName,
            price: stockPrice,
            volume: stockVolume,
            lastTradedPrice: lastTradedPrice,
            isGreen: isGreen,
            symbol: symbol,
          };
        })
        .catch((err) => {
          console.error(`Error fetching data for ${symbol}: ${err.message}`);
          return null; // Return null for error handling
        });
    });

    // Use Promise.all to wait for all API calls to complete
    Promise.all(fetchPromises)
      .then((stockDataArray) => {
        // Filter out null values (failed requests) and set the stocks state
        setStocks(stockDataArray.filter((stockData) => stockData !== null));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Tracking App</h1>
      </header>
      <main className="container mx-auto p-4">
        {/* Iterate through the stocks array and display data for each stock */}
        {stocks.map((stock) => (
          <StockData key={stock.symbol} stock={stock} />
        ))}
        <StockList stocks={stocks} />{" "}
        {/* Pass the list of stocks to StockList */}
      </main>
    </div>
  );
}

export default App;

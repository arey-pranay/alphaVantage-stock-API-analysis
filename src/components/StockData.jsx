// StockData.js
import React from "react";

function StockData({ stock }) {
  return (
    <div className="stock-card">
      <h2>{stock.name}</h2>
      <p>Last Traded Price: {stock.lastTradedPrice}</p>
      <p>Price: {stock.price}</p>
      <p>Volume: {stock.volume}</p>
      <p>Color: {stock.isGreen ? "Green" : "Red"}</p>
    </div>
  );
}

export default StockData;

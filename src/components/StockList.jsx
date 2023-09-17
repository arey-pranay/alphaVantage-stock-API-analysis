// StockList.js
import React from "react";

function StockList({ stocks }) {
  return (
    <div className="stock-list">
      <h2>Stock List</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>{stock.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StockList;

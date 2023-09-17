// StockCard.js
import React from "react";

function StockCard({ stock }) {
  // Extract data from the stock object
  const { name, lastTradedPrice, price, volume, isGreen, symbol } = stock;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4 w-64">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p
        className={`text-${
          isGreen ? "green" : "red"
        }-500 font-semibold text-lg`}
      >
        Last Traded Price: {lastTradedPrice}
      </p>
      <p className="text-gray-600">Price: {price}</p>
      <p className="text-gray-600">Volume: {volume}</p>
      <p className={`text-${isGreen ? "green" : "red"}-500 font-semibold`}>
        {isGreen ? "Up" : "Down"}
      </p>
      <p className="text-gray-600">Symbol: {symbol}</p>
    </div>
  );
}

export default StockCard;

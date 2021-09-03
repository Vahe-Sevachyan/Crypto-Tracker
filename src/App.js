import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Coin from "./Components/Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(
        " https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  });
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Crypto Tracker</h1>
        <form>
          <input
            type="text"
            placeholder="Search for Currencies"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="sectionNames">
        <h3 className="nameSection">Name</h3>
        <h3>Price</h3>
        <h3>Volume(24hr)</h3>
        <h3>24h %</h3>
        <h3>Market Cap</h3>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          ></Coin>
        );
      })}
    </div>
  );
}

export default App;

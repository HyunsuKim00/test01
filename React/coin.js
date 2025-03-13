import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState("");
  const [selectedCoin, setSelectedCoin] = useState({ price: 1, symbol: "BTC" });

  const onChange = (event) => setDollar(event.target.value);

  const onSelect = (event) => {
    const selectedSymbol = event.target.value;
    const coin = coins.find((c) => c.symbol === selectedSymbol);
    setSelectedCoin({ price: coin.quotes.USD.price, symbol: coin.symbol });
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : (
        <div>
          <div>
            <select value={selectedCoin.symbol} onChange={onSelect}>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.symbol}>
                  {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="account">How much dollar do you have? </label>
            <input
              value={dollar}
              onChange={onChange}
              id="account"
              type="number"
              placeholder="Enter your dollars"
            />
          </div>

          <div>
            <label htmlFor="coinbuy">
              You can buy {dollar / selectedCoin.price || 0} {selectedCoin.symbol}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

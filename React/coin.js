import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState("");
  const [selectedCoin, setSelectedCoin] = useState({ price: 0, symbol: "Choose coin" });
    /*selectedCoin이라는 객체는 여러가지 속성을 가질 수 있다. 따라서 여러 속성을 위와 같이 정의할 수 있다.*/

  const onChange = (event) => setDollar(event.target.value);

  const onSelect = (event) => {
    const selectedSymbol = event.target.value;//선택된 코인의 심볼

    /*"Choose coin" 선택시 초기화*/
    if (selectedSymbol === "Choose coin") {
      setSelectedCoin({ price: 1, symbol: "Choose coin" });  
      return;
    }

    /*coins array안에서 선택된 코인의 심볼과 같은 코인의 정보를 coin변수에 저장한다.*/
    const coin = coins.find((c) => c.symbol === selectedSymbol);
    setSelectedCoin({ price: coin.quotes.USD.price, symbol: coin.symbol });
  };

   /*이 과정은 처음 페이지가 열릴 때에만 실행한다.*/
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    /*웹 API를 통해 네트워크 요청을 보내고 응답을 받기 위한 JavaScript 함수*/
    /*promise 객체를 반환함.(나중에 상태를 알려줄 것을 약속하는 객체)*/
    /*.then()은 promise가 성공일 때 호출 / .catch()는 promise가 실패일 때 호출 */

      .then((response) => response.json())
      /*fetch()가 성공하면,그 응답을 가져와서 body 부분을 json 형식으로 변환 */

      .then((json) => {
        setCoins(json);
        setLoading(false);
        /*다시 위의 .then()이 성공하면, setCoins()와 setCoins() 함수 실행*/
      });
  }, []);


  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : (
        <div>
          <div>
            <select value={selectedCoin.symbol} onChange={onSelect}>
              <option value="Choose coin" disabled>Choose coin</option>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.symbol}>
                  {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
                </option>
              ))}
              {/*여러가지 코인 정보가 담긴 coin array의 요소들을 각각의 option으로 변환한다.*/}
            </select>
          </div>

          <div>
            <label htmlFor="account">How much money do you have? </label>
            <input
              value={dollar}
              onChange={onChange}
              id="account"
              type="number"
              placeholder="Enter your dollars"
            />
          </div>

          {/* 금액이 0 이상이고, 코인이 선택되었을 때 라벨 출력 */}
          {(dollar > 0 && selectedCoin.symbol !== "Choose coin")? (
            <div>
              <label htmlFor="coinbuy">
                You can buy {dollar / selectedCoin.price} {selectedCoin.symbol}
              </label>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;

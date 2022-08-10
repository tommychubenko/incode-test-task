import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import io from "socket.io-client";

export const TicketsMarkup = () => {
  const [tickers, setTickers] = useState([
    {
      ticker: "AAPL",
      exchange: "NASDAQ",
      price: "284.54",
      price_change: "no",
      change: "145.86",
      change_percent: "0.74",
      dividend: "0.24",
      yield: "1.64",
      last_trade_time: "2022-08-10T08:15:55.000Z",
    },
  ]);
  const socket = io("http://localhost:4000");

  const deleteTicket = (name) => {
    socket.emit("start");
    socket.emit("delete", name);
  };
  // const dispatch = useDispatch();

  const tickersFromRedux = useSelector((state) => state.tickers);

  useEffect(() => {
    tickersFromRedux && setTickers(tickersFromRedux);

    setTickers((prevState) => {
      // console.log(prevState.map((i) => i));
      // tickersFromRedux, console.log(tickers.map((i) => i));

      prevState.map((psObj) =>
        tickers.map(
          (sObj) =>
            psObj.price > sObj.price
              ? console.log(true)
              : // [...sObj, (sObj.price_changed = true)]
                console.log(true)
          // [...sObj, (sObj.price_changed = false)]
        )
      );
    });

    // setTickers(tickersFromRedux);
  }, [tickersFromRedux]);

  return (
    <table className="tickers_table">
      <thead>
        <tr className="ticker_row">
          <th>Ticker</th>
          <th className="ticker_price">Price</th>
          <th className="ticker_change">Change:</th>
          <th className="ticker_change_percent">Change percent</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickers &&
          tickers.map((ticker) => {
            return (
              <tr className="ticker_row" key={ticker.ticker}>
                <td className="ticker_name"> {ticker.ticker} </td>
                {/* <td className="ticker_exchange">{ticker.exchange}</td> */}
                <td className="ticker_price">{ticker.price}</td>
                <td className="ticker_change">{ticker.change}</td>
                <td className="ticker_change_percent">
                  {ticker.change_percent}
                </td>
                <td className="ticker_del--item">
                  <button
                    className="ticker_del--btn"
                    onClick={() => {
                      deleteTicket(ticker.ticker);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

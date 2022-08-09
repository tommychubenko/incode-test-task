// import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import io from "socket.io-client";

export const TicketsMarkup = () => {
  const [tickers, setTickers] = useState();
  const socket = io("http://localhost:4000");
  // const dispatch = useDispatch();

  //   const tickersFromRedux = useSelector((state) => state.tickers);

  useEffect(() => {
    socket.emit("start");
    socket.on("ticker", (resp) => {
      setTickers(resp);
    });
  }, []);

  return (
    <table className="tickers_table">
      <thead>
        <tr className="ticker_row">
          <th style={{ width: "15%" }}>Ticker</th>
          <th className="ticker_price">Price</th>
          <th className="ticker_change">Change:</th>
          <th className="ticker_change_percent">Change percent</th>
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
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

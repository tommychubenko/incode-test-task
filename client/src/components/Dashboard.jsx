import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export const Dashboard = () => {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    socket.emit("start");
    socket.on("ticker", (resp) => {
      setTickers({ resp });
    });
  }, []);

  return <div></div>;
};

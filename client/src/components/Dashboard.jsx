import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTickers } from "../redux/store";
import io from "socket.io-client";
import { TicketsMarkup } from "./TicketsMarkup";
import { AddTicker } from "./AddTicker";
import { SpeedControl } from "./SpeedControl";
import { getTickers } from "../redux/store";

const socket = io("http://localhost:4000");

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("start");
    socket.on("ticker", (resp) => {
      dispatch(setTickers(resp));
    });
    // getTickers();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard_tickers">
        <TicketsMarkup />
        <AddTicker />
      </div>
      <div className="dashboard_options">
        <SpeedControl />
      </div>
    </div>
  );
};

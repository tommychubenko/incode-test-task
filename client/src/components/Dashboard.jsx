import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTickers } from "../redux/store";
import io from "socket.io-client";
import { TicketsMarkup } from "./TicketsMarkup";
import { AddTicker } from "./AddTicker";

const socket = io("http://localhost:4000");

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("start");
    socket.on("ticker", (resp) => {
      //   dispatch(setTickers(resp));
    });
  }, []);

  return (
    <div>
      <TicketsMarkup />
      <AddTicker />
    </div>
  );
};

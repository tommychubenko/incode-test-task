import io from "socket.io-client";

const socket = io("http://localhost:4000");

export const fetchTickers = async () => {
  socket.emit("start");
  socket.on("ticker", (resp) => {
    return resp;
  });
};

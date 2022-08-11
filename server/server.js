("use strict");
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

let FETCH_INTERVAL = 2000;
const PORT = process.env.PORT || 4000;

let timer;

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  const quotes = tickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    price_change: "no",
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit("ticker", quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);
  // every N seconds
  timer = setInterval(() => getQuotes(socket), FETCH_INTERVAL);
  socket.on("disconnect", () => clearInterval(timer));
}

const trackSpeed = (socket) => {
  const speedInterval = setInterval(() => {
    socket.emit("getSpeed", FETCH_INTERVAL);
  }, 250);

  socket.on("disconnect", function () {
    clearInterval(speedInterval);
  });
};

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });

  trackSpeed(socket);

  socket.on("addTicker", (data) => {
    tickers.includes(data) ? socket.emit("exist", data) : tickers.push(data);
  });
  socket.on("delete", (data) => {
    const index = tickers.indexOf(data);
    tickers.splice(index, 1);
  });

  socket.on("increaseSpeed", (data) => {
    clearInterval(timer);
    FETCH_INTERVAL -= data;
    trackTickers(socket);
    // timer = setInterval(() => getQuotes(socket), FETCH_INTERVAL);
  });

  socket.on("decreaseSpeed", (data) => {
    clearInterval(timer);
    FETCH_INTERVAL += data;
    trackTickers(socket);
    // timer = setInterval(() => getQuotes(socket), FETCH_INTERVAL);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});

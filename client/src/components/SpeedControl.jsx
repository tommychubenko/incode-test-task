import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:4000");

export const SpeedControl = () => {
  const [speed, setSpeed] = useState([]);

  useEffect(() => {
    socket.on("getSpeed", (resp) => {
      setSpeed(resp);
    });
  }, []);

  return (
    <div>
      <div className="speed_control">
        <button
          className="speed_control--btn"
          onClick={() => {
            socket.emit("increaseSpeed", 1000);
          }}
        >
          Increase speed
        </button>
        <button
          className="speed_control--btn"
          onClick={() => {
            socket.emit("decreaseSpeed", 1000);
          }}
        >
          Decrease speed
        </button>
      </div>
      <p>Actual speed of fetching data is: </p>
      <p>
        <b>{speed && speed / 1000}</b> seconds for request
      </p>
    </div>
  );
};

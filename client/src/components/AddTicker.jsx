import io from "socket.io-client";
const socket = io("http://localhost:4000");

export const AddTicker = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    // socket.emit("start");
    socket.emit("addTicker", e.target[0].value);
    console.log(e.target[0].value);
    e.target[0].value = "";
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="type a ticker" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

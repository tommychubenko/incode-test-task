import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const fetchTickets = async () => {
  socket.emit("start");
  socket.on("ticker", (resp) => {
    return resp;
  });
};

// const fetchTickers = createAsyncThunk();

export const getTickers = createAsyncThunk(
  "tickers / getTickers",
  async (_, { rejectWithValue }) => {
    try {
      const tickers = await fetchTickets();
      return tickers;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const mySlice = createSlice({
  name: "tickers",
  initialState: [],
  reducers: {
    setTickers(state, action) {
      return action.payload;
    },
    // extraReducers: {
    //   setTickers(state, action) {
    //     return action.payload;
    //     // console.log(action.payload);
    //   },
  },
});

export const store = configureStore({
  reducer: { tickers: mySlice.reducer },
});

export const { setTickers } = mySlice.actions;

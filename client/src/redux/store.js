import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

// export const fetchTickers = async () => {
//   socket.emit("start");
//   socket.on("ticker", (resp) => {

//   });
// };

// const asyncFetchTickers = createAsyncThunk("tickers/fetchTickers", async () => {
//   const asyncTickers = await fetchTickers();
//   console.log(asyncFetchTickers);
//   return asyncFetchTickers;
// });
// const fetchTickers = createAsyncThunk();

// export const getTickers = createAsyncThunk(
//   "tickers / getTickers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const tickers = await fetchTickets();
//       return tickers;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const getTickers = createAsyncThunk(
//   "tickers",
//   async (userId, thunkAPI) => {
//     const tickers = await fetchTickets();
//     // console.log(tickers);
//     return tickers;
//   }
// );

const mySlice = createSlice({
  name: "tickers",
  initialState: [],
  reducers: {
    setTickers(state, action) {
      return action.payload;
    },
  },
  // extraReducers: (fetchTickers) => {
  //   // Add reducers for additional action types here, and handle loading state as needed
  //   fetchTickers.addCase(asyncFetchTickers.fulfilled, (state, action) => {
  //     // Add user to the state array
  //     console.log(action.payload);
  //     // state.push(action.payload);
  //   });
  // },
});

export const store = configureStore({
  reducer: { tickers: mySlice.reducer },
});

export const { setTickers } = mySlice.actions;
// export const { getTickers } = mySlice.actions;

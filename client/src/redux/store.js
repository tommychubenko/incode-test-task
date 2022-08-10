import { configureStore, createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "tickers",
  initialState: [],
  reducers: {
    setTickers(state, action) {
      // console.log(action.payload.map());
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: { tickers: mySlice.reducer },
});

export const { setTickers } = mySlice.actions;

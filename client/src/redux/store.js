import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { fetchTickers } from "./tickersApi";

// export const fetchTickersData = createAsyncThunk(
//   "tickers/fetchTickersData",
//   async (payload, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await fetchTickers();
//       console.log(response);
//       return response; // Return a value synchronously using Async-await
//     } catch (err) {
//       if (!err.response) {
//         throw err;
//       }
//       return rejectWithValue(err.response);
//     }
//   }
// );

export const fetchTickersData = createAsyncThunk(
  "tickers/fetchTickersData",
  async (payload, { dispatch }) => {
    const r = await fetchTickers();
    console.log(r);
    return r;
  }
);

const mySlice = createSlice({
  name: "tickers",
  initialState: [],

  reducers: {
    // setTickers(state, action) {
    //   return action.payload;
    // },
  },

  extraReducers: {
    [fetchTickersData.fulfilled]: (state, action) => {
      state = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: { tickers: mySlice.reducer },
});

export const { setTickers } = mySlice.actions;

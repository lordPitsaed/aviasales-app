import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sort: "cheapest",
  },
  reducers: {
    setFilter: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setFilter } = sortSlice.actions;

export default sortSlice.reducer;

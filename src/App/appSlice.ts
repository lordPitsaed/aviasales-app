import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import aviasalesService from "../aviasales-service";
import { Status } from "../enum";
const initialState: appState = {
  searchId: "",
  status: Status.IDLE,
  error: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.searchId = action.payload;
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        if (action.error !== undefined) {
          state.error = state.error.concat(action.error);
        }
      });
  },
});

export const fetchSearchId = createAsyncThunk("app/fetchSearchId", async () => {
  return aviasalesService.getSearchId();
});

export default appSlice.reducer;

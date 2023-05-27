import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./App/appSlice";
import filterReducer from "./components/filters/filtersSlice";
import sortReducer from "./components/sort/sortSlice";
import ticketListReducer from "./components/ticket-list/ticketListSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    ticketList: ticketListReducer,
    app: appReducer,
    sort: sortReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

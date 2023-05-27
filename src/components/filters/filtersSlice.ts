import { createSlice } from "@reduxjs/toolkit";
import { FiltersType } from "../../react-app-env";
import { RootState } from "../../store";

//helper
const checkAllFilters = (filters: FiltersType) => {
  return (
    filters.oneTransfer &&
    filters.twoTransfers &&
    filters.threeTransfers &&
    filters.noTransfer
  );
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: {
      all: true,
      noTransfer: true,
      oneTransfer: true,
      twoTransfers: true,
      threeTransfers: true,
    },
  },
  reducers: {
    allFilters: ({ filters }) => {
      if (filters.all) {
        filters.noTransfer = false;
        filters.oneTransfer = false;
        filters.twoTransfers = false;
        filters.threeTransfers = false;
        filters.all = false;
      } else {
        filters.noTransfer = true;
        filters.oneTransfer = true;
        filters.twoTransfers = true;
        filters.threeTransfers = true;
        filters.all = true;
      }
    },
    noTransfer: ({ filters }) => {
      filters.noTransfer = !filters.noTransfer;
      filters.all = checkAllFilters(filters);
    },
    oneTransfer: ({ filters }) => {
      filters.oneTransfer = !filters.oneTransfer;
      filters.all = checkAllFilters(filters);
    },
    twoTransfers: ({ filters }) => {
      filters.twoTransfers = !filters.twoTransfers;
      filters.all = checkAllFilters(filters);
    },
    threeTransfers: ({ filters }) => {
      filters.threeTransfers = !filters.threeTransfers;
      filters.all = checkAllFilters(filters);
    },
  },
});

export const {
  allFilters,
  noTransfer,
  oneTransfer,
  twoTransfers,
  threeTransfers,
} = filterSlice.actions;

export const selectFilters = (state: RootState) => state.filter.filters;

export default filterSlice.reducer;

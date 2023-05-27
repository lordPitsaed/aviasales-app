import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./filters.module.scss";
import {
  allFilters,
  noTransfer,
  oneTransfer,
  selectFilters,
  threeTransfers,
  twoTransfers,
} from "./filtersSlice";

const Filters: React.FC = () => {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  return (
    <div className={classes.filters}>
      <div className={classes.filtersHeader}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <label className={classes.checkbox}>
        <input
          type="checkbox"
          onChange={() => {
            dispatch(allFilters());
          }}
          checked={
            filters.noTransfer &&
            filters.oneTransfer &&
            filters.twoTransfers &&
            filters.threeTransfers
          }
        ></input>
        <span>Все</span>
      </label>
      <label className={classes.checkbox}>
        <input
          type="checkbox"
          onChange={() => {
            dispatch(noTransfer());
          }}
          checked={filters.noTransfer}
        ></input>
        <span>Без пересадок</span>
      </label>
      <label className={classes.checkbox}>
        <input
          type="checkbox"
          onChange={() => {
            dispatch(oneTransfer());
          }}
          checked={filters.oneTransfer}
        ></input>
        <span>1 пересадка</span>
      </label>
      <label className={classes.checkbox}>
        <input
          type="checkbox"
          onChange={() => {
            dispatch(twoTransfers());
          }}
          checked={filters.twoTransfers}
        ></input>
        <span>2 пересадки</span>
      </label>
      <label className={classes.checkbox}>
        <input
          type="checkbox"
          onChange={() => {
            dispatch(threeTransfers());
          }}
          checked={filters.threeTransfers}
        ></input>
        <span>3 пересадки</span>
      </label>
    </div>
  );
};

export default Filters;

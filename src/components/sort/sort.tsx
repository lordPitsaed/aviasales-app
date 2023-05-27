import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import classes from "./sort.module.scss";
import { setFilter } from "./sortSlice";
const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const selectSort = useSelector((state: RootState) => state.sort.sort);
  return (
    <div className={classes.sort}>
      <button
        className={`${selectSort === "cheapest" && classes.activeButton}`}
        onClick={() => {
          dispatch(setFilter("cheapest"));
        }}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`${selectSort === "fastest" && classes.activeButton}`}
        onClick={() => {
          dispatch(setFilter("fastest"));
        }}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={`${selectSort === "optimal" && classes.activeButton}`}
        onClick={() => {
          dispatch(setFilter("optimal"));
        }}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
};

export default Sort;

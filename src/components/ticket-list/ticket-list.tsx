import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ticket as TicketType } from "../../react-app-env";
import { RootState } from "../../store";
import Ticket from "../ticket/ticket";
import classes from "./ticket-list.module.scss";
import { getSet } from "./ticketListSlice";

const TicketList: React.FC = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(
    (state: RootState) => state.ticketList.ticketsToRender
  );
  const lastTicket = useSelector(
    (state: RootState) => state.ticketList.currentLastTicket
  );
  const canRender = useSelector(
    (state: RootState) => state.ticketList.canRender
  );
  const filters = useSelector((state: RootState) => state.filter.filters);
  const selectSort = useSelector((state: RootState) => state.sort.sort);
  const status = useSelector((state: RootState) => state.ticketList.status);

  const [canShowNothingFound, setCanShowNothingFound] =
    useState<boolean>(false);

  useEffect(() => {
    if (canRender) {
      dispatch(
        getSet({ filter: filters, setLength: lastTicket, sort: selectSort })
      );
      setCanShowNothingFound(true);
    }
  }, [dispatch, canRender, filters, selectSort, status]);

  if (tickets.length === 0 && canShowNothingFound) {
    return <div>Рейсов, подходящих под заданные фильтры, не найдено</div>;
  }

  return (
    <Spin spinning={tickets.length === 0} tip={"Getting Tickets..."}>
      <ul className={classes.ticketList}>
        {tickets.map((ticket: TicketType) => {
          return <Ticket ticket={ticket} key={ticket.key}></Ticket>;
        })}
      </ul>
      <button
        className={classes.showMoreButton}
        onClick={() => {
          dispatch(
            getSet({
              filter: filters,
              setLength: lastTicket + 10,
              sort: selectSort,
            })
          );
        }}
      >
        Загрузить ещё 10 билетов
      </button>
    </Spin>
  );
};

export default TicketList;

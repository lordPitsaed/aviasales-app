import { nanoid } from '@reduxjs/toolkit';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Ticket as TicketType } from '../../react-app-env';
import { RootState } from '../../store';
import Ticket from '../ticket/ticket';
import { filterSegments } from './ticket-list-helpers';
import classes from './ticket-list.module.scss';

const TicketList: React.FC = () => {
  const tickets = useSelector((state: RootState) => state.ticketList.tickets);
  const canRender = useSelector(
    (state: RootState) => state.ticketList.canRender
  );
  const filters = useSelector((state: RootState) => state.filter.filters);
  const selectSort = useSelector((state: RootState) => state.sort.sort);

  const [lastTicket, setLastTicket] = useState(10);
  const [readyTickets, setReadyTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    const ticketsSet: TicketType[] = [];
    if (canRender && tickets.length > 0) {
      const filteredTickets = filterSegments(tickets, filters, selectSort);
      ticketsSet.push(...filteredTickets.slice(0, lastTicket));
      setReadyTickets(ticketsSet);
    }
  }, [tickets, filters, selectSort, lastTicket]);

  if (readyTickets.length === 0) {
    return <div>Рейсов, подходящих под заданные фильтры, не найдено</div>;
  }
  return (
    <Spin spinning={tickets.length === 0} tip={'Getting Tickets...'}>
      <ul className={classes.ticketList}>
        {readyTickets.map((ticket) => {
          return <Ticket ticket={ticket} key={nanoid()} />;
        })}
      </ul>
      <button
        className={classes.showMoreButton}
        onClick={() => {
          setLastTicket(() => lastTicket + 10);
        }}
      >
        Загрузить ещё 10 билетов
      </button>
    </Spin>
  );
};

export default TicketList;

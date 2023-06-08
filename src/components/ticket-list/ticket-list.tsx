import { Spin } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
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
  const [showNothing, setShowNothing] = useState(false);

  const filteredTickets = useMemo(
    () => filterSegments(tickets, filters, selectSort),
    [tickets, filters, selectSort]
  );

  const generateKey = (tickets: TicketType[], ticket: TicketType) => {
    let key = JSON.stringify(ticket);
    const arrRemainder = tickets.slice(tickets.indexOf(ticket) + 1);
    arrRemainder.map((curr) => {
      if (JSON.stringify(curr) === JSON.stringify(ticket)) {
        console.log('dupe');
        key += 'dupe';
      }
    });
    return key;
  };

  useEffect(() => {
    const ticketsSet: TicketType[] = [];
    if (canRender && tickets.length > 0) {
      ticketsSet.push(...filteredTickets.slice(0, lastTicket));
      ticketsSet.length === 0 ? setShowNothing(true) : setShowNothing(false);
      setReadyTickets(ticketsSet);
    }
  }, [tickets, filters, selectSort, lastTicket]);

  if (readyTickets.length === 0 && showNothing) {
    return <div>Рейсов, подходящих под заданные фильтры, не найдено</div>;
  }
  return (
    <Spin
      spinning={readyTickets.length === 0}
      tip={'Получаем первую пачку билетов...'}
    >
      <ul className={classes.ticketList}>
        {readyTickets.map((ticket) => {
          return (
            <Ticket ticket={ticket} key={generateKey(readyTickets, ticket)} />
          );
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

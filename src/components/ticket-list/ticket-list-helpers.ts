import { FiltersType, Ticket } from '../../react-app-env';

export const filterToCode = (filter: string) => {
  if (filter === 'noTransfer') return 0;
  if (filter === 'oneTransfer') return 1;
  if (filter === 'twoTransfers') return 2;
  if (filter === 'threeTransfers') return 3;
};

export const sortTickets = (tickets: Ticket[], sort: string) => {
  const result = tickets;
  if (sort === 'cheapest') {
    return result.sort((a: Ticket, b: Ticket) => {
      return a.price - b.price;
    });
  }
  if (sort === 'fastest') {
    return result.sort((a: Ticket, b: Ticket) => {
      return (
        a.segments.reduce((acc, current) => acc + current.duration, 0) -
        b.segments.reduce((acc, current) => acc + current.duration, 0)
      );
    });
  }
  if (sort === 'optimal') {
    const maxPrice = Math.max(...tickets.map((ticket) => ticket.price));
    const maxDuration = Math.max(
      ...tickets.map((ticket) =>
        ticket.segments.reduce((acc, current) => acc + current.duration, 0)
      )
    );
    return result.sort((a: Ticket, b: Ticket) => {
      const aTotalDuration = a.segments.reduce(
        (acc, current) => acc + current.duration,
        0
      );
      const bTotalDuration = b.segments.reduce(
        (acc, current) => acc + current.duration,
        0
      );
      const aOptimalCoeff = a.price / maxPrice + aTotalDuration / maxDuration;
      const bOptimalCoeff = b.price / maxPrice + bTotalDuration / maxDuration;
      return aOptimalCoeff - bOptimalCoeff;
    });
  }
  return result;
};

export const filterSegments = (
  tickets: Ticket[],
  filters: FiltersType,
  sort: string
) => {
  console.log(tickets);
  const result: Ticket[] = [];
  if (filters.all) {
    result.push(...tickets);
    return sortTickets(result, sort);
  }

  let filter: keyof FiltersType;

  for (filter in filters) {
    if (filters[filter]) {
      const filterCode = filterToCode(filter);
      const filteredTickets = tickets.filter((ticket: Ticket) => {
        return (
          ticket.segments[0].stops.length === filterCode ||
          ticket.segments[1].stops.length === filterCode
        );
      });
      result.push(...filteredTickets);
    }
  }

  return sortTickets(Array.from(new Set(result)), sort);
};

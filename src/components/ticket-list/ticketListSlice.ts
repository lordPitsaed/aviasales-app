import {
  createAsyncThunk,
  createSlice,
  current,
  nanoid,
} from "@reduxjs/toolkit";
import aviasalesService from "../../aviasales-service";
import { Status } from "../../enum";
import { FiltersType, Ticket } from "../../react-app-env";
const initialState: ticketListState = {
  tickets: [],
  stop: false,
  status: Status.IDLE,
  error: [],
  ticketsToRender: [],
  currentLastTicket: 10,
  canRender: false,
};

//helper
const filterToCode = (filter: string) => {
  if (filter === "noTransfer") return 0;
  if (filter === "oneTransfer") return 1;
  if (filter === "twoTransfers") return 2;
  if (filter === "threeTransfers") return 3;
};

//helper
const sortTickets = (tickets: Ticket[], sort: string) => {
  const result = tickets;
  if (sort === "cheapest") {
    return result.sort((a: Ticket, b: Ticket) => a.price - b.price);
  }
  if (sort === "fastest") {
    return result.sort(
      (a: Ticket, b: Ticket) =>
        a.segments.reduce((acc, current) => acc + current.duration, 0) -
        b.segments.reduce((acc, current) => acc + current.duration, 0)
    );
  }
  if (sort === "optimal") {
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
//helper
const filterSegments = (
  tickets: Ticket[],
  filters: FiltersType,
  sort: string
) => {
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
  return sortTickets(result, sort);
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    getSet(state, action) {
      state.ticketsToRender = filterSegments(
        current(state).tickets,
        action.payload.filter,
        action.payload.sort
      ).slice(0, action.payload.setLength);
      state.currentLastTicket = action.payload.setLength;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        const markedTickets = action.payload.tickets.map((ticket: Ticket) => {
          ticket["key"] = nanoid();
          return ticket;
        });
        state.tickets = state.tickets.concat(markedTickets);
        state.stop = action.payload.stop;
        state.status = Status.IDLE;
        state.canRender = true;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = state.error.concat(action.error);
        state.status = Status.IDLE;
      });
  },
});

export const { getSet } = ticketListSlice.actions;

export const fetchTickets = createAsyncThunk(
  "ticketList/fetchTickets",
  async (searchId: string) => {
    return aviasalesService.getTicketPack(searchId);
  }
);

export default ticketListSlice.reducer;

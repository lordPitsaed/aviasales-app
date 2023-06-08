import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import aviasalesService from '../../aviasales-service';
import { Status } from '../../enum';
const initialState: ticketListState = {
  tickets: [],
  stop: false,
  status: Status.IDLE,
  error: [],
  canRender: false,
};

const ticketListSlice = createSlice({
  name: 'ticketList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        const markedTickets = action.payload.tickets.map((ticket) => {
          ticket['key'] = nanoid();
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

export const fetchTickets = createAsyncThunk(
  'ticketList/fetchTickets',
  async (searchId: string) => {
    return aviasalesService.getTicketPack(searchId);
  }
);

export default ticketListSlice.reducer;

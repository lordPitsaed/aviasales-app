/// <reference types="react-scripts" />

import { SerializedError } from "@reduxjs/toolkit";
import { Status } from "./enum";

interface FiltersType {
  all: boolean;
  noTransfer: boolean;
  oneTransfer: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
}

interface SearchId {
  searchId: string;
}

interface Segment {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

interface Ticket {
  price: number;
  carrier: string;
  segments: [Segment, Segment];
  key?: string;
}

interface TicketPack {
  tickets: Ticket[];
  stop: boolean;
}

declare global {
  interface ticketListState {
    tickets: Ticket[];
    stop: boolean;
    status: Status;
    error: SerializedError[];
    ticketsToRender: Ticket[];
    currentLastTicket: 10;
    canRender: boolean;
  }

  interface appState {
    searchId: string;
    status: Status;
    error: SerializedError[];
  }
}

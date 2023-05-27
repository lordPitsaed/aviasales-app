import React from "react";
import { Ticket as TicketType } from "../../react-app-env";
import Segment from "../segment/segment";
import classes from "./ticket.module.scss";

let id = 0; //refactor this, only for testing
const formatPrice = (price: string) => {
  return price.length > 4 ? `${price.slice(0, -3)} ${price.slice(-3)}` : price;
};

const Ticket: React.FC<{
  ticket: TicketType;
}> = ({ ticket }) => {
  const { price, segments } = ticket;
  return (
    <li className={classes.ticket}>
      <div className={classes.ticketHeader}>
        <span className={classes.price}>{`${formatPrice(
          String(price)
        )} P`}</span>
        <img
          className={classes.airlineLogo}
          alt="airline logo"
          src={`https://pics.avs.io/110/36/${ticket.carrier}.png`}
        ></img>
      </div>
      {segments.map((segment) => {
        return <Segment key={++id} segment={segment} />;
      })}
    </li>
  );
};

export default Ticket;

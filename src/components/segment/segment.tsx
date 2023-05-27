import { add, format } from "date-fns";
import React from "react";
import { Segment as SegmentType } from "../../react-app-env";
import classes from "./segment.module.scss";

const Segment: React.FC<{ segment: SegmentType }> = ({ segment }) => {
  const formatStops = (numberOfStops: number) => {
    switch (numberOfStops) {
      case 0:
        return "БЕЗ ПЕРЕСАДОК";
      case 1:
        return `${numberOfStops} ПЕРЕСАДКА`;
      case 2 || 3 || 4:
        return `${numberOfStops} ПЕРЕСАДКИ`;
      default:
        return `${numberOfStops} ПЕРЕСАДОК`;
    }
  };

  const formatDuration = (time: number) => {
    return `${Math.floor(time / 60)}ч ${time % 60}м`;
  };

  const formatDates = (date: string, duration: number) => {
    const originDate = new Date(date);
    const destDate = add(originDate, { minutes: duration });
    const originFormat = format(originDate, "kk:mm");
    const destFormat = format(destDate, "kk:mm");
    return `${originFormat} - ${destFormat}`;
  };

  return (
    <div className={classes.route}>
      <div className={classes.tableRow}>
        <div
          className={classes.tableHeader}
        >{`${segment.origin} - ${segment.destination}`}</div>
        <div className={classes.tableHeader}>В ПУТИ</div>
        <div className={classes.tableHeader}>
          {formatStops(segment.stops.length)}
        </div>
      </div>
      <div className={classes.tableRow}>
        <div className={classes.tableCell}>
          {formatDates(segment.date, segment.duration)}
        </div>
        <div className={classes.tableCell}>
          {formatDuration(segment.duration)}
        </div>
        <div className={classes.tableCell}>{segment.stops.join(", ")}</div>
      </div>
    </div>
  );
};

export default Segment;

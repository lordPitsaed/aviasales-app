import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../components/filters/filters";
import Sort from "../components/sort/sort";
import TicketList from "../components/ticket-list/ticket-list";
import { fetchTickets } from "../components/ticket-list/ticketListSlice";
import { AppDispatch, RootState } from "../store";
import classes from "./App.module.scss";
import { fetchSearchId } from "./appSlice";
import logo from "./logo.svg";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const appStatus = useSelector((state: RootState) => state.app.status);
  const searchId = useSelector((state: RootState) => state.app.searchId);
  const stopFlag = useSelector((state: RootState) => state.ticketList.stop);
  const errorTicketFlag = useSelector(
    (state: RootState) => state.ticketList.error.length > 0
  );
  const ticketStatus = useSelector(
    (state: RootState) => state.ticketList.status
  );

  const searchIdError = useSelector(
    (state: RootState) => state.app.error.length > 0
  );

  const [errorShown, setErrorShown] = useState<boolean>(true);

  useEffect(() => {
    if (appStatus === "idle") {
      dispatch(fetchSearchId());
    }
  }, [appStatus, dispatch]);

  useEffect(() => {
    if (
      appStatus === "succeeded" &&
      ticketStatus === "idle" &&
      stopFlag === false
    ) {
      dispatch(fetchTickets(searchId));
    }
  }, [appStatus, ticketStatus, dispatch, stopFlag]);

  if (searchIdError) {
    return (
      <div className={classes.App}>
        <div className={classes.appError}>
          Произошла ошибка при получении SearchId. Работа приложения далее
          невозможна. Попробуйте обновить страницу, если ошибка сохранится
          сообщите нам.
        </div>
      </div>
    );
  }

  return (
    <div className={classes.App}>
      <div className={classes.dataLoad}>
        {errorShown && errorTicketFlag && (
          <div className={classes.dataLoadError}>
            При получении некоторых билетов, возникла ошибка. Попробуйте
            обновить страницу, если ошибка сохранится сообщите нам.
            <button
              className={classes.closeError}
              onClick={() => {
                setErrorShown(false);
              }}
            ></button>
          </div>
        )}
        <div
          style={{ display: stopFlag ? `none` : `flex` }}
          className={classes.dataLoadInfo}
        >
          <span className={classes.infoText}>
            Получаем билеты, конечные результаты могут отличаться...
          </span>
          <Spin></Spin>
        </div>
      </div>
      <img src={logo} alt="logo" className={classes.logo}></img>
      <Spin
        spinning={appStatus === "loading"}
        size="large"
        tip="Getting SearchID..."
        wrapperClassName={classes.loadingWrapper}
      >
        <div className={classes.main}>
          <Filters></Filters>
          <div className={classes.column}>
            <Sort />
            <TicketList />
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default App;

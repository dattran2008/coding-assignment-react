import { useEffect, useState, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Ticket } from "./models/index";
import styles from "./app.module.css";

import Tickets from "./features/tickets/tickets";
import TicketDetails from "./features/ticket-details/ticket-details";

const App = () => {
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).

  return (
    <div className={styles["app"]}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Tickets />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </div>
  );
};

export default App;

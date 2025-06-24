import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Ticket } from "./models/index";
import styles from "./app.module.css";

import Tickets from "./features/tickets/tickets";
import TicketDetails from "./features/ticket-details/ticket-details";

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);

  async function fetchTickets() {
    const response = await fetch("/api/tickets");
    const data = await response.json();
    setTickets(data);
  }

  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className={styles["app"]}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { User } from "@acme/shared-models";
import { Ticket } from "./models/index";

import styles from "./app.module.css";
import Tickets from "./features/tickets/tickets";

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch("/api/tickets").then();
      setTickets(await data.json());
    }

    async function fetchUsers() {
      const data = await fetch("/api/users").then();
      setUsers(await data.json());
    }

    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <div className={styles["app"]}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<h2>Details Not Implemented</h2>} />
      </Routes>
    </div>
  );
};

export default App;

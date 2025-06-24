import { useState } from "react";
import { Ticket } from "../../models/index";
import styles from "./tickets.module.css";
import TicketItem from "./items/items";

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets(props: TicketsProps) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filter, setFilter] = useState("All");

  return (
    <div className={styles["tickets"]}>
      <h2>Tickets</h2>
      {props.tickets ? (
        <div className="space-y-3">
          {props.tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              onSelect={setSelectedTicket}
            />
          ))}
        </div>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;

import { useState, useEffect } from "react";
import TicketItem from "./items/items";
import FilterBar from "../../components/filter";
import CreateTicketModal from "../ticket-create/create";
import { Ticket } from "../../models/index";
import { User } from "@acme/shared-models";
import { assignTicket } from "../../api/tickets";

export interface TicketsProps {
  tickets: Ticket[];
}

const Tickets = (props: TicketsProps) => {
  const [users, setUsers] = useState([] as User[]);
  const [ticketList, setTicketList] = useState<Ticket[]>(props.tickets);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const handleCreateTicket = async (data: {
    title: string;
    description: string;
    assigneeId: string;
  }) => {
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const newTicket = await response.json();
    if (newTicket.id) {
      const result = await assignTicket(
        newTicket.id,
        parseInt(data.assigneeId)
      );
      result.ok &&
        setTicketList([
          ...ticketList,
          { ...newTicket, assigneeId: data.assigneeId },
        ]);
    }
    setShowModal(false);
  };

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    switch (filter) {
      case "Open":
        const openData = props.tickets.filter((item) => !item.completed);
        setTicketList(openData);
        break;
      case "Completed":
        const completedData = props.tickets.filter((item) => item.completed);
        setTicketList(completedData);
        break;
      default:
        setTicketList(props.tickets);
    }
  }, [filter, props.tickets]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Ticket Manager</h1>
      <div className="flex justify-between items-center mb-4">
        <FilterBar selected={filter} onChange={setFilter} />
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          + Create New Ticket
        </button>
      </div>
      <div className="space-y-3">
        {ticketList.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
      {showModal && (
        <CreateTicketModal
          assignees={users}
          onCreate={handleCreateTicket}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Tickets;

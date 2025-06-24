import { useState, useEffect } from "react";
import TicketItem from "./items/items";
import FilterBar from "../../components/filter";
import CreateTicketModal from "../ticket-create/create";
import { Ticket } from "../../models/index";
import { User } from "@acme/shared-models";
import { assignTicket } from "../../api/tickets";

const Tickets = () => {
  const [users, setUsers] = useState([] as User[]);
  const [ticketList, setTicketList] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const handleMapUser = (ticketsData: Ticket[], usersData: User[]) => {
    return ticketsData.map((ticket: any) => {
      const user = usersData.find((u: any) => u.id === ticket.assigneeId);
      return { ...ticket, assigneeName: user?.name ?? "Unknown" };
    });
  };

  const handleCreateTicket = async (data: {
    title: string;
    description: string;
    assigneeId: string;
  }) => {
    const assigneeId = parseInt(data.assigneeId);
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const newTicket = await response.json();
    if (newTicket.id) {
      const result = await assignTicket(newTicket.id, assigneeId);
      if (result.ok) {
        const newData = handleMapUser(
          [...ticketList, { ...newTicket, assigneeId }],
          users
        );
        setTicketList(newData);
      }
    }
    setShowModal(false);
  };

  const fetchTickets = async () => {
    const response = await fetch("/api/tickets");
    const data = await response.json();
    return data;
  };

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
  };

  const fetchAll = async () => {
    const [usersData, ticketsData] = await Promise.all([
      fetchUsers(),
      fetchTickets(),
    ]);

    const newTicketList = handleMapUser(ticketsData, usersData);
    setUsers(usersData);
    setTicketList(newTicketList);
  };

  useEffect(() => {
    switch (filter) {
      case "Open":
        const openData = ticketList.filter((item) => !item.completed);
        setTicketList(openData);
        break;
      case "Completed":
        const completedData = ticketList.filter((item) => item.completed);
        setTicketList(completedData);
        break;
      default:
        setTicketList(ticketList);
    }
  }, [filter, ticketList]);

  useEffect(() => {
    fetchAll();
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

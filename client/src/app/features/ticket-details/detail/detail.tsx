import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../../api/users";
import { Ticket } from "../../../models/index";

import TicketStatusBadge from "client/src/app/components/badge";

const TicketDetails = ({
  ticket,
  onMarkComplete,
}: {
  ticket: Ticket;
  onMarkComplete: () => void;
}) => {
  const {
    data: assignee,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", ticket.assigneeId],
    queryFn: () => fetchUserById(ticket.assigneeId),
    enabled: !!ticket.assigneeId,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">Ticket Detail</h2>
      <p className="mb-2 text-gray-600">
        Description: {ticket.description || "No description provided."}
      </p>
      <label className="block mb-2 font-medium">
        <span className="mr-1">Status:</span>
        <TicketStatusBadge status={ticket.completed ? "Completed" : "Open"} />
      </label>
      <label className="block mb-2 font-medium">
        <span className="mr-1">Assignee:</span>
        <span>{isLoading ? "Loading..." : assignee?.name}</span>
      </label>
      <button
        className={`${
          ticket.completed ? "bg-gray-300" : "bg-green-600"
        } w-full text-white py-2 px-4 rounded`}
        disabled={ticket.completed}
        onClick={onMarkComplete}
      >
        Mark as Complete
      </button>
      <button
        className="block mt-4 text-blue-500"
        onClick={() => window.history.back()}
      >
        ← Back to list
      </button>
    </div>
  );
};

export default TicketDetails;

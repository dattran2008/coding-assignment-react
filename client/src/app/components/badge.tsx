import { Ticket } from "./../models/index";

const TicketStatusBadge = ({ status }: { status: Ticket["status"] }) => {
  const style = {
    Open: "bg-gray-200 text-gray-800",
    "In Progress": "bg-yellow-200 text-yellow-800",
    Completed: "bg-green-200 text-green-800",
  }[status];

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${style}`}>
      {status?.toUpperCase()}
    </span>
  );
};

export default TicketStatusBadge;

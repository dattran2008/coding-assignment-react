import { Ticket } from "../../../models/index";
import TicketStatusBadge from "../../../components/badge";

const TicketItem = ({
  ticket,
  onSelect,
}: {
  ticket: Ticket;
  onSelect: (t: Ticket) => void;
}) => {
  return (
    <div
      className="flex justify-between items-center bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
      onClick={() => onSelect(ticket)}
    >
      <div>
        <h3 className="text-lg font-medium">Ticket: {ticket.id}</h3>
        <p className="text-sm text-gray-500">👤 {ticket.description}</p>
      </div>
      <div className="flex items-center gap-4">
        <TicketStatusBadge status={ticket.status} />
        <span className="text-blue-600 text-sm">View</span>
      </div>
    </div>
  );
};

export default TicketItem;

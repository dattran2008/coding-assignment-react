import { useNavigate } from "react-router-dom";
import { Ticket } from "../../../models/index";
import TicketStatusBadge from "../../../components/badge";

const TicketItem = ({ ticket }: { ticket: Ticket }) => {
  const navigate = useNavigate();
  const onSelectTicket = () => {
    navigate(`/${ticket.id}`);
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded shadow">
      <div>
        <h3 className="text-lg font-medium">Ticket: {ticket.id}</h3>
        <p className="text-md text-gray-500">
          <span style={{ fontSize: "20px" }}>&#128366;</span>
          <span className="ml-1">{ticket.description}</span>
        </p>
        <p className="text-sm text-gray-500">👤 {ticket.assigneeId}</p>
      </div>
      <div className="flex items-center gap-4">
        <TicketStatusBadge status={ticket.status} />
        <span
          className="text-blue-600 text-sm cursor-pointer"
          onClick={onSelectTicket}
        >
          View
        </span>
      </div>
    </div>
  );
};

export default TicketItem;

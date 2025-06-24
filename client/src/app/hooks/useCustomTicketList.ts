import { useTickets } from "./useTickets";
import { useUsers } from "./useUsers";
import { useMemo } from "react";

export const useTicketsWithAssignee = () => {
  const { data: tickets, isLoading: loadingTickets } = useTickets();
  const { data: users, isLoading: loadingUsers } = useUsers();

  const userMap = useMemo(
    () => Object.fromEntries(users?.map((user) => [user.id, user.name]) || []),
    [users]
  );

  const newTicketList = useMemo(() => {
    if (!tickets) {
      return [];
    }
    return tickets.map((ticket, index) => ({
      ...ticket,
      assigneeName: userMap[ticket?.assigneeId || index] || "Unassigned",
    }));
  }, [tickets, userMap]);

  return {
    data: newTicketList,
    // isLoading: loadingTickets || loadingUsers,
  };
};

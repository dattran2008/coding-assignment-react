export const fetchTicketDetail = async (id: any) => {
  try {
    const res = await fetch(`/api/tickets/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const assignTicket = async (ticketId: number, userId: number) => {
  const res = await fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Something error, please try again.");
  }
  return res;
};

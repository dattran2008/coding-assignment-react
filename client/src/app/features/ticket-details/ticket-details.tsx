import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Ticket } from "../../models/index";
import { fetchTicketDetail } from "../../api/tickets";

import TicketDetail from "./detail/detail";

export interface TicketDetailsProps {}

export function TicketDetails(props: TicketDetailsProps) {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const markTicketComplete = async () => {
    try {
      const res = await fetch(`/api/tickets/${id}/complete`, {
        method: "PUT",
      });
      if (!res.ok) {
        throw new Error("Something error, please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkTicket = useMutation({
    mutationFn: markTicketComplete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", id] });
    },
  });

  const { data: ticket } = useQuery<Ticket>({
    queryKey: ["ticket", id],
    queryFn: () => fetchTicketDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {!ticket ? (
        <div>Loading...</div>
      ) : (
        <TicketDetail
          ticket={ticket}
          onMarkComplete={handleMarkTicket.mutate}
        />
      )}
    </div>
  );
}

export default TicketDetails;

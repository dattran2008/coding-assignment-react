import type { Ticket as BaseTicket } from "@acme/shared-models";

export interface Ticket extends BaseTicket {
  status: "Open" | "In Progress" | "Completed";
  title?: string;
  assignee?: string;
}

import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TicketDetails from "./ticket-details";

describe("TicketDetails", () => {
  it("should render successfully", () => {
    const queryClient = new QueryClient();
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <TicketDetails />
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});

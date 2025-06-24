import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import Tickets from "./tickets";

describe("Tickets", () => {
  it("should render successfully", () => {
    const queryClient = new QueryClient();
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <Tickets />
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});

describe("Ticket List", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("/api/tickets")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: 1,
                title: "Fix bug",
                description: "Fix login issue",
                completed: false,
                assigneeId: null,
              },
              {
                id: 2,
                title: "Add feature",
                description: "Add dark mode",
                completed: true,
                assigneeId: 3,
              },
            ]),
        });
      }

      if (url.includes("/api/users")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { id: 1, name: "Alice" },
              { id: 3, name: "Bob" },
            ]),
        });
      }
      return Promise.reject("Unknown URL");
    });
  });

  it("should renders list of tickets", async () => {
    render(
      <MemoryRouter>
        <Tickets />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Fix login issue")).toBeInTheDocument();
      expect(screen.getByText("Add dark mode")).toBeInTheDocument();
    });
  });
});

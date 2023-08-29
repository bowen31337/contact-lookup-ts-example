import React from "react";
import { render, screen } from "../../test-utils";
import { ContactList } from "./ContactList";

const mockContacts = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    avatarImage: "https://example.com/avatar.jpg",
  }
];

describe("ContactList", () => {
  test("renders a list of contacts", () => {
    render(<ContactList contacts={mockContacts} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
  });
});

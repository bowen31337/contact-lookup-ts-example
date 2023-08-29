import React from "react";
import { render, fireEvent, screen } from "../../test-utils";
import { SearchBar } from "./SearchBar";
import * as ContactContextModule from "../../context/ContactContext";
import { ContactContextProps } from "../../context";

const mockContacts = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    avatarImage: "https://example.com/avatar.jpg",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "098-765-4321",
    avatarImage: "https://example.com/avatar2.jpg",
  },
];

describe("SearchBar", () => {
  test("renders a search bar and filters contacts based on search query", () => {
    const contextValue: ContactContextProps = {
      contacts: mockContacts,
      isError: false,
      isLoading: false,
      errorMsg: "",
    };
    render(<SearchBar />, {
      contextValue,
    });

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Jane" },
    });

    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
    expect(screen.getByText(/jane.doe@example.com/i)).toBeInTheDocument();
  });

  test("renders a loading text on search before payload is ready", () => {
    const contextValue: ContactContextProps = {
      contacts: mockContacts,
      isError: false,
      isLoading: true,
      errorMsg: "",
    };
    render(<SearchBar />, {
      contextValue,
    });

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Jane" },
    });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders an error text on search when api fails", () => {
    const contextValue: ContactContextProps = {
      contacts: [],
      isError: true,
      isLoading: false,
      errorMsg: "API error",
    };
    render(<SearchBar />, {
      contextValue,
    });

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Jane" },
    });

    expect(screen.getByText(/API error/i)).toBeInTheDocument();
  });
});

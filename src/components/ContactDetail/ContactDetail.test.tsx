import { ContactContextProps } from "../../context";
import { render, screen } from "../../test-utils";
import { ContactDetail } from "./ContactDetail";
import { useParams } from "react-router-dom";
const mockContacts = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    avatarImage: "https://example.com/avatar.jpg",
  },
];

// Mocking the useParams hook

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));
describe("ContactDetail", () => {
  test("renders contact details when contact is found", () => {
    (useParams as jest.Mock).mockImplementation(() => ({ id: "1" }));
    render(<ContactDetail />, {
      contextValue: {
        contacts: mockContacts,
        isLoading: false,
        isError: false,
        errorMsg: "",
      } as ContactContextProps,
    });

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  });

  test("displays 'Contact not found.' message when contact is not found", () => {
    (useParams as jest.Mock).mockImplementation(() => ({ id: "2" }));
    render(<ContactDetail />, {
      contextValue: {
        contacts: mockContacts,
        isLoading: false,
        isError: false,
        errorMsg: "",
      } as ContactContextProps,
    });

    expect(screen.getByText("Contact not found.")).toBeInTheDocument();
  });
});

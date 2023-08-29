import React from "react";
import { ContactItem } from "./ContactItem";
import { useNavigate } from "react-router-dom";
import { render, fireEvent, screen } from "../../test-utils";

const mockContact = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  avatarImage: "https://example.com/avatar.jpg",
  phone: "0430 830 888",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
describe("ContactItem", () => {
  test("renders contact details", () => {
    render(<ContactItem contact={mockContact} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByAltText(/John Doe/i)).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg"
    );
  });

  test("navigates to contact detail page on click", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => navigate);

    render(<ContactItem contact={mockContact} />);
    fireEvent.click(screen.getByRole("button"));

    expect(navigate).toHaveBeenCalledWith("/contact/1");
  });
});

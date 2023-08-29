import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { ContactContextProps } from "./ContactContext.types";
import { Contact } from "../components";

export const ContactContext = createContext<ContactContextProps | undefined>(
  undefined
);

export const ContactProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false); // Add isError state
  const [errorMsg, setErrorMsg] = useState<string>(""); // Add errorMsg state

  useEffect(() => {
    setIsLoading(true);
    setIsError(false); // Reset error state before fetching

    axios
      .get<Contact[]>("/api")
      .then((response) => {
        setContacts(response.data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setIsError(true); // Set isError to true on error
        setErrorMsg("Error fetching contacts. Please try again."); // Set error message
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <ContactContext.Provider
      value={{ contacts, isLoading, isError, errorMsg }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export function useContactContext() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within a ContactProvider");
  }
  return context;
}

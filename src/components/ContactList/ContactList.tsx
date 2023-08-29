import React from "react";
import { Contact, ContactItem } from "../ContactItem";
import "./ContactList.css";

export const ContactList = (props: { contacts: Contact[] }) => {
  const { contacts } = props;
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact.id}>
          <ContactItem contact={contact} />
        </li>
      ))}
    </ul>
  );
};

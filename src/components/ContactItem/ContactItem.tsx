import React from "react";
import { ContactItemProps } from "./ContactItem.types";

import { useNavigate } from "react-router-dom";
import './ContactItem.css';

export const ContactItem = (props: ContactItemProps) => {
  const { contact } = props;
  const navigate = useNavigate();
  const goToContactDetail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/contact/${contact.id}`);
  };
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className="contact-card"
      onClick={goToContactDetail}
      href="#"
      role="button"
    >
      <img src={contact.avatarImage} alt={`${contact.firstName} ${contact.lastName}`} />
      <div>
        <h2>
          {contact.firstName} {contact.lastName}
        </h2>
        <p>{contact.email}</p>
      </div>
    </a>
  );
};
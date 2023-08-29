import React from "react";
import { useParams } from "react-router-dom";
import { useContactContext } from "../../context";
import "./ContactDetail.css";

export const ContactDetail = () => {
  const { contacts } = useContactContext();
  const { id = "" } = useParams<{ id: string }>();

  const contact = contacts.find((c) => c.id === parseInt(id, 10));

  return (
    <section className="contact-detail-section">
      {contact ? (
        <div className="contact-detail">
          <img
            src={contact.avatarImage}
            alt={`${contact.firstName} ${contact.lastName}`}
          />
          <div className="contact-info">
            <h2>
              {contact.firstName} {contact.lastName}
            </h2>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
          </div>
        </div>
      ) : (
        <p className="not-found-message">Contact not found.</p>
      )}
    </section>
  );
};

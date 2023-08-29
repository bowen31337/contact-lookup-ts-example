import React, { useEffect, useState } from "react";
import { useContactContext } from "../../context/ContactContext";
import { ContactList } from "../ContactList";
import { Contact } from "../ContactItem";
import "./SearchBar.css";

import { ReactComponent as SearchIcon } from "./SearchBar.svg";

export const SearchBar = () => {
  const { contacts, isLoading, isError, errorMsg } = useContactContext();
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredContacts, setFilterContacts] = useState<Contact[]>([]);

  const filterContacts = (query:string) =>{
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(query.toLowerCase())
    );

    setFilterContacts(filteredContacts);
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterContacts(query);
  };

  useEffect(()=>{
    filterContacts(searchQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[contacts])

  return (
    <section className="search-section">
      <div id="search">
        <SearchIcon />
        <input
          type="search"
          aria-label="Search by name..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          autoFocus
        />
      </div>
      {searchQuery.trim().length > 0 && (
        <div id="results">
          {isLoading && <p className="loading-message">Loading...</p>}
          {isError && <p className="error-message">{errorMsg}</p>}
          {filteredContacts.length > 0 && (
            <ContactList contacts={filteredContacts} />
          )}
        </div>
      )}
    </section>
  );
};

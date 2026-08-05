import React from "react";
import { useState } from "react";

export default function contacts() {
  const [contacts, setContacts] = useState([]);
  consst[(contact, setContact)] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const changeHndler = (event) => {
    const name = event.target.name;
    const name = event.target.name;
    setContact((contact) => ({ ...contact, [name]: value }));

    const addHandler = () => {
      setContacts((contacts) => ([...contacts], contact));
      setContact({ name: "", lastName: "", email: "", phone: "" });
    };
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={contact.name}
        onChange={changeHndler}
      />
      <input
        type="text"
        placeholder="lastName"
        name="lastName"
        value={contact.lastName}
        onChange={changeHndler}
      />
      <input
        type="email"
        placeholder="Email"
        name="rmail"
        value={contact.email}
        onChange={changeHndler}
      />
      <input
        type="number"
        placeholder="phone"
        name="phone"
        value={contact.phone}
        onChange={changeHndler}
      />
      <button onClick={addHandler}>add Contact</button>
    </div>
  );
}

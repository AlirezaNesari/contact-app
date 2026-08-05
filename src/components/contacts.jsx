import { useState } from "react";
import ContactList from "./ContactList";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };
  const addHandler = () => {
    if (
      !contact.name ||!contact.lastName ||!contact.email ||!contact.phone 
    ){
      setAlert("please enter valid data!")
      return;
    }
    setAlert("")
    setContacts((contacts) => [...contacts, contact]);
    setContact({ name: "", lastName: "", email: "", phone: "" });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={contact.name}
        onChange={changeHandler}
      />
      <input
        type="text"
        placeholder="lastName"
        name="lastName"
        value={contact.lastName}
        onChange={changeHandler}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={contact.email}
        onChange={changeHandler}
      />
      <input
        type="number"
        placeholder="phone"
        name="phone"
        value={contact.phone}
        onChange={changeHandler}
      />
      <button onClick={addHandler}>add Contact</button>
      <div>{alert && <p>{alert}</p>}</div>
      <ContactList contacts={contacts} />
    </div>
  );
}

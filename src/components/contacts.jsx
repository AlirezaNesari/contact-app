import { useState } from "react";
import ContactList from "./ContactList";
import inputs from "../constants/inputs";
import { v4 } from "uuid";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    id: "",
  });
  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };
  const addHandler = () => {
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phone
    ) {
      setAlert("please enter valid data!");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({ name: "", lastName: "", email: "", phone: "" });
  };
  const deleteHandler = (id) => {
    const newContacts =contacts.filter((contact)=>contact.id !== id)
    setContacts(newContacts);
  };


  return (
    <div>
      {inputs.map((input, index) => {
        return (
          <input
            key={index}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        );
      })}
      <button onClick={addHandler}>add Contact</button>
      <div>{alert && <p>{alert}</p>}</div>
      <ContactList contacts={contacts} deleteHandler={deleteHandler} />
    </div>
  );
}

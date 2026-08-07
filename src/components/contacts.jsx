import { useState } from "react";
import ContactList from "./ContactList";
import inputs from "../constants/inputs";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";

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
  const [isEditing, setIsEditing] = useState(false);
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
      setAlert("Please enter valid data!");
      return;
    }

    setAlert("");

    if (isEditing) {
      const updatedContacts = contacts.map((item) =>
        item.id === contact.id ? contact : item,
      );

      setContacts(updatedContacts);
      setIsEditing(false);
    } else {
      const newContact = {
        ...contact,
        id: v4(),
      };

      setContacts((contacts) => [...contacts, newContact]);
    }

    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      id: "",
    });
  };
  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };
  const editHandler = (selectedContact) => {
    setContact(selectedContact);
    setIsEditing(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
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
        <button onClick={addHandler}>
          {isEditing ? "Update Contact" : "Add Contact"}
        </button>
      </div>
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <ContactList
        contacts={contacts}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
      />
    </div>
  );
}

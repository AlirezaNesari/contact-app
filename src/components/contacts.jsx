import { useEffect, useRef, useState } from "react";
import ContactList from "./ContactList";
import inputs from "../constants/inputs";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";
import Modal from "./Modal";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  const isFirstRender = useRef(true);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));

    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

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
    setSelectedId(id);
    setShowModal(true);
  };
  const confirmDelete = () => {
    const newContacts = contacts.filter((contact) => contact.id !== selectedId);

    setContacts(newContacts);

    setSelectedId(null);
    setShowModal(false);
  };
  const cancelDelete = () => {
    setSelectedId(null);
    setShowModal(false);
  };
  const editHandler = (selectedContact) => {
    setContact(selectedContact);
    setIsEditing(true);
  };

const filteredContacts = contacts.filter((contact) =>
  contact.name.toLowerCase().includes(search.toLowerCase())
);

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

      <input
        type="text"
        placeholder="Search contact..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ContactList
         contacts={filteredContacts}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
      />
      {showModal && (
        <Modal
          message="Are you sure you want to delete this contact?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

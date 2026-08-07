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
  const [error, setError] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [favoriteOnly, setFavoriteOnly] = useState(false);

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
  const validate = () => {
    if (!contact.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!contact.phone.trim()) {
      setError("Phone number is required");
      return false;
    }

    if (contact.phone.length !== 11) {
      setError("Phone number must be 11 digits");
      return false;
    }

    if (!contact.email.includes("@")) {
      setError("Invalid email");
      return false;
    }

    setError("");
    return true;
  };
  const addHandler = () => {
    if (!validate()) return;
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
        favorite: false,
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

  const favoriteHandler = (id) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id
        ? {
            ...contact,
            favorite: !contact.favorite,
          }
        : contact,
    );

    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortType === "az") {
      return a.name.localeCompare(b.name);
    }

    if (sortType === "za") {
      return b.name.localeCompare(a.name);
    }

    if (sortType === "newest") {
      return b.id - a.id;
    }

    if (sortType === "oldest") {
      return a.id - b.id;
    }
  });

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
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

      <input
        type="text"
        placeholder="Search contact..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="newest">Newest</option>

        <option value="oldest">Oldest</option>

        <option value="az">Name A-Z</option>

        <option value="za">Name Z-A</option>
      </select>

      <ContactList
        contacts={sortedContacts}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
        favoriteHandler={favoriteHandler}
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

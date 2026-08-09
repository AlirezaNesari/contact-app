import Styles from "./ContactItem.module.css";

export default function ContactItem({
  contact,
  deleteHandler,
  editHandler,
  favoriteHandler,
  selectHandler,
  selectedContacts,
}) {
  const { id, name, lastName, email, phone } = contact;

  return (
    <div className={Styles.container}>
      <li className={Styles.item}>
        <input
          className={Styles.checkbox}
          type="checkbox"
          checked={selectedContacts.includes(contact.id)}
          onChange={() => selectHandler(contact.id)}
        />
        <button onClick={() => favoriteHandler(id)}>
          {contact.favorite ? "⭐" : "☆"}
        </button>

        <p>
          {name} {lastName}
        </p>

        <p>
          📧
          {email}
        </p>

        <p>
          📞
          {phone}
        </p>

        <button onClick={() => editHandler(contact)}>✏️</button>

        <button onClick={() => deleteHandler(id)}>🗑️</button>
      </li>
    </div>
  );
}

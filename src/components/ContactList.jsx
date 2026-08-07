import ContactItem from "./contactItem";
import Styles from "./ContactList.module.css";

export default function ContactList({
  contacts,
  deleteHandler,
  editHandler,
  favoriteHandler,
  selectHandler,
  selectedContacts,
}) {
  return (
    <div className={Styles.container}>
      <h3>ContactList</h3>
      {contacts?.length ? (
        <ul className={Styles.contacts}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              favoriteHandler={favoriteHandler}
              selectHandler={selectHandler}
              selectedContacts={selectedContacts}
            />
          ))}
        </ul>
      ) : (
        <p className={Styles.message}>no contacts yet !</p>
      )}
    </div>
  );
}

import ContactItem from "./contactItem";

export default function ContactList({ contacts,deleteHandler }) {
  return (
    <div>
      <h3>ContactList</h3>
      {contacts?.length ? (
        <ul>
          {contacts.map((contact) => (
          <ContactItem key={contact.id} item={contact} deleteHandler={deleteHandler}/>
          ))}
        </ul>
      ) : (
        <p>no contacts yet !</p>
      )}
    </div>
  );
}

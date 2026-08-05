export default function ContactList({ contacts }) {
  return (
    <div>
      <h3>ContactList</h3>
      <ul>
        {contacts.map((contact)=>(
            <li key={contact.id}>{contact.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ContactList({ contacts }) {
  return (
    <div>
      <h3>ContactList</h3>
      {contacts?.length ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <p>
                {contact.name} {contact.lastName}
              </p>
              <p>
                <span>آیکون</span>
                {contact.email}
              </p>
              <p>
                <span>آیکون</span>
                {contact.phone}
              </p>
              <button type="button">حذف</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>no contacts yet !</p>
      )}
    </div>
  );
}


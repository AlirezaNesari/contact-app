export default function ContactItem({
  item: { name, lastName, email, phone },
}) {
  return (
    <li >
      <p>
        {name} {lastName}
      </p>
      <p>
        <span>آیکون</span>
        {email}
      </p>
      <p>
        <span>آیکون</span>
        {phone}
      </p>
      <button type="button">حذف</button>
    </li>
  );
}

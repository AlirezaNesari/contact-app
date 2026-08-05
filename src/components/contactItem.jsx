export default function ContactItem({
  item: {id, name, lastName, email, phone },deleteHandler
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
      <button onClick={()=>deleteHandler(id)}>حذف</button>
    </li>
  );
}

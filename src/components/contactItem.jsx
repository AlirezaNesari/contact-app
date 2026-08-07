import trashIcon from "../Icons/trash.svg";
import phoneIcon from "../Icons/phone.svg";
import emailIcon from "../Icons/email.svg";
import Styles from "./ContactItem.module.css";

export default function ContactItem({
  contact,
  deleteHandler,
  editHandler,
  favoriteHandler,
}) {

  const { id, name, lastName, email, phone } = contact;

  return (
    <li className={Styles.item}>

      <button onClick={() => favoriteHandler(id)}>
        {contact.favorite ? "⭐" : "☆"}
      </button>

      <p>
        {name} {lastName}
      </p>

      <p>
        <img src={emailIcon} alt="email" width={20} />
        {email}
      </p>

      <p>
        <img src={phoneIcon} alt="phone" width={20} />
        {phone}
      </p>


      <button onClick={() => editHandler(contact)}>
        ✏️
      </button>


      <button onClick={() => deleteHandler(id)}>
        <img 
          src={trashIcon} 
          alt="Delete" 
          width={22} 
          height={22} 
        />
      </button>

    </li>
  );
}
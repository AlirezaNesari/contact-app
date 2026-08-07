import trashIcon from "../Icons/trash.svg";
import phoneIcon from "../Icons/phone.svg";
import emailIcon from "../Icons/email.svg";
import Styles from "./ContactItem.module.css"


export default function ContactItem({
  item: { id, name, lastName, email, phone },
  deleteHandler,
}) {
  return (
    <li className={Styles.item}>
      <p>
        {name} {lastName}
      </p>
      <p>
        <span><img src={emailIcon} alt="Email" width={20} height={20} /></span>
        {email}
      </p>
      <p>
        <span><img src={phoneIcon} alt="Phone" width={20} height={20} /></span>
        {phone}
      </p>
      <button onClick={() => deleteHandler(id)}>
        <img src={trashIcon} alt="Delete" width={22} height={22} />
      </button>
    </li>
  );
}

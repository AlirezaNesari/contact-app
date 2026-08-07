import styles from "./Modal.module.css";

export default function Modal({
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>

        <h3>Delete Contact</h3>

        <p>{message}</p>

        <div className={styles.actions}>
          <button
            className={styles.cancel}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className={styles.delete}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
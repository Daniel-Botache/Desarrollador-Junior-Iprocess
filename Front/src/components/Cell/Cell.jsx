import React from "react";
import styles from "./Cell.module.css";
const Cell = ({ user, handleEditUser, handleDeleteUser }) => {
  const { id, name, tel, email } = user;

  const handleEditClick = () => {
    handleEditUser(user);
  };

  const handleDeleteClick = () => {
    handleDeleteUser(id); // Llama a la función de eliminación con el ID del usuario
  };

  return (
    <tr className={styles.trContainer}>
      <td className={styles.trContainer_td}>{name}</td>
      <td className={styles.trContainer_td}>{email}</td>
      <td className={styles.trContainer_td}>{tel}</td>
      <td className={styles.trContainer_td}>
        <div className={styles.buttonsContainer}>
          <button
            onClick={handleEditClick}
            className={styles.buttonsContainer_btnEdit}
          >
            Editar
          </button>
          <button
            onClick={handleDeleteClick}
            className={styles.buttonsContainer_btnDelete}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Cell;

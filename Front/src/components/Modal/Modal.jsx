import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { isValidEmail, validateTel } from "../../validations/validation";
import styles from "./Modal.module.css";

const Modal = ({ user, handleClose, handleUpdateUser }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState(user.name);
  const [tel, setTel] = useState(user.tel);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = async () => {
    const telValid = validateTel(tel);
    const emailValid = isValidEmail(email);

    if (!telValid.success) {
      showSnackbar(telValid.message, "error");
      return;
    }

    if (!emailValid.success) {
      showSnackbar(emailValid.message, "error");
      return;
    }

    try {
      const updatedUser = { id: user.id, name, tel, email };
      await axios.put(
        `desarrollador-junior-iprocess-production.up.railway.app/user/${user.id}`,
        updatedUser
      );
      handleUpdateUser(updatedUser);
      showSnackbar("Usuario actualizado exitosamente", "success");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      showSnackbar("Error al actualizar el usuario", "error");
    }
  };

  const showSnackbar = (message, variant) => {
    // Asegúrate de que message sea una cadena
    if (typeof message !== "string") {
      message = "Por favor, introduce un email válido.";
    }

    enqueueSnackbar(message, { variant: variant });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className={styles.closebtnContainer}>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
        </div>
        <h2 className={styles.principalh2}>Editar Usuario</h2>
        <div className={styles.formContainer}>
          <label htmlFor="name" className={styles.labelForm}>
            Nombre:
          </label>
          <input
            className={styles.inputForm}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="tel" className={styles.labelForm}>
            Teléfono:
          </label>
          <input
            className={styles.inputForm}
            type="text"
            id="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <label htmlFor="email" className={styles.labelForm}>
            Email:
          </label>
          <input
            className={styles.inputForm}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleUpdate} className={styles.submitButton}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

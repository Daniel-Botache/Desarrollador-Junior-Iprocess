import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { isValidEmail, validateTel } from "../validations/validation";

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
      await axios.put(`http://localhost:3001/user/${user.id}`, updatedUser);
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
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Editar Usuario</h2>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="tel">Teléfono:</label>
        <input
          type="text"
          id="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleUpdate}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default Modal;

import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const Modal = ({ user, handleClose, handleUpdateUser }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState(user.name);
  const [tel, setTel] = useState(user.tel);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = async () => {
    const telValid = validateTel(tel);
    const emailValid = validateEmail(email);

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

  const validateTel = (tel) => {
    const telRegex = /^[0-9]{4,15}$/;
    if (!telRegex.test(tel)) {
      return {
        success: false,
        message:
          "El teléfono debe tener entre 4 y 15 caracteres y contener solo números.",
      };
    }
    return { success: true };
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) {
      return {
        success: false,
        message: "Por favor, introduce un email válido.",
      };
    }
    return { success: true };
  };

  const showSnackbar = (message, variant) => {
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

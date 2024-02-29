import React, { useState } from "react";
import axios from "axios";

const Modal = ({ user, handleClose, handleUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [tel, setTel] = useState(user.tel);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState("");

  const handleUpdate = async () => {
    if (!validateEmail(email)) {
      setEmailError("Por favor, introduce un email válido.");
      return;
    }

    try {
      const updatedUser = { id: user.id, name, tel, email };
      await axios.put(`http://localhost:3001/user/${user.id}`, updatedUser);
      handleUpdateUser(updatedUser); // Llamamos a la función para actualizar el usuario en Table
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <button onClick={handleUpdate}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default Modal;

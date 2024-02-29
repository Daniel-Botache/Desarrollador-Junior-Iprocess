import React, { useState } from "react";
import axios from "axios";

const Form = ({ handleAddUser }) => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Por favor, introduce un email válido.");
      return;
    }

    try {
      const newUser = { name, tel, email };
      const response = await axios.post("http://localhost:3001/user", newUser);
      handleAddUser(response.data);
      setName("");
      setTel("");
      setEmail("");
      setEmailError("");
      console.log("Usuario agregado exitosamente:", response.data);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="tel">Teléfono:</label>
      <input
        type="text"
        id="tel"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      <button type="submit">Agregar Usuario</button>
    </form>
  );
};

export default Form;

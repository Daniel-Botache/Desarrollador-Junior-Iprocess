import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { isValidEmail, validateTel } from "../../validations/validation";
import styles from "./Form.module.css";

const Form = ({ handleAddUser }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telError, setTelError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de teléfono
    const telValid = validateTel(tel);
    if (!telValid.success) {
      setTelError(telValid.message);
      showSnackbar(telValid.message, "error");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Por favor, introduce un email válido.");
      showSnackbar("Por favor, introduce un email válido.", "error");
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
      setTelError(""); // Limpiar el error de teléfono
      showSnackbar("Usuario agregado exitosamente", "success");
      console.log("Usuario agregado exitosamente:", response.data);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      showSnackbar("Error al agregar usuario", "error");
    }
  };

  const showSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant: variant });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.principalForm}>
      <div className={styles.nameContainer}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.inputForm}
        />
      </div>
      <div className={styles.telContainer}>
        <label htmlFor="tel">Teléfono:</label>
        <input
          className={styles.inputForm}
          type="text"
          id="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
        />
      </div>
      <div className={styles.emailContainer}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputForm}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Agregar Usuario
      </button>
    </form>
  );
};

export default Form;

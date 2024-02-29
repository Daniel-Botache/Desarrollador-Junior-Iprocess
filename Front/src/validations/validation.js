 const  isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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

  export {isValidEmail, validateTel}
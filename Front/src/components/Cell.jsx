import React from "react";

const Cell = ({ user, handleEditUser, handleDeleteUser }) => {
  const { id, name, tel, email } = user;

  const handleEditClick = () => {
    handleEditUser(user);
  };

  const handleDeleteClick = () => {
    handleDeleteUser(id); // Llama a la función de eliminación con el ID del usuario
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{tel}</td>
      <td>
        <button onClick={handleEditClick}>Editar</button>
        <button onClick={handleDeleteClick}>Eliminar</button>
      </td>
    </tr>
  );
};

export default Cell;

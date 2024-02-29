import React, { useState, useEffect } from "react";
import axios from "axios";
import Cell from "./Cell";
import Modal from "./Modal";
import Form from "./Form";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    // Agregar el nuevo usuario a la lista
    setUsers([...users, newUser]);
    console.log("Nuevo usuario agregado:", newUser);
  };
  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null); // Cerrar el modal después de la actualización
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/user/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      console.log(`Usuario con ID ${userId} eliminado exitosamente`);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div>
      <Form handleAddUser={handleAddUser} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Cell
              key={user.id}
              user={user}
              handleEditUser={handleEditUser} // Pasar la función al componente Cell
              handleDeleteUser={handleDeleteUser} // Pasar la función de eliminación
            />
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <Modal
          user={selectedUser}
          handleClose={() => setSelectedUser(null)}
          handleUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default Table;

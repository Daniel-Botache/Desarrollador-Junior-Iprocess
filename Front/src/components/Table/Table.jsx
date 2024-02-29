import React, { useState, useEffect } from "react";
import axios from "axios";
import Cell from "../Cell/Cell";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import styles from "./Table.module.css";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://desarrollador-junior-iprocess-production.up.railway.app/user"
        );
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
      await axios.delete(
        `https://desarrollador-junior-iprocess-production.up.railway.app/user/${userId}`
      );
      setUsers(users.filter((user) => user.id !== userId));
      console.log(`Usuario con ID ${userId} eliminado exitosamente`);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div className={styles.principalContainer}>
      <h1 className={styles.principalContainer_H1}>Lista de usuarios</h1>
      <Form handleAddUser={handleAddUser} />
      <table className={styles.titlesContainer}>
        <thead>
          <tr className={styles.theadContainer}>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbodyContainer}>
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
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <Modal
              user={selectedUser}
              handleClose={() => setSelectedUser(null)}
              handleUpdateUser={handleUpdateUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

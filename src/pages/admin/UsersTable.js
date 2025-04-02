import React, { useEffect, useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import { fetchAllUsers, deleteUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../../services/alertService";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        //console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    const isConfirmed = await showConfirmationAlert(
      "Esta acción no se puede deshacer.",
      "¿Deseas eliminar este usuario?"
    );
    if (!isConfirmed) return;

    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      showSuccessAlert("El usuario ha sido eliminado exitosamente.");
    } catch (error) {
      //console.error("Error al eliminar el usuario:", error);
      showErrorAlert(error);
    }
  };
  const handleAddUser = () => {
    navigate("/admin/register-user");
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Lista de Usuarios</h2>
      <div className="d-flex justify-content-end mb-4">
        <Button className="agregar-btn" onClick={handleAddUser}>
          <i className="fas fa-plus me-2"></i> Generar Usuario
        </Button>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Acciones</th>
              <th>Nombre de Usuario</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;

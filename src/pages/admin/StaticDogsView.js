import React from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/admin/DogsView.css";

const StaticDogsView = ({ dogs = [], loading, onDelete, onAddNew }) => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">Perros Permanentes</h1>
        <Button className="agregar-btn" onClick={onAddNew}>
          <i className="fas fa-plus me-2"></i> Nuevo
        </Button>
      </div>

      {/* Mostrar Spinner mientras los datos se cargan */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : dogs && dogs.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Acciones</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Vacunado</th>
                <th>Esterilizado</th>
                <th>Desparasitado</th>
                <th>Nº Chip</th>
                <th>Fecha de ingreso</th>
                <th>Operación</th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((dog) => (
                <tr key={dog.id}>
                  <td>
                    <div className="actions-cell">
                      <Button
                        variant="warning"
                        size="sm"
                        className="action-button"
                        onClick={() =>
                          navigate(`/admin/edit-static-dog/${dog.id}`)
                        }
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="action-button"
                        onClick={() => onDelete(dog.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </div>
                  </td>

                  <td>{dog.name}</td>
                  <td>{dog.age}</td>
                  <td>{dog.gender === "male" ? "Macho" : "Hembra"}</td>
                  <td>{dog.is_vaccinated ? "Sí" : "No"}</td>
                  <td>{dog.is_sterilized ? "Sí" : "No"}</td>
                  <td>{dog.is_dewormed ? "Sí" : "No"}</td>
                  <td>{dog.id_chip || "No tiene"}</td>
                  <td>
                    {dog.entry_date
                      ? new Date(dog.entry_date).toLocaleDateString()
                      : "Sin fecha"}
                  </td>
                  <td>{dog.operation || "Ninguna"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        !loading && (
          <div className="text-center">
            <p className="text-muted">No hay perros permanentes disponibles.</p>
          </div>
        )
      )}
    </div>
  );
};

export default StaticDogsView;

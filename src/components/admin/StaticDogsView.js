import React from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import "../../assets/styles/admin/DogsView.css";

const StaticDogsView = ({ dogs = [], loading, onDelete, onAddNew }) => {
  console.log("Datos recibidos en StaticDogsView:", dogs); // Log detallado

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">Perros Permanentes</h1>
        <Button variant="primary" onClick={onAddNew}>
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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Acciones</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Género</th>
              <th>Vacunado</th>

              <th>Esterilizado</th>
              <th>Desparasitado</th>
              <th>Fecha de ingreso</th>
              <th>Operación</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog) => (
              <tr key={dog.id}>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => console.log("Edit:", dog)}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(dog.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </td>
                <td>{dog.id}</td>
                <td>{dog.name}</td>
                <td>{dog.age}</td>
                <td>{dog.gender === "male" ? "Macho" : "Hembra"}</td>
                <td>{dog.is_vaccinated ? "Sí" : "No"}</td>

                <td>{dog.is_sterilized ? "Sí" : "No"}</td>
                <td>{dog.is_dewormed ? "Sí" : "No"}</td>
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

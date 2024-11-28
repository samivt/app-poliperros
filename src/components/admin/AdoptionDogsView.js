import React from "react";
import { Button, Table, Spinner } from "react-bootstrap"; // Importar Spinner
import "../../assets/styles/admin/DogsView.css";

const AdoptionDogsView = ({ dogs, loading, onDelete, onAddNew, onAdopt }) => {
  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">LISTADO DE PERROS TEMPORALES</h1>
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
      ) : dogs.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Acciones</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Vacunado</th>
              <th>Género</th>
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
                    className="me-2"
                    onClick={() => onDelete(dog.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onAdopt(dog)}
                  >
                    <i className="fas fa-hand-holding-heart"></i> Adoptar
                  </Button>
                </td>
                <td>{dog.id}</td>
                <td>{dog.name}</td>
                <td>{dog.age}</td>
                <td>{dog.is_vaccinated ? "Sí" : "No"}</td>
                <td>{dog.gender === "male" ? "Macho" : "Hembra"}</td>
                <td>{dog.is_sterilized ? "Sí" : "No"}</td>
                <td>{dog.is_dewormed ? "Sí" : "No"}</td>
                <td>{new Date(dog.entry_date).toLocaleDateString()}</td>
                <td>{dog.operation}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No hay perros temporales disponibles.</p>
      )}
    </div>
  );
};

export default AdoptionDogsView;

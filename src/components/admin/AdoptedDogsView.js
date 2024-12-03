import React from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import "../../assets/styles/admin/DogsView.css";
import { useNavigate } from "react-router-dom";

const AdoptedDogsView = ({
  dogs = [],
  loading,
  onEdit,
  onUnadopt,
  onViewVisits,
}) => {
  const navigate = useNavigate(); // Instancia del hook para navegar

  const handleAddVisit = () => {
    navigate("/admin/form-visit"); // Redirige a la ruta deseada
  };

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">Perros Adoptados</h1>
        <Button variant="primary" className="ms-auto" onClick={handleAddVisit}>
          <i className="fas fa-plus me-2"></i> Agregar Visita
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
              <th>Nombre Perro</th>
              <th>Nombre Dueño</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog) => (
              <tr key={dog.id}>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2 d-flex align-items-center justify-content-center"
                    onClick={() => onViewVisits(dog.id)}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(dog)}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2 d-flex align-items-center justify-content-center"
                    onClick={() => onUnadopt(dog.id)}
                  >
                    <i className="fas fa-heart-crack me-1"></i> Desadoptar
                  </Button>
                </td>
                <td>{dog.name || "Sin nombre"}</td>
                <td>{dog.owner?.name || "Sin asignar"}</td>
                <td>{dog.owner?.direction || "Sin asignar"}</td>
                <td>{dog.owner?.cellphone || "Sin asignar"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && (
          <div className="text-center">
            <p className="text-muted">No hay perros adoptados disponibles.</p>
          </div>
        )
      )}
    </div>
  );
};

export default AdoptedDogsView;

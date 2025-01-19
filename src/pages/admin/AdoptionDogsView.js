import React, { useState } from "react";
import { Button, Table, Spinner, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/admin/DogsView.css";

const AdoptionDogsView = ({ dogs = [], loading, onDelete, onAddNew }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null); // Estado para almacenar el perro seleccionado
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = (dog) => {
    setSelectedDog(dog); // Establecer el perro seleccionado
    setShowModal(true); // Mostrar el modal
  };

  const handleAdoptOption = (option) => {
    if (selectedDog) {
      // Redirigir a la ruta de adopción
      navigate(`/admin/adopt-dog/${selectedDog.id}`);
    }
    setShowModal(false); // Cerrar el modal
  };
  const handleAdoptOwnerOption = (option) => {
    if (selectedDog) {
      // Redirigir a la ruta de adopción
      navigate(`/admin/adopt-dog-owner/${selectedDog.id}`);
    }
    setShowModal(false); // Cerrar el modal
  };

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">Perros Temporales</h1>
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
      ) : dogs.length > 0 ? (
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
                  <td className="actions-cell">
                    <Button
                      variant="warning"
                      size="sm"
                      className="action-button"
                      onClick={() =>
                        navigate(`/admin/edit-adoption-dog/${dog.id}`)
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
                    {/* Botón para abrir el modal */}
                    <Button
                      variant="success"
                      className="action-button"
                      onClick={() => handleShow(dog)}
                    >
                      <i className="fas fa-hand-holding-heart"></i>
                    </Button>
                  </td>
                  <td>{dog.name || "Sin nombre"}</td>
                  <td>{dog.age || "Desconocida"}</td>
                  <td>{dog.gender === "male" ? "Macho" : "Hembra"}</td>
                  <td>{dog.is_vaccinated ? "Sí" : "No"}</td>
                  <td>{dog.is_sterilized ? "Sí" : "No"}</td>
                  <td>{dog.is_dewormed ? "Sí" : "No"}</td>
                  <td>{dog.id_chip || "No tiene"}</td>
                  <td>
                    {dog.entry_date
                      ? new Date(
                          new Date(dog.entry_date).getTime() +
                            new Date().getTimezoneOffset() * 60000
                        ).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
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
            <p className="text-muted">No hay perros temporales disponibles.</p>
          </div>
        )
      )}

      {/* Modal con opciones de adopción */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="title-modal">
          <Modal.Title>Elegir un tipo de adopción</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button
            onClick={() => handleAdoptOption("Nuevo dueño")}
            className="btn1-modal"
          >
            Nuevo dueño
          </Button>
          <Button
            onClick={() => handleAdoptOwnerOption("Dueño existente")}
            className="btn-modal"
          >
            Dueño existente
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdoptionDogsView;

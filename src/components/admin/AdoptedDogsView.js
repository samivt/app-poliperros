import React, { useState, useEffect } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import "../../assets/styles/admin/DogsView.css";
import { useNavigate } from "react-router-dom";
import { fetchAdoptedDogs, unadoptDog } from "../../services/dogsService";
import {
  showConfirmationAlert,
  showSuccessAlert,
  showErrorAlert,
} from "../../services/alertService";

const AdoptedDogsView = ({ onEditDog }) => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadAdoptedDogs = async () => {
    setLoading(true);
    try {
      const data = await fetchAdoptedDogs();
      setDogs(data);
    } catch (error) {
      console.error("Error al cargar los perros adoptados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdoptedDogs();
  }, []);

  const handleAddVisit = () => {
    navigate("/admin/form-visit");
  };

  const handleEditOwner = (owner) => {
    navigate("/admin/edit-owner", {
      state: {
        owner: {
          id: owner.id, // Asegúrate de incluir el ID
          name: owner.name,
          direction: owner.direction,
          cellphone: owner.cellphone,
        },
      },
    });
  };

  const handleUnadopt = async (dogId) => {
    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de quitar la adopción?",
      "Esta acción no se puede deshacer."
    );

    if (!confirmed) return;

    setLoading(true);
    try {
      await unadoptDog(dogId);
      showSuccessAlert("Adopción eliminada exitosamente.");
      await loadAdoptedDogs(); // Recargar los datos después de la acción
    } catch (error) {
      console.error("Error al quitar la adopción:", error);
      showErrorAlert(
        error.message || "No se pudo quitar la adopción. Inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">Perros Adoptados</h1>
        <Button className="agregar-btn ms-auto" onClick={handleAddVisit}>
          <i className="fas fa-plus me-2"></i> Agregar Visita
        </Button>
      </div>

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
                <td className="actions-cell">
                  <Button
                    variant="info"
                    size="sm"
                    className="action-button"
                    title="Editar Dueño"
                    onClick={() => handleEditOwner(dog.owner)} // Redirigir al formulario con el ID del dueño
                  >
                    <i className="fas fa-user-edit"></i>
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    className="action-button"
                    title="Editar Perro"
                    onClick={() =>
                      navigate(`/admin/edit-adopted-dog/${dog.id}`)
                    }
                  >
                    <i className="fas fa-dog"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="action-button"
                    title="Quitar Adopción"
                    onClick={() => handleUnadopt(dog.id)}
                  >
                    <i className="fas fa-heart-crack"></i>
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

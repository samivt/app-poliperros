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

const AdoptedDogsView = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar los perros adoptados y transformar los datos
  const loadAdoptedDogs = async () => {
    setLoading(true);
    try {
      const data = await fetchAdoptedDogs();

      // Transformar los datos específicamente para esta vista
      const transformedDogs = data.map((dog) => ({
        id: dog.id,
        name: dog.name,
        ownerName: dog.owner?.name || "Sin asignar",
        ownerDirection: dog.owner?.direction || "Sin asignar",
        ownerCellphone: dog.owner?.cellphone || "Sin asignar",
      }));

      setDogs(transformedDogs);
    } catch (error) {
      console.error("Error al cargar los perros adoptados:", error);
      showErrorAlert(
        "No se pudieron cargar los perros adoptados. Inténtalo nuevamente.",
        "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdoptedDogs();
  }, []);

  // Manejar la eliminación de adopción
  const handleUnadopt = async (dogId) => {
    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de quitar la adopción?",
      "Esta acción no se puede deshacer."
    );

    if (!confirmed) return;

    setLoading(true);
    try {
      await unadoptDog(dogId); // Llama al servicio para eliminar la adopción
      showSuccessAlert("Adopción eliminada exitosamente.");
      await loadAdoptedDogs(); // Recargar los datos después de la acción
    } catch (error) {
      console.error("Error al quitar la adopción:", error);
      showErrorAlert(
        error.message || "No se pudo quitar la adopción. Inténtalo nuevamente.",
        "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">Perros Adoptados</h1>
        <Button
          className="agregar-btn ms-auto"
          onClick={() => navigate("/admin/form-visit")}
        >
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
        <div className="table-responsive">
          <Table striped bordered hover>
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
                      onClick={() =>
                        navigate("/admin/edit-owner", {
                          state: {
                            owner: {
                              id: dog.id,
                              name: dog.ownerName,
                              direction: dog.ownerDirection,
                              cellphone: dog.ownerCellphone,
                            },
                          },
                        })
                      }
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
                  <td>{dog.name}</td>
                  <td>{dog.ownerName}</td>
                  <td>{dog.ownerDirection}</td>
                  <td>{dog.ownerCellphone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted">No hay perros adoptados disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default AdoptedDogsView;

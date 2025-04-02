import React, { useEffect, useState } from "react";
import { Table, Spinner, Form, Button } from "react-bootstrap";
import {
  fetchAllVisits,
  fetchVisitsByDogId,
  fetchEvidenceImage,
  deleteVisit,
} from "../../services/visitService";
import { useNavigate } from "react-router-dom";
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../../services/alertService";

const VisitsTable = () => {
  const [visits, setVisits] = useState([]);
  const [dogNames, setDogNames] = useState([]);
  const [selectedDogId, setSelectedDogId] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await fetchAllVisits();
        const visitsWithImages = await Promise.all(
          data.map(async (visit) => {
            const evidenceImage = await fetchEvidenceImage(visit.id).catch(
              () => null
            );
            return { ...visit, evidenceImage };
          })
        );
        setVisits(visitsWithImages);

        const uniqueDogs = visitsWithImages
          .map((visit) => visit.adopted_dog)
          .filter(Boolean);
        const uniqueDogNames = [
          ...new Map(uniqueDogs.map((dog) => [dog.id, dog])).values(),
        ];
        setDogNames(uniqueDogNames);
      } catch (error) {
        //console.error("Error al cargar las visitas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleDogFilterChange = async (event) => {
    const dogId = event.target.value;
    setSelectedDogId(dogId);

    if (!dogId) {
      setLoading(true);
      const data = await fetchAllVisits();
      setVisits(data);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const filteredVisits = await fetchVisitsByDogId(dogId);
      const visitsWithImages = await Promise.all(
        filteredVisits.map(async (visit) => {
          const evidenceImage = await fetchEvidenceImage(visit.id).catch(
            () => null
          );
          return { ...visit, evidenceImage };
        })
      );
      setVisits(visitsWithImages);
    } catch (error) {
      //console.error("Error al filtrar las visitas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (visitId) => {
    console.log(`Redirigiendo a: /admin/edit-visit/${visitId}`);
    navigate(`/admin/edit-visit/${visitId}`);
  };

  const handleDelete = async (visitId) => {
    const isConfirmed = await showConfirmationAlert(
      "Esta acción no se puede deshacer.",
      "¿Deseas eliminar esta visita?"
    );
    if (!isConfirmed) return;

    try {
      await deleteVisit(visitId);
      setVisits((prev) => prev.filter((visit) => visit.id !== visitId));
      showSuccessAlert("La visita ha sido eliminada exitosamente.");
    } catch (error) {
      //console.error("Error al eliminar la visita:", error);
      showErrorAlert("Ocurrió un error al intentar eliminar la visita.");
    }
  };

  const handleAddVisit = () => {
    navigate("/admin/form-visit");
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
      <h2 className="text-center">Historial de Visitas</h2>
      <div className="d-flex justify-content-end mb-4">
        <Button className="agregar-btn" onClick={handleAddVisit}>
          <i className="fas fa-plus me-2"></i> Agregar Visita
        </Button>
      </div>

      <Form.Group className="mb-4">
        <Form.Label>Seleccionar perro:</Form.Label>
        <Form.Select value={selectedDogId} onChange={handleDogFilterChange}>
          <option value="">Todos</option>
          {dogNames.map((dog) => (
            <option key={dog.id} value={dog.id}>
              {dog.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Acciones</th>
              <th>Fecha de Visita</th>
              <th>Nombre del Perro</th>
              <th>Nombre del Dueño</th>

              <th>Observaciones</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id}>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(visit.id)}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleDelete(visit.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
                <td>{visit.visit_date || "Sin fecha"}</td>

                <td>{visit.adopted_dog?.name || "Sin nombre"}</td>
                <td>{visit.adopted_dog?.owner?.name || "Sin asignar"}</td>
                <td>{visit.observations || "Sin observaciones"}</td>
                <td>
                  {visit.evidenceImage ? (
                    <img
                      src={visit.evidenceImage}
                      alt="Evidencia"
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    "Sin evidencia"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default VisitsTable;

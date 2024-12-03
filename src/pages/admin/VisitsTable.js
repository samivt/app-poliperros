import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import {
  fetchAllVisits,
  fetchEvidenceImage,
} from "../../services/visitService"; // Asegúrate de que el servicio esté implementado

const VisitsTable = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisits = async () => {
      try {
        const data = await fetchAllVisits(); // Llama al servicio para obtener las visitas
        const visitsWithImages = await Promise.all(
          data.map(async (visit) => {
            const evidenceImage = await fetchEvidenceImage(visit.id); // Obtén la imagen
            return { ...visit, evidenceImage };
          })
        );
        setVisits(visitsWithImages);
      } catch (error) {
        console.error("Error al cargar las visitas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVisits();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (visits.length === 0) {
    return (
      <div className="text-center mt-5">
        <p className="text-muted">No hay visitas registradas.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tabla de Visitas</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre del Perro</th>
            <th>Nombre del Dueño</th>
            <th>Fecha de Visita</th>
            <th>Observaciones</th>
            <th>Foto de Evidencia</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit.id}>
              <td>{visit.adopted_dog?.name || "Sin nombre"}</td>
              <td>{visit.adopted_dog?.owner?.name || "Sin asignar"}</td>
              <td>{visit.visit_date || "Sin fecha"}</td>
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
  );
};

export default VisitsTable;

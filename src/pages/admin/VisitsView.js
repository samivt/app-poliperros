import React, { useState, useEffect } from "react";
import { Table, Col, Row, ListGroup } from "react-bootstrap";
import { fetchAdoptedDogs } from "../../services/dogsService";
import { fetchVisitsByDogId } from "../../services/visitService";

const VisitsView = () => {
  const [adoptedDogs, setAdoptedDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const loadAdoptedDogs = async () => {
      try {
        const data = await fetchAdoptedDogs();
        setAdoptedDogs(data);
      } catch (error) {
        console.error("Error al cargar los perros adoptados:", error);
      }
    };

    loadAdoptedDogs();
  }, []);

  const handleDogClick = async (dog) => {
    setSelectedDog(dog);
    try {
      const visitsData = await fetchVisitsByDogId(dog.id); // Servicio para obtener visitas por perro
      setVisits(visitsData);
    } catch (error) {
      console.error("Error al cargar las visitas:", error);
    }
  };

  return (
    <div className="container mt-4">
      <Row>
        {/* Columna de perros */}
        <Col md={3}>
          <h5>Perros Adoptados</h5>
          <ListGroup>
            {adoptedDogs.map((dog) => (
              <ListGroup.Item
                key={dog.id}
                action
                active={selectedDog?.id === dog.id}
                onClick={() => handleDogClick(dog)}
              >
                {dog.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Tabla de visitas */}
        <Col md={9}>
          <h5>
            Visitas para:{" "}
            {selectedDog ? selectedDog.name : "Selecciona un perro"}
          </h5>
          {visits.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Observaciones</th>
                  <th>Evidencia</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={visit.id}>
                    <td>{visit.visit_date}</td>
                    <td>{visit.observations || "Sin observaciones"}</td>
                    <td>
                      {visit.evidence && (
                        <a
                          href={visit.evidence}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver Evidencia
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">
              No hay visitas registradas para este perro.
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VisitsView;

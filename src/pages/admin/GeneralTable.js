import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

import "../../assets/styles/admin/GeneralTable.css";

const GeneralTable = ({ data }) => {
  const [selectedDog, setSelectedDog] = useState(null);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const handleViewHistory = (dog) => {
    setSelectedDog(dog);
  };

  const handleBackToGeneral = () => {
    setSelectedDog(null);
  };

  const handleAddVisit = () => {
    navigate("/admin/form-visit"); // Redirige a la página de formulario
  };

  return (
    <div className="general-table-container">
      {selectedDog ? (
        // Tabla detallada del historial
        <div>
          <div className="table-header">
            <h3>Tabla General</h3>
            <Button variant="success" onClick={handleAddVisit}>
              Agregar Visita
            </Button>
          </div>

          <Table striped bordered hover responsive className="detail-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Estado General</th>
                <th>Comida y Agua</th>
                <th>Lugar Seguro</th>
                <th>Ejercicio Regular</th>
                <th>Comentarios</th>
                <th>Foto</th>
              </tr>
            </thead>
            <tbody>
              {selectedDog.history.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.generalState}</td>
                  <td>{record.foodWater}</td>
                  <td>{record.safePlace}</td>
                  <td>{record.exercise}</td>
                  <td>{record.comments}</td>
                  <td>
                    <img
                      src={record.photo}
                      alt="Foto del perro"
                      className="history-photo"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="secondary" onClick={handleBackToGeneral}>
            Volver a la tabla general
          </Button>
        </div>
      ) : (
        // Tabla general con botón de agregar visita
        <div>
          <div className="table-header">
            <h3>Tabla General</h3>
            <Button variant="success" onClick={handleAddVisit}>
              Agregar Visita
            </Button>
          </div>
          <Table striped bordered hover responsive className="general-table">
            <thead>
              <tr>
                <th>Nombre del Perro</th>
                <th>Última Visita</th>
                <th>Estado General</th>
                <th>Adoptante</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dog) => (
                <tr key={dog.id}>
                  <td>{dog.name}</td>
                  <td>{dog.lastVisit}</td>
                  <td>{dog.generalState}</td>
                  <td>{dog.adoptant}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleViewHistory(dog)}
                    >
                      Historial
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default GeneralTable;

import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom"; // Importa useLocation

import "../../assets/styles/admin/FormVisit.css";

const FormVisit = () => {
  const location = useLocation(); // Obtiene la ubicación actual
  const dogs = location.state?.dogs || []; // Accede a la lista de perros
  const [formData, setFormData] = useState({
    dogId: "",
    date: "",
    generalState: "",
    foodWaterAccess: "",
    healthStatus: "",
    safePlace: "",
    regularExercise: "",
    comments: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="followup-form-container">
      <h2 className="form-title">Formulario de Seguimiento</h2>
      <Form onSubmit={handleSubmit}>
        {/* Seleccionar Perro */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Perro:
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="dogId"
              value={formData.dogId}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un perro</option>
              {dogs.map((dog) => (
                <option key={dog.id} value={dog.id}>
                  {dog.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Fecha de la visita */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Fecha de la visita:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        {/* Estado general */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Estado general:
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="generalState"
              value={formData.generalState}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="excelente">Excelente</option>
              <option value="bueno">Bueno</option>
              <option value="regular">Regular</option>
              <option value="malo">Malo</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Comida y Agua */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            ¿Tiene acceso a comida y agua fresca?
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              inline
              label="Sí"
              type="radio"
              name="foodWaterAccess"
              value="sí"
              onChange={handleInputChange}
              checked={formData.foodWaterAccess === "sí"}
            />
            <Form.Check
              inline
              label="No"
              type="radio"
              name="foodWaterAccess"
              value="no"
              onChange={handleInputChange}
              checked={formData.foodWaterAccess === "no"}
            />
          </Col>
        </Form.Group>

        {/* Salud */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            ¿Parece saludable?
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              inline
              label="Sí"
              type="radio"
              name="healthStatus"
              value="sí"
              onChange={handleInputChange}
              checked={formData.healthStatus === "sí"}
            />
            <Form.Check
              inline
              label="No"
              type="radio"
              name="healthStatus"
              value="no"
              onChange={handleInputChange}
              checked={formData.healthStatus === "no"}
            />
          </Col>
        </Form.Group>

        {/* Lugar Seguro */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            ¿Tiene un lugar seguro y limpio?
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              inline
              label="Sí"
              type="radio"
              name="safePlace"
              value="sí"
              onChange={handleInputChange}
              checked={formData.safePlace === "sí"}
            />
            <Form.Check
              inline
              label="No"
              type="radio"
              name="safePlace"
              value="no"
              onChange={handleInputChange}
              checked={formData.safePlace === "no"}
            />
          </Col>
        </Form.Group>

        {/* Ejercicio */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            ¿Realiza ejercicio regularmente?
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              inline
              label="Sí"
              type="radio"
              name="regularExercise"
              value="sí"
              onChange={handleInputChange}
              checked={formData.regularExercise === "sí"}
            />
            <Form.Check
              inline
              label="No"
              type="radio"
              name="regularExercise"
              value="no"
              onChange={handleInputChange}
              checked={formData.regularExercise === "no"}
            />
          </Col>
        </Form.Group>

        {/* Comentarios */}
        <Form.Group className="mb-3">
          <Form.Label className="custom-label">
            Comentarios adicionales:
          </Form.Label>
          <Form.Control
            as="textarea"
            name="comments"
            rows={3}
            value={formData.comments}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Subir Foto */}
        <Form.Group className="mb-3">
          <Form.Label className="custom-label">Subir una foto:</Form.Label>
          <Form.Control
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Botón Enviar */}
        <div className="custom-button-container">
          <Button type="submit" className="custom-button">
            Enviar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormVisit;

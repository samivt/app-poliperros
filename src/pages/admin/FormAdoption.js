import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  showSuccessAlert,
  showErrorAlert,
  showWarningAlert,
} from "../../services/alertService"; // Importar alertService
import "../../assets/styles/admin/FormDogs.css";

const FormAdoption = ({ onSubmit, onSuccess }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    dog_id: "",
    adoption_date: "",
    name: "",
    direction: "",
    cellphone: "",
  });

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({
        ...prevData,
        dog_id: id,
      }));
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { dog_id, adoption_date, name, direction, cellphone } = formData;

    // Validar campos obligatorios
    if (!dog_id || !adoption_date || !name || !direction || !cellphone) {
      showWarningAlert(
        "Por favor completa todos los campos.",
        "Campos obligatorios"
      );
      return;
    }

    try {
      await onSubmit(formData);
      showSuccessAlert("¡La adopción se registró correctamente!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al registrar la adopción:", error);
      showErrorAlert(
        "Ocurrió un error al registrar la adopción. Intenta nuevamente."
      );
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Formulario de Adopción</h2>
      <Form onSubmit={handleSubmit}>
        {/* ID del perro */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            ID del Perro:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="dog_id"
              value={formData.dog_id}
              readOnly
              required
              className="form-control"
            />
          </Col>
        </Form.Group>

        {/* Fecha de adopción */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Fecha de Adopción:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="adoption_date"
              value={formData.adoption_date}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </Col>
        </Form.Group>

        {/* Nombre del dueño */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Nombre:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ingrese el nombre del dueño"
              required
              className="form-control"
            />
          </Col>
        </Form.Group>

        {/* Dirección */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Dirección:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="direction"
              value={formData.direction}
              onChange={handleInputChange}
              placeholder="Ingrese la dirección"
              required
              className="form-control"
            />
          </Col>
        </Form.Group>

        {/* Teléfono */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Teléfono:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="tel"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleInputChange}
              placeholder="Ingrese el teléfono"
              required
              className="form-control"
            />
          </Col>
        </Form.Group>

        {/* Botón de envío */}
        <div className="custom-button-container">
          <Button type="submit" className="custom-button">
            Registrar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormAdoption;

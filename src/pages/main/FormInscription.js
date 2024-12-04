import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/main/Navbar";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../assets/styles/main/FormInscription.css";
import { createApplicant } from "../../services/applicantService";
import { showErrorAlert } from "../../services/alertService";

const FormInscription = () => {
  const { courseId } = useParams(); // Obtiene el ID del curso desde la ruta
  const navigate = useNavigate(); // Hook para redirigir
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    cellphone: "",
    course_id: parseInt(courseId, 10) || 0, // Asegura que sea un número entero
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({ ...formData, image: reader.result.split(",")[1] }); // Convertir imagen a base64
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isNaN(formData.course_id) || formData.course_id <= 0) {
      showErrorAlert("El ID del curso no es válido.");
      return;
    }

    try {
      console.log("Datos enviados al servicio:", formData);
      await createApplicant(formData); // Llama al servicio
      navigate("/thank-you"); // Redirige a la página de agradecimiento
    } catch (error) {
      console.error("Error al registrar la inscripción:", error);
      showErrorAlert("Ocurrió un error al intentar registrar la inscripción.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="custom-form-container">
        <h2 className="form-title">Formulario de inscripción</h2>
        <Form onSubmit={handleSubmit}>
          {/* Nombre */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Nombre: <span className="required">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          {/* Apellido */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Apellido: <span className="required">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          {/* Email */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Email: <span className="required">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          {/* Teléfono */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Teléfono: <span className="required">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="cellphone"
                required
                value={formData.cellphone}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          {/* Foto */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Foto:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <div className="custom-button-container">
            <Button variant="primary" type="submit" className="custom-button">
              Registrar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormInscription;

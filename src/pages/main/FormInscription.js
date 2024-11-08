import React, { useState } from "react";
import Navbar from "../../components/main/Navbar";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../assets/styles/main/FormInscription.css";

const FormInscription = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    cellphone: "",
    schedule: false,
    photo: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inscriptionData = {
      ...formData,
      photo: formData.photo ? formData.photo.name : "",
    };
    console.log(inscriptionData);
    try {
      const response = await fetch(
        "http://192.168.100.88:8000/dog/static_dog/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inscriptionData),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Registro exitoso:", result);
      } else {
        console.error("Error al inscribirse:", response.status);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "select") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="custom-form-container form-container mx-auto col-md-6">
        <h2 className="my-4 text-center form-title">Inscripción</h2>
        <Form className="custom-form" onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Nombre:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Apellido:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                id="lastname"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Email:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Teléfono:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                id="cellphone"
                name="cellphone"
                required
                value={formData.cellphone}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Horario:
            </Form.Label>
            <Col sm={9}>
              <Form.Select aria-label="Default select example">
                <option>Seleccionar una opción</option>
                <option value="1">Sábado (8:30 - 10:30)</option>
                <option value="2">Domingo (11:00 - 13:00)</option>
                <option value="3">Sábado (8:30 - 10:30)</option>
                <option value="3">Domingo (11:00 - 13:00)</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Foto:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <div className="text-center">
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

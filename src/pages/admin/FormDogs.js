import React, { useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../assets/styles/admin/FormDogs.css";

const FormDogs = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    sex: "",
    age: "",
    vaccinated: false,
    description: "",
    photo: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dogData = {
      ...formData,
      vaccinated: formData.vaccinated ? "Sí" : "No",
      photo: formData.photo ? formData.photo.name : "",
    };
    console.log(dogData);
    try {
      const response = await fetch(
        "http://192.168.100.88:8000/dog/static_dog/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dogData),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Perro registrado:", result);
      } else {
        console.error("Error al registrar el perro:", response.status);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="container form-container">
        <h2 className="my-4 text-center form-title">Registrar Perro</h2>
        <Form className="custom-form" onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Identificador:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                id="id"
                name="id"
                required
                value={formData.id}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

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
              Sexo:
            </Form.Label>
            <Col sm={9}>
              <Form.Check
                type="radio"
                id="hembra"
                label="Hembra"
                name="sex"
                value="hembra"
                onChange={handleInputChange}
                checked={formData.sex === "hembra"}
                className="custom-radio"
              />
              <Form.Check
                type="radio"
                id="macho"
                label="Macho"
                name="sex"
                value="macho"
                onChange={handleInputChange}
                checked={formData.sex === "macho"}
                className="custom-radio"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Edad:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                id="age"
                name="age"
                required
                value={formData.age}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Vacunado:
            </Form.Label>
            <Col sm={9}>
              <Form.Check
                type="checkbox"
                id="vaccinated"
                name="vaccinated"
                label=""
                checked={formData.vaccinated}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Descripción:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
              />
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

export default FormDogs;

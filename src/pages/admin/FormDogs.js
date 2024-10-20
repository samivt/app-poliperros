import React, { useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import {
  Form,
  Button,
  Col,
  Row,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";

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

  const handleVaccinatedToggle = () => {
    setFormData((prevState) => ({
      ...prevState,
      vaccinated: !prevState.vaccinated,
    }));
  };

  return (
    <div>
      <NavbarAdmin />
      <h2 className="my-4">Registrar Perro Permanente</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} htmlFor="id">
            Identificador de perro:
          </Form.Label>
          <Col sm={10}>
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
          <Form.Label column sm={2} htmlFor="name">
            Nombre:
          </Form.Label>
          <Col sm={10}>
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
          <Form.Label column sm={2}>
            Sexo:
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              id="hembra"
              label="Hembra"
              name="sex"
              value="hembra"
              onChange={handleInputChange}
              checked={formData.sex === "hembra"}
            />
            <Form.Check
              type="radio"
              id="macho"
              label="Macho"
              name="sex"
              value="macho"
              onChange={handleInputChange}
              checked={formData.sex === "macho"}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} htmlFor="age">
            Edad:
          </Form.Label>
          <Col sm={10}>
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
          <Form.Label column sm={2} htmlFor="vaccinated">
            Vacunado:
          </Form.Label>
          <Col sm={10}>
            <ButtonGroup toggle>
              <ToggleButton
                type="checkbox"
                variant={formData.vaccinated ? "success" : "outline-danger"}
                checked={formData.vaccinated}
                value="1"
                onChange={handleVaccinatedToggle}
              >
                {formData.vaccinated ? "Sí" : "No"}
              </ToggleButton>
            </ButtonGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} htmlFor="description">
            Descripción:
          </Form.Label>
          <Col sm={10}>
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
          <Form.Label column sm={2} htmlFor="photo">
            Subir Foto:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default FormDogs;

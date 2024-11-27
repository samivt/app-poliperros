import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../assets/styles/admin/FormDogs.css";

const FormAdoptionDogs = ({ selectedDog, formMode, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    sex: "",
    age: "",
    vaccinated: false,
    description: "",
    photo: null,
    status: "", // Por defecto, el estado es "Disponible"
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (selectedDog && formMode === "update-adoption") {
      setFormData(selectedDog);
      setPhotoPreview(selectedDog.photo || null);
    } else {
      setFormData({
        id: "",
        name: "",
        sex: "",
        age: "",
        vaccinated: false,
        description: "",
        photo: null,
        status: "",
      });
      setPhotoPreview(null);
    }
  }, [selectedDog, formMode]);

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setPhotoPreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="custom-form-container">
      {formMode === "register-adoption" && (
        <h2 className="form-title">Registrar Perro en Adopción</h2>
      )}
      {formMode === "update-adoption" && (
        <h2 className="form-title">Actualizar Perro en Adopción</h2>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Identificador */}
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
              disabled={!!selectedDog} // Desactiva el campo si está editando
            />
          </Col>
        </Form.Group>

        {/* Nombre */}
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

        {/* Sexo */}
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

        {/* Edad */}
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

        {/* Vacunado */}
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

        {/* Descripción */}
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

        {/* Foto */}
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
            {photoPreview && (
              <div className="mt-3">
                <img
                  src={photoPreview}
                  alt="Vista previa"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </div>
            )}
          </Col>
        </Form.Group>

        {/* Estado */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Estado:
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              id="disponible"
              label="Disponible"
              name="status"
              value="Disponible"
              onChange={handleInputChange}
              checked={formData.status === "Disponible"}
              className="custom-radio"
            />
            <Form.Check
              type="radio"
              id="adoptado"
              label="Adoptado"
              name="status"
              value="Adoptado"
              onChange={handleInputChange}
              checked={formData.status === "Adoptado"}
              className="custom-radio"
            />
          </Col>
        </Form.Group>

        {/* Botón */}
        <div className="custom-button-container">
          <Button type="submit">
            {formMode === "update-adoption" ? "Actualizar" : "Registrar"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormAdoptionDogs;

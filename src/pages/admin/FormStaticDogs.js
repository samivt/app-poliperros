import React, { useState, useRef } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../assets/styles/admin/FormDogs.css";
import { createStaticDog, createAdoptionDog } from "../../services/dogsService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const FormDogs = ({ onSave = () => {} }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    about: "", // Campo de descripción
    age: "",
    is_vaccinated: false,
    image: null,
    gender: "",
    entry_date: "",
    is_sterilized: false,
    is_dewormed: false,
    operation: "",
    is_for_adoption: false, // Campo para diferenciar estáticos y adopción
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Resetea el formulario
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      about: "",
      age: "",
      is_vaccinated: false,
      image: null,
      gender: "",
      entry_date: "",
      is_sterilized: false,
      is_dewormed: false,
      operation: "",
      is_for_adoption: false,
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Manejo de cambios en los campos
  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      id,
      name,
      about,
      age,
      is_vaccinated,
      image,
      gender,
      entry_date,
      is_sterilized,
      is_dewormed,
      operation,
      is_for_adoption,
    } = formData;

    // Validaciones
    if (!validateFields(id, name, about, age, gender, entry_date)) return;

    const payload = {
      id: parseInt(id, 10),
      name,
      about,
      age: parseInt(age, 10),
      is_vaccinated,
      gender,
      entry_date,
      is_sterilized,
      is_dewormed,
      operation,
    };

    // Confirmación
    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de que deseas registrar este perro?",
      "Confirmar registro"
    );

    if (!confirmed) return;

    // Procesar la imagen si existe
    if (image) {
      const reader = new FileReader();
      reader.onload = async () => {
        payload.image = reader.result.split(",")[1]; // Base64 sin prefijo
        await sendPayload(payload, is_for_adoption);
      };
      reader.readAsDataURL(image);
    } else {
      await sendPayload(payload, is_for_adoption);
    }
  };

  // Validación de campos
  const validateFields = (id, name, about, age, gender, entry_date) => {
    if (!id || isNaN(Number(id))) {
      showErrorAlert(
        "El identificador debe ser un número válido.",
        "Identificador inválido"
      );
      return false;
    }
    if (!name.trim()) {
      showErrorAlert("El nombre es obligatorio.", "Campo obligatorio");
      return false;
    }
    if (!about.trim()) {
      showErrorAlert("La descripción es obligatoria.", "Campo obligatorio");
      return false;
    }
    if (!gender) {
      showErrorAlert("Selecciona el género del perro.", "Campo obligatorio");
      return false;
    }
    if (!age || isNaN(Number(age)) || Number(age) <= 0) {
      showErrorAlert("La edad debe ser un número positivo.", "Edad inválida");
      return false;
    }
    if (!entry_date) {
      showErrorAlert(
        "La fecha de ingreso es obligatoria.",
        "Campo obligatorio"
      );
      return false;
    }
    return true;
  };

  // Enviar datos al backend
  const sendPayload = async (payload, isForAdoption) => {
    try {
      const result = isForAdoption
        ? await createAdoptionDog(payload)
        : await createStaticDog(payload);

      showSuccessAlert("Perro registrado exitosamente.", "¡Registro exitoso!");

      onSave(result); // Callback para el padre
      resetForm(); // Resetear el formulario
    } catch (error) {
      console.error("Error al registrar el perro:", error);
      showErrorAlert(
        error.message || "Ocurrió un error al procesar tu solicitud.",
        "No se pudo completar el registro"
      );
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Registrar Nuevo Perro</h2>

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

        {/* Descripción */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Descripción:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              id="about"
              name="about"
              required
              value={formData.about}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* Fecha de Ingreso */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Fecha de Ingreso:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              id="entry_date"
              name="entry_date"
              required
              value={formData.entry_date}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* Género */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Género:
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              id="female"
              label="Hembra"
              name="gender"
              value="female"
              onChange={handleInputChange}
              checked={formData.gender === "female"}
            />
            <Form.Check
              type="radio"
              id="male"
              label="Macho"
              name="gender"
              value="male"
              onChange={handleInputChange}
              checked={formData.gender === "male"}
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

        {/* Otros Campos */}
        {/* Vacunado, Esterilizado, Desparasitado */}
        {/* Operación */}
        {/* Imagen */}
        {/* Adopción */}

        <div className="custom-button-container">
          <Button type="submit">Registrar</Button>
        </div>
      </Form>
    </div>
  );
};

export default FormDogs;

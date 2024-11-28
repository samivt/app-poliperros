import React, { useState, useRef } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
    about: "",
    age: "",
    is_vaccinated: false,
    image: null,
    gender: "",
    entry_date: "",
    is_sterilized: false,
    is_dewormed: false,
    operation: "",
    is_for_adoption: false, // Usado solo para lógica interna, no se envía al backend
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Hook para redireccionar

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

    // Construcción del payload sin incluir `is_for_adoption`
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
      is_for_adoption
        ? "¿Estás seguro de que deseas registrar este perro para adopción?"
        : "¿Estás seguro de que deseas registrar este perro permanente?",
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
      if (isForAdoption) {
        await createAdoptionDog(payload); // Llama directamente a la función sin asignarla a una variable
      } else {
        await createStaticDog(payload); // Llama directamente a la función sin asignarla a una variable
      }

      showSuccessAlert(
        isForAdoption
          ? "Perro registrado exitosamente para adopción"
          : "Perro registrado exitosamente como permanente",
        "¡Registro exitoso!"
      );

      onSave({ is_for_adoption: isForAdoption }); // Callback para el padre
      console.log("isForAdoption:", isForAdoption);
      // Redirigir según el tipo de perro registrado
      navigate(isForAdoption ? "/admin/adoption-dogs" : "/admin/static-dogs");

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

        {/* Vacunado */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            ¿Está vacunado?
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="checkbox"
              id="is_vaccinated"
              name="is_vaccinated"
              checked={formData.is_vaccinated}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* Esterilizado */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            ¿Está esterilizado?
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="checkbox"
              id="is_sterilized"
              name="is_sterilized"
              checked={formData.is_sterilized}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* Desparasitado */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            ¿Está desparasitado?
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="checkbox"
              id="is_dewormed"
              name="is_dewormed"
              checked={formData.is_dewormed}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* Operación */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Operación:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="operation"
              name="operation"
              value={formData.operation}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* Imagen */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Imagen:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="file"
              id="image"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleInputChange}
            />
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </div>
            )}
          </Col>
        </Form.Group>

        {/* Disponible para adopción */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            ¿Disponible para adopción?
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="checkbox"
              id="is_for_adoption"
              name="is_for_adoption"
              checked={formData.is_for_adoption}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <div className="custom-button-container">
          <Button type="submit">Registrar</Button>
        </div>
      </Form>
    </div>
  );
};

export default FormDogs;

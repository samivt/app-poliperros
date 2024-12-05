import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  fetchStaticDogById,
  fetchAdoptionDogById,
  fetchAdoptedDogById,
  updateStaticDog,
  updateAdoptionDog,
  updateAdoptedDog,
} from "../../services/dogsService";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";
import { Form, Button, Row, Col } from "react-bootstrap";

const EditDogView = ({ type, onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nameError, setNameError] = useState(false); // Para manejar errores de validación del nombre

  // Función para sanitizar entradas
  const sanitizeInput = (value) => DOMPurify.sanitize(value);

  // Validar que el nombre solo contenga letras y espacios
  const validateName = (name) => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name);

  useEffect(() => {
    const loadDog = async () => {
      try {
        const fetchMethod =
          type === "static"
            ? fetchStaticDogById
            : type === "adoption"
            ? fetchAdoptionDogById
            : fetchAdoptedDogById;

        const dogData = await fetchMethod(id);
        setFormData({
          ...dogData,
          name: sanitizeInput(dogData.name),
          about: sanitizeInput(dogData.about),
        });
        setImagePreview(dogData.image);
      } catch (error) {
        console.error("Error al cargar el perro:", error);
        showErrorAlert("No se pudo cargar la información del perro.");
        navigate(
          `/admin/${
            type === "static"
              ? "static-dogs"
              : type === "adoption"
              ? "adoption-dogs"
              : "adopted-dogs"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadDog();
  }, [id, type, navigate]);

  const handleInputChange = (event) => {
    const { name, value, type: inputType, checked, files } = event.target;

    if (inputType === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (inputType === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
          setFormData({ ...formData, image: reader.result.split(",")[1] });
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Validar y sanitizar entrada
      const sanitizedValue = sanitizeInput(value);

      // Validar nombre solo con letras
      if (name === "name") {
        if (!validateName(sanitizedValue)) {
          setNameError(true);
          return; // No actualiza el estado si hay error
        } else {
          setNameError(false);
        }
      }

      setFormData({
        ...formData,
        [name]:
          name === "age" || name === "id_chip"
            ? parseInt(sanitizedValue, 10) || null
            : sanitizedValue,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación básica de campos requeridos
    if (!formData.name || !formData.age || !formData.gender) {
      showErrorAlert("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const payload = {
        id_chip: formData.id_chip || 0,
        name: sanitizeInput(formData.name),
        about: sanitizeInput(formData.about || ""),
        age: formData.age || 0,
        is_vaccinated: formData.is_vaccinated || false,
        image:
          formData.image && !imagePreview.startsWith("http")
            ? formData.image
            : null,
        gender: sanitizeInput(formData.gender),
        entry_date: formData.entry_date
          ? sanitizeInput(formData.entry_date)
          : null, // Envía null si no hay fecha
        is_sterilized: formData.is_sterilized || false,
        is_dewormed: formData.is_dewormed || false,
        operation: sanitizeInput(formData.operation || ""),
      };

      console.log("Payload enviado al backend:", payload);
      const updateMethod =
        type === "static"
          ? updateStaticDog
          : type === "adoption"
          ? updateAdoptionDog
          : updateAdoptedDog;

      const response = await updateMethod(id, payload);

      if (response.detail?.includes("Actualizado")) {
        showSuccessAlert("Perro actualizado correctamente.");
        await onSave();
        navigate(
          `/admin/${
            type === "static"
              ? "static-dogs"
              : type === "adoption"
              ? "adoption-dogs"
              : "adopted-dogs"
          }`
        );
      } else {
        showErrorAlert("El perro no se pudo actualizar. Verifica los datos.");
      }
    } catch (error) {
      console.error("Error al actualizar el perro:", error);
      showErrorAlert("No se pudo actualizar la información del perro.");
    }
  };

  const handleCancel = () => {
    navigate(
      `/admin/${
        type === "static"
          ? "static-dogs"
          : type === "adoption"
          ? "adoption-dogs"
          : "adopted-dogs"
      }`
    );
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Editar Información del Perro{" "}
        {type === "static"
          ? "Permanente"
          : type === "adoption"
          ? "En Adopción"
          : "Adoptado"}
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={sanitizeInput(formData.name)}
                onChange={handleInputChange}
                required
                maxLength={100}
                isInvalid={nameError} // Marca el campo como inválido si hay error
              />
              {nameError && (
                <Form.Text className="text-danger">
                  El nombre solo puede contener letras y espacios.
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Edad (en años)</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age || ""}
                onChange={handleInputChange}
                required
                min={0}
                max={30}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Select
                name="gender"
                value={sanitizeInput(formData.gender)}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="male">Macho</option>
                <option value="female">Hembra</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Ingreso</Form.Label>
              <Form.Control
                type="date"
                name="entry_date"
                value={sanitizeInput(formData.entry_date || null)}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="about"
            value={sanitizeInput(formData.about)}
            onChange={handleInputChange}
            maxLength={500}
          />
        </Form.Group>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                name="is_vaccinated"
                label="Vacunado"
                checked={formData.is_vaccinated}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                name="is_sterilized"
                label="Esterilizado"
                checked={formData.is_sterilized}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                name="is_dewormed"
                label="Desparasitado"
                checked={formData.is_dewormed}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" onChange={handleInputChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Vista previa"
              className="img-fluid mt-3"
              style={{ maxHeight: "200px" }}
            />
          )}
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button type="submit" variant="primary">
            Guardar Cambios
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditDogView;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import "../../assets/styles/admin/FormVisits.css";
import { updateOwner } from "../../services/dogsService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const EditOwnerForm = ({ onOwnerUpdated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { owner } = location.state || {};

  const [formData, setFormData] = useState({
    name: owner?.name || "",
    direction: owner?.direction || "",
    cellphone: owner?.cellphone || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    direction: "",
    cellphone: "",
  });

  const sanitizeInput = (value) => DOMPurify.sanitize(value);

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) {
        error = "El nombre es obligatorio.";
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value)) {
        error = "El nombre solo puede contener letras y espacios.";
      }
    }

    if (name === "direction") {
      if (!value.trim()) {
        error = "La dirección es obligatoria.";
      }
    }

    if (name === "cellphone") {
      if (!value.trim()) {
        error = "El teléfono es obligatorio.";
      } else if (!/^[0-9]{1,10}$/.test(value)) {
        error = "El teléfono debe contener solo números y máximo 10 dígitos.";
      }
    }

    return error;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeInput(value);

    // Validar el campo en tiempo real
    const error = validateField(name, sanitizedValue);

    setFormData({ ...formData, [name]: sanitizedValue });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),
      direction: validateField("direction", formData.direction),
      cellphone: validateField("cellphone", formData.cellphone),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de actualizar la información del dueño?",
      "Confirmar actualización"
    );

    if (!confirmed) return;

    try {
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        direction: sanitizeInput(formData.direction),
        cellphone: sanitizeInput(formData.cellphone),
      };

      const response = await updateOwner(owner.id, sanitizedData);

      // Si la respuesta tiene el campo 'detail', lo mostramos
      if (response && response.detail) {
        showSuccessAlert(response.detail, "¡Éxito!");
      } else {
        showSuccessAlert(
          "Información del dueño actualizada correctamente.",
          "¡Éxito!"
        );
      }

      navigate("/admin/adopted-dogs"); // Redirigir al listado de perros adoptados
    } catch (error) {
      showErrorAlert(
        error.message ||
          "No se pudo actualizar la información del dueño. Inténtelo nuevamente."
      );
    }
  };

  const handleCancel = () => {
    navigate("/admin/adopted-dogs");
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Editar Información del Dueño</h2>

      <Form onSubmit={handleSubmit}>
        {/* Nombre */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Nombre: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            isInvalid={!!errors.name}
          />
          {errors.name && (
            <Form.Text className="text-danger">{errors.name}</Form.Text>
          )}
        </Form.Group>

        {/* Dirección */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Dirección: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="direction"
            value={formData.direction}
            onChange={handleInputChange}
            isInvalid={!!errors.direction}
          />
          {errors.direction && (
            <Form.Text className="text-danger">{errors.direction}</Form.Text>
          )}
        </Form.Group>

        {/* Teléfono */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Teléfono: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="cellphone"
            value={formData.cellphone}
            onChange={handleInputChange}
            isInvalid={!!errors.cellphone}
          />
          {errors.cellphone && (
            <Form.Text className="text-danger">{errors.cellphone}</Form.Text>
          )}
        </Form.Group>

        {/* Botones */}
        <div className="custom-button-container">
          <Button type="submit" className="custom-button">
            Actualizar
          </Button>
          <Button
            variant="secondary"
            className="custom-button ms-3"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditOwnerForm;

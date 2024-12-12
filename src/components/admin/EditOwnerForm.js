import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import DOMPurify from "dompurify"; // Importar DOMPurify
import "../../assets/styles/admin/FormVisits.css";
import { updateOwner } from "../../services/dogsService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const EditOwnerForm = ({ onOwnerUpdated }) => {
  const location = useLocation(); // Obtener los datos del estado de navegación
  const navigate = useNavigate();

  const { owner } = location.state || {}; // Extraer los datos del dueño
  const [formData, setFormData] = useState({
    name: owner?.name || "",
    direction: owner?.direction || "",
    cellphone: owner?.cellphone || "",
  });

  const [phoneError, setPhoneError] = useState(false); // Estado para validar teléfono

  // Función para sanitizar entradas
  const sanitizeInput = (value) => DOMPurify.sanitize(value);

  // Validar que el nombre solo contenga letras y espacios
  const validateName = (name) => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name);

  // Validar que el teléfono sea numérico y tenga máximo 10 dígitos
  const validatePhone = (phone) => /^[0-9]{1,10}$/.test(phone);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Sanitizar la entrada del usuario
    const sanitizedValue = sanitizeInput(value);

    if (name === "cellphone") {
      // Validar teléfono
      if (!validatePhone(sanitizedValue)) {
        setPhoneError(true);
        return; // No actualiza el estado si no pasa la validación
      } else {
        setPhoneError(false);
      }
    }

    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showErrorAlert("El nombre es obligatorio.");
      return false;
    }
    if (!validateName(formData.name)) {
      showErrorAlert("El nombre solo puede contener letras y espacios.");
      return false;
    }
    if (!formData.direction.trim()) {
      showErrorAlert("La dirección es obligatoria.");
      return false;
    }
    if (!formData.cellphone.trim()) {
      showErrorAlert("El teléfono es obligatorio.");
      return false;
    }
    if (!validatePhone(formData.cellphone)) {
      showErrorAlert(
        "El teléfono debe contener solo números y máximo 10 dígitos."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de actualizar la información del dueño?",
      "Confirmar actualización"
    );

    if (!confirmed) return;

    try {
      // Sanitizar el payload antes de enviarlo al backend
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        direction: sanitizeInput(formData.direction),
        cellphone: sanitizeInput(formData.cellphone),
      };

      await updateOwner(owner.id, sanitizedData); // Llamada al servicio usando el ID del dueño
      showSuccessAlert(
        "Información del dueño actualizada correctamente.",
        "¡Éxito!"
      );

      if (onOwnerUpdated) {
        onOwnerUpdated(); // Callback para actualizar la lista o redirigir
      }

      navigate("/admin/adopted-dogs"); // Redirigir después de la actualización
    } catch (error) {
      console.error("Error al actualizar el dueño:", error.message);
      showErrorAlert(
        "No se pudo actualizar la información del dueño. Inténtalo nuevamente."
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
        {/* Información del dueño */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Nombre: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={formData.name.trim() ? "is-valid" : "is-invalid"}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Dirección: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="direction"
            value={formData.direction}
            onChange={handleInputChange}
            className={formData.direction.trim() ? "is-valid" : "is-invalid"}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Teléfono: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="cellphone"
            value={formData.cellphone}
            onChange={handleInputChange}
            className={!phoneError ? "is-valid" : "is-invalid"}
            required
          />
          {phoneError && (
            <Form.Text className="text-danger">
              El teléfono debe contener solo números y máximo 10 dígitos.
            </Form.Text>
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

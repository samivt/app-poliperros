import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/admin/FormRegisterUser.css";
import { createUser } from "../../services/userService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const FormRegisterUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    role: false,
  });

  const navigate = useNavigate();

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validar los campos antes de enviar
  const validateForm = () => {
    const newErrors = {
      email:
        !formData.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      role: !formData.role,
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.role;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      showErrorAlert(
        "Por favor, complete los campos requeridos correctamente.",
        "Error en el formulario"
      );
      return;
    }

    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de que deseas crear este usuario?",
      "Confirmar creación"
    );

    if (!confirmed) return;

    try {
      await createUser(formData); // Llamar al servicio para crear el usuario
      showSuccessAlert("Usuario generado exitosamente.", "¡Éxito!");
      navigate("/admin/list-users");
    } catch (error) {
      console.error("Error al generar el usuario:", error.message);
      showErrorAlert(
        error.message ||
          "No se pudo registrar el usuario. Inténtelo nuevamente."
      );
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Generar Nuevo Usuario</h2>

      <Form onSubmit={handleSubmit}>
        {/* Correo Electrónico */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Correo Electrónico: <span className="required">*</span>
          </Form.Label>

          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "is-valid" : "is-invalid"}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">
              Por favor, ingrese un correo válido.
            </div>
          )}
        </Form.Group>

        {/* Rol */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Rol: <span className="required">*</span>
          </Form.Label>

          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className={errors.role ? "is-valid" : "is-invalid"}
            required
          >
            <option value="">Seleccionar</option>
            <option value="admin">Administrador</option>
            <option value="auxiliar">Auxiliar</option>
          </Form.Select>
          {errors.role && (
            <div className="invalid-feedback">
              Por favor, seleccione un rol.
            </div>
          )}
        </Form.Group>

        <div className="custom-button-container">
          <Button type="submit" className="custom-button">
            Generar usuario
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormRegisterUser;

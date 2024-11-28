import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/auth-service";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const FormRegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      showErrorAlert(
        "Todos los campos son obligatorios.",
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
      showSuccessAlert("Usuario registrado exitosamente.", "¡Éxito!");
      navigate("/admin/welcome"); // Pendiente
    } catch (error) {
      console.error("Error al registrar el usuario:", error.message);
      showErrorAlert(
        error.message ||
          "No se pudo registrar el usuario. Inténtalo nuevamente."
      );
    }
  };

  // Alternar visibilidad de la contraseña
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Registrar Nuevo Usuario</h2>

      <Form onSubmit={handleSubmit}>
        {/* Nombre de Usuario */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Nombre de Usuario:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        {/* Correo Electrónico */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Correo Electrónico:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        {/* Contraseña */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Contraseña:
          </Form.Label>
          <Col sm={9}>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </span>
            </div>
          </Col>
        </Form.Group>

        {/* Rol */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Rol:
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="admin">Administrador</option>
              <option value="auxiliar">Auxiliar</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <div className="text-end">
          <Button type="submit" variant="primary">
            Registrar Usuario
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormRegisterUser;

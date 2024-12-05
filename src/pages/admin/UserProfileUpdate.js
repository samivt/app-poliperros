import React, { useState } from "react";
import userService from "../../services/userService";
import { logout } from "../../services/authService";
import "../../assets/styles/admin/UserProfileUpdate.css";
import {
  showSuccessAlert,
  showErrorAlert,
  showWarningAlert,
} from "../../services/alertService";
import DOMPurify from "dompurify"; // Para sanitización

const UserProfileUpdate = ({ user, token }) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    // Validar solo si el campo está lleno
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(DOMPurify.sanitize(formData.email))
    ) {
      newErrors.email = "El formato del correo electrónico no es válido.";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Sanitización al momento de escribir
    setFormData({
      ...formData,
      [name]: DOMPurify.sanitize(value.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showWarningAlert(
        "Por favor, corrige los errores antes de continuar.",
        "Campos inválidos"
      );
      return;
    }

    try {
      // Preparar datos para enviar
      const dataToSend = {
        username: formData.username || null,
        email: formData.email || null,
      };

      const response = await userService.updateUser(dataToSend, token);

      if (response?.detail === "Información Actualizada") {
        showSuccessAlert("Usuario actualizado correctamente.");
        logout();
        window.location.href = "/login";
      } else {
        console.warn("Respuesta inesperada del backend:", response);
      }
    } catch (error) {
      console.error("Error capturado en handleSubmit:", error);
      showErrorAlert(
        "Hubo un problema al actualizar los datos. Inténtelo de nuevo.",
        "Error de actualización"
      );
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Actualizar Perfil</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre de usuario */}
        <div className="mb-3">
          <label htmlFor="username" className="custom-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        {/* Correo electrónico */}
        <div className="mb-3">
          <label htmlFor="email" className="custom-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        {/* Botón para enviar */}
        <div className="custom-button-container">
          <button type="submit" className="btn custom-button">
            Actualizar Perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileUpdate;

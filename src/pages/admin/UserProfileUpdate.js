import React, { useState } from "react";
import userService from "../../services/userService";
import { logout } from "../../services/authService"; // Importación nombrada
import "../../assets/styles/admin/UserProfileUpdate.css";
import {
  showSuccessAlert,
  showErrorAlert,
  showWarningAlert,
} from "../../services/alertService";

const UserProfileUpdate = ({ user, token }) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    // Validar formato del correo solo si se ingresó un valor
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "El formato del correo electrónico no es válido.";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit ejecutado");

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
        username: formData.username.trim() || null,
        email: formData.email.trim() || null,
      };
      console.log("Llamando a updateUser con datos:", dataToSend);

      const response = await userService.updateUser(dataToSend, token);

      // Manejar éxito de la actualización
      if (response?.detail === "Información Actualizada") {
        showSuccessAlert("Usuario actualizado correctamente.");
        console.log("Cerrando sesión...");
        logout(); // Llamar directamente a logout
        window.location.href = "/login"; // Redirigir al login
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
        <div className="mb-3">
          <label htmlFor="username" className="custom-label">
            Nombre de Usuario
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

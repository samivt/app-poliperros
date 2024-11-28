import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../services/auth-service";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Para alternar visibilidad de la contraseña

  const code = searchParams.get("code"); // Obtener el código de la URL

  const handleCancel = () => {
    navigate("/login"); // Redirige al login
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Validar las contraseñas
    if (!formData.new_password || !formData.confirm_password) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (formData.new_password !== formData.confirm_password) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Llamada al servicio para restablecer la contraseña
      await resetPassword(code, formData.new_password); // Solo enviamos el `code` y `new_password`
      showSuccessAlert("Contraseña restablecida exitosamente.", "¡Éxito!");
      navigate("/login"); // Redirigir al login
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      showErrorAlert(
        error.message ||
          "No se pudo restablecer la contraseña. Inténtalo nuevamente.",
        "Error"
      );
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2 className="reset-password-title">Restablecer Contraseña</h2>
        <p className="reset-password-subtitle">
          Ingresa tu nueva contraseña para continuar.
        </p>
        <Form onSubmit={handleSubmit}>
          {/* Nueva contraseña */}
          <Form.Group className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"} // Alterna visibilidad
                name="new_password"
                value={formData.new_password}
                onChange={handleInputChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </span>
            </div>
          </Form.Group>

          {/* Confirmar contraseña */}
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"} // Alterna visibilidad
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </span>
            </div>
          </Form.Group>

          {/* Mensaje de error */}
          {error && <p className="text-danger">{error}</p>}

          {/* Botones */}
          <div className="reset-password-buttons">
            <Button variant="secondary" className="me-2" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Restablecer Contraseña
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;

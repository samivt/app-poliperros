import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";
import "../../assets/styles/auth/ResetPassword.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const code = searchParams.get("code");

  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,+])[A-Za-z\d!@#$%^&*.,+]{8,}$/.test(
      password
    );

  const handleCancel = () => {
    navigate("/login");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value.trim().slice(0, 50),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const newPassword = formData.new_password.trim();
    const confirmPassword = formData.confirm_password.trim();

    if (!newPassword || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      setError(
        "La nueva contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await resetPassword(code, newPassword);
      showSuccessAlert("Contraseña restablecida exitosamente.", "¡Éxito!");
      navigate("/login");
    } catch (error) {
      //console.error("Error al restablecer la contraseña:", error);

      let errorMessage =
        "No se pudo restablecer la contraseña. Inténtalo nuevamente.";
      try {
        const errorData = JSON.parse(error.message);
        if (errorData.detail === "Token expirado o invalido") {
          errorMessage =
            "El enlace para restablecer la contraseña ha expirado o es inválido. Solicita un nuevo código.";
        }
      } catch (parseError) {
        //console.error("No se pudo procesar el error del backend:", parseError);
      }

      setError(errorMessage);
      showErrorAlert(errorMessage, "Error");
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
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="new_password"
              value={formData.new_password}
              onChange={handleInputChange}
              required
              isInvalid={
                formData.new_password !== "" &&
                !isValidPassword(formData.new_password)
              }
            />
            <Form.Control.Feedback type="invalid">
              La nueva contraseña debe tener al menos 8 caracteres, una letra
              mayúscula, un número y un carácter especial.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirmar contraseña */}
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              required
              isInvalid={
                formData.confirm_password !== "" &&
                formData.new_password !== formData.confirm_password
              }
            />
            <Form.Control.Feedback type="invalid">
              Las contraseñas no coinciden.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Mostrar/Ocultar contraseña */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Mostrar contraseñas"
              onChange={() => setShowPassword(!showPassword)}
            />
          </Form.Group>

          {/* Mensaje de error */}
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Botones */}
          <div className="reset-password-buttons">
            <Button
              type="submit"
              variant="primary"
              className="w-100 mb-2 btn-centered"
            >
              Restablecer Contraseña
            </Button>
            <Button
              variant="secondary"
              className="w-100"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </Form>
        <div className="forgot-reset-link">
          <p className="mt-3">
            ¿El enlace ha expirado?{" "}
            <Link to="/send-code">Solicita un nuevo código aquí</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

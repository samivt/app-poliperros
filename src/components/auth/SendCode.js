import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "../../services/authService";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";
import "../../assets/styles/auth/ResetPassword.css";

const SendCode = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Valida si el correo tiene un formato válido
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sanitizedEmail = email.trim(); // Sanitizar entrada

    if (!sanitizedEmail) {
      showErrorAlert("El correo electrónico es obligatorio.", "Error");
      return;
    }

    if (!isValidEmail(sanitizedEmail)) {
      showErrorAlert(
        "El formato del correo electrónico no es válido.",
        "Error"
      );
      return;
    }

    try {
      await sendPasswordResetEmail(sanitizedEmail);
      showSuccessAlert(
        "Se ha enviado un correo con instrucciones para restablecer tu contraseña.",
        "Correo enviado"
      );
      navigate("/verify-reset-code"); // Redirige a la página de verificación del código
    } catch (error) {
      console.error("Error al enviar el correo de restablecimiento:", error);
      showErrorAlert(
        "No se pudo enviar el correo. Por favor, verifica tu correo e inténtalo nuevamente.",
        "Error"
      );
    }
  };

  const handleCancel = () => {
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2 className="reset-password-title">Recupera tu cuenta</h2>
        <p className="reset-password-subtitle">
          Ingresa tu correo electrónico para buscar tu cuenta.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())} // Sanitiza mientras escribe
              required
              isInvalid={!isValidEmail(email) && email.trim() !== ""} // Valida el formato en tiempo real
            />
            <Form.Control.Feedback type="invalid">
              Ingresa un correo electrónico válido.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="reset-password-buttons">
            <Button
              type="submit"
              variant="primary"
              className="w-100 mb-2 btn-centered"
            >
              Enviar
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
      </div>
    </div>
  );
};

export default SendCode;

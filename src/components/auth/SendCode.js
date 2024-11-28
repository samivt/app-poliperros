import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "../../services/auth-service";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";
import "../../assets/styles/admin/ResetPassword.css"; // HAY QUE CAMBIAR

const SendCode = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      showErrorAlert("El correo electrónico es obligatorio.", "Error");
      return;
    }

    try {
      await sendPasswordResetEmail(email);
      showSuccessAlert(
        "Se ha enviado un correo con instrucciones para restablecer tu contraseña.",
        "Correo enviado"
      );
      navigate("/verify-reset-code"); // Cambiado para redirigir a ResetPassword
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <div className="reset-password-buttons">
            <Button variant="secondary" className="me-2" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Enviar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SendCode;

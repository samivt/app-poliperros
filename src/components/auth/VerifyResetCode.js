import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyResetCode } from "../../services/authService";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";
import "../../assets/styles/auth/ResetPassword.css";

const VerifyResetCode = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(searchParams.get("code") || "");

  const sanitizeCode = (input) => input.replace(/[^0-9]/g, "");

  const handleCancel = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const sanitizedValue = sanitizeCode(e.target.value);
    setCode(sanitizedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sanitizedCode = code.trim();

    if (!sanitizedCode) {
      showErrorAlert("El código es obligatorio.", "Error");
      return;
    }

    try {
      await verifyResetCode(sanitizedCode);
      showSuccessAlert("Código verificado correctamente.", "Éxito");
      navigate(`/reset-password?code=${sanitizedCode}`);
    } catch (error) {
      // console.error("Error al verificar el código:", error);
      showErrorAlert(
        "No se pudo verificar el código. Inténtalo nuevamente.",
        "Error"
      );
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2 className="reset-password-title">Verificar Código</h2>
        <p className="reset-password-subtitle">
          Ingresa el código recibido para continuar.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Código de verificación"
              value={code}
              onChange={handleChange}
              required
              maxLength={6}
              isInvalid={!/^\d{1,6}$/.test(code) && code !== ""}
            />
            <Form.Control.Feedback type="invalid">
              El código debe ser numérico.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="reset-password-buttons ">
            <Button
              type="submit"
              variant="primary"
              className="w-100 mb-2 btn-centered"
            >
              Verificar
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

export default VerifyResetCode;

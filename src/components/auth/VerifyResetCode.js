import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyResetCode } from "../../services/auth-service";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";

const VerifyResetCode = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(searchParams.get("code") || "");

  const handleCancel = () => {
    navigate("/login"); // Redirige al login
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!code.trim()) {
      showErrorAlert("El código es obligatorio.", "Error");
      return;
    }

    try {
      await verifyResetCode(code);
      showSuccessAlert("Código verificado correctamente.", "Éxito");
      navigate(`/reset-password?code=${code}`); // Pasa el código a la siguiente vista
    } catch (error) {
      console.error("Error al verificar el código:", error);
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
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </Form.Group>
          <div className="reset-password-buttons">
            <Button variant="secondary" className="me-2" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Verificar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyResetCode;

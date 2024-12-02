import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/styles/admin/UpdatePassword.css";
import { updatePassword } from "../../services/userService";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    actualPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value.trim().slice(0, 50), // Limitar longitud máxima
    });
  };

  const validateFields = () => {
    const validationErrors = {};

    // Validar campos requeridos
    if (!formData.actualPassword) {
      validationErrors.actualPassword = "La contraseña actual es obligatoria.";
    }

    if (!formData.newPassword) {
      validationErrors.newPassword = "La nueva contraseña es obligatoria.";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        formData.newPassword
      )
    ) {
      validationErrors.newPassword =
        "La nueva contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.";
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirma tu nueva contraseña.";
    } else if (formData.newPassword !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos antes de enviar
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Llamar al servicio de actualización de contraseña
      await updatePassword(formData.actualPassword, formData.newPassword);
      showSuccessAlert("Contraseña actualizada correctamente.", "¡Éxito!");
      setFormData({
        actualPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error.message);
      showErrorAlert(
        error.message || "Hubo un problema al actualizar la contraseña.",
        "Error"
      );
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Actualizar Contraseña</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="custom-label">
            Contraseña Actual <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="actualPassword"
            placeholder="Ingresa tu contraseña actual"
            value={formData.actualPassword}
            onChange={handleChange}
            className={errors.actualPassword ? "is-invalid" : ""}
          />
          <Form.Control.Feedback type="invalid">
            {errors.actualPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="custom-label">
            Nueva Contraseña <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Ingresa tu nueva contraseña"
            value={formData.newPassword}
            onChange={handleChange}
            className={errors.newPassword ? "is-invalid" : ""}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="custom-label">
            Confirmar Nueva Contraseña <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirma tu nueva contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "is-invalid" : ""}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="password-visibility-toggle">
          <Form.Check
            type="checkbox"
            label="Mostrar contraseñas"
            onChange={handleTogglePasswordVisibility}
          />
        </div>

        <div className="custom-button-container">
          <Button type="submit" className="btn custom-button">
            Actualizar Contraseña
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePassword;

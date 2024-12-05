import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify"; // Para sanitización
import "../../assets/styles/admin/UpdatePassword.css";
import { updatePassword } from "../../services/userService";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";

const validationSchema = Yup.object({
  actualPassword: Yup.string()
    .required("La contraseña actual es obligatoria")
    .transform((value) => DOMPurify.sanitize(value.trim())), // Elimina espacios extra al inicio y final, y sanitiza

  newPassword: Yup.string()
    .required("La nueva contraseña es obligatoria")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;'"|\\<>,.?/~`])[A-Za-z\d!@#$%^&*()\-_=+{}[\]:;'"|\\<>,.?/~`]{8,}$/,
      "Debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial"
    )
    .transform((value) => DOMPurify.sanitize(value)), // Sanitiza sin afectar espacios internos

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden")
    .required("Confirma tu nueva contraseña")
    .transform((value) => DOMPurify.sanitize(value)), // Sanitiza sin afectar espacios internos
});

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Llamar al servicio para actualizar la contraseña
      await updatePassword(values.actualPassword, values.newPassword);
      showSuccessAlert("Contraseña actualizada correctamente.", "¡Éxito!");
      resetForm();
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error.message);
      showErrorAlert(
        error.message || "Hubo un problema al actualizar la contraseña.",
        "Error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Actualizar Contraseña</h2>
      <Formik
        initialValues={{
          actualPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            {/* Contraseña Actual */}
            <Form.Group className="mb-3">
              <Form.Label className="custom-label">
                Contraseña Actual <span className="required">*</span>
              </Form.Label>
              <Field
                name="actualPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña actual"
                className="form-control"
              />
              <ErrorMessage
                name="actualPassword"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Nueva Contraseña */}
            <Form.Group className="mb-3">
              <Form.Label className="custom-label">
                Nueva Contraseña <span className="required">*</span>
              </Form.Label>
              <Field
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu nueva contraseña"
                className="form-control"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Confirmar Nueva Contraseña */}
            <Form.Group className="mb-3">
              <Form.Label className="custom-label">
                Confirmar Nueva Contraseña <span className="required">*</span>
              </Form.Label>
              <Field
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirma tu nueva contraseña"
                className="form-control"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Toggle para mostrar contraseñas */}
            <div className="password-visibility-toggle">
              <Form.Check
                type="checkbox"
                label="Mostrar contraseñas"
                onChange={handleTogglePasswordVisibility}
              />
            </div>

            {/* Botón para enviar */}
            <div className="custom-button-container">
              <Button
                type="submit"
                className="btn custom-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Actualizando..." : "Actualizar Contraseña"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;

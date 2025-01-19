import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import userService from "../../services/userService";
import { logout } from "../../services/authService";
import "../../assets/styles/admin/UserProfileUpdate.css";
import {
  showSuccessAlert,
  showErrorAlert,
  showWarningAlert,
} from "../../services/alertService";

const UserProfileUpdate = ({ user, token }) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .nullable()
      .transform((value) =>
        value.trim() ? DOMPurify.sanitize(value.trim()) : null
      ),
    email: Yup.string()
      .nullable()
      .email("El formato del correo electrónico no es válido.")
      .transform((value) =>
        value.trim() ? DOMPurify.sanitize(value.trim()) : null
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await userService.updateUser(values, token);

      if (response?.detail === "Información Actualizada") {
        showSuccessAlert("Usuario actualizado correctamente.");
        logout();
        window.location.href = "/login";
      } else {
        console.warn("Respuesta inesperada del backend:", response);
        showWarningAlert("Respuesta inesperada del servidor.");
      }
    } catch (error) {
      console.error("Error capturado en handleSubmit:", error);
      showErrorAlert(
        "Hubo un problema al actualizar los datos. Inténtelo de nuevo.",
        "Error de actualización"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Actualizar Perfil</h2>
      <Formik
        initialValues={{
          username: user?.username || "",
          email: user?.email || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Nombre de usuario */}
            <div className="mb-3">
              <label htmlFor="username" className="custom-label">
                Nombre de usuario
              </label>
              <Field
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Ingrese su nuevo usuario"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Correo electrónico */}
            <div className="mb-3">
              <label htmlFor="email" className="custom-label">
                Correo Electrónico
              </label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Ingrese su correo electrónico"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Botón para enviar */}
            <div className="custom-button-container">
              <button
                type="submit"
                className="btn custom-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Actualizando..." : "Actualizar Perfil"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfileUpdate;

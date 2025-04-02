import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/admin/FormRegisterUser.css";
import { createUser } from "../../services/userService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const FormRegisterUser = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Por favor, ingrese un correo válido.")
      .required("El correo electrónico es obligatorio."),
    role: Yup.string().required("El rol es obligatorio."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const confirmed = await showConfirmationAlert(
        "¿Estás seguro de que deseas crear este usuario?",
        "Confirmar creación"
      );

      if (!confirmed) return;

      try {
        await createUser(values);
        showSuccessAlert("Usuario generado exitosamente.", "¡Éxito!");
        navigate("/admin/list-users");
      } catch (error) {
        //console.error("Error al generar el usuario:", error.message);
        showErrorAlert(
          error.message ||
            "No se pudo registrar el usuario. Inténtelo nuevamente."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Generar Nuevo Usuario</h2>

      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Correo Electrónico: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Rol: <span className="required">*</span>
          </Form.Label>
          <Form.Select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.role && !!formik.errors.role}
          >
            <option value="">Seleccionar</option>
            <option value="admin">Administrador</option>
            <option value="auxiliar">Auxiliar</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.role}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="custom-button-container">
          <Button
            type="submit"
            className="custom-button"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Generando..." : "Generar usuario"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormRegisterUser;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import "../../assets/styles/main/FormInscription.css";
import { createApplicant } from "../../services/applicantService";
import { showErrorAlert } from "../../services/alertService";

const validationSchema = Yup.object({
  first_name: Yup.string()
    .transform((value) => DOMPurify.sanitize(value.trim()))
    .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras y espacios")
    .required("El nombre es obligatorio"),
  last_name: Yup.string()
    .transform((value) => DOMPurify.sanitize(value.trim()))
    .matches(/^[a-zA-ZñÑ\s]+$/, "Solo se permiten letras y espacios")
    .required("El apellido es obligatorio"),
  email: Yup.string()
    .transform((value) => DOMPurify.sanitize(value.trim()))
    .email("Correo no válido")
    .required("El correo es obligatorio"),
  cellphone: Yup.string()
    .transform((value) =>
      DOMPurify.sanitize(value.replace(/[^0-9]/g, "").slice(0, 10))
    )
    .matches(/^\d{10}$/, "Debe contener exactamente 10 dígitos")
    .required("El teléfono es obligatorio"),
  image: Yup.mixed().nullable().required("El comprobante es obligatorio"),
});

const FormInscription = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    cellphone: "",
    course_id: parseInt(courseId, 10) || 0,
    image: null,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createApplicant(values);
      navigate("/thank-you");
    } catch (error) {
      //console.error("Error al registrar la inscripción:", error);
      showErrorAlert(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="custom-form-container">
        <h2 className="form-title">Formulario de Inscripción</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="form-body">
              {/* Nombre */}
              <Form.Group className="mb-3">
                <Form.Label className="custom-label">
                  Nombre: <span className="required">*</span>
                </Form.Label>
                <Field
                  name="first_name"
                  type="text"
                  placeholder="Ingrese su nombre"
                  className="form-control"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              {/* Apellido */}
              <Form.Group className="mb-3">
                <Form.Label className="custom-label">
                  Apellido: <span className="required">*</span>
                </Form.Label>
                <Field
                  name="last_name"
                  type="text"
                  placeholder="Ingrese su apellido"
                  className="form-control"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label className="custom-label">
                  Correo electrónico: <span className="required">*</span>
                </Form.Label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              {/* Teléfono */}
              <Form.Group className="mb-3">
                <Form.Label className="custom-label">
                  Teléfono: <span className="required">*</span>
                </Form.Label>
                <Field
                  name="cellphone"
                  type="text"
                  placeholder="Ingrese su teléfono"
                  className="form-control"
                />
                <ErrorMessage
                  name="cellphone"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              {/* Comprobante */}
              <div className="bank-info">
                <h5 className="bank-info-title">Datos bancarios</h5>
                <p className="bank-info-text">
                  <strong> Banco Pichincha</strong>
                </p>
                <p className="bank-info-text">
                  <strong>Tipo de cuenta:</strong> Ahorros
                </p>
                <p className="bank-info-text">
                  <strong>Nº de cuenta:</strong> 2206486051
                </p>
                <p className="bank-info-text">
                  <strong>Nombre:</strong> Castro Vásquez Andrea Jahaira
                </p>
                <p className="bank-info-text">
                  <strong>Nº cédula:</strong> 1725615613
                </p>
              </div>
              <Form.Group className="mb-3">
                <Form.Label className="custom-label">
                  Comprobante de pago:<span className="required">*</span>
                </Form.Label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-control"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setFieldValue("image", reader.result.split(",")[1]);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setFieldValue("image", null);
                    }
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <div className="custom-button-container">
                <Button
                  type="submit"
                  className="custom-button"
                  disabled={isSubmitting}
                >
                  Inscribirse
                </Button>
                <Button
                  type="button"
                  className="custom-button cancel-button"
                  onClick={() => navigate("/courses-view")}
                >
                  Cancelar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormInscription;

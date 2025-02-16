import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify"; // Para sanitizar entradas
import "../../assets/styles/admin/FormDogs.css";
import { createStaticDog, createAdoptionDog } from "../../services/dogsService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const FormDogs = ({ onSave = () => {} }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const validationSchema = Yup.object({
    id_chip: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .matches(/^\d*$/, "Solo se permiten números positivos"),

    name: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .matches(
        /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]*$/,
        "Solo se permiten letras y espacios"
      )
      .required("El nombre es obligatorio"),
    about: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .max(500, "La descripción no puede exceder 500 caracteres"),
    age: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .matches(/^\d+$/, "Debe ser un número positivo")
      .required("La edad es obligatoria")
      .test(
        "is-greater-than-zero",
        "La edad debe ser mayor que 0",
        (value) => parseInt(value, 10) > 0
      ),
    gender: Yup.string()
      .transform((value) => DOMPurify.sanitize(value))
      .required("El género es obligatorio"),
    entry_date: Yup.date().nullable(),
    is_vaccinated: Yup.boolean(),
    is_sterilized: Yup.boolean(),
    is_dewormed: Yup.boolean(),
    operation: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .max(100, "La operación no puede exceder 100 caracteres")
      .nullable(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const confirmed = await showConfirmationAlert(
      values.is_for_adoption
        ? "¿Registrar como perro para adopción?"
        : "¿Registrar como perro permanente?",
      "Confirmar Registro"
    );

    if (!confirmed) {
      setSubmitting(false);
      return;
    }

    try {
      const sanitizedData = { ...values };
      sanitizedData.entry_date = sanitizedData.entry_date || null;

      if (values.is_for_adoption) {
        await createAdoptionDog(sanitizedData);
      } else {
        await createStaticDog(sanitizedData);
      }

      showSuccessAlert(
        values.is_for_adoption
          ? "Perro registrado para adopción."
          : "Perro registrado como permanente.",
        "¡Registro Exitoso!"
      );

      resetForm();
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onSave({ is_for_adoption: values.is_for_adoption });
      navigate(
        values.is_for_adoption ? "/admin/adoption-dogs" : "/admin/static-dogs"
      );
    } catch (error) {
      const errorMessage =
        error.message.includes("detail") && error.message !== "[object Object]"
          ? JSON.parse(error.message).detail
          : error.message;
      showErrorAlert(errorMessage || "Error en el registro.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Registrar Perro</h2>
      <Formik
        initialValues={{
          id_chip: "",
          name: "",
          about: "",
          age: "",
          image: null,
          gender: "",
          entry_date: "",
          is_vaccinated: false,
          is_sterilized: false,
          is_dewormed: false,
          operation: "",
          is_for_adoption: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {/* Nº Chip */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">Nº Chip:</Form.Label>
              <Field
                type="number"
                name="id_chip"
                className="form-control"
                placeholder="Ingrese el Nº de chip"
              />
              <ErrorMessage
                name="id_chip"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Nombre */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Nombre: <span className="required">*</span>
              </Form.Label>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Ingrese el nombre del perro"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Descripción */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">Descripción:</Form.Label>
              <Field
                as="textarea"
                name="about"
                className="form-control"
                placeholder="Ingrese una descripción (opcional)"
              />
              <ErrorMessage
                name="about"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Edad */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Edad (en años): <span className="required">*</span>
              </Form.Label>
              <Field
                type="number"
                name="age"
                className="form-control"
                placeholder="Ingrese la edad del perro"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Género */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Género: <span className="required">*</span>
              </Form.Label>
              <Field as="select" name="gender" className="form-control">
                <option value="">Seleccione...</option>
                <option value="male">Macho</option>
                <option value="female">Hembra</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Fecha de ingreso:
              </Form.Label>
              <Field type="date" name="entry_date" className="form-control" />
              <ErrorMessage
                name="entry_date"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            {/* ¿Está vacunado? */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">¿Está vacunado?</Form.Label>
              <Field name="is_vaccinated">
                {({ field }) => (
                  <Form.Check
                    type="switch"
                    id="is_vaccinated"
                    label={field.value ? "Sí" : "No"}
                    checked={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              </Field>
            </Form.Group>

            {/* ¿Está esterilizado? */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                ¿Está esterilizado?
              </Form.Label>
              <Field name="is_sterilized">
                {({ field }) => (
                  <Form.Check
                    type="switch"
                    id="is_sterilized"
                    label={field.value ? "Sí" : "No"}
                    checked={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              </Field>
            </Form.Group>

            {/* ¿Está desparasitado? */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                ¿Está desparasitado?
              </Form.Label>
              <Field name="is_dewormed">
                {({ field }) => (
                  <Form.Check
                    type="switch"
                    id="is_dewormed"
                    label={field.value ? "Sí" : "No"}
                    checked={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              </Field>
            </Form.Group>

            {/* Operación */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">Operación:</Form.Label>
              <Field
                type="text"
                name="operation"
                className="form-control"
                placeholder="Ingrese el tipo de operación (opcional)"
              />
              <ErrorMessage
                name="operation"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Imagen */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">Imagen:</Form.Label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="form-control"
                ref={fileInputRef}
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setImagePreview(reader.result);
                      setFieldValue("image", reader.result.split(",")[1]);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="img-preview"
                  />
                </div>
              )}
            </Form.Group>
            {/* Disponible para adopcion */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                ¿Está disponible para adopción?
              </Form.Label>
              <Field name="is_for_adoption">
                {({ field }) => (
                  <Form.Check
                    type="switch"
                    id="is_for_adoption"
                    label={field.value ? "Sí" : "No"}
                    checked={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              </Field>
            </Form.Group>

            {/* Botón para registrar */}
            <div className="custom-button-container">
              <Button type="submit" className="custom-button">
                Registrar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormDogs;

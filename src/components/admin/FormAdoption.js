import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";
import { fetchAdoptionDogById } from "../../services/dogsService"; // Servicio para obtener el perro por ID
import "../../assets/styles/admin/FormAdoption.css"; // Estilos personalizados

const FormAdoption = ({ onSubmit, onSuccess }) => {
  const { id } = useParams();
  const [dogName, setDogName] = useState(""); // Estado para almacenar el nombre del perro

  // Cargar el nombre del perro por ID
  useEffect(() => {
    const loadDogName = async () => {
      try {
        const dog = await fetchAdoptionDogById(id); // Supone que `fetchDogById` devuelve un objeto perro
        setDogName(dog.name || ""); // Actualiza el estado con el nombre del perro
      } catch (error) {
        console.error("Error al cargar el perro:", error);
        showErrorAlert("No se pudo cargar la información del perro.");
      }
    };

    if (id) {
      loadDogName();
    }
  }, [id]);

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    dog_id: Yup.string().required("El ID del perro es obligatorio."),
    adoption_date: Yup.date().required("La fecha de adopción es obligatoria."),
    name: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios."
      )
      .required("El nombre es obligatorio."),
    direction: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .required("La dirección es obligatoria."),
    cellphone: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .matches(/^[0-9]{1,10}$/, "El teléfono debe tener máximo 10 dígitos.")
      .required("El teléfono es obligatorio."),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit(values);
      showSuccessAlert("¡La adopción se registró correctamente!");
      resetForm();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al registrar la adopción:", error);
      showErrorAlert(
        "Ocurrió un error al registrar la adopción. Intenta nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-adoption-container">
      <h2 className="form-adoption-title">Formulario de Adopción</h2>
      <Formik
        initialValues={{
          dog_id: id || "",
          adoption_date: "",
          name: "",
          direction: "",
          cellphone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            {/* Nombre del perro */}
            <div className="form-adoption-group">
              <label htmlFor="dog_id" className="form-adoption-label">
                Nombre del Perro:
              </label>
              <Field
                name="dog_id"
                value={dogName}
                className="form-adoption-input readonly"
                readOnly
              />
            </div>

            {/* Fecha de adopción */}
            <div className="form-adoption-group">
              <label htmlFor="adoption_date" className="form-adoption-label">
                Fecha de Adopción:
              </label>
              <Field
                type="date"
                name="adoption_date"
                className="form-adoption-input"
              />
              <ErrorMessage
                name="adoption_date"
                component="div"
                className="form-adoption-error"
              />
            </div>

            {/* Nombre del dueño */}
            <div className="form-adoption-group">
              <label htmlFor="name" className="form-adoption-label">
                Nombre del Dueño:
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Ingrese el nombre del dueño"
                className="form-adoption-input"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="form-adoption-error"
              />
            </div>

            {/* Dirección */}
            <div className="form-adoption-group">
              <label htmlFor="direction" className="form-adoption-label">
                Dirección:
              </label>
              <Field
                type="text"
                name="direction"
                placeholder="Ingrese la dirección"
                className="form-adoption-input"
              />
              <ErrorMessage
                name="direction"
                component="div"
                className="form-adoption-error"
              />
            </div>

            {/* Teléfono */}
            <div className="form-adoption-group">
              <label htmlFor="cellphone" className="form-adoption-label">
                Teléfono:
              </label>
              <Field
                type="tel"
                name="cellphone"
                placeholder="Ingrese el teléfono"
                className="form-adoption-input"
              />
              <ErrorMessage
                name="cellphone"
                component="div"
                className="form-adoption-error"
              />
            </div>

            <div className="form-adoption-button-container">
              <Button
                type="submit"
                className="form-adoption-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAdoption;

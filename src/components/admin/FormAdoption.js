import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";
import { fetchAdoptionDogById, adoptDog } from "../../services/dogsService";
import "../../assets/styles/admin/FormAdoption.css";

const FormAdoption = ({ onSuccess }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dogName, setDogName] = useState("");

  useEffect(() => {
    const loadDogName = async () => {
      try {
        const dog = await fetchAdoptionDogById(id);
        setDogName(dog.name || "");
      } catch (error) {
        console.error("Error al cargar el perro:", error);
        showErrorAlert("No se pudo cargar la información del perro.");
      }
    };

    if (id) {
      loadDogName();
    }
  }, [id]);

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
      // Realiza la adopción
      const { dog_id, adoption_date, name, direction, cellphone } = values;
      const response = await adoptDog(dog_id, adoption_date, {
        name,
        direction,
        cellphone,
      });

      // Verifica si la adopción fue exitosa
      if (response && response.detail === "Perro Adoptado.") {
        showSuccessAlert("¡La adopción se registró correctamente!");
        resetForm();
        if (onSuccess) onSuccess(); // Acción posterior a la adopción exitosa
      } else {
        // Si el mensaje de respuesta no es el esperado
        showErrorAlert("No se pudo registrar la adopción.");
      }
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
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Nombre del Perro:
              </Form.Label>
              <Field
                name="dog_id"
                value={dogName}
                className="form-adoption-input readonly"
                readOnly
              />
            </Form.Group>

            {/* Fecha de adopción */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Fecha de Adopción:<span className="required">*</span>
              </Form.Label>
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
            </Form.Group>

            {/* Nombre del dueño */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Nombre del Dueño:<span className="required">*</span>
              </Form.Label>
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
            </Form.Group>

            {/* Dirección */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Dirección:<span className="required">*</span>
              </Form.Label>
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
            </Form.Group>

            {/* Teléfono */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Teléfono:<span className="required">*</span>
              </Form.Label>
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
            </Form.Group>

            <div className="custom-button-container">
              <Button type="submit" className="custom-button">
                Registrar
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="custom-button"
                onClick={() => navigate("/admin/adoption-dogs")}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAdoption;

import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/admin/FormVisits.css";
import { fetchAdoptedDogs } from "../../services/dogsService";
import { createVisit } from "../../services/visitService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const FormVisits = ({ onVisitCreated }) => {
  const [adoptedDogs, setAdoptedDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null); // Estado para almacenar el perro seleccionado
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Cargar perros adoptados
  useEffect(() => {
    const loadAdoptedDogs = async () => {
      try {
        const data = await fetchAdoptedDogs();
        setAdoptedDogs(data);
      } catch (error) {
        console.error("No hay perros adoptados:", error);
        //showErrorAlert("No se pudieron cargar los perros adoptados.", "Error");
      }
    };
    loadAdoptedDogs();
  }, []);

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    adopted_dog_id: Yup.string().required(
      "Debes seleccionar un perro adoptado."
    ),
    visit_date: Yup.date().required("La fecha de la visita es obligatoria."),
    // evidence: Yup.string().required("Debes cargar una evidencia (imagen)."),
    observations: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .max(500, "Las observaciones no pueden exceder 500 caracteres"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de registrar esta visita?",
      "Confirmar registro"
    );

    if (!confirmed) {
      setSubmitting(false);
      return;
    }

    try {
      await createVisit(values);
      showSuccessAlert("Visita registrada exitosamente.", "¡Éxito!");

      if (onVisitCreated) {
        onVisitCreated();
      }

      resetForm();
      setImagePreview(null);
      navigate("/admin/visits-table");
    } catch (error) {
      console.error("Error al registrar la visita:", error);
      showErrorAlert("No se pudo registrar la visita. Inténtalo nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Registrar Visita</h2>
      <Formik
        initialValues={{
          visit_date: "",
          evidence: "",
          observations: "",
          adopted_dog_id: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            {/* Seleccionar perro adoptado */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">Perro Adoptado:</Form.Label>
              <Field
                as="select"
                name="adopted_dog_id"
                className="form-control"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setFieldValue("adopted_dog_id", selectedId);

                  // Encuentra el perro seleccionado si existe
                  const dog = adoptedDogs.find(
                    (d) => d.id === parseInt(selectedId, 10)
                  );
                  setSelectedDog(dog || null); // Actualiza el estado
                }}
              >
                <option value="">Seleccionar</option>
                {/* Verifica que adoptedDogs sea un array */}
                {Array.isArray(adoptedDogs) &&
                  adoptedDogs.map((dog) => (
                    <option key={dog.id} value={dog.id}>
                      {dog.name}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name="adopted_dog_id"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="custom-label">Dueño:</Form.Label>
              <Form.Control
                type="text"
                value={selectedDog?.owner?.name || "No disponible"} // Valor predeterminado si no hay dueño
                readOnly
                className="form-control-plaintext"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="custom-label">Dirección:</Form.Label>
              <Form.Control
                type="text"
                value={selectedDog?.owner?.direction || "No disponible"} // Valor predeterminado
                readOnly
                className="form-control-plaintext"
              />
            </Form.Group>

            {/* Fecha de la visita */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Fecha de Visita: <span className="required">*</span>
              </Form.Label>
              <Field type="date" name="visit_date" className="form-control" />
              <ErrorMessage
                name="visit_date"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Evidencia */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">Evidencia:</Form.Label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setImagePreview(reader.result);
                      setFieldValue("evidence", reader.result.split(",")[1]);
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
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
              <ErrorMessage
                name="evidence"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Observaciones */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">Observaciones:</Form.Label>
              <Field
                as="textarea"
                name="observations"
                className="form-control"
                placeholder="Ingrese una descripción (opcional)"
              />
              <ErrorMessage
                name="observations"
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
                {isSubmitting ? "Registrando..." : "Registrar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormVisits;

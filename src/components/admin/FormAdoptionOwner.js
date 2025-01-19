import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";
import {
  fetchAdoptionDogById,
  fetchAllOwners,
  adoptDogOwner,
} from "../../services/dogsService"; // Servicios para obtener el perro, los dueños y realizar la adopción
import "../../assets/styles/admin/FormAdoption.css"; // Estilos personalizados

const FormAdoptionOwner = ({ onSuccess }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dogName, setDogName] = useState(""); // Estado para almacenar el nombre del perro
  const [owners, setOwners] = useState([]); // Estado para almacenar la lista de dueños

  // Cargar el nombre del perro por ID
  useEffect(() => {
    const loadDogName = async () => {
      try {
        const dog = await fetchAdoptionDogById(id); // Supone que `fetchAdoptionDogById` devuelve un objeto perro
        setDogName(dog.name || ""); // Actualiza el estado con el nombre del perro
      } catch (error) {
        console.error("Error al cargar el perro:", error);
        showErrorAlert("No se pudo cargar la información del perro.");
      }
    };

    const loadOwners = async () => {
      try {
        const ownersList = await fetchAllOwners(); // Suponiendo que este servicio devuelve una lista de dueños
        setOwners(ownersList); // Actualiza el estado con la lista de dueños
      } catch (error) {
        console.error("Error al cargar los dueños:", error);
        showErrorAlert("No se pudo cargar la lista de dueños.");
      }
    };

    if (id) {
      loadDogName();
    }
    loadOwners();
  }, [id]);

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    adoption_date: Yup.date().required("La fecha de adopción es obligatoria."),
    owner_id: Yup.string().required("Debe seleccionar un dueño."),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { adoption_date, owner_id } = values;
      // Llamada al servicio adoptDog para realizar la adopción
      const response = await adoptDogOwner(id, adoption_date, owner_id);

      // Verificar si la adopción fue exitosa con el mensaje esperado
      if (response && response.detail === "Perro Adoptado creado") {
        showSuccessAlert("¡La adopción se registró correctamente!");
        resetForm();
        if (onSuccess) onSuccess(); // Acción posterior a la adopción exitosa
        navigate("/admin/adopted-dogs"); // Redirige a la página de perros adoptados
      } else {
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
          owner_id: "",
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

            {/* Seleccionar dueño */}
            <Form.Group className="mb-4">
              <Form.Label className="custom-label">
                Dueño del Perro:<span className="required">*</span>
              </Form.Label>
              <Field
                as="select"
                name="owner_id"
                className="form-adoption-input"
              >
                <option value="">Selecciona un dueño</option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="owner_id"
                component="div"
                className="form-adoption-error"
              />
            </Form.Group>

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

export default FormAdoptionOwner;

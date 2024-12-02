import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
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
  const [selectedDog, setSelectedDog] = useState(null);
  const [formData, setFormData] = useState({
    visit_date: "",
    evidence: null,
    observations: "",
    adopted_dog_id: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Cargar perros adoptados al cargar el componente
  useEffect(() => {
    const loadAdoptedDogs = async () => {
      try {
        const data = await fetchAdoptedDogs();
        setAdoptedDogs(data);
      } catch (error) {
        console.error("Error al cargar los perros adoptados:", error);
        showErrorAlert("No se pudieron cargar los perros adoptados.");
      }
    };

    loadAdoptedDogs();
  }, []);

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "adopted_dog_id") {
      const dog = adoptedDogs.find((d) => d.id === parseInt(value));
      setSelectedDog(dog); // Actualizar el perro seleccionado
      setFormData({ ...formData, [name]: value });
    } else if (name === "evidence") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
          setFormData({ ...formData, evidence: reader.result.split(",")[1] }); // Guardar en base64
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validar formulario antes del envío
  const validateForm = () => {
    if (!formData.visit_date) {
      showErrorAlert("La fecha de la visita es obligatoria.");
      return false;
    }
    if (!formData.adopted_dog_id) {
      showErrorAlert("Debes seleccionar un perro adoptado.");
      return false;
    }
    if (!formData.evidence) {
      showErrorAlert("Debes cargar una evidencia (imagen).");
      return false;
    }
    return true;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de registrar esta visita?",
      "Confirmar registro"
    );

    if (!confirmed) return;

    try {
      await createVisit(formData); // Llamada al servicio para registrar la visita
      showSuccessAlert("Visita registrada exitosamente.", "¡Éxito!");

      if (onVisitCreated) {
        onVisitCreated(); // Callback para recargar la tabla de visitas
      }

      navigate("/admin/adopted-dogs"); // Redirigir a la tabla de perros adoptados
    } catch (error) {
      console.error("Error al registrar la visita:", error);
      showErrorAlert("No se pudo registrar la visita. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Registrar Nueva Visita</h2>

      <Form onSubmit={handleSubmit}>
        {/* Seleccionar perro adoptado */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Perro Adoptado:</Form.Label>
          <Form.Select
            name="adopted_dog_id"
            value={formData.adopted_dog_id}
            onChange={handleInputChange}
            required
            className={formData.adopted_dog_id ? "is-valid" : "is-invalid"}
          >
            <option value="">Seleccionar</option>
            {adoptedDogs.map((dog) => (
              <option key={dog.id} value={dog.id}>
                {dog.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Dueño:</Form.Label>
          <Form.Control
            type="text"
            value={selectedDog ? selectedDog.owner_name : ""}
            readOnly
            className="form-control-plaintext"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Dirección:</Form.Label>
          <Form.Control
            type="text"
            value={selectedDog ? selectedDog.owner_address : ""}
            readOnly
            className="form-control-plaintext"
          />
        </Form.Group>

        {/* Fecha de la visita */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Fecha de Visita: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="date"
            name="visit_date"
            value={formData.visit_date}
            onChange={handleInputChange}
            required
            className={formData.visit_date ? "is-valid" : "is-invalid"}
          />
        </Form.Group>

        {/* Evidencia */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Evidencia: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="file"
            name="evidence"
            accept="image/*"
            onChange={handleInputChange}
            required
            className={formData.evidence ? "is-valid" : "is-invalid"}
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
        </Form.Group>

        {/* Observaciones (Opcional) */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Observaciones:</Form.Label>
          <Form.Control
            as="textarea"
            name="observations"
            value={formData.observations}
            onChange={handleInputChange}
            className={formData.observations.trim() ? "is-valid" : ""}
          />
        </Form.Group>

        <div className="custom-button-container">
          <Button type="submit" className="custom-button">
            Registrar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormVisits;

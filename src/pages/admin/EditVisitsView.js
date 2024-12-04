import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  fetchVisitById,
  updateVisit,
  fetchEvidenceImage,
} from "../../services/visitService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const EditVisitsView = ({ onVisitUpdated }) => {
  const { visitId } = useParams(); // Obtiene el parámetro visitId de la URL
  const [formData, setFormData] = useState({
    visit_date: "",
    evidence: null,
    observations: "",
    adopted_dog_id: null, // ID del perro adoptado
    id: visitId, // ID de la visita
  });
  const [dogName, setDogName] = useState(""); // Nombre del perro adoptado
  const [imagePreview, setImagePreview] = useState(null); // URL de la imagen previa
  const navigate = useNavigate();

  useEffect(() => {
    const loadVisit = async () => {
      try {
        // Obtener datos de la visita
        const visitData = await fetchVisitById(visitId);
        setFormData({
          visit_date: visitData.visit_date,
          evidence: null, // Solo se actualizará si el usuario selecciona una nueva imagen
          observations: visitData.observations,
          adopted_dog_id: visitData.adopted_dog?.id,
          id: visitData.id,
        });

        setDogName(visitData.adopted_dog?.name || "Desconocido"); // Guardar el nombre del perro
        const evidenceUrl = await fetchEvidenceImage(visitId); // Obtener la URL de la imagen desde el servicio
        setImagePreview(evidenceUrl);
      } catch (error) {
        console.error("Error al cargar los datos de la visita:", error);
        showErrorAlert("No se pudieron cargar los datos de la visita.");
      }
    };

    loadVisit();
  }, [visitId]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "evidence" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Eliminar el prefijo
        setImagePreview(reader.result); // Mostrar la nueva imagen seleccionada
        setFormData({ ...formData, evidence: base64String });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de campos requeridos
    if (!formData.visit_date || !formData.adopted_dog_id || !formData.id) {
      showErrorAlert("Los campos requeridos no pueden estar vacíos.");
      return;
    }

    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de actualizar esta visita?",
      "Confirmar actualización"
    );

    if (!confirmed) return;

    try {
      // Construir los datos para enviar al backend
      const updatedFormData = {
        visit_date: formData.visit_date,
        evidence: formData.evidence || null, // Si no hay evidencia, enviar null
        observations: formData.observations || null, // Observaciones opcionales
        adopted_dog_id: formData.adopted_dog_id,
        id: formData.id,
      };

      await updateVisit(updatedFormData); // Llamar al servicio para actualizar
      showSuccessAlert("Visita actualizada exitosamente.", "¡Éxito!");

      if (onVisitUpdated) {
        onVisitUpdated();
      }

      navigate("/admin/visits-table");
    } catch (error) {
      console.error("Error al actualizar la visita:", error);
      showErrorAlert("No se pudo actualizar la visita. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Editar Visita</h2>

      <Form onSubmit={handleSubmit}>
        {/* Nombre del perro adoptado */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Perro Adoptado:</Form.Label>
          <Form.Control
            type="text"
            value={dogName} // Mostrar solo el nombre del perro
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
          />
        </Form.Group>

        {/* Evidencia */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Evidencia:</Form.Label>
          <Form.Control
            type="file"
            name="evidence"
            accept="image/*"
            onChange={handleInputChange}
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

        {/* Observaciones */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Observaciones:</Form.Label>
          <Form.Control
            as="textarea"
            name="observations"
            value={formData.observations}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="custom-button-container">
          <Button type="submit" className="custom-button">
            Actualizar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditVisitsView;

import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../../assets/styles/admin/FormVisit.css";
import { createVisit } from "../../services/visitService";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";

const FormVisit = () => {
  const location = useLocation();
  const dogs = location.state?.dogs || [];
  const [formData, setFormData] = useState({
    adopted_dog_id: "",
    visit_date: "",
    observations: "",
    evidence: null,
  });

  const [ownerInfo, setOwnerInfo] = useState({
    name: "",
    direction: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      // Validar tamaño de la imagen
      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSize) {
        showErrorAlert(
          "La imagen no debe superar los 5 MB.",
          "Error de imagen"
        );
        return;
      }
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDogChange = async (e) => {
    const dogId = e.target.value;
    setFormData({ ...formData, adopted_dog_id: dogId });

    if (dogId) {
      try {
        const response = await fetch(
          `https://poliperritosback.agreeableflower-431ed430.westus.azurecontainerapps.io/dog/adopted_dog/${dogId}`
        );

        if (!response.ok) {
          throw new Error("Error al cargar la información del perro.");
        }

        const data = await response.json();
        setOwnerInfo({
          name: data.owner.name || "Desconocido",
          direction: data.owner.direction || "No disponible",
        });
      } catch (error) {
        console.error("Error al obtener información del dueño:", error);
        setOwnerInfo({
          name: "Desconocido",
          direction: "No disponible",
        });
      }
    } else {
      setOwnerInfo({ name: "", direction: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { adopted_dog_id, visit_date, observations, evidence } = formData;

    if (!adopted_dog_id || !visit_date) {
      showErrorAlert(
        "El perro y la fecha son obligatorios.",
        "Formulario incompleto"
      );
      return;
    }

    let evidenceBase64 = null;
    if (evidence) {
      const reader = new FileReader();
      reader.onload = async () => {
        evidenceBase64 = reader.result.split(",")[1]; // Eliminar prefijo base64
        await sendVisitData(
          adopted_dog_id,
          visit_date,
          observations,
          evidenceBase64
        );
      };
      reader.readAsDataURL(evidence);
    } else {
      await sendVisitData(
        adopted_dog_id,
        visit_date,
        observations,
        evidenceBase64
      );
    }
  };

  const sendVisitData = async (
    adopted_dog_id,
    visit_date,
    observations,
    evidenceBase64
  ) => {
    try {
      const visitData = {
        adopted_dog_id: parseInt(adopted_dog_id, 10),
        visit_date,
        observations,
        evidence: evidenceBase64 || "No se proporcionó evidencia",
      };

      await createVisit(visitData);
      showSuccessAlert("Visita registrada exitosamente.", "¡Éxito!");
    } catch (error) {
      console.error("Error al registrar la visita:", error);
      showErrorAlert(
        "No se pudo registrar la visita. Inténtalo nuevamente.",
        "Error"
      );
    }
  };

  return (
    <div className="followup-form-container">
      <h2 className="form-title">Formulario de Seguimiento</h2>
      <Form onSubmit={handleSubmit}>
        {/* Seleccionar Perro */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Perro:
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="adopted_dog_id"
              value={formData.adopted_dog_id}
              onChange={handleDogChange}
              required
            >
              <option value="">Seleccione un perro</option>
              {dogs.map((dog) => (
                <option key={dog.id} value={dog.id}>
                  {dog.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Nombre del dueño */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Dueño:
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="text" value={ownerInfo.name} readOnly />
          </Col>
        </Form.Group>

        {/* Dirección */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Dirección:
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="text" value={ownerInfo.direction} readOnly />
          </Col>
        </Form.Group>

        {/* Fecha de la visita */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="custom-label">
            Fecha de la visita:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="visit_date"
              value={formData.visit_date}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        {/* Comentarios */}
        <Form.Group className="mb-3">
          <Form.Label className="custom-label">Observaciones:</Form.Label>
          <Form.Control
            as="textarea"
            name="observations"
            rows={3}
            value={formData.observations}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Subir Foto */}
        <Form.Group className="mb-3">
          <Form.Label className="custom-label">
            Subir evidencia (opcional):
          </Form.Label>
          <Form.Control
            type="file"
            name="evidence"
            accept="image/*"
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Botón Enviar */}
        <div className="custom-button-container">
          <Button type="submit" className="custom-button">
            Enviar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormVisit;

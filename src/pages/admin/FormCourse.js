import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/admin/FormCourse.css";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";
import { createCourse } from "../../services/courseService";
import { FaMinus } from "react-icons/fa"; // Importa los íconos

const FormCourse = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    price: "",
    capacity: "", // Agregar el campo de cupos
    schedule: [{ day: "", start_hour: "", end_hour: "" }],
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    start_date: false,
    end_date: false,
    price: false,
    capacity: false, // Validación para cupos
    schedule: false,
  });

  const navigate = useNavigate();

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedSchedule = [...formData.schedule];
    updatedSchedule[index][name] = value;
    setFormData({ ...formData, schedule: updatedSchedule });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Agregar un nuevo día al horario
  const addSchedule = () => {
    setFormData({
      ...formData,
      schedule: [
        ...formData.schedule,
        { day: "", start_hour: "", end_hour: "" },
      ],
    });
  };

  const removeSchedule = (index) => {
    const updatedSchedule = [...formData.schedule];
    updatedSchedule.splice(index, 1);
    setFormData({ ...formData, schedule: updatedSchedule });
  };

  // Validar los campos antes de enviar
  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      description: !formData.description.trim(),
      start_date: !formData.start_date.trim(),
      end_date: !formData.end_date.trim(),
      price: !formData.price || formData.price <= 0,
      capacity: !formData.capacity || formData.capacity <= 0, // Validar que capacidad sea mayor a 0
      schedule: formData.schedule.some(
        (schedule) =>
          !schedule.day || !schedule.start_hour || !schedule.end_hour
      ),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  // Manejo del envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      showErrorAlert("Por favor, complete todos los campos correctamente.");
      return;
    }

    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de registrar este curso?",
      "Confirmar registro"
    );

    if (!confirmed) return;

    try {
      // Llama al servicio para registrar el curso
      await createCourse(formData);

      showSuccessAlert("Curso registrado exitosamente.", "¡Éxito!");
      navigate("/admin/courses"); // Redirigir a la página de cursos
    } catch (error) {
      console.error("Error al registrar el curso:", error);
      showErrorAlert("No se pudo registrar el curso. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Registrar Nuevo Curso</h2>

      <Form onSubmit={handleSubmit}>
        {/* Nombre */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Nombre del Curso: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Descripción */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Descripción: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            required
            value={formData.description}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Fecha de Inicio */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Fecha de Inicio: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="date"
            name="start_date"
            required
            value={formData.start_date}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Fecha de Fin */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Fecha de Fin: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="date"
            name="end_date"
            required
            value={formData.end_date}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/* Precio */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Precio: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleFieldChange}
            step="any" // Esto permite ingresar decimales
          />
        </Form.Group>

        {/* Capacidad */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Capacidad: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            name="capacity"
            required
            value={formData.capacity}
            onChange={handleFieldChange}
            step="1" // Permite solo enteros
          />
        </Form.Group>

        {/* Horarios */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Horario: <span className="required">*</span>
          </Form.Label>

          {formData.schedule.map((item, index) => (
            <Row key={index} className="mb-3 align-items-center">
              <Col>
                <Form.Control
                  as="select"
                  name="day"
                  value={item.day}
                  onChange={(e) => handleInputChange(e, index)}
                  className="schedule-select"
                >
                  <option value="">Seleccionar Día</option>
                  <option value="monday">Lunes</option>
                  <option value="tuesday">Martes</option>
                  <option value="wednesday">Miércoles</option>
                  <option value="thursday">Jueves</option>
                  <option value="friday">Viernes</option>
                  <option value="saturday">Sábado</option>
                  <option value="sunday">Domingo</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control
                  type="time"
                  name="start_hour"
                  value={item.start_hour}
                  onChange={(e) => handleInputChange(e, index)}
                  className="schedule-time"
                />
              </Col>
              <Col>
                <Form.Control
                  type="time"
                  name="end_hour"
                  value={item.end_hour}
                  onChange={(e) => handleInputChange(e, index)}
                  className="schedule-time"
                />
              </Col>
              <Col xs="auto" className="text-center">
                {formData.schedule.length > 1 && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => removeSchedule(index)}
                    className="delete-btn"
                  >
                    <FaMinus />
                  </Button>
                )}
              </Col>
            </Row>
          ))}
          <Button variant="link" onClick={addSchedule} className="add-btn">
            Agregar otro día
          </Button>
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

export default FormCourse;

import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/admin/FormDogs.css";
import { createStaticDog, createAdoptionDog } from "../../services/dogsService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const FormDogs = ({ onSave = () => {} }) => {
  const [formData, setFormData] = useState({
    id_chip: "",
    name: "",
    about: "",
    age: "",
    is_vaccinated: false,
    image: null,
    gender: "",
    entry_date: "",
    is_sterilized: false,
    is_dewormed: false,
    operation: "",
    is_for_adoption: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({
      id_chip: "",
      name: "",
      about: "",
      age: "",
      is_vaccinated: false,
      image: null,
      gender: "",
      entry_date: "",
      is_sterilized: false,
      is_dewormed: false,
      operation: "",
      is_for_adoption: false,
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          showErrorAlert("La imagen no debe superar los 5 MB.", "Error");
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
          setFormData({ ...formData, image: reader.result.split(",")[1] });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFields()) return;

    const confirmed = await showConfirmationAlert(
      formData.is_for_adoption
        ? "¿Registrar como perro para adopción?"
        : "¿Registrar como perro permanente?",
      "Confirmar Registro"
    );

    if (!confirmed) return;

    try {
      if (formData.is_for_adoption) {
        await createAdoptionDog(formData);
      } else {
        await createStaticDog(formData);
      }

      showSuccessAlert(
        formData.is_for_adoption
          ? "Perro registrado para adopción."
          : "Perro registrado como permanente.",
        "¡Registro Exitoso!"
      );

      resetForm();
      onSave({ is_for_adoption: formData.is_for_adoption });
      navigate(
        formData.is_for_adoption ? "/admin/adoption-dogs" : "/admin/static-dogs"
      );
    } catch (error) {
      showErrorAlert(error.message || "Error en el registro.");
    }
  };

  const validateFields = () => {
    const { name, age, gender, entry_date } = formData;

    if (!name.trim()) {
      showErrorAlert("El nombre es obligatorio.", "Campo Obligatorio");
      return false;
    }

    if (!age || isNaN(Number(age)) || Number(age) <= 0) {
      showErrorAlert(
        "La edad debe ser un número positivo.",
        "Campo Obligatorio"
      );
      return false;
    }

    if (!gender) {
      showErrorAlert("El género es obligatorio.", "Campo Obligatorio");
      return false;
    }

    if (!entry_date) {
      showErrorAlert(
        "La fecha de ingreso es obligatoria.",
        "Campo Obligatorio"
      );
      return false;
    }

    return true;
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Registrar Nuevo Perro</h2>

      <Form onSubmit={handleSubmit}>
        {/* Identificador */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Identificador:</Form.Label>
          <Form.Control
            type="text"
            id="id"
            name="id"
            required
            value={formData.id}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Nombre */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Nombre: <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className={formData.name ? "is-valid" : "is-invalid"}
          />
        </Form.Group>

        {/* Descripción */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            id="about"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Género */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Género: <span className="required">*</span>
          </Form.Label>
          <Form.Select
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleInputChange}
            className={formData.gender ? "is-valid" : "is-invalid"}
          >
            <option value="">Seleccione...</option>
            <option value="male">Macho</option>
            <option value="female">Hembra</option>
          </Form.Select>
        </Form.Group>

        {/* Edad */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            Edad (en años): <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            id="age"
            name="age"
            required
            value={formData.age}
            onChange={handleInputChange}
            className={
              formData.age && formData.age > 0 ? "is-valid" : "is-invalid"
            }
          />
        </Form.Group>

        {/* Fecha de ingreso */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Fecha de ingreso:</Form.Label>
          <Form.Control
            type="date"
            id="entry_date"
            name="entry_date"
            value={formData.entry_date}
            onChange={handleInputChange}
            className={formData.entry_date ? "is-valid" : "is-invalid"}
          />
        </Form.Group>

        {/* Vacunado */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">¿Está vacunado?</Form.Label>
          <Form.Check
            type="switch"
            id="is_vaccinated"
            name="is_vaccinated"
            label={formData.is_vaccinated ? "Sí" : "No"}
            checked={formData.is_vaccinated}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Esterilizado */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">¿Está esterilizado?</Form.Label>
          <Form.Check
            type="switch"
            id="is_sterilized"
            name="is_sterilized"
            label={formData.is_sterilized ? "Sí" : "No"}
            checked={formData.is_sterilized}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Desparasitado */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">¿Está desparasitado?</Form.Label>
          <Form.Check
            type="switch"
            id="is_dewormed"
            name="is_dewormed"
            label={formData.is_dewormed ? "Sí" : "No"}
            checked={formData.is_dewormed}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Operación */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Operación:</Form.Label>
          <Form.Control
            type="text"
            id="operation"
            name="operation"
            value={formData.operation}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Imagen */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Imagen:</Form.Label>
          <Form.Control
            type="file"
            id="image"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleInputChange}
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

        {/* Disponible para adopción */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">
            ¿Disponible para adopción?
          </Form.Label>
          <Form.Check
            type="switch"
            id="is_for_adoption"
            name="is_for_adoption"
            label={formData.is_for_adoption ? "Sí" : "No"}
            checked={formData.is_for_adoption}
            onChange={handleInputChange}
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

export default FormDogs;

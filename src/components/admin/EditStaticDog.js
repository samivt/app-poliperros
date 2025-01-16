import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  fetchStaticDogById,
  updateStaticDog,
} from "../../services/dogsService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const EditStaticDog = ({ onSave }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id_chip: "",
    name: "",
    age: "",
    gender: "",
    is_vaccinated: false,
    is_sterilized: false,
    is_dewormed: false,
    operation: "",
    about: "",
    entry_date: "",
    image: null, // Base64 de la imagen
  });
  const [imagePreview, setImagePreview] = useState(null); // Para la vista previa de la imagen
  const navigate = useNavigate();

  useEffect(() => {
    const loadDog = async () => {
      try {
        const dogData = await fetchStaticDogById(id);
        setFormData({
          id_chip: dogData.id_chip,
          name: dogData.name,
          age: dogData.age,
          gender: dogData.gender,
          is_vaccinated: dogData.is_vaccinated,
          is_sterilized: dogData.is_sterilized,
          is_dewormed: dogData.is_dewormed,
          operation: dogData.operation,
          about: dogData.about,
          entry_date: dogData.entry_date,
          image: null, // La imagen inicial
        });
        setImagePreview(dogData.image); // Para la vista previa de la imagen
      } catch (error) {
        console.error("Error al cargar el perro:", error);
        showErrorAlert("No se pudo cargar la información del perro.");
        navigate("/admin/static-dogs");
      }
    };

    loadDog();
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        setImagePreview(reader.result);
        setFormData({ ...formData, image: base64String }); // Actualizar el formData con la imagen en base64
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de campos requeridos
    if (
      !formData.name ||
      !formData.is_vaccinated ||
      !formData.is_sterilized ||
      !formData.is_dewormed ||
      !formData.age ||
      !formData.gender
    ) {
      showErrorAlert("Los campos requeridos no pueden estar vacíos.");
      return;
    }

    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de actualizar esta información del perro?",
      "Confirmar actualización"
    );

    if (!confirmed) return;

    try {
      // Construir los datos para enviar al backend
      const updatedFormData = {
        id_chip: formData.id_chip || null,
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        is_vaccinated: formData.is_vaccinated,
        is_sterilized: formData.is_sterilized,
        is_dewormed: formData.is_dewormed,
        operation: formData.operation || null,
        about: formData.about || null,
        entry_date: formData.entry_date || null,
        image: formData.image || null, // Enviar la imagen base64 o null si no hay
      };

      await updateStaticDog(id, updatedFormData); // Llamar al servicio para actualizar
      showSuccessAlert("Perro actualizado exitosamente.", "¡Éxito!");

      if (onSave) {
        onSave();
      }

      navigate("/admin/static-dogs");
    } catch (error) {
      console.error("Error al actualizar el perro:", error);
      showErrorAlert("No se pudo actualizar la información del perro.");
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">Editar Perro Permanente</h2>

      <Form onSubmit={handleSubmit}>
        {/* Nº Chip */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Nº Chip:</Form.Label>
          <Form.Control
            type="text"
            name="id_chip"
            value={formData.id_chip}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Nombre */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Edad */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Edad:</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Género */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Género:</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione...</option>
            <option value="male">Macho</option>
            <option value="female">Hembra</option>
          </Form.Control>
        </Form.Group>

        {/* ¿Está vacunado? */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">¿Está vacunado?</Form.Label>
          <Form.Check
            type="switch"
            id="is_vaccinated"
            label={formData.is_vaccinated ? "Sí" : "No"}
            checked={formData.is_vaccinated}
            onChange={(e) =>
              setFormData({ ...formData, is_vaccinated: e.target.checked })
            }
          />
        </Form.Group>

        {/* ¿Está esterilizado? */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">¿Está esterilizado?</Form.Label>
          <Form.Check
            type="switch"
            id="is_sterilized"
            label={formData.is_sterilized ? "Sí" : "No"}
            checked={formData.is_sterilized}
            onChange={(e) =>
              setFormData({ ...formData, is_sterilized: e.target.checked })
            }
          />
        </Form.Group>

        {/* ¿Está desparacitado? */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">¿Está desparacitado?</Form.Label>
          <Form.Check
            type="switch"
            id="is_dewormed"
            label={formData.is_dewormed ? "Sí" : "No"}
            checked={formData.is_dewormed}
            onChange={(e) =>
              setFormData({ ...formData, is_dewormed: e.target.checked })
            }
          />
        </Form.Group>

        {/* Operación */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Operación:</Form.Label>
          <Form.Control
            type="text"
            name="operation"
            value={formData.operation}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Descripción */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Fecha de ingreso */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Fecha de ingreso:</Form.Label>
          <Form.Control
            type="date"
            name="entry_date"
            value={formData.entry_date}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Imagen */}
        <Form.Group className="mb-4">
          <Form.Label className="custom-label">Imagen:</Form.Label>
          <Form.Control
            type="file"
            name="image"
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

        {/* Botones */}
        <div className="custom-button-container">
          <Button type="submit" className="custom-button">
            Guardar Cambios
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="custom-button"
            onClick={() => navigate("/admin/static-dogs")}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditStaticDog;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchStaticDogById,
  fetchAdoptionDogById,
  updateStaticDog,
  updateAdoptionDog,
} from "../../services/dogsService";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";
import { Form, Button, Row, Col } from "react-bootstrap";

const EditDogView = ({ type, onSave }) => {
  const { id } = useParams(); // Obtiene el ID del perro desde la URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carga los datos del perro al montar el componente
  useEffect(() => {
    const loadDog = async () => {
      try {
        const fetchMethod =
          type === "static" ? fetchStaticDogById : fetchAdoptionDogById;
        const dogData = await fetchMethod(id); // Llama al servicio correspondiente
        setFormData(dogData);
        setImagePreview(dogData.image); // Configura la vista previa de la imagen si existe
      } catch (error) {
        console.error("Error al cargar el perro:", error);
        showErrorAlert("No se pudo cargar la información del perro.");
        navigate(
          `/admin/${type === "static" ? "static-dogs" : "adoption-dogs"}`
        ); // Redirige según el tipo
      } finally {
        setIsLoading(false);
      }
    };

    loadDog();
  }, [id, type, navigate]);

  // Manejo de cambios en el formulario
  const handleInputChange = (event) => {
    const { name, value, type: inputType, checked, files } = event.target;

    if (inputType === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (inputType === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result); // Configura la vista previa
          setFormData({ ...formData, image: reader.result.split(",")[1] }); // Guarda la imagen en Base64
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]:
          name === "age" || name === "id_chip"
            ? parseInt(value, 10) || null
            : value, // Asegura que `age` e `id_chip` sean numéricos o null
      });
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Valida los campos requeridos
    if (!formData.name || !formData.age || !formData.gender) {
      showErrorAlert("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const payload = {
        ...formData,
        id_chip: formData.id_chip || null, // Asegura que id_chip sea null si no se especifica
        operation: formData.operation || null,
        image:
          formData.image && !imagePreview.startsWith("http")
            ? formData.image
            : null, // Si la imagen no ha sido modificada, no se envía
      };

      console.log("Payload enviado al backend:", payload);

      // Llamada al servicio para actualizar según el tipo
      const updateMethod =
        type === "static" ? updateStaticDog : updateAdoptionDog;
      const response = await updateMethod(id, payload);

      console.log("Respuesta del backend:", response);

      if (response.detail.includes("Actualizado")) {
        showSuccessAlert("Perro actualizado correctamente.");
        await onSave(); // Refresca los datos en la tabla
        navigate(
          `/admin/${type === "static" ? "static-dogs" : "adoption-dogs"}`
        );
      } else {
        showErrorAlert("El perro no se pudo actualizar. Verifica los datos.");
      }
    } catch (error) {
      console.error("Error al actualizar el perro:", error);
      showErrorAlert("No se pudo actualizar la información del perro.");
    }
  };

  const handleCancel = () => {
    navigate(`/admin/${type === "static" ? "static-dogs" : "adoption-dogs"}`);
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Editar Información del Perro{" "}
        {type === "static" ? "Permanente" : "En Adopción"}
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            {/* Nombre */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Edad */}
            <Form.Group className="mb-3">
              <Form.Label>Edad (en años)</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            {/* Género */}
            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="male">Macho</option>
                <option value="female">Hembra</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Fecha de Ingreso */}
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Ingreso</Form.Label>
              <Form.Control
                type="date"
                name="entry_date"
                value={formData.entry_date || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Chip */}
            <Form.Group className="mb-3">
              <Form.Label>Nº Chip</Form.Label>
              <Form.Control
                type="number"
                name="id_chip"
                value={formData.id_chip}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          {/* Descripción */}
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row>
          <Col md={4}>
            {/* Vacunado */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                name="is_vaccinated"
                label="Vacunado"
                checked={formData.is_vaccinated}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            {/* Esterilizado */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                name="is_sterilized"
                label="Esterilizado"
                checked={formData.is_sterilized}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            {/* Desparasitado */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                name="is_dewormed"
                label="Desparasitado"
                checked={formData.is_dewormed}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Imagen */}
        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" onChange={handleInputChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Vista previa"
              className="img-fluid mt-3"
              style={{ maxHeight: "200px" }}
            />
          )}
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button type="submit" variant="primary">
            Guardar Cambios
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditDogView;

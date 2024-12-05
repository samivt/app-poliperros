import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/admin/CoursesList.css";
import { fetchCourses, deleteCourse } from "../../services/courseService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";
//import { FaEdit, FaTrash } from "react-icons/fa";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
        //showErrorAlert("No se pudieron cargar los cursos.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleDelete = async (courseId) => {
    const confirmed = await showConfirmationAlert(
      "Esta acción no se puede deshacer.",
      "¿Estás seguro de eliminar este curso?"
    );

    if (!confirmed) return;

    try {
      await deleteCourse(courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
      showSuccessAlert("Curso eliminado exitosamente.");
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      showErrorAlert("No se pudo eliminar el curso. Inténtalo nuevamente.");
    }
  };

  const handleEdit = (courseId) => {
    navigate(`/admin/edit-course/${courseId}`);
  };

  const handleAddCourse = () => {
    navigate("/admin/create-course");
  };

  const dayTranslations = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  };

  const renderSchedule = (schedule) => {
    if (!schedule || schedule.length === 0) return "Sin horario";

    return schedule
      .map(
        (item) =>
          `${dayTranslations[item.day] || item.day}: ${item.start_hour} - ${
            item.end_hour
          }`
      )
      .join(", ");
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Lista de Cursos</h2>
      <div className="d-flex justify-content-end mb-4">
        <Button className="agregar-btn" onClick={handleAddCourse}>
          <i className="fas fa-plus me-2"></i> Agregar Curso
        </Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Precio</th>
            <th>Capacidad</th>
            <th>Horarios</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(course.id)}
                  className="me-2"
                >
                  <i className="fas fa-edit"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(course.id)}
                  className="me-2"
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.start_date}</td>
              <td>{course.end_date}</td>
              <td>${course.price}</td>
              <td>{course.capacity}</td>
              <td>{renderSchedule(course.schedule)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CoursesList;

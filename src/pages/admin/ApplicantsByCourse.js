import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import {
  fetchApplicantsByCourse,
  fetchApplicantImage,
} from "../../services/applicantService";
import { fetchCourses } from "../../services/courseService"; // Servicio para obtener cursos
import "../../assets/styles/admin/ApplicantsByCourse.css";

const ApplicantsByCourse = () => {
  const [courses, setCourses] = useState([]); // Lista de cursos
  const [selectedCourseId, setSelectedCourseId] = useState(null); // Curso seleccionado
  const [applicants, setApplicants] = useState([]); // Lista de solicitantes
  const [loadingCourses, setLoadingCourses] = useState(true); // Carga de cursos
  const [loadingApplicants, setLoadingApplicants] = useState(false); // Carga de solicitantes

  useEffect(() => {
    // Cargar los cursos al montar el componente
    const loadCourses = async () => {
      try {
        const data = await fetchCourses(); // Servicio para obtener los cursos
        setCourses(data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
        alert("No se pudieron cargar los cursos.");
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  const handleCourseClick = async (courseId) => {
    setSelectedCourseId(courseId);
    setLoadingApplicants(true);

    try {
      const applicantsData = await fetchApplicantsByCourse(courseId);

      // Obtener imágenes para cada solicitante
      const applicantsWithImages = await Promise.all(
        applicantsData.map(async (applicant) => {
          const imageUrl = await fetchApplicantImage(applicant.id).catch(
            () => null
          );
          return { ...applicant, imageUrl };
        })
      );

      setApplicants(applicantsWithImages);
    } catch (error) {
      console.error("Error al cargar los solicitantes:", error);
      alert("No se pudieron cargar los solicitantes.");
    } finally {
      setLoadingApplicants(false);
    }
  };

  return (
    <div className="applicants-container d-flex">
      {/* Lista de Cursos */}
      <div className="courses-table me-4">
        <h4>Cursos</h4>
        {loadingCourses ? (
          <div className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : courses.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre del Curso</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  className="clickable-row"
                >
                  <td>{course.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">No hay cursos disponibles.</p>
        )}
      </div>

      {/* Lista de Solicitantes */}
      <div className="applicants-table flex-grow-1">
        <h4>Solicitantes</h4>
        {loadingApplicants ? (
          <div className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : selectedCourseId && applicants.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td>
                    {applicant.imageUrl ? (
                      <img
                        src={applicant.imageUrl}
                        alt="Solicitante"
                        className="applicant-img"
                      />
                    ) : (
                      "Sin imagen"
                    )}
                  </td>
                  <td>{applicant.first_name}</td>
                  <td>{applicant.last_name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.cellphone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">
            {selectedCourseId
              ? "No hay solicitantes para este curso."
              : "Selecciona un curso para ver los solicitantes."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicantsByCourse;

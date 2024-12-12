import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import {
  fetchApplicantsByCourse,
  fetchApplicantImage,
} from "../../services/applicantService";
import { fetchCourses } from "../../services/courseService";
import "../../assets/styles/admin/ApplicantsByCourse.css";

const ApplicantsByCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
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
    } finally {
      setLoadingApplicants(false);
    }
  };

  return (
    <div className="applicants-container">
      {/* Cursos */}
      <div className="courses-section">
        <h4>Cursos</h4>
        {loadingCourses ? (
          <div className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : courses.length > 0 ? (
          <div className="table-responsive">
            <Table striped bordered hover>
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
          </div>
        ) : (
          <p className="text-muted">No hay cursos disponibles.</p>
        )}
      </div>

      {/* Solicitantes */}
      <div className="applicants-section">
        <h4>Inscritos</h4>
        {loadingApplicants ? (
          <div className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : selectedCourseId && applicants.length > 0 ? (
          <div className="applicants-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Comprobante de pago</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>{applicant.first_name}</td>
                    <td>{applicant.last_name}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.cellphone}</td>
                    <td>
                      {applicant.imageUrl ? (
                        <img
                          src={applicant.imageUrl}
                          alt="Comprobante de pago"
                          className="applicant-img"
                          onClick={() =>
                            window.open(applicant.imageUrl, "_blank")
                          }
                        />
                      ) : (
                        "Sin imagen"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p className="text-muted">
            {selectedCourseId
              ? "No hay inscritos para este curso."
              : "Selecciona un curso para ver los inscritos."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicantsByCourse;

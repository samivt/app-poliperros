// components/ApplicantsByCourse.jsx

import React, { useEffect, useState } from "react";
import { Table, Spinner, Button, Form } from "react-bootstrap";
import {
  fetchApplicantsByCourse,
  fetchApplicantImage,
  deleteApplicant,
} from "../../services/applicantService";
import { fetchCourses } from "../../services/courseService";
import "../../assets/styles/admin/ApplicantsByCourse.css";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";

const ApplicantsByCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [deletingApplicantId, setDeletingApplicantId] = useState(null); // Para manejar el estado de eliminación

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
        showErrorAlert("Error al cargar los cursos.");
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    if (!selectedCourseId) {
      setApplicants([]);
      return;
    }

    const loadApplicants = async () => {
      setLoadingApplicants(true);
      try {
        const applicantsData = await fetchApplicantsByCourse(selectedCourseId);

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
        showErrorAlert("Error al cargar los solicitantes.");
      } finally {
        setLoadingApplicants(false);
      }
    };

    loadApplicants();
  }, [selectedCourseId]);

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
  };

  const handleDeleteApplicant = async (idVisit, idApplicant) => {
    const confirmed = await showConfirmationAlert(
      "Esta acción no se puede deshacer.",
      "¿Estás seguro de eliminar esta inscripción?"
    );

    if (!confirmed) return;

    setDeletingApplicantId(idApplicant); // Indica que se está eliminando este solicitante

    try {
      await deleteApplicant(idVisit, idApplicant);
      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => applicant.id !== idApplicant)
      );
      showSuccessAlert("Solicitante eliminado exitosamente.");
    } catch (error) {
      console.error("Error al eliminar el solicitante:", error);
      showErrorAlert("Error al eliminar el solicitante.");
    } finally {
      setDeletingApplicantId(null); // Resetea el estado de eliminación
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
          <Form>
            <Form.Group controlId="courseSelect">
              <Form.Label>Selecciona un curso:</Form.Label>
              <Form.Select
                value={selectedCourseId}
                onChange={handleCourseChange}
                aria-label="Seleccionar curso"
              >
                <option value="" disabled>
                  Selecciona un curso
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        ) : (
          <p className="text-muted">No hay cursos disponibles.</p>
        )}
      </div>

      {/* Solicitantes */}
      <div className="applicants-section mt-4">
        <h4>Inscritos</h4>
        {loadingApplicants ? (
          <div className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : selectedCourseId && applicants.length > 0 ? (
          <div className="applicants-table">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Acciones</th>
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
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          handleDeleteApplicant(selectedCourseId, applicant.id)
                        }
                        disabled={deletingApplicantId === applicant.id}
                      >
                        {deletingApplicantId === applicant.id ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <i className="fas fa-trash"></i>
                        )}
                      </Button>
                    </td>
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
                          style={{ cursor: "pointer", maxWidth: "100px" }}
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
        ) : selectedCourseId ? (
          <p className="text-muted">No hay inscritos para este curso.</p>
        ) : (
          <p className="text-muted">
            Selecciona un curso para ver los inscritos.
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicantsByCourse;

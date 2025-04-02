import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/CoursesPage.css";
import { fetchCourses } from "../../services/courseService";
import { useNavigate } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dayTranslations = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        //console.error("Error al cargar los cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleEnroll = (courseId) => {
    navigate(`/courses/${courseId}/inscription`);
    console.log(`Inscribirse al curso con ID: ${courseId}`);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="loading-container">
          <div className="paw-spinner">
            <i className="fas fa-paw fa-spin"></i>
          </div>
        </div>
      ) : (
        <div className="courses-container mt-3">
          <h2 className="section-title text-center mb-4">Cursos</h2>
          <div className="courses-description text-center">
            Para inscribirte en cualquiera de nuestros cursos debes realizar un
            depósito o transferencia a los datos que se encuentran dentro del
            formulario de inscripción.
          </div>
          <Row className="justify-content-center">
            {courses.map((course) => (
              <Col md={6} lg={4} key={course.id} className="mb-4">
                <div className="info-course shadow">
                  <h3 id="name-course">{course.name}</h3>
                  <div className="info-content">
                    <div className="description">{course.description}</div>
                    <p>
                      <strong>Fecha Inicio:</strong> {course.start_date}
                      <br />
                      <strong>Fecha Fin:</strong> {course.end_date}
                    </p>
                    <p>
                      <strong>Precio:</strong> ${course.price}
                      <br />
                    </p>
                    <p>
                      <strong>Horarios:</strong>
                      <ul className="schedule-list">
                        {course.schedule.map((item, index) => (
                          <li key={index}>
                            {`${dayTranslations[item.day]}: ${
                              item.start_hour
                            } - ${item.end_hour}`}
                          </li>
                        ))}
                      </ul>
                    </p>
                  </div>
                  <div className="ver-mas text-center">
                    <button onClick={() => handleEnroll(course.id)}>
                      Inscribirse
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CoursesPage;

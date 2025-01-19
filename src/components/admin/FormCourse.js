import React, { useEffect, useState } from "react";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/admin/FormCourse.css";
import { FaMinus } from "react-icons/fa";

import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../../services/alertService";
import {
  createCourse,
  updateCourse,
  fetchCourseById,
} from "../../services/courseService";

const FormCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const isEditMode = Boolean(courseId);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    price: "",
    capacity: "",
    schedule: [{ day: "", start_hour: "", end_hour: "" }],
  });

  useEffect(() => {
    if (isEditMode) {
      const loadCourseData = async () => {
        try {
          const course = await fetchCourseById(courseId);
          setInitialValues({
            name: course.name || "",
            description: course.description || "",
            start_date: course.start_date || "",
            end_date: course.end_date || "",
            price: course.price || "",
            capacity: course.capacity || "",
            schedule: course.schedule?.length
              ? course.schedule
              : [{ day: "", start_hour: "", end_hour: "" }],
          });
        } catch (error) {
          console.error("Error al cargar el curso:", error);
        }
      };
      loadCourseData();
    }
  }, [courseId, isEditMode]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .required("El nombre es obligatorio."),
    description: Yup.string()
      .transform((value) => DOMPurify.sanitize(value.trim()))
      .required("La descripción es obligatoria."),
    start_date: Yup.date().required("La fecha de inicio es obligatoria."),
    end_date: Yup.date().required("La fecha de fin es obligatoria."),
    price: Yup.number()
      .positive("El precio debe ser un número positivo.")
      .required("El precio es obligatorio."),
    capacity: Yup.number()
      .integer("La capacidad debe ser un número entero.")
      .positive("La capacidad debe ser un número positivo.")
      .required("La capacidad es obligatoria."),
    schedule: Yup.array()
      .of(
        Yup.object({
          day: Yup.string().required("El día es obligatorio."),
          start_hour: Yup.string().required(
            "La hora de inicio es obligatoria."
          ),
          end_hour: Yup.string().required("La hora de fin es obligatoria."),
        })
      )
      .min(1, "Debe haber al menos un horario."),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const confirmed = await showConfirmationAlert(
      isEditMode
        ? "¿Estás seguro de actualizar este curso?"
        : "¿Estás seguro de registrar este curso?",
      isEditMode ? "Confirmar actualización" : "Confirmar registro"
    );

    if (!confirmed) {
      setSubmitting(false);
      return;
    }

    try {
      if (isEditMode) {
        await updateCourse(courseId, values);
        showSuccessAlert("Curso actualizado exitosamente.");
      } else {
        await createCourse(values);
        showSuccessAlert("Curso registrado exitosamente.");
      }
      navigate("/admin/list-courses");
    } catch (error) {
      console.error("Error al procesar el curso:", error);
      showErrorAlert("No se pudo procesar el curso. Inténtalo nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="custom-form-container">
      <h2 className="form-title">
        {isEditMode ? "Actualizar Curso" : "Registrar Curso"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            {/* Nombre */}
            <Form.Group className="mb-4 custom-label">
              <Form.Label>
                Nombre del Curso:<span className="required">*</span>
              </Form.Label>
              <Field
                name="name"
                className="form-control"
                placeholder="Ingrese el nombre del curso"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="form-error"
              />
            </Form.Group>

            {/* Descripción */}
            <Form.Group className="mb-4 custom-label">
              <Form.Label>
                Descripción:<span className="required">*</span>
              </Form.Label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
                placeholder="Ingrese una descripción"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="form-error"
              />
            </Form.Group>

            {/* Fechas */}
            <Row>
              <Col>
                <Form.Group className="mb-4 custom-label">
                  <Form.Label>
                    Fecha de Inicio:<span className="required">*</span>
                  </Form.Label>
                  <Field
                    type="date"
                    name="start_date"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="start_date"
                    component="div"
                    className="form-error"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-4 custom-label">
                  <Form.Label>
                    Fecha de Fin:<span className="required">*</span>
                  </Form.Label>
                  <Field type="date" name="end_date" className="form-control" />
                  <ErrorMessage
                    name="end_date"
                    component="div"
                    className="form-error"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Precio */}
            <Form.Group className="mb-4 custom-label">
              <Form.Label>
                Precio:<span className="required">*</span>
              </Form.Label>
              <Field
                type="number"
                name="price"
                className="form-control"
                placeholder="Ingrese el precio"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="form-error"
              />
            </Form.Group>

            {/* Capacidad */}
            <Form.Group className="mb-4 custom-label">
              <Form.Label>
                Capacidad:<span className="required">*</span>
              </Form.Label>
              <Field
                type="number"
                name="capacity"
                className="form-control"
                placeholder="Ingrese la capacidad"
              />
              <ErrorMessage
                name="capacity"
                component="div"
                className="form-error"
              />
            </Form.Group>

            {/* Horario */}
            <FieldArray name="schedule">
              {({ push, remove }) => (
                <>
                  {values.schedule.map((item, index) => (
                    <Row key={index} className="mb-3 schedule-container">
                      <Col>
                        <Form.Label className="custom-label">
                          Seleccionar: <span className="required">*</span>
                        </Form.Label>
                        <Field
                          as="select"
                          name={`schedule.${index}.day`}
                          className="form-control"
                        >
                          <option value="">Seleccionar día</option>
                          <option value="monday">Lunes</option>
                          <option value="tuesday">Martes</option>
                          <option value="wednesday">Miércoles</option>
                          <option value="thursday">Jueves</option>
                          <option value="friday">Viernes</option>
                          <option value="saturday">Sábado</option>
                          <option value="sunday">Domingo</option>
                        </Field>
                        <ErrorMessage
                          name={`schedule.${index}.day`}
                          component="div"
                          className="form-error"
                        />
                      </Col>
                      <Col>
                        <Form.Label className="custom-label">
                          Hora inicio: <span className="required">*</span>
                        </Form.Label>
                        <Field
                          type="time"
                          name={`schedule.${index}.start_hour`}
                          className="form-control"
                        />
                        <ErrorMessage
                          name={`schedule.${index}.start_hour`}
                          component="div"
                          className="form-error"
                        />
                      </Col>
                      <Col>
                        <Form.Label className="custom-label">
                          Hora fin: <span className="required">*</span>
                        </Form.Label>
                        <Field
                          type="time"
                          name={`schedule.${index}.end_hour`}
                          className="form-control"
                        />
                        <ErrorMessage
                          name={`schedule.${index}.end_hour`}
                          component="div"
                          className="form-error"
                        />
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="link"
                          onClick={() => remove(index)}
                          disabled={values.schedule.length <= 1}
                          className="delete-btn"
                        >
                          <FaMinus />
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button
                    variant="link"
                    onClick={() =>
                      push({ day: "", start_hour: "", end_hour: "" })
                    }
                  >
                    Agregar Día
                  </Button>
                </>
              )}
            </FieldArray>

            <div className="custom-button-container">
              <div>
                <Button
                  type="submit"
                  className="custom-button"
                  disabled={isSubmitting}
                >
                  {isEditMode ? "Actualizar" : "Registrar"}
                </Button>
              </div>
              <div>
                {isEditMode && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="custom-button"
                    onClick={() => navigate("/admin/list-courses")}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormCourse;

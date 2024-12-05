import { getToken, fetchWithAuth } from "./authService.js";

const API_URL = process.env.REACT_APP_API_URL;
/**
 * Servicio para crear un curso.
 * @param {Object} courseData - Datos del curso a crear.
 * @param {string} courseData.name - Nombre del curso.
 * @param {string} courseData.description - Descripción del curso.
 * @param {string} courseData.start_date - Fecha de inicio (YYYY-MM-DD).
 * @param {string} courseData.end_date - Fecha de fin (YYYY-MM-DD).
 * @param {number} courseData.price - Precio del curso.
 * @param {number} courseData.capacity - Capacidad máxima.
 * @param {Array} courseData.schedule - Horarios del curso.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */

export const createCourse = async (courseData) => {
  const token = getToken(); // Obtiene el token del authService

  try {
    const response = await fetchWithAuth(`${API_URL}/course/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear el curso.");
    }

    return await response.json(); // Devuelve la respuesta en formato JSON
  } catch (error) {
    //console.error("Error en createCourse:", error);
    throw error;
  }
};
/**
 * Servicio para obtener todos los cursos.
 * @returns {Promise<Array>} - Lista de cursos.
 */
export const fetchCourses = async () => {
  try {
    const response = await fetch(`${API_URL}/course/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al cargar los cursos.");
    }

    return await response.json(); // Devuelve la lista de cursos en formato JSON
  } catch (error) {
    //console.error("Error en fetchCourses:", error);
    throw error;
  }
};
/**
 * Servicio para obtener detalles de un curso por ID.
 * @param {number} courseId - ID del curso.
 * @returns {Promise<Object>} - Detalles del curso.
 */
export const fetchCourseById = async (courseId) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/course/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener el curso.");
    }

    return await response.json();
  } catch (error) {
    //console.error("Error en fetchCourseById:", error);
    throw error;
  }
};
/**
 * Servicio para eliminar un curso.
 * @param {number} courseId - ID del curso a eliminar.
 * @returns {Promise<void>} - Promesa que se resuelve si el curso se elimina correctamente.
 */
export const deleteCourse = async (courseId) => {
  const token = getToken(); // Obtiene el token desde el servicio de autenticación

  try {
    const response = await fetchWithAuth(
      `${API_URL}/course/delete/${courseId}?id_course=${courseId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar el curso.");
    }
  } catch (error) {
    // console.error("Error en deleteCourse:", error);
    throw error;
  }
};

//Actualizar curso
export const updateCourse = async (idCourse, courseData) => {
  try {
    const token = getToken(); // Obtén el token utilizando el servicio de autenticación
    if (!token) {
      throw new Error("Token no encontrado. Por favor, inicie sesión.");
    }

    const response = await fetchWithAuth(
      `${API_URL}/course/update/${idCourse}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
          Accept: "application/json",
        },
        body: JSON.stringify(courseData), // Convierte el curso a JSON
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "No se pudo actualizar el curso.");
    }

    return await response.json(); // Devuelve la respuesta en JSON si es exitosa
  } catch (error) {
    //console.error("Error al actualizar el curso:", error);
    throw error;
  }
};

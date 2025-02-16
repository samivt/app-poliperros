import { getToken, fetchWithAuth } from "./authService";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Servicio para crear un solicitante (inscripción).
 * @param {Object} applicantData - Datos del solicitante.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const createApplicant = async (applicantData) => {
  try {
    const response = await fetch(`${API_URL}/applicant/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(applicantData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.detail ||
        errorData.message ||
        "Error al registrar la adopcion.";
      throw new Error(errorMessage);
    }

    return await response.json(); // Si es exitoso, parsea el JSON
  } catch (error) {
    //console.error("Error en createApplicant:", error);
    throw error;
  }
};

/**
 * Servicio para obtener todos los solicitantes de un curso.
 * @param {number} courseId - ID del curso.
 * @returns {Promise<Array>} - Lista de solicitantes.
 */
// services/applicantService.js

export const fetchApplicantsByCourse = async (courseId) => {
  const token = getToken();

  try {
    const response = await fetchWithAuth(
      `${API_URL}/applicant/course/${courseId}/all/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      // Verificar si el error es un 404 con el detalle específico
      if (
        response.status === 404 &&
        errorData.detail === "No hay solicitudes"
      ) {
        return []; // Retornar un arreglo vacío en lugar de lanzar una excepción
      } else {
        throw new Error(
          errorData.message || "Error al obtener los solicitantes del curso."
        );
      }
    }

    return await response.json();
  } catch (error) {
    //console.error("Error en fetchApplicantsByCourse:", error);
    throw error;
  }
};

/**
 * Servicio para obtener los detalles de un solicitante.
 * @param {number} applicantId - ID del solicitante.
 * @returns {Promise<Object>} - Detalles del solicitante.
 */
export const fetchApplicantById = async (applicantId) => {
  const token = getToken();

  try {
    const response = await fetchWithAuth(
      `${API_URL}/applicant/${applicantId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener los detalles del solicitante."
      );
    }

    return await response.json();
  } catch (error) {
    // console.error("Error en fetchApplicantById:", error);
    throw error;
  }
};

/**
 * Servicio para obtener la imagen de un solicitante.
 * @param {number} applicantId - ID del solicitante.
 * @returns {Promise<string>} - URL de la imagen.
 */
export const fetchApplicantImage = async (applicantId) => {
  const token = getToken();

  try {
    const response = await fetchWithAuth(
      `${API_URL}/applicant/${applicantId}/image`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*", // Para imágenes
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener la imagen del solicitante.");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob); // Convierte el blob en una URL de objeto
  } catch (error) {
    // console.error("Error en fetchApplicantImage:", error);
    throw error;
  }
};
//eliminar aplicante
export const deleteApplicant = async (idVisit, idApplicant) => {
  const token = getToken();

  try {
    const response = await fetchWithAuth(
      `${API_URL}/applicant/delete/${idVisit}?id_applicant=${idApplicant}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json", // Especificamos que aceptamos una respuesta JSON
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el solicitante.");
    }

    const data = await response.json(); // Si la respuesta es JSON, la extraemos
    return data; // Retorna los datos de la respuesta si fue exitosa
  } catch (error) {
    // console.error("Error en deleteApplicant:", error);
    throw error;
  }
};

import { getToken, fetchWithAuth } from "./authService.js";

const API_URL = process.env.REACT_APP_API_URL;

// Crear visita
export const createVisit = async (visitData) => {
  try {
    const token = getToken();
    const response = await fetchWithAuth(`${API_URL}/visits/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(visitData),
    });

    if (!response.ok) {
      const error = await response.json();
      /*console.error(
        `Error del servidor: ${response.status} - ${
          error.detail || "Sin mensaje específico"
        }`
      );*/
      throw new Error(error.detail || "Error al registrar la visita.");
    }

    return await response.json();
  } catch (error) {
    //console.error("Error en createVisit:", error.message || error);
    throw error;
  }
};
//Obtener visitas por id perro
export const fetchVisitsByDogId = async (dogId) => {
  const token = getToken();

  try {
    const response = await fetchWithAuth(`${API_URL}/visits/all/${dogId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Incluye el token JWT
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener visitas para el perro con ID ${dogId}`);
    }

    return await response.json();
  } catch (error) {
    //console.error("Error al cargar las visitas:", error);
    throw error;
  }
};

// Obtener una visita por ID
export const fetchVisitById = async (visitId) => {
  try {
    const token = getToken();
    const response = await fetchWithAuth(`${API_URL}/visits/${visitId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener la visita con ID ${visitId}`);
    }

    return await response.json();
  } catch (error) {
    //console.error("Error al cargar la visita:", error);
    throw error;
  }
};

// Obtener todas las visitas
export const fetchAllVisits = async () => {
  try {
    const token = getToken();
    const response = await fetchWithAuth(`${API_URL}/visits/all/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener todas las visitas.");
    }

    return await response.json();
  } catch (error) {
    //console.error("Error al cargar todas las visitas:", error);
    throw error;
  }
};

// Obtener evidencia de una visita

export const fetchEvidenceImage = async (visitId) => {
  const token = getToken();
  try {
    const response = await fetchWithAuth(
      `${API_URL}/visits/${visitId}/evidence`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener la imagen de evidencia.");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob); // Devuelve la URL de la imagen
  } catch (error) {
    /*console.error(
      `Error al obtener la evidencia para la visita ${visitId}:`,
      error
    );*/
    throw error;
  }
};

// Actualizar visita
export const updateVisit = async (visitData) => {
  try {
    const token = getToken();
    const response = await fetchWithAuth(`${API_URL}/visits/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(visitData), // Incluye el cuerpo con los datos de la visita
    });

    if (!response.ok) {
      const error = await response.json();
      /*console.error(
        `Error del servidor: ${response.status} - ${
          error.detail || "Sin mensaje específico"
        }`
      );*/
      throw new Error(error.detail || "Error al actualizar la visita.");
    }

    return await response.json();
  } catch (error) {
    //console.error("Error en updateVisit:", error.message || error);
    throw error;
  }
};

// Eliminar visita
export const deleteVisit = async (visitId) => {
  try {
    const token = getToken();
    const response = await fetchWithAuth(
      `${API_URL}/visits/delete/${visitId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error al eliminar la visita con ID ${visitId}: ${response.statusText}`
      );
    }

    return { message: "Visita eliminada exitosamente." };
  } catch (error) {
    //console.error("Error en deleteVisit:", error.message || error);
    throw error;
  }
};

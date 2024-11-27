import { getToken } from "./auth-service.js";
const API_URL = process.env.REACT_APP_API_URL;

//Servicio para crear perros estaticos
export const createStaticDog = async (dogData) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/dog/static_dog/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dogData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `Error del servidor: ${response.status} - ${
          errorData.detail || "Sin mensaje específico"
        }`
      );

      // Si el backend responde con el mensaje de "Ya existe"
      if (errorData.detail) {
        throw new Error(errorData.detail); // Mostramos el detalle de la respuesta
      }

      // En caso de error genérico
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al registrar el perro:", error);
    throw error;
  }
};

// Obtener perros permanentes
export const fetchStaticDogs = async () => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/dog/static_dog/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || "Error al obtener perros permanentes"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener perros permanentes:", error);
    throw error;
  }
};

// Obtener perros en adopción
export const fetchAdoptionDogs = async () => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/dog/adoption_dog/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || "Error al obtener perros en adopción"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener perros en adopción:", error);
    throw error;
  }
};

import { getToken } from "./authService.js";
const API_URL = process.env.REACT_APP_API_URL;
//Crear visita
export const createVisit = async (visitData) => {
  try {
    const token = getToken(); // Asume que tienes un método getToken() para recuperar el token almacenado.

    const response = await fetch(`${API_URL}/visits/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluye el token JWT
        Accept: "application/json",
      },
      body: JSON.stringify(visitData), // Datos de la visita
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(
        `Error del servidor: ${response.status} - ${
          error.detail || "Sin mensaje específico"
        }`
      );
      throw new Error(error.detail || "Error al registrar la visita.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createVisit:", error.message || error);
    throw error;
  }
};

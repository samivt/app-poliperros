import { getToken, fetchWithAuth } from "./authService.js";

const API_URL = process.env.REACT_APP_API_URL;

const updateUser = async (userData) => {
  console.log("updateUser llamado con:", userData);

  const token = getToken();
  if (!token) {
    //console.error("Token no encontrado en updateUser");
    throw new Error("El usuario no está autenticado.");
  }

  const preparedData = {};
  Object.keys(userData).forEach((key) => {
    const value = userData[key];
    preparedData[key] =
      value !== undefined && value !== null && value.trim()
        ? value.trim()
        : null;
  });

  //console.log("Datos preparados para enviar al backend:", preparedData);

  try {
    //console.log("Enviando solicitud a:", `${API_URL}/auth/update`);
    const response = await fetchWithAuth(`${API_URL}/auth/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preparedData),
    });

    /*console.log(
      "Estado de la respuesta del servidor:",
      response.status,
      response.statusText
    );*/

    if (!response.ok) {
      const errorDetails = await response.json();
      //console.error("Detalles del error del backend:", errorDetails);
      throw new Error(
        `No se pudo actualizar el usuario. Código: ${
          response.status
        }, Mensaje: ${errorDetails.message || "Error desconocido"}`
      );
    }

    const responseData = await response.json();
    //console.log("Respuesta del backend:", responseData);
    return responseData;
  } catch (error) {
    //console.error("Error capturado en updateUser:", error);
    throw error;
  }
};

// Exportar el servicio
const userService = {
  updateUser,
};

export default userService;

/**
 * Actualiza la contraseña del usuario autenticado.
 *
 * @param {string} actualPassword - La contraseña actual del usuario.
 * @param {string} newPassword - La nueva contraseña que desea establecer.
 * @returns {Promise<object>} - Respuesta del servidor.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 */
export const updatePassword = async (actualPassword, newPassword) => {
  const token = getToken();
  if (!token) {
    throw new Error("El usuario no está autenticado.");
  }
  try {
    const response = await fetchWithAuth(
      `${API_URL}/auth/update/password?actual_password=${encodeURIComponent(
        actualPassword
      )}&new_password=${encodeURIComponent(newPassword)}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorDetails = await response.json();
      const errorMessage =
        errorDetails.detail || "Error al actualizar la contraseña.";
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async ({ email, role }) => {
  const token = getToken();
  try {
    const response = await fetchWithAuth(
      `${API_URL}/auth/generate_user?email=${encodeURIComponent(
        email
      )}&role=${encodeURIComponent(role)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail || "Error al generar el usuario.";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // console.error("Error al generar el usuario:", error.message);
    throw error;
  }
};
// Obtener todos los usuarios
export const fetchAllUsers = async () => {
  const token = getToken();

  try {
    const response = await fetchWithAuth(`${API_URL}/auth/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail || "Error al obtener los usuarios.";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // console.error("Error al obtener los usuarios:", error.message);
    throw error;
  }
};

// Servicio para eliminar un usuario
export const deleteUser = async (userId) => {
  const token = getToken();

  try {
    const response = await fetchWithAuth(`${API_URL}/auth/delete/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail || "Error al eliminar el usuario.";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

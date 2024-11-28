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
//Servicio para crear perros en adopcion
export const createAdoptionDog = async (dogData) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/dog/adoption_dog/create/`, {
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
  try {
    console.log("Iniciando fetchStaticDogs..."); // Log inicial
    const response = await fetch(`${API_URL}/dog/static_dog/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Estado de la respuesta:", response.status); // Verifica el estado HTTP

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al obtener los perros permanentes:", errorMessage);
      throw new Error("Error al obtener los perros permanentes.");
    }

    const data = await response.json();
    console.log("Datos recibidos del backend (fetchStaticDogs):", data); // Log de los datos
    return data;
  } catch (error) {
    console.error("Error en fetchStaticDogs:", error); // Log de errores
    throw error;
  }
};

// Eliminar un perro permanente
export const deleteStaticDog = async (id) => {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/dog/static_dog/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el perro con ID ${id}.`);
    }
  } catch (error) {
    console.error("Error en deleteStaticDog:", error);
    throw error;
  }
};

// Obtener perros en adopción
export const fetchAdoptionDogs = async () => {
  try {
    const response = await fetch(`${API_URL}/dog/adoption_dog/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los perros en adopción.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchAdoptionDogs:", error);
    throw error;
  }
};

// Eliminar un perro en adopción
export const deleteAdoptionDog = async (id) => {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/dog/adoption_dog/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el perro en adopción con ID ${id}.`);
    }
  } catch (error) {
    console.error("Error en deleteAdoptionDog:", error);
    throw error;
  }
};

//Adoptar perro se crea el dueño
export const adoptDog = async (dogId, adoptionDate, data) => {
  const token = sessionStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/dog/adoption_dog/adopt/${dogId}/${adoptionDate}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Error al registrar la adopción");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
// Obtener perros adoptados
export const fetchAdoptedDogs = async () => {
  try {
    console.log("Iniciando fetchAdoptedDogs..."); // Log inicial
    const response = await fetch(
      `${API_URL}/dog/adopted_dog/`, // Endpoint para obtener perros adoptados
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Estado de la respuesta:", response.status); // Verifica el estado HTTP

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al obtener los perros adoptados:", errorMessage);
      throw new Error("Error al obtener los perros adoptados.");
    }

    const data = await response.json();
    console.log("Datos recibidos del backend (fetchAdoptedDogs):", data); // Log de los datos
    return data;
  } catch (error) {
    console.error("Error en fetchAdoptedDogs:", error); // Log de errores
    throw error;
  }
};

//Crear visita
//falta el token aun no registra
export const createVisit = async (visitData) => {
  try {
    const response = await fetch(`${API_URL}/visits/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Error al registrar la visita.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createVisit:", error);
    throw error;
  }
};

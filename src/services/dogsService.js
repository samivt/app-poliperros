import { getToken, fetchWithAuth } from "./authService.js";
const API_URL = process.env.REACT_APP_API_URL;

// Crear perros estáticos
export const createStaticDog = async (dogData) => {
  const token = getToken();

  // Garantizar que todos los campos estén presentes
  const payload = {
    id_chip: dogData.id_chip || null,
    name: dogData.name || null,
    about: dogData.about || null,
    age: dogData.age || null,
    is_vaccinated: dogData.is_vaccinated ?? null,
    image: dogData.image || null,
    gender: dogData.gender || null,
    entry_date: dogData.entry_date || null,
    is_sterilized: dogData.is_sterilized ?? null,
    is_dewormed: dogData.is_dewormed ?? null,
    operation: dogData.operation || null,
  };

  try {
    //console.log( "Payload enviado al backend:", JSON.stringify(payload, null, 2)); // Imprime el payload

    const response = await fetchWithAuth(`${API_URL}/dog/static_dog/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      //console.error("Error del backend recibido:", errorData);

      // Procesar y mostrar errores del campo `detail`
      if (errorData.detail && Array.isArray(errorData.detail)) {
        const detailedErrors = errorData.detail.map(
          (err) =>
            `Campo: ${err.loc?.join(".") || "desconocido"} - Error: ${err.msg}`
        );
        //console.error("Errores detallados del backend:", detailedErrors);
        throw new Error(detailedErrors.join("; "));
      }

      // Mensaje genérico en caso de que no haya detalles específicos
      throw new Error(
        errorData.detail ||
          errorData.message ||
          "Error desconocido del backend."
      );
    }

    // Devuelve la respuesta del servidor en caso de éxito
    return await response.json();
  } catch (error) {
    console.error("Error al registrar el perro:", error.message || error);
    throw error; // Lanza el error para que sea manejado en el frontend
  }
};

// Servicio para actualizar un perro estático
export const updateStaticDog = async (id, dogData) => {
  try {
    const response = await fetchWithAuth(
      `${API_URL}/dog/static_dog/update/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Detalle del error del backend:", errorData);
      throw new Error("Error al actualizar el perro");
    }

    return await response.json(); // Devuelve la respuesta si es exitosa
  } catch (error) {
    // console.error("Error actualizando el perro:", error);
    throw error;
  }
};

// Obtener perros permanentes
export const fetchStaticDogs = async () => {
  try {
    //console.log("Iniciando fetchStaticDogs..."); // Log inicial
    const response = await fetch(`${API_URL}/dog/static_dog/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("Estado de la respuesta:", response.status); // Verifica el estado HTTP

    if (!response.ok) {
      //const errorMessage = await response.text();
      // console.error("Error al obtener los perros permanentes:", errorMessage);
      //throw new Error("Error al obtener los perros permanentes.");
    }

    const data = await response.json();
    // console.log("Datos recibidos del backend (fetchStaticDogs):", data); // Log de los datos
    return data;
  } catch (error) {
    // console.error("Error en fetchStaticDogs:", error); // Log de errores
    throw error;
  }
};
//obtener perro por id

export const fetchStaticDogById = async (id) => {
  try {
    const response = await fetchWithAuth(`${API_URL}/dog/static_dog/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del perro.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Servicio para obtener la imagen de un perro estático
export const fetchStaticDogImage = async (dogId) => {
  try {
    const response = await fetch(`${API_URL}/dog/static_dog/${dogId}/image`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la imagen");
    }

    const blob = await response.blob(); // Convierte la respuesta a un Blob
    return URL.createObjectURL(blob); // Devuelve la URL de la imagen para usar en <img>
  } catch (error) {
    //console.error("Error al obtener la imagen:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
// Eliminar un perro permanente
export const deleteStaticDog = async (id) => {
  const token = getToken();
  try {
    const response = await fetchWithAuth(
      `${API_URL}/dog/static_dog/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error al eliminar el perro con ID ${id}.`);
    }
  } catch (error) {
    //console.error("Error en deleteStaticDog:", error);
    throw error;
  }
};
//Servicio para crear perros en adopcion
export const createAdoptionDog = async (dogData) => {
  const token = getToken();

  // Garantizar que todos los campos estén presentes
  const payload = {
    id_chip: dogData.id_chip || null,
    name: dogData.name || null,
    about: dogData.about || null,
    age: dogData.age || null,
    is_vaccinated: dogData.is_vaccinated ?? null,
    image: dogData.image || null,
    gender: dogData.gender || null,
    entry_date: dogData.entry_date || null,
    is_sterilized: dogData.is_sterilized ?? null,
    is_dewormed: dogData.is_dewormed ?? null,
    operation: dogData.operation || null,
  };

  try {
    console.log(
      "Payload enviado al backend:",
      JSON.stringify(payload, null, 2)
    ); // Imprime el payload

    const response = await fetchWithAuth(
      `${API_URL}/dog/adoption_dog/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del backend recibido:", errorData);

      // Procesar y mostrar errores del campo `detail`
      if (errorData.detail && Array.isArray(errorData.detail)) {
        const detailedErrors = errorData.detail.map(
          (err) =>
            `Campo: ${err.loc?.join(".") || "desconocido"} - Error: ${err.msg}`
        );
        console.error("Errores detallados del backend:", detailedErrors);
        throw new Error(detailedErrors.join("; "));
      }

      // Mensaje genérico en caso de que no haya detalles específicos
      throw new Error(
        errorData.detail ||
          errorData.message ||
          "Error desconocido del backend."
      );
    }

    // Devuelve la respuesta del servidor en caso de éxito
    return await response.json();
  } catch (error) {
    console.error("Error al registrar el perro:", error.message || error);
    throw error; // Lanza el error para que sea manejado en el frontend
  }
};
// Servicio para actualizar un perro estático
export const updateAdoptionDog = async (dogId, dogData) => {
  try {
    const token = getToken(); // Obtener el token de autenticación
    if (!token) {
      throw new Error("Token no encontrado. Por favor, inicie sesión.");
    }

    // Hacer la solicitud PUT para actualizar el perro
    const response = await fetch(
      `${API_URL}/dog/adoption_dog/update/${dogId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Incluir el token de autorización
        },
        body: JSON.stringify(dogData), // Convertir los datos a JSON
      }
    );

    // Comprobar si la respuesta fue exitosa
    if (!response.ok) {
      // Intentar leer el cuerpo de la respuesta como JSON en caso de error
      let errorData;
      try {
        errorData = await response.json();
      } catch (err) {
        errorData = { message: "Error desconocido al procesar la solicitud." };
      }
      throw new Error(errorData.message || "Error al actualizar el perro");
    }

    // Retornar los datos de la respuesta si la solicitud es exitosa
    return await response.json();
  } catch (error) {
    console.error("Error actualizando el perro:", error);
    throw error; // Lanza el error para manejarlo en el componente
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
//obtener perro por id

export const fetchAdoptionDogById = async (id) => {
  try {
    const response = await fetchWithAuth(`${API_URL}/dog/adoption_dog/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del perro.");
    }

    return await response.json();
  } catch (error) {
    //console.error(error);
    throw error;
  }
};
// Servicio para obtener la imagen de un perro estático
export const fetchAdoptionDogImage = async (dogId) => {
  try {
    const response = await fetch(`${API_URL}/dog/adoption_dog/${dogId}/image`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la imagen");
    }

    const blob = await response.blob(); // Convierte la respuesta a un Blob
    return URL.createObjectURL(blob); // Devuelve la URL de la imagen para usar en <img>
  } catch (error) {
    //console.error("Error al obtener la imagen:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

//Adoptar perro se crea el dueño
export const adoptDog = async (dog_id, adoption_date, ownerData) => {
  const token = getToken(); // Método para obtener el token
  const url = `${API_URL}/dog/adoption_dog/adopt/${dog_id}/${adoption_date}`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ownerData), // Solo los datos del propietario en el cuerpo
  });

  if (!response.ok) {
    const error = await response.json(); // Intentamos obtener más detalles del error
    throw new Error(error.message || "Error al registrar la adopción.");
  }

  return await response.json();
};

// Obtener perros adoptados
export const fetchAdoptedDogs = async () => {
  try {
    //console.log("Iniciando fetchAdoptedDogs..."); // Log inicial
    const response = await fetch(`${API_URL}/dog/adopted_dog/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("Estado de la respuesta:", response.status); // Verifica el estado HTTP

    if (!response.ok) {
      // const errorMessage = await response.text();
      // console.error("Error al obtener los perros adoptados:", errorMessage);
      throw new Error("Error al obtener los perros adoptados.");
    }

    const data = await response.json();
    //console.log("Datos recibidos del backend (fetchAdoptedDogs):", data); // Log de los datos
    return data;
  } catch (error) {
    //console.error("Error en fetchAdoptedDogs:", error); // Log de errores
    throw error;
  }
};
//Obtener perror por id
export const fetchAdoptedDogById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/dog/adopted_dog/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json", // Acepta JSON
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "No se pudo obtener la información del perro."
      );
    }

    return await response.json(); // Retorna la respuesta en JSON si es exitosa
  } catch (error) {
    console.error("Error al obtener la información del perro adoptado:", error);
    throw error;
  }
};
//Quitar adopcion perro
export const unadoptDog = async (dogId) => {
  const token = getToken(); // Obtén el token de autenticación

  try {
    const response = await fetchWithAuth(
      `${API_URL}/dog/adopted_dog/unadopt/${dogId}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: "", // El cuerpo está vacío según el curl proporcionado
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al quitar la adopción.");
    }
  } catch (error) {
    //console.error("Error en unadoptDog:", error);
    throw error;
  }
};
// Actualiza la información de un dueño.
export const updateOwner = async (idOwner, ownerData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token de autenticación no disponible.");
    }

    const response = await fetchWithAuth(`${API_URL}/owner/update/${idOwner}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(ownerData),
    });

    // Verifica si la respuesta es exitosa
    if (response.ok) {
      // Obtener la respuesta JSON
      const data = await response.json();

      // Si la respuesta contiene el detalle, lo mostramos
      return data; // Retornamos la respuesta JSON
    } else {
      // Si la respuesta no es exitosa, manejamos el error
      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const errorDetails = await response.json();
        throw new Error(
          errorDetails.detail || "Error al actualizar la información del dueño."
        );
      } else {
        const errorText = await response.text();
        throw new Error(
          `Error inesperado del servidor: ${response.status}. ${errorText}`
        );
      }
    }
  } catch (error) {
    console.error("Error en updateOwner:", error.message || error);
    throw error; // Re-lanzar el error para manejarlo en el componente que lo invoca
  }
};

//Actualizar perro adoptado
export const updateAdoptedDog = async (idDog, dogData) => {
  try {
    const token = getToken(); // Obtener el token de autorización
    if (!token) {
      throw new Error("Token no encontrado. Por favor, inicie sesión.");
    }

    const response = await fetchWithAuth(
      `${API_URL}/dog/adopted_dog/update/${idDog}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token JWT
          Accept: "application/json",
        },
        body: JSON.stringify(dogData), // Datos del perro a actualizar
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "No se pudo actualizar la información del perro."
      );
    }

    return await response.json(); // Retorna la respuesta en JSON si la solicitud es exitosa
  } catch (error) {
    //console.error("Error al actualizar el perro adoptado:", error);
    throw error;
  }
};
//obtener todos lo dueños

export const fetchAllOwners = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token de autenticación no disponible.");
    }

    // Realiza la solicitud GET al endpoint
    const response = await fetchWithAuth(`${API_URL}/owner/all/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        errorDetails.detail || "Error al obtener la lista de dueños."
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      "Error al obtener la lista de dueños:",
      error.message || error
    );
    throw error;
  }
};
//adopcion dueño existente
export const adoptDogOwner = async (dogId, adoptionDate, ownerId) => {
  const token = getToken(); // Método para obtener el token de autenticación
  const url = `${API_URL}/dog/adoption_dog/adopt/${dogId}/${ownerId}/${adoptionDate}`;

  // Realizamos la solicitud POST
  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      accept: "application/json",
    },
    body: "", // El cuerpo está vacío, ya que los datos se envían a través de la URL
  });

  // Verificamos si la respuesta fue exitosa
  if (!response.ok) {
    const error = await response.json(); // Obtenemos el mensaje de error
    throw new Error(error.message || "Error al registrar la adopción.");
  }

  // Si la respuesta es exitosa, devolvemos la respuesta en formato JSON
  return await response.json();
};

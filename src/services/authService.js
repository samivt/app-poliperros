import { jwtDecode } from "jwt-decode";
const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
  try {
    const body = new URLSearchParams();
    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password);
    body.append("scope", "");
    body.append("client_id", "string");
    body.append("client_secret", "string");

    const response = await fetch(`${API_URL}/auth/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    // Lee el cuerpo de la respuesta una sola vez
    const responseBody = await response.text();

    if (!response.ok) {
      // Intenta procesar el error como JSON
      let errorMessage = "Error al iniciar sesión";
      try {
        const errorData = JSON.parse(responseBody);
        errorMessage =
          Array.isArray(errorData.detail) && errorData.detail.length > 0
            ? errorData.detail.map((err) => err.msg).join(", ")
            : errorData.detail || errorMessage;
      } catch {
        // Si no es JSON, usa el texto plano
        errorMessage = responseBody;
      }
      throw new Error(errorMessage);
    }

    // Procesa la respuesta como JSON si fue exitosa
    return JSON.parse(responseBody);
  } catch (error) {
    console.error("Error en login:", error.message);
    throw error;
  }
};

// Obtener el token almacenado
export const getToken = () => sessionStorage.getItem("accessToken");

// Decodificar el token usando jwt-decode
export const decodeToken = (token) => {
  try {
    let decode = jwtDecode(token);
    //console.log(decode);
    return decode;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

// Obtener el rol del usuario del token
export const getUserRole = () => {
  const token = getToken();
  const decoded = decodeToken(token);
  //console.log("Token decodificado:", decoded);
  return decoded?.role.toLowerCase() || null; // Devuelve el rol o null si no existe
};

// Verificar si el usuario está autenticado y el token no ha expirado
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  const decoded = decodeToken(token);
  const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  return decoded?.exp > now; // Verifica si el token no ha expirado
};

//Cerrar sesion
export const logout = () => {
  // Elimina el token del almacenamiento
  sessionStorage.removeItem("accessToken");
};

//Enviar correo para recuperar contrasena
export const sendPasswordResetEmail = async (email) => {
  try {
    const body = new URLSearchParams();
    body.append("email", email);

    const response = await fetch(`${API_URL}/auth/reset_password/send`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(
        error || "Error al enviar el correo de restablecimiento."
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error al enviar el correo de restablecimiento:", error);
    throw error;
  }
};
//Verificar codigo
export const verifyResetCode = async (code) => {
  try {
    const response = await fetch(
      `${API_URL}/auth/reset_password/verify?code=${code}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Error al verificar el código.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en verifyResetCode:", error);
    throw error;
  }
};

//Restablecer contrasena
export const resetPassword = async (code, newPassword) => {
  try {
    const response = await fetch(
      `${API_URL}/auth/reset_password/reset?code=${code}&new_password=${newPassword}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Error al restablecer la contraseña.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en resetPassword:", error);
    throw error;
  }
};
export const fetchWithAuth = async (url, options = {}) => {
  const token = getToken(); // Obtén el token almacenado
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : undefined,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      // Si el token es inválido o expirado, cierra sesión y redirige al login
      logout(); // Elimina el token de sessionStorage
      window.location.href = "/login"; // Redirige al login
      throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    return response; // Devuelve la respuesta si no es 401
  } catch (error) {
    console.error("Error en fetchWithAuth:", error);
    throw error;
  }
};

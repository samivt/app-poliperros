import { jwtDecode } from "jwt-decode";

export const login = async (username, password) => {
  try {
    const body = new URLSearchParams();
    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password);
    body.append("scope", "");
    body.append("client_id", "string");
    body.append("client_secret", "string");

    const response = await fetch(
      "https://poliperritosback.agreeableflower-431ed430.westus.azurecontainerapps.io/auth/token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );

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
    console.log(decode);
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
  console.log("Token decodificado:", decoded);
  return decoded?.sub.toLowerCase() || null; // Devuelve el rol o null si no existe
};

// Verificar si el usuario está autenticado y el token no ha expirado
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  const decoded = decodeToken(token);
  const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  return decoded?.exp > now; // Verifica si el token no ha expirado
};

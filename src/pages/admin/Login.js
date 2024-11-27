import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/styles/admin/Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth-service";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para alternar la visibilidad de la contraseña
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alternar el estado
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage("Por favor completa todos los campos");
      showErrorAlert(
        "Por favor completa todos los campos.",
        "Campos incompletos"
      );
      return;
    }

    try {
      const result = await login(formData.username, formData.password);
      console.log("Inicio de sesión exitoso:", result);

      // Guarda el token y redirige
      sessionStorage.setItem("accessToken", result.access_token);

      // Muestra alerta de éxito
      showSuccessAlert("Bienvenido a PoliPerros.", "Inicio de sesión exitoso");

      navigate("/admin"); // Redirige al dashboard
    } catch (error) {
      // Determina el mensaje de error
      const errorText = error.message.includes("500")
        ? "Error interno del servidor. Inténtalo más tarde."
        : error.message;

      setErrorMessage(errorText); // Mantiene el mensaje de error
      console.error("Error al iniciar sesión:", error.message);

      // Muestra alerta de error
      showErrorAlert(errorText, "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img
            src={require("../../assets/images/logo_poliperros.png")}
            alt="PoliPerros Logo"
          />
        </div>
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="custom-label">Usuario:</Form.Label>
              <Form.Control
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 password-group">
              <Form.Label className="custom-label">Contraseña:</Form.Label>
              <div className="password-input-container">
                <Form.Control
                  type={showPassword ? "text" : "password"} // Cambia el tipo de entrada según el estado
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="password-toggle-icon"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? (
                    <i class="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i class="fa-regular fa-eye"></i>
                  )}
                </span>
              </div>
            </Form.Group>

            <div className="forgot-password">
              <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}

            <Button variant="warning" type="submit" className="login-button">
              Ingresar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

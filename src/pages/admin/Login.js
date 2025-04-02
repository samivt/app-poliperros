import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/styles/admin/Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { showSuccessAlert, showErrorAlert } from "../../services/alertService";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage("Por favor completa todos los campos.");
      showErrorAlert(
        "Por favor completa todos los campos.",
        "Campos incompletos"
      );
      return;
    }

    try {
      const result = await login(formData.username.trim(), formData.password);
      console.log("Inicio de sesión exitoso:", result);

      sessionStorage.setItem("accessToken", result.access_token);

      showSuccessAlert("Bienvenido a PoliPerros.", "Inicio de sesión exitoso");
      navigate("/admin");
    } catch (error) {
      const errorText = error.message.includes("500")
        ? "Error interno del servidor. Inténtalo más tarde."
        : "Credenciales incorrectas. Verifica tu usuario y contraseña.";

      //console.error("Error al iniciar sesión:", error.message);

      showErrorAlert(errorText, "Error al iniciar sesión");
    }
  };

  const handleCancel = () => {
    navigate("/");
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
                maxLength={50}
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 password-group">
              <Form.Label className="custom-label">Contraseña:</Form.Label>
              <div className="password-input-container">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  maxLength={50}
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="password-toggle-icon"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </span>
              </div>
            </Form.Group>

            <div className="forgot-password">
              <a href="/send-code">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="btn-container">
              <Button
                variant="secondary"
                type="submit"
                className="login-button"
              >
                Ingresar
              </Button>

              <Button
                variant="secondary"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

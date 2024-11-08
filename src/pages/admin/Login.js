import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../assets/styles/admin/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dogData = {
      ...formData,
    };
    console.log(dogData);
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Inicio sesión:", result);
      } else {
        console.error("Error al ingresar al sistema:", response.status);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
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
              <Form.Label className="custom-label">Correo:</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="custom-label">Contraseña:</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="forgot-password">
              <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
            </div>

            <Link to="/admin/*">
              <Button variant="warning" type="submit" className="login-button">
                Ingresar
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

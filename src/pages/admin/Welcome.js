import React from "react";
import "../../assets/styles/admin/Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <img
        src={require("../../assets/images/logo_poliperros.png")}
        alt="PoliPerros Logo"
        className="welcome-image"
      />
      <h1 className="welcome-heading">¡Bienvenido!</h1>
      <p className="welcome-paragraph">
        Selecciona una opción del menú para comenzar.
      </p>
    </div>
  );
};

export default Welcome;

import React from "react";
import Navbar from "../../components/main/Navbar";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/"); // Redirige a la página principal
  };

  return (
    <div>
      <Navbar />
      <div className="text-center mt-5">
        <h2>¡Gracias por tu inscripción!</h2>
        <p>Nos pondremos en contacto contigo pronto para más detalles.</p>
        <button className="btn btn-primary mt-3" onClick={handleReturn}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;

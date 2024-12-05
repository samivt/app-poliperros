import React from "react";
import Navbar from "../../components/main/Navbar";
import logo from "../../assets/images/Logo.jpg";

const ThankYouPage = () => {
  return (
    <div>
      <Navbar />
      <div className="thank-you-container d-flex flex-column align-items-center justify-content-center text-center mt-5">
        <img
          src={logo}
          alt="PoliPerros"
          className="img-fluid my-4"
          style={{ borderRadius: "10px", maxWidth: "200px", height: "auto" }}
        />
        <i className="fas fa-paw fa-4x  mb-4"></i>
        <h2 className=" mb-3">¡Gracias por tu inscripción!</h2>
        <p className="text-muted">
          Nos pondremos en contacto contigo pronto para más detalles.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;

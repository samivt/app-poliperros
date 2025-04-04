import React, { useEffect, useState } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/InfoAdoptionDogs.css";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAdoptionDogById } from "../../services/dogsService";

const InfoAdoptionDogs = () => {
  const { dog_id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const data = await fetchAdoptionDogById(dog_id);
        setDog(data);
      } catch (error) {
        //console.error("Error al cargar el perro:", error);
        setDog(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogDetails();
  }, [dog_id]);

  if (isLoading) {
    return (
      <div className="info-adoption-loading-container">
        <div className="info-adoption-paw-spinner">
          <i className="fas fa-paw"></i>
        </div>
      </div>
    );
  }

  if (!dog) {
    return (
      <div>
        <Navbar />
        <section className="info-adoption-error">
          <p>No se pudo cargar la información del perro.</p>
        </section>
        <Footer />
      </div>
    );
  }

  const handleAdoptClick = () => {
    const whatsappNumber = "593983023135";
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text&type=phone_number&app_absent=0`;

    // Ejemplo: abrir el enlace
    window.open(whatsappLink, "_blank");
  };

  return (
    <div>
      <Navbar />
      <section className="info-adoption-section">
        <h2 className="info-adoption-title">Perros en Adopción</h2>
        <div className="info-adoption-card">
          <img src={dog.image} alt={dog.name} className="info-adoption-image" />
          <div className="info-adoption-details">
            <h3 className="info-adoption-name">{dog.name}</h3>
            <p className="info-adoption-about">{dog.about}</p>
            <p>
              <strong>Edad:</strong> {dog.age} años
            </p>
            <p>
              <strong>Vacunado:</strong> {dog.is_vaccinated ? "Sí" : "No"}
            </p>
            <p>
              <strong>Esterilizado:</strong> {dog.is_sterilized ? "Sí" : "No"}
            </p>
            <div className="info-adoption-buttons">
              <button
                onClick={handleAdoptClick}
                className="info-adoption-btn-adopt"
              >
                <i className="fas fa-heart"></i> Adoptar
              </button>
              <button
                onClick={() => navigate(-1)}
                className="info-adoption-btn-back"
              >
                <i className="fas fa-arrow-left"></i> Regresar
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InfoAdoptionDogs;

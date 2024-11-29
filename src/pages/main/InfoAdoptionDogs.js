import React, { useEffect, useState } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/InfoAdoptionDogs.css";
import { useParams, useNavigate } from "react-router-dom";

const InfoAdoptionDogs = () => {
  const { dog_id } = useParams(); // Obtener el id del perro desde la URL
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const response = await fetch(
          `https://poliperritosback.agreeableflower-431ed430.westus.azurecontainerapps.io/dog/adoption_dog/${dog_id}`
        );

        if (!response.ok) {
          throw new Error("Error al cargar los datos del perro.");
        }

        const data = await response.json();
        setDog(data);
      } catch (error) {
        console.error("Error al cargar el perro:", error);
        setDog(null); // Evita que la página falle si ocurre un error
      } finally {
        setIsLoading(false); // Desactiva el estado de carga
      }
    };

    fetchDogDetails();
  }, [dog_id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="paw-spinner">
          <i className="fas fa-paw"></i>
        </div>
      </div>
    );
  }

  if (!dog) {
    return (
      <div>
        <Navbar />
        <section className="info-dog-section">
          <p>No se pudo cargar la información del perro.</p>
        </section>
        <Footer />
      </div>
    );
  }

  const handleAdoptClick = () => {
    const whatsappUrl = `https://wa.me/?text=Hola,%20estoy%20interesado%20en%20adoptar%20a%20${dog.name}.`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <Navbar />
      <section className="info-dog-section">
        <h2>Perros en adopción</h2>
        <div className="info-dog-card">
          <img src={dog.image} alt={dog.name} className="info-dog-image" />
          <div className="info-dog-details">
            <h3 id="name-dog">{dog.name}</h3>
            <p id="info-dog">{dog.about}</p>
            <p id="info-dog">
              <strong>Edad:</strong> {dog.age} años
            </p>
            <p id="info-dog">
              <strong>Vacunado:</strong> {dog.is_vaccinated ? "Sí" : "No"}
            </p>
            <p id="info-dog">
              <strong>Esterilizado:</strong> {dog.is_sterilized ? "Sí" : "No"}
            </p>
            <div className="info-dog-buttons">
              <button onClick={handleAdoptClick} className="btn-adopt">
                <i className="fas fa-heart"></i> Adoptar
              </button>
              <button onClick={() => navigate(-1)} className="btn-back">
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

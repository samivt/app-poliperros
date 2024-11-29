import React, { useState, useEffect } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/ViewAdoptionDogs.css";
import { Link } from "react-router-dom";

const ViewDogs = ({ nameDog, imageDog, link }) => {
  return (
    <div className="view-dog">
      <img src={imageDog} alt={nameDog} />
      <p id="nameDog">{nameDog}</p>
      <Link to={link}>
        <button>Ver más</button>
      </Link>
    </div>
  );
};

const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch(
          "https://poliperritosback.agreeableflower-431ed430.westus.azurecontainerapps.io/dog/adoption_dog/"
        );

        if (!response.ok) {
          throw new Error("Error al cargar los datos de los perros");
        }

        const data = await response.json();
        setDogs(data);
        setError(false); // No hay error si la carga es exitosa
      } catch (error) {
        console.error("Error al cargar los perros:", error);
        setError(true);
      } finally {
        setIsLoading(false); // Loading finaliza después de la carga
      }
    };

    const delayLoading = setTimeout(() => {
      fetchDogs();
    }, 1000);

    return () => clearTimeout(delayLoading);
  }, []);

  return (
    <div>
      <Navbar />
      <section className="view-info">
        <h2>Perros en adopción</h2>
        <div className="view-container">
          {isLoading ? (
            <div className="loading-container">
              <div className="paw-spinner">
                <i className="fas fa-paw"></i>
              </div>
            </div>
          ) : error ? (
            <p>No se pudieron cargar los perros en este momento.</p>
          ) : dogs.length > 0 ? (
            dogs.map((dog) => (
              <ViewDogs
                key={dog.id}
                imageDog={dog.image}
                nameDog={dog.name}
                link={`/info-adoption-dogs/${dog.id}`}
              />
            ))
          ) : (
            <p>No hay perros disponibles en este momento.</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dogs;

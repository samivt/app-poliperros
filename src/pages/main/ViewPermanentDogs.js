import React, { useState, useEffect } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/ViewPermanentDogs.css";

const ViewDogs = ({
  id,
  nameDog,
  imageDog,
  description,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <div className={`view-dog ${isExpanded ? "expanded" : ""}`}>
      <img src={imageDog} alt={nameDog} />
      <p id="nameDog">{nameDog}</p>
      {isExpanded && (
        <div className="dog-description">
          <p>{description}</p>
        </div>
      )}
      <button onClick={() => onToggleExpand(id)}>
        {isExpanded ? "Ver menos" : "Ver más"}
      </button>
    </div>
  );
};

const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDogId, setExpandedDogId] = useState(null); // Estado para controlar la tarjeta expandida

  // Cargar datos de los perros desde el backend
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch(
          "https://poliperritosback.agreeableflower-431ed430.westus.azurecontainerapps.io/dog/static_dog/"
        );

        if (!response.ok) {
          throw new Error("Error al cargar los datos de los perros");
        }

        const data = await response.json();
        setDogs(data); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error al cargar los perros:", error);
        setDogs([]); // Asegúrate de que la lista quede vacía si falla
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, []);

  const handleToggleExpand = (id) => {
    setExpandedDogId(expandedDogId === id ? null : id); // Alterna el estado de la tarjeta expandida
  };

  return (
    <div>
      <Navbar />
      <section className="view-info">
        <h2>PoliPerros</h2>
        <div className="view-container">
          {isLoading ? (
            <div className="loading-container">
              <div className="paw-spinner">
                <i className="fas fa-paw fa-spin"></i>
              </div>
            </div>
          ) : dogs.length > 0 ? (
            dogs.map((dog) => (
              <ViewDogs
                key={dog.id}
                id={dog.id}
                imageDog={dog.image} // Usar la URL de la imagen proporcionada por el backend
                nameDog={dog.name}
                description={dog.about}
                isExpanded={expandedDogId === dog.id} // Verifica si esta tarjeta está expandida
                onToggleExpand={handleToggleExpand} // Pasar función para alternar expansión
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

import React, { useState, useEffect } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/ViewPermanentDogs.css";
import { fetchStaticDogs } from "../../services/dogsService"; // Importa el servicio

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
  const [dogs, setDogs] = useState([]); // Lista de perros
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [expandedDogId, setExpandedDogId] = useState(null); // ID del perro expandido

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const data = await fetchStaticDogs(); // Llama al servicio
        setDogs(data); // Guarda los datos en el estado
      } catch (error) {
        console.error("Error al cargar los perros:", error);
        setDogs([]); // Asegura que la lista quede vacía si falla
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
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
                imageDog={dog.image} // URL de la imagen desde el backend
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

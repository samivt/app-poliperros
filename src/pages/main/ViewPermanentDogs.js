import React, { useState, useEffect } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/ViewPermanentDogs.css";
import { fetchStaticDogs } from "../../services/dogsService";

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
  const [expandedDogId, setExpandedDogId] = useState(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const data = await fetchStaticDogs();
        setDogs(data);
      } catch (error) {
        console.error("Error al cargar los perros:", error);
        setDogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, []);

  const handleToggleExpand = (id) => {
    setExpandedDogId(expandedDogId === id ? null : id);
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
                imageDog={dog.image}
                nameDog={dog.name}
                description={dog.about}
                isExpanded={expandedDogId === dog.id}
                onToggleExpand={handleToggleExpand}
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

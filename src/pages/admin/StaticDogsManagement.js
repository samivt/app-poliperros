import React, { useState, useEffect } from "react";
import DogTable from "./DogTable"; // Tabla solo con columna "Nombre"
import FormStaticDogs from "./FormStaticDogs"; // Formulario para perros permanentes
import { fetchStaticDogs } from "../../services/dogsService";

const StaticDogsManagement = () => {
  const [dogs, setDogs] = useState([]); // Lista de perros
  const [selectedDog, setSelectedDog] = useState(null); // Perro seleccionado
  const [formMode, setFormMode] = useState("register-static"); // Modo del formulario

  // Obtener perros desde el backend
  useEffect(() => {
    const loadDogs = async () => {
      try {
        const fetchedDogs = await fetchStaticDogs();
        setDogs(fetchedDogs);
      } catch (error) {
        console.error("Error al cargar los perros permanentes:", error);
      }
    };

    loadDogs();
  }, []);

  // Manejar la selección de un perro en la tabla
  const handleSelectDog = (dog) => {
    setSelectedDog(dog);
    setFormMode("update-static");
  };

  // Guardar el perro (actualización o registro)
  const handleSaveDog = (updatedDog) => {
    if (formMode === "update-static") {
      setDogs((prevDogs) =>
        prevDogs.map((dog) => (dog.id === updatedDog.id ? updatedDog : dog))
      );
    } else {
      setDogs((prevDogs) => [...prevDogs, updatedDog]);
    }

    // Resetear estado
    setSelectedDog(null);
    setFormMode("register-static");
  };

  return (
    <div className="static-dogs-management">
      <DogTable dogs={dogs} onSelectDog={handleSelectDog} />
      <FormStaticDogs
        selectedDog={selectedDog}
        formMode={formMode}
        onSave={handleSaveDog}
      />
    </div>
  );
};

export default StaticDogsManagement;

import { useState, useEffect } from "react";
import {
  fetchStaticDogs,
  fetchAdoptionDogs,
  fetchAdoptedDogs,
  deleteStaticDog,
  deleteAdoptionDog,
} from "../services/dogsService";
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmationAlert,
} from "../services/alertService";

/**
 * Hook personalizado para gestionar los datos del panel de administración.
 */
const useAdminData = () => {
  const [staticDogs, setStaticDogs] = useState([]);
  const [adoptionDogs, setAdoptionDogs] = useState([]);
  const [adoptedDogs, setAdoptedDogs] = useState([]);

  const [isLoading, setIsLoading] = useState({
    staticDogs: true,
    adoptionDogs: true,
    adoptedDogs: true,
  });

  /**
   * Cargar los datos de perros permanentes.
   */
  const loadStaticDogs = async () => {
    setIsLoading((prev) => ({ ...prev, staticDogs: true }));
    try {
      const data = await fetchStaticDogs();
      setStaticDogs(data);
      //showSuccessAlert("Perros permanentes cargados correctamente.");
    } catch (error) {
      //console.error("Error al cargar los perros permanentes:", error);
      //showErrorAlert("No se pudieron cargar los perros permanentes.");
    } finally {
      setIsLoading((prev) => ({ ...prev, staticDogs: false }));
    }
  };

  /**
   * Cargar los datos de perros en adopción.
   */
  const loadAdoptionDogs = async () => {
    setIsLoading((prev) => ({ ...prev, adoptionDogs: true }));
    try {
      const data = await fetchAdoptionDogs();
      setAdoptionDogs(data);
      // showSuccessAlert("Perros en adopción cargados correctamente.");
    } catch (error) {
      console.error("Error al cargar los perros en adopción:", error);
      //showErrorAlert("No se pudieron cargar los perros en adopción.");
    } finally {
      setIsLoading((prev) => ({ ...prev, adoptionDogs: false }));
    }
  };

  /**
   * Cargar los datos de perros adoptados.
   */
  const loadAdoptedDogs = async () => {
    setIsLoading((prev) => ({ ...prev, adoptedDogs: true }));
    try {
      const data = await fetchAdoptedDogs();
      setAdoptedDogs(data);
      //showSuccessAlert("Perros adoptados cargados correctamente.");
    } catch (error) {
      console.error("Error al cargar los perros adoptados:", error);
      //showErrorAlert("No se pudieron cargar los perros adoptados.");
    } finally {
      setIsLoading((prev) => ({ ...prev, adoptedDogs: false }));
    }
  };

  /**
   * Eliminar un perro de las listas correspondientes con confirmación.
   * @param {number} id - ID del perro.
   * @param {string} type - Tipo de perro ("static" o "adoption").
   */
  const deleteDog = async (id, type) => {
    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de eliminar este perro?",
      "Esta acción no se puede deshacer."
    );

    if (!confirmed) return; // Si no confirma, cancelar la acción

    try {
      if (type === "static") {
        await deleteStaticDog(id);
        setStaticDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
        showSuccessAlert("Perro permanente eliminado correctamente.");
      } else if (type === "adoption") {
        await deleteAdoptionDog(id);
        setAdoptionDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
        showSuccessAlert("Perro en adopción eliminado correctamente.");
      }
    } catch (error) {
      console.error(`Error al eliminar el perro (${type}):`, error);
      showErrorAlert(
        `No se pudo eliminar el perro (${type}). Inténtalo nuevamente.`
      );
    }
  };

  /**
   * Quitar la adopción de un perro con confirmación.
   * @param {number} id - ID del perro.
   */
  const unadoptDog = async (id) => {
    const confirmed = await showConfirmationAlert(
      "¿Estás seguro de quitar la adopción?",
      "Esta acción no se puede deshacer."
    );

    if (!confirmed) return; // Si no confirma, cancelar la acción

    try {
      await deleteAdoptionDog(id); // Supongamos que esta acción quita la adopción
      setAdoptedDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
      showSuccessAlert("Adopción eliminada exitosamente.");
    } catch (error) {
      console.error("Error al quitar la adopción:", error);
      showErrorAlert("No se pudo quitar la adopción. Inténtalo nuevamente.");
    }
  };

  /**
   * Cargar datos iniciales al montar el componente.
   */
  useEffect(() => {
    loadStaticDogs();
    loadAdoptionDogs();
    loadAdoptedDogs();
  }, []);

  return {
    staticDogs,
    adoptionDogs,
    adoptedDogs,
    isLoading,
    loadStaticDogs,
    loadAdoptionDogs,
    loadAdoptedDogs,
    deleteDog,
    unadoptDog,
  };
};

export default useAdminData;

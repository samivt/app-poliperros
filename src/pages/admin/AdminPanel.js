import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import Welcome from "./Welcome";
import FormDogs from "./FormDogs";
import StaticDogsView from "../../components/admin/StaticDogsView";
import AdoptionDogsView from "../../components/admin/AdoptionDogsView";
import FormAdoption from "./FormAdoption";

import {
  fetchStaticDogs,
  deleteStaticDog,
  fetchAdoptionDogs,
  deleteAdoptionDog,
  adoptDog,
} from "../../services/dogsService";

import "../../assets/styles/admin/AdminPanel.css";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [staticDogs, setStaticDogs] = useState([]);
  const [adoptionDogs, setAdoptionDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadDogs = async () => {
    setLoading(true);
    try {
      console.log("Cargando datos de perros..."); // Log inicial
      const [staticData, adoptionData] = await Promise.all([
        fetchStaticDogs(),
        fetchAdoptionDogs(),
      ]);

      console.log("Perros permanentes cargados:", staticData); // Verificar datos cargados
      console.log("Perros en adopción cargados:", adoptionData);

      setStaticDogs(staticData);
      setAdoptionDogs(adoptionData);
    } catch (error) {
      console.error("Error al cargar los datos de los perros:", error); // Log de errores
    } finally {
      setLoading(false); // Asegura que se oculte el spinner
    }
  };

  useEffect(() => {
    loadDogs();
  }, []);

  const handleAddNewDog = () => {
    navigate("/admin/register-dog");
  };

  const handleDeleteStaticDog = async (id) => {
    try {
      await deleteStaticDog(id);
      setStaticDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
    } catch (error) {
      console.error("Error al eliminar el perro permanente:", error);
    }
  };

  const handleDeleteAdoptionDog = async (id) => {
    try {
      await deleteAdoptionDog(id);
      setAdoptionDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
    } catch (error) {
      console.error("Error al eliminar el perro en adopción:", error);
    }
  };

  const handleAdoptDog = (dog) => {
    navigate(`/admin/adopt-dog/${dog.id}`);
  };

  return (
    <div className="admin-panel">
      <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />
      <div className={`content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Routes>
          <Route path="welcome" element={<Welcome />} />
          {/* Vista de perros permanentes */}
          <Route
            path="static-dogs"
            element={
              <StaticDogsView
                dogs={staticDogs}
                loading={loading}
                onDelete={handleDeleteStaticDog}
                onAddNew={handleAddNewDog}
              />
            }
          />
          {/* Vista de perros en adopción */}
          <Route
            path="adoption-dogs"
            element={
              <AdoptionDogsView
                dogs={adoptionDogs}
                loading={loading}
                onDelete={handleDeleteAdoptionDog}
                onAddNew={handleAddNewDog}
                onAdopt={handleAdoptDog}
              />
            }
          />
          {/* Formulario de registro */}
          <Route
            path="register-dog"
            element={
              <FormDogs
                formMode="register-static"
                onSave={async () => {
                  await loadDogs();
                  navigate("/admin/static-dogs");
                }}
              />
            }
          />
          {/* Formulario de adopción */}
          <Route
            path="adopt-dog/:id"
            element={
              <FormAdoption
                initialDogId={useParams().id} // Usar useParams para pasar el ID
                onSuccess={() => navigate("/admin/adoption-dogs")} // Redirigir tras éxito
                onSubmit={async (formData) => {
                  try {
                    const { dog_id, adoption_date, ...ownerData } = formData;
                    await adoptDog(dog_id, adoption_date, ownerData);
                    alert("¡Adopción registrada exitosamente!");
                    await loadDogs();
                  } catch (error) {
                    console.error("Error al registrar la adopción:", error);
                    alert("Ocurrió un error al registrar la adopción.");
                  }
                }}
              />
            }
          />

          <Route path="*" element={<Navigate to="welcome" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;

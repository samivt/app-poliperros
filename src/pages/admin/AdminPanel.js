import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import Welcome from "./Welcome";
import FormStaticDogs from "./FormStaticDogs";
import FormAdoptionDogs from "./FormAdoptionDogs";
import DogsTable from "../../components/admin/DogsTable";

import { fetchStaticDogs, fetchAdoptionDogs } from "../../services/dogsService";

import "../../assets/styles/admin/AdminPanel.css";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [staticDogs, setStaticDogs] = useState([]);
  const [adoptionDogs, setAdoptionDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [formMode, setFormMode] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const handleDogSelect = (dog, mode) => {
    setSelectedDog(dog);
    setFormMode(mode);
  };

  // Cargar los datos de perros permanentes y en adopción
  useEffect(() => {
    const loadDogs = async () => {
      try {
        const [staticData, adoptionData] = await Promise.all([
          fetchStaticDogs(),
          fetchAdoptionDogs(),
        ]);
        setStaticDogs(staticData);
        setAdoptionDogs(adoptionData);
      } catch (error) {
        console.error("Error al cargar los perros:", error);
      }
    };

    loadDogs();
  }, []);

  return (
    <div className="admin-panel">
      <Header toggleSidebar={toggleSidebar} onLogout={handleLogout} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Routes>
          <Route path="welcome" element={<Welcome />} />

          {/* Registrar Perros Permanentes */}
          <Route
            path="register-dog/static"
            element={
              <FormStaticDogs
                formMode="register-static"
                onSave={(newDog) => setStaticDogs([...staticDogs, newDog])}
              />
            }
          />

          {/* Registrar Perros en Adopción */}
          <Route
            path="register-dog/adoption"
            element={
              <FormAdoptionDogs
                formMode="register-adoption"
                onSave={(newDog) => setAdoptionDogs([...adoptionDogs, newDog])}
              />
            }
          />

          {/* Actualizar Perros Permanentes */}
          <Route
            path="update-dog/static"
            element={
              <>
                <DogsTable
                  dogs={staticDogs}
                  onSelect={(dog) => handleDogSelect(dog, "update-static")}
                />
                {selectedDog && formMode === "update-static" && (
                  <FormStaticDogs
                    selectedDog={selectedDog}
                    formMode={formMode}
                    onSave={(updatedDog) =>
                      setStaticDogs((prevDogs) =>
                        prevDogs.map((dog) =>
                          dog.id === updatedDog.id ? updatedDog : dog
                        )
                      )
                    }
                  />
                )}
              </>
            }
          />

          {/* Actualizar Perros en Adopción */}
          <Route
            path="update-dog/adoption"
            element={
              <>
                <DogsTable
                  dogs={adoptionDogs}
                  onSelect={(dog) => handleDogSelect(dog, "update-adoption")}
                />
                {selectedDog && formMode === "update-adoption" && (
                  <FormAdoptionDogs
                    selectedDog={selectedDog}
                    formMode={formMode}
                    onSave={(updatedDog) =>
                      setAdoptionDogs((prevDogs) =>
                        prevDogs.map((dog) =>
                          dog.id === updatedDog.id ? updatedDog : dog
                        )
                      )
                    }
                  />
                )}
              </>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="welcome" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;

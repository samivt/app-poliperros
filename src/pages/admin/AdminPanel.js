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
import EditDogView from "../../components/admin/EditDogViews";

import AdoptionDogsView from "../../components/admin/AdoptionDogsView";
import AdoptedDogsView from "../../components/admin/AdoptedDogsView";
import FormAdoption from "./FormAdoption";
import FormVisits from "./FormVisits";
import FormRegisterUser from "./FormRegisterUser";
import EditUser from "./UserProfileUpdate";
import UpdatePassword from "./UpdatePassword";
import VisitsView from "./VisitsView";

import VisitsTable from "./VisitsTable";
import FormCourse from "./FormCourse";

import {
  fetchStaticDogs,
  deleteStaticDog,
  fetchAdoptionDogs,
  deleteAdoptionDog,
  fetchAdoptedDogs,
  adoptDog,
  updateStaticDog,
} from "../../services/dogsService";

import { logout } from "../../services/authService";

import "../../assets/styles/admin/AdminPanel.css";
import EditVisitsView from "./EditVisitsView";
import CoursesList from "./CoursesList";
import ApplicantsByCourse from "./ApplicantsByCourse";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [staticDogs, setStaticDogs] = useState([]);
  const [adoptionDogs, setAdoptionDogs] = useState([]);
  const [adoptedDogs, setAdoptedDogs] = useState([]);
  const [isLoadingStaticDogs, setIsLoadingStaticDogs] = useState(true);
  const [isLoadingAdoptionDogs, setIsLoadingAdoptionDogs] = useState(true);
  const [isLoadingAdoptedDogs, setIsLoadingAdoptedDogs] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Elimina el token del almacenamiento
    navigate("/"); // Redirige al login
  };

  const loadStaticDogs = async () => {
    setIsLoadingStaticDogs(true);
    try {
      const data = await fetchStaticDogs();
      setStaticDogs(data);
    } catch (error) {
      console.error("Error al cargar los perros permanentes:", error);
    } finally {
      setIsLoadingStaticDogs(false);
    }
  };

  const loadAdoptionDogs = async () => {
    setIsLoadingAdoptionDogs(true);
    try {
      const data = await fetchAdoptionDogs();
      setAdoptionDogs(data);
    } catch (error) {
      console.error("Error al cargar los perros temporales:", error);
    } finally {
      setIsLoadingAdoptionDogs(false);
    }
  };

  const loadAdoptedDogs = async () => {
    setIsLoadingAdoptedDogs(true);
    try {
      const data = await fetchAdoptedDogs();
      setAdoptedDogs(data);
    } catch (error) {
      console.error("Error al cargar los perros adoptados:", error);
    } finally {
      setIsLoadingAdoptedDogs(false);
    }
  };

  useEffect(() => {
    loadStaticDogs();
    loadAdoptionDogs();
    loadAdoptedDogs();
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
  const handleAddVisit = () => {
    navigate("/admin/register-visit"); // Redirige al formulario de visitas
  };

  return (
    <div className="admin-panel">
      <Header
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onLogout={handleLogout}
      />
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
                loading={isLoadingStaticDogs}
                onEdit={updateStaticDog}
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
                loading={isLoadingAdoptionDogs}
                onDelete={handleDeleteAdoptionDog}
                onAddNew={handleAddNewDog}
                onAdopt={handleAdoptDog}
              />
            }
          />
          {/* Vista de perros adoptados */}
          <Route
            path="adopted-dogs"
            element={
              <AdoptedDogsView
                dogs={adoptedDogs}
                loading={isLoadingAdoptedDogs}
                onEdit={(dog) => console.log("Edit:", dog)}
                onUnadopt={(id) => console.log("Unadoptar:", id)}
                onViewVisits={(id) => console.log("Ver visitas:", id)}
                onAddVisit={handleAddVisit}
              />
            }
          />
          {/* Formulario de registro */}
          <Route
            path="register-dog"
            element={
              <FormDogs
                onSave={async ({ is_for_adoption }) => {
                  if (is_for_adoption) {
                    await loadAdoptionDogs(); // Refresca la lista de perros en adopción
                    navigate("/admin/adoption-dogs"); // Redirige a la vista de perros en adopción
                  } else {
                    await loadStaticDogs(); // Refresca la lista de perros permanentes
                    navigate("/admin/static-dogs"); // Redirige a la vista de perros permanentes
                  }
                }}
              />
            }
          />
          {/* Editar perro permanente */}
          <Route
            path="edit-static-dog/:id"
            element={<EditDogView type="static" onSave={loadStaticDogs} />}
          />

          {/* Editar perro en adopción */}
          <Route
            path="edit-adoption-dog/:id"
            element={<EditDogView type="adoption" onSave={loadAdoptionDogs} />}
          />

          {/* Formulario de adopción */}
          <Route
            path="adopt-dog/:id"
            element={
              <FormAdoption
                initialDogId={useParams().id}
                onSuccess={async () => {
                  await loadAdoptedDogs(); // Carga los datos de los perros adoptados
                  navigate("/admin/adopted-dogs"); // Redirige a la tabla de perros adoptados
                }}
                onSubmit={async (formData) => {
                  try {
                    const { dog_id, adoption_date, ...ownerData } = formData;
                    await adoptDog(dog_id, adoption_date, ownerData);

                    await loadAdoptionDogs();
                  } catch (error) {
                    console.error("Error al registrar la adopción:", error);
                  }
                }}
              />
            }
          />
          {/*Formulario de visitas */}
          <Route path="form-visit" element={<FormVisits />} />
          <Route path="edit-visit/:visitId" element={<EditVisitsView />} />

          <Route path="visits" element={<VisitsView />} />
          <Route path="visits-table" element={<VisitsTable />} />

          <Route path="register-user" element={<FormRegisterUser />} />
          <Route path="edit-profile" element={<EditUser />} />
          <Route path="update-password" element={<UpdatePassword />} />

          <Route path="create-course" element={<FormCourse />} />
          <Route path="list-courses" element={<CoursesList />} />
          <Route path="list-applicants" element={<ApplicantsByCourse />} />

          <Route path="*" element={<Navigate to="welcome" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;

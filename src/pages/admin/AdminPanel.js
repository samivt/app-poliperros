import React, { useState } from "react";
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
import CoursesList from "./CoursesList";
import ApplicantsByCourse from "./ApplicantsByCourse";
import EditVisitsView from "./EditVisitsView";

import useAdminData from "../../hooks/useAdminData";
import { logout } from "../../services/authService";

import "../../assets/styles/admin/AdminPanel.css";
import { adoptDog } from "../../services/dogsService";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    staticDogs,
    adoptionDogs,
    adoptedDogs,
    isLoading,
    deleteDog,
    loadStaticDogs,
    loadAdoptionDogs,
    loadAdoptedDogs,
  } = useAdminData();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige al login
  };

  const handleAddNewDog = () => {
    navigate("/admin/register-dog");
  };

  const handleAdoptDog = (dog) => {
    navigate(`/admin/adopt-dog/${dog.id}`);
  };

  const handleAddVisit = () => {
    navigate("/admin/register-visit");
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
                loading={isLoading.staticDogs}
                onDelete={(id) => deleteDog(id, "static")}
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
                loading={isLoading.adoptionDogs}
                onDelete={(id) => deleteDog(id, "adoption")}
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
                loading={isLoading.adoptedDogs}
                onEdit={(dog) => console.log("Editar dueño:", dog)}
                onUnadopt={(id) => console.log("Quitar adopción:", id)}
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
                    await loadAdoptionDogs();
                    navigate("/admin/adoption-dogs");
                  } else {
                    await loadStaticDogs();
                    navigate("/admin/static-dogs");
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
                initialDogId={id}
                onSuccess={async () => {
                  await loadAdoptedDogs();
                  navigate("/admin/adopted-dogs");
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
          {/* Formulario de visitas */}
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

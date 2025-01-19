import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import Welcome from "./Welcome";
import FormDogs from "../../components/admin/FormDogs";
import StaticDogsView from "./StaticDogsView";

import EditStaticDog from "../../components/admin/EditStaticDog";
import EditAdoptionDog from "../../components/admin/EditAdoptionDog";
import EditAdoptedDog from "../../components/admin/EditAdoptedDog";
import AdoptionDogsView from "./AdoptionDogsView";
import AdoptedDogsView from "./AdoptedDogsView";
import FormAdoption from "../../components/admin/FormAdoption";
import FormAdoptionOwner from "../../components/admin/FormAdoptionOwner";
import FormVisits from "../../components/admin/FormVisits";
import FormRegisterUser from "../../components/admin/FormRegisterUser";
import UsersTable from "./UsersTable";
import EditUser from "./UserProfileUpdate";
import UpdatePassword from "./UpdatePassword";
import VisitsTable from "./VisitsTable";
import FormCourse from "../../components/admin/FormCourse";
import CoursesList from "./CoursesList";
import ApplicantsByCourse from "./ApplicantsByCourse";
import EditVisitsForm from "../../components/admin/EditVisitsForm";
import EditOwnerForm from "../../components/admin/EditOwnerForm";

import useAdminData from "../../hooks/useAdminData";
import { logout } from "../../services/authService";

import "../../assets/styles/admin/AdminPanel.css";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  // const { id } = useParams();

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
          {/* Editar perro permanente 
          <Route path="edit-static-dog/:id" element={<EditStaticDog />} />*/}
          <Route
            path="edit-static-dog/:id"
            element={<EditStaticDog onSave={loadStaticDogs} />}
          />
          {/* Editar perro en adopción */}
          <Route
            path="edit-adoption-dog/:id"
            element={<EditAdoptionDog onSave={loadAdoptionDogs} />}
          />
          {/* Editar perro adoptado */}
          <Route
            path="edit-adopted-dog/:id"
            element={<EditAdoptedDog onSave={loadAdoptedDogs} />}
          />
          {/* Editar dueño de perro */}
          <Route
            path="edit-owner"
            element={<EditOwnerForm onSave={loadAdoptedDogs} />}
          />
          {/* Formulario de adopción */}
          <Route
            path="adopt-dog/:id"
            element={
              <FormAdoption
                onSuccess={async () => {
                  await loadAdoptedDogs();
                  navigate("/admin/adopted-dogs");
                }}
                onSubmit={async (formData) => {}}
              />
            }
          />
          {/* Formulario de adopción dueño */}
          <Route
            path="adopt-dog-owner/:id"
            element={
              <FormAdoptionOwner
                onSuccess={async () => {
                  await loadAdoptedDogs();
                  navigate("/admin/adopted-dogs");
                }}
                onSubmit={async (formData) => {}}
              />
            }
          />

          {/* Formulario de visitas */}
          <Route path="form-visit" element={<FormVisits />} />
          <Route path="edit-visit/:visitId" element={<EditVisitsForm />} />

          <Route path="visits-table" element={<VisitsTable />} />

          <Route path="register-user" element={<FormRegisterUser />} />
          <Route path="list-users" element={<UsersTable />} />
          <Route path="edit-profile" element={<EditUser />} />
          <Route path="update-password" element={<UpdatePassword />} />

          <Route path="create-course" element={<FormCourse />} />
          <Route path="list-courses" element={<CoursesList />} />
          <Route path="list-applicants" element={<ApplicantsByCourse />} />
          {/* Ruta para editar curso */}
          <Route path="edit-course/:courseId" element={<FormCourse />} />
          <Route path="*" element={<Navigate to="welcome" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;

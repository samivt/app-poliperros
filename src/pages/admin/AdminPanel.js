// AdminPanel.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import FormDogs from "../../pages/admin/FormDogs.js";
import Sidebar from "../../components/admin/Sidebar.js";
import Header from "../../components/admin/Header.js"; // Importa el Header

import "../../assets/styles/admin/AdminPanel.css";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="admin-panel">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <Routes>
          <Route path="poliperros" element={<FormDogs />} />
          <Route path="adopcion" element={<FormDogs />} />
          <Route path="seguimiento" element={<FormDogs />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;

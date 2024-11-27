import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/main/Home.js";
import QuienesSomos from "./pages/main/QuienesSomos.js";
import Inscription from "./pages/main/Inscription.js";
import Contact from "./pages/main/Contact.js";
import InfoAdoptionDogs from "./pages/main/InfoAdoptionDogs.js";
import ViewAdoptionDogs from "./pages/main/ViewAdoptionDogs.js";
import ViewPermanentDogs from "./pages/main/ViewPermanentDogs.js";

import Login from "./pages/admin/Login.js";

import "./App.css";
import FormInscription from "./pages/main/FormInscription.js";
import AdminPanel from "./pages/admin/AdminPanel.js";
import ProtectedRoute from "./components/admin/ProtectedRoute.js";
import Unauthorized from "./pages/admin/Unauthorized.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/inscriptions" element={<Inscription />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/info-adoption-dogs" element={<InfoAdoptionDogs />} />
        <Route path="/view-adoption-dogs" element={<ViewAdoptionDogs />} />
        <Route path="/view-permanent-dogs" element={<ViewPermanentDogs />} />
        <Route path="/form-inscription" element={<FormInscription />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Rutas protegidas para el panel de administracion*/}
        <Route
          path="/admin/*"
          element={<ProtectedRoute allowedRoles={["admin", "auxiliar"]} />}
        >
          <Route path="*" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

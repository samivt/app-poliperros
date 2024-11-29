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
import SendCode from "./components/auth/SendCode.js";
import VerifyResetCode from "./components/auth/VerifyResetCode.js";
import ResetPassword from "./components/auth/ResetPassword.js";

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

        <Route path="/view-adoption-dogs" element={<ViewAdoptionDogs />} />
        <Route
          path="/info-adoption-dogs/:dog_id"
          element={<InfoAdoptionDogs />}
        />

        <Route path="/view-permanent-dogs" element={<ViewPermanentDogs />} />

        <Route path="/form-inscription" element={<FormInscription />} />

        <Route path="/login" element={<Login />} />

        <Route path="/send-code" element={<SendCode />} />
        <Route path="/verify-reset-code" element={<VerifyResetCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

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

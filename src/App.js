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
import FormDogs from "./pages/admin/FormDogs.js";

import "./App.css";

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
        <Route path="/login" element={<Login />} />
        <Route path="/form-dogs" element={<FormDogs />} />
      </Routes>
    </Router>
  );
};

export default App;

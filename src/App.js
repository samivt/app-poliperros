import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/main/Home.js";
import InfoPermanentDogs from "./pages/main/InfoPermanentDogs.js";
import ViewDogs from "./pages/main/ViewDogs.js";
import Login from "./pages/admin/Login.js";
import FormDogs from "./pages/admin/FormDogs.js";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info-permanent-dogs" element={<InfoPermanentDogs />} />
        <Route path="/view-permanent-dogs" element={<ViewDogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form-dogs" element={<FormDogs />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

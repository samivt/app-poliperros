import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import PermanentDogs from "./pages/PermanentDogs.js";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/permanent-dogs" element={<PermanentDogs />} />
      </Routes>
    </Router>
  );
};

export default App;

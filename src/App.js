import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sign from "./routes/Sign";
import Home from "./routes/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </Router>
  );
};

export default App;

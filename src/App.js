import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./containers/Header"
import Sign from "./containers/Sign";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </Router>
  );
};

export default App;

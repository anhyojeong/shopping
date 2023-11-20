import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./containers/Header";
import Sign from "./routes/Sign";
import Home from "./routes/Home";
import UserInfo from "./routes/UserInfo";

const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/userInfo" element={<UserInfo />} />
        </Routes>
    </Router>
  );
};

export default App;

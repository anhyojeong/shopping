import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./containers/Header";
import Sign from "./routes/Sign";
import Home from "./routes/Home";
import UserInfo from "./routes/UserInfo";
import ItemInfo from "./routes/ItemInfo";
import Cart from "./routes/Cart";

const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/userInfo/:user" element={<UserInfo />} />
          <Route path ="/itemInfo/:category/:itemName" element={<ItemInfo />} />
          <Route path ="/cart/:user" element={<Cart />}/>
        </Routes>
    </Router>
  );
};

export default App;

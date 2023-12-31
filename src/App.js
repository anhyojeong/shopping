import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./containers/Header";
import Sign from "./routes/Sign";
import Home from "./routes/Home";
import UserInfo from "./routes/UserInfo";
import ItemInfo from "./routes/ItemInfo";
import Cart from "./routes/Cart";
import Order from "./routes/Order";

const App = () => {
  if (process.env.NODE_ENV === "production") {
    console = window.console || {};
    console.log = function no_console() {};
    console.warn = function no_console() {};
    console.error = function () {};
  }

  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/userInfo/:user" element={<UserInfo />} />
          <Route path ="/itemInfo/:itemName" element={<ItemInfo />} />
          <Route path ="/cart/:user" element={<Cart />}/>
          <Route path ="/order/:user" element={<Order />}/>
        </Routes>
    </Router>
  );
};

export default App;

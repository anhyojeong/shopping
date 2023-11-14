import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Navigation ";
import Search from "../components/Search";
const Header = () => {
  return (
    <header className="header-container">
      <div className="header-item-container">
        <Link to="/">Home</Link>
      </div>
      <div className="header-item-container">
        <Search />
      </div>
      <div className="header-item-container">
        <Nav />
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import "./_Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header_links container">
        <Link to="/">
          <a>Pizzas</a>
        </Link>
        <Link to="/beverages">
          <a>Bebidas</a>
        </Link>
        <Link to="/desserts">
          <a>Postres</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;

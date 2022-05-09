import React from "react";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../../shared/contexts/CartContext";
import ProfileButton from "../ProfileButton/ProfileButton";
import { useUserContext } from "../../shared/contexts/UserContext";
import "./_Navbar.scss";

const Navbar = ({ jwt }) => {
  const { cartItems } = useCartContext();
  const cant = cartItems.reduce((acc, prod) => acc + prod.cant, 0);
  const { userRole } = useUserContext();

  return (
    <nav className="navbar">
      {
        <div className="navbar_logo">
          <NavLink to="">
            <img
              src="https://res.cloudinary.com/ds78avdh8/image/upload/v1652003439/Products/CEClogo_owjo8v.png"
              alt="Pizzeria Logo - Logo De Una Pizzeria@clipartmax.com"
              height={150}
              width={200}
            />
          </NavLink>
        </div>
      }
      <div className="navbar_links">
        {userRole === "basic" && (
          <div className="navbar_links-cart">
            <NavLink to="/cart">
              <img alt=""
                height={60}
                width={60}
                src="https://cdn-icons-png.flaticon.com/512/3367/3367988.png"
              />
            </NavLink>
            <div className={`navbar_links-cart_cant `}>
              <h2>{cant}</h2>
            </div>
          </div>
        )}
        {userRole === "admin" && (
          <NavLink to="/admin">
            <button>Panel de administrador</button>
          </NavLink>
        )}

        {jwt && <ProfileButton />}
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from '../Context/auth'; 
import LogoutButton from "./LogoutBtn";


// src/components/Layout.tsx
export default function Navbar () {
   const { user } = useUser();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink
        className="nav-link active"
        aria-current="page"
        to="/"
      >
        <div className="navbar-brand">
          Своя Игра
        </div>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-betwee">
          {user ? (
            <>
          <li className="nav-item">
            <LogoutButton />
          </li>
            </>
          ) : (
            <>
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/registration"
              >
                Registration
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            </>

          )}
        </ul>
      </div>
    </nav>
  );
};

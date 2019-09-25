import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <a className="navbar-brand" href="#">
        EventBooks
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/auth" className="nav-item nav-link " href="#">
            Login
          </NavLink>
          <NavLink to="/events" className="nav-item nav-link" href="#">
            Events
          </NavLink>
          <NavLink to="/bookings" className="nav-item nav-link" href="#">
            Booking
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

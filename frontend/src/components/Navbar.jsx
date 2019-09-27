import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import AuthContext from "./auth-context";

const Navbar = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
          <a className="navbar-brand" href="faeshal.com">
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
              {!context.token && (
                <NavLink to="/auth" className="nav-item nav-link ">
                  Login
                </NavLink>
              )}
              <NavLink to="/events" className="nav-item nav-link">
                Events
              </NavLink>

              {context.token && (
                <React.Fragment>
                  <NavLink to="/bookings" className="nav-item nav-link">
                    Booking
                  </NavLink>
                  <ul className="navbar-nav mr-auto">
                    <button
                      onClick={context.logout}
                      className=" text-white ml-5 mr-auto btn btn-sm btn-danger nav-item nav-link"
                    >
                      Logout
                    </button>
                  </ul>
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>
      );
    }}
  </AuthContext.Consumer>
);

export default Navbar;

import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {store.currentUserEmail ? (
            <button
              className="btn btn-danger"
              onClick={async () => {
                if (await actions.logout()) {
                  Navigate("/");
                }
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-success">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

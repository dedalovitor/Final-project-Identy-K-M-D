import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-light bg-light p-3">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img
              src="https://www.pc-nexus.net/diplomas/logo.png"
              alt="Indetity"
              width="200"
              height="65"
            ></img>
          </span>

        </Link>
        <div className="ml-auto">
          {store.dataUser ? (
            <button
              className="btn btn-danger"
              onClick={async () => {
                if (await actions.logout()) {
                  navigate("/");
                }
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-outline-primary me-3">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-outline-success">Registro</button>
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

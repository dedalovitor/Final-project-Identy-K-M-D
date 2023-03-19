import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Footer = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="bottomView container justify-content-center d-flex p-4">

      <Link className="m-4" to="/">
        <span className="navbar-brand mb-0 h1">
          <img
            src="https://www.pc-nexus.net/diplomas/logo.png"
            alt="Indetity"
            width="200"
            height="65"
          ></img>
        </span>

      </Link>
      <Link className="m-4" to="/regionregister">
        <button className="btn btn-outline-danger me-3">Region register</button>
      </Link>
    </div>

  );
};


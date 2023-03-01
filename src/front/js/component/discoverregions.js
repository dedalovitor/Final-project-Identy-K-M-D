import React from "react";
import { Link } from "react-router-dom";

export const Discover = () => (
  <div className="row ">
    <div className="input-group col-12 rounded p-4 custom-discover align-items-center">
      <div>
        <h3 style={{ marginBottom: "20rem", color: "blue" }}>
          <strong>Comarcas que debes descubrir</strong>
        </h3>

        <Link to="/discoregion">
          <button type="button" className="btn btn-primary">
            Explora Ahora
          </button>
        </Link>
      </div>
    </div>
  </div>
);

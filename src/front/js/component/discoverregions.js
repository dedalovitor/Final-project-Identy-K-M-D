import React from "react";
import { Link } from "react-router-dom";

export const Discover = () => (
  <div className="row ">
    <div class="col-md-8 mx-auto">
      <div className="input-group col-12 rounded p-4 custom-discover align-items-center">
        <div>
          <h2 className="titulo" style={{ marginBlockStart: "15rem", color: "white" }}>
            <strong>Regiones que no te puedes perder</strong>
          </h2>
          <h5 className="titulo" style={{ color: "white" }}>
            Tu guía de los mejores destinos, alojamientos y experiencias de esta temporada.
          </h5>


          <Link to="/discoregion">
            <button type="button" className="btn btn-danger mt-3">
              <h5>Explora Ahora</h5>
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

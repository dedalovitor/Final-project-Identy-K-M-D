import React from "react";

export const Search = () => (
  <div className="row ">
    <div className="input-group col-12 rounded p-4 custom-search align-items-center d-flex justify-content-center">
      <div>
        <input
          type="search"
          className="form-control rounded small-search-input"
          placeholder="¿Adonde quieres ir?"
          aria-label="Search"
          aria-describedby="search-addon"
        />
      </div>
    </div>
  </div>
);
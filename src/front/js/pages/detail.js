import React, { useState, useEffect, useContext } from "react";

export const CityDetail = () => {
  return (
    <>
      <div className="buttons text-center">
        <button type="button" className="btn btn-outline-primary">
          Alojamientos
        </button>
        <button type="button" className="btn btn-outline-secondary">
          Cosas que hacer
        </button>
        <button type="button" className="btn btn-outline-success">
          Restaurantes/gastronomías
        </button>
        <button type="button" className="btn btn-outline-danger">
          lugares que visitar/patrimonio
        </button>
        <button type="button" className="btn btn-outline-warning">
          Visitas guiadas
        </button>
      </div>
      <div className="region-image">
        <div className="text-bg-dark">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/f2/2f/48/puente-de-calatrava.jpg?w=1500&h=500&s=1"
            className="imageValencia"
          ></img>
          <img
            src="https://www.pc-nexus.net/diplomas/logo.png"
            className="imageLogo"
          ></img>
        </div>
      </div>
    </>
  );
};

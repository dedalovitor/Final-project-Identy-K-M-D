import React, { useState, useEffect, useContext } from "react";

export const CityDetail = () => {
    return (
        <>
            <div className="buttons text-center m-5">
                <button type="button" className="btn btn-outline-primary m-2">
                    Alojamientos
                </button>
                <button type="button" className="btn btn-outline-secondary m-2">
                    Cosas que hacer
                </button>
                <button type="button" className="btn btn-outline-success m-2">
                    Restaurantes/gastronomías
                </button>
                <button type="button" className="btn btn-outline-danger m-2">
                    lugares que visitar/patrimonio
                </button>
                <button type="button" className="btn btn-outline-warning m-2">
                    Visitas guiadas
                </button>
            </div>

            <div className="region-image">
                <div className="text-bg-dark text-center">
                    <img
                        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/f2/2f/48/puente-de-calatrava.jpg?w=1500&h=500&s=1"
                        className="imageValencia"
                    ></img>
                </div>
            </div>
        </>
    );
};

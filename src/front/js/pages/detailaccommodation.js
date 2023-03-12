import React, { useState, useEffect, useContext } from "react";
import { Commentbox } from "../component/commentbox";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const AccommodationDetail = () => {
  const { store, actions } = useContext(Context);
  const [accommodations, setAccommodations] = useState({});
  const params = useParams();
  useEffect(() => {
    getCurrentAccommodation();
  }, []);
  const getCurrentAccommodation = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/accommodations/" + params.id
    );
    const data = await response.json();
    if (response.ok) {
      setAccommodations(data.result);
    }
  };
  return (
    <>
      <div className="buttons text-center m-5">
        <button type="button" className="btn btn-outline-primary m-2">
          Alojamientos
        </button>
        <button type="button" className="btn btn-outline-success m-2">
          Restaurantes/gastronomías
        </button>
        <button type="button" className="btn btn-outline-danger m-2">
          Lugares que visitar/patrimonio
        </button>
        <button type="button" className="btn btn-outline-warning m-2">
          Visitas guiadas
        </button>
      </div>

      <div className="container">
        <div className="row">
          <div className="col p-4 accommodation-image">
            <div className="text-bg-dark text-center">
              <img
                src={accommodations.photo}
                className="imageaccommodation"
                height="500"
                width="700"
              ></img>
            </div>
          </div>
          <div className="col p-4 accommodation-resume">
            <div className="text-bg-dark text-center">
              <h1>{accommodations.name}</h1>
            </div>
            <div className="text-bg-dark text-left p-2">
              <p>{accommodations.resume}</p>
            </div>
          </div>
        </div>
      </div>
      {store.userInfo ? (
        <div className="col-sm-12 text-center m-5">
          <Commentbox />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

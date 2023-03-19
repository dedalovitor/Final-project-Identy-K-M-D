import React, { useState, useEffect, useContext } from "react";
import { Commentbox } from "../component/commentbox";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const ExperienceDetail = () => {
  const { store, actions } = useContext(Context);
  const [experiences, setExperiences] = useState({});
  const params = useParams();
  useEffect(() => {
    getCurrentExperience();
  }, []);
  const getCurrentExperience = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/experiences/" + params.id
    );
    const data = await response.json();
    if (response.ok) {
      setExperiences(data.result);
    }
  };
  return (
    <>
      <div className="container h-25 d-flex justify-content-center align-items-center p-4">
        <div>
          <button type="button" className="btn btn-outline-danger m-2">
            Lugares que Visitar/Patrimonio
          </button>
          <button type="button" className="btn btn-outline-success m-2">
            Restaurantes/Gastronomia
          </button>
          <button type="button" className="btn btn-outline-primary m-2">
            Alojamientos
          </button>
          <button type="button" className="btn btn-outline-warning m-2">
            Visitas Guiadas
          </button>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col p-4 experience-image">
            <div className="text-bg-dark text-center">
              <img
                src={experiences.photo}
                className="imageexperience"
                height="500"
                width="700"
              ></img>
            </div>
          </div>
          <div className="col p-4 experience-resume">
            <div className="text-bg-dark text-center">
              <h1>{experiences.name}</h1>
            </div>
            <div className="text-bg-dark text-left p-2">
              <p>{experiences.resume}</p>
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
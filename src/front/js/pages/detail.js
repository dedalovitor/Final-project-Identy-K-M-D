import React, { useState, useEffect, useContext } from "react";
import { Commentbox } from "../component/commentbox";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const CityDetail = () => {
  const params = useParams();
  console.log(params.id);
  const { store, actions } = useContext(Context);
  const [region, setRegion] = useState([]);
  const [indexRestorations, setIndexRestorations] = useState([]);
  const [patrimonys, setPatrimonys] = useState([]);
  const [indexPatrimonys, setIndexPatrimonys] = useState([]);
  const [indexAccommodations, setIndexAccommodations] = useState([]);
  const [indexExperiences, setIndexExperiences] = useState([]);

  useEffect(() => {
    getCurrentRegion();
  }, []);

  const getCurrentRegion = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/regions/" + params.id
    );
    const data = await response.json();
    if (response.ok) {
      setRegion(data.result);
      setIndexPatrimonys([0, 1, 2, 3]);
      setIndexAccommodations([0, 1, 2, 3]);
      setIndexRestorations([0, 1, 2, 3]);
      setIndexExperiences([0, 1, 2, 3]);
    }
  };

  return (
    <>
      <div className="container h-25 d-flex justify-content-center align-items-center p-4">
          <div>
            <button type="button" className="button1 btn btn-outline-danger m-2 ">
              <a href="#scrollspyHeading1">Lugares que Visitar/Patrimonio<img src="https://cdn-icons-png.flaticon.com/512/1009/1009921.png" className="img-patrimony" alt="Responsive image"></img></a>
            </button>
            <button type="button" className="button1 btn btn-outline-success m-2">
              <a href="#scrollspyHeading2"> Restaurantes/Gastronomia<img src="https://cdn-icons-png.flaticon.com/128/1980/1980788.png" className="img-restoration" alt="Responsive image"></img></a>
            </button>
            <button type="button" className="button1 btn btn-outline-primary m-2">
              <a href="#scrollspyHeading3">Alojamientos<img src="https://cdn-icons-png.flaticon.com/128/2933/2933772.png" className="img-accommodation" alt="Responsive image"></img></a>
            </button>
            <button type="button" className="button1 btn btn-outline-warning m-2">
              <a href="#scrollspyHeading4">Visitas Guiadas<img src="https://w7.pngwing.com/pngs/337/767/png-transparent-location-marker-path-road-navigation-and-mapping-icon.png" className="img-route" alt="Responsive image"></img></a>
            </button>
          </div>
        </div>
      
        <div class="container">
        <div class="row">
          <div class="col p-4 region-image">
            <div className="text-bg-dark text-center">
              <img
                src={region.photo}
                className="imageregion"
                height="500"
                width="700"
              ></img>
            </div>
          </div>
          <div class="col p-4 region-resume">
          <div className="text-bg-dark text-center">
          <h1>{region.name}</h1>                     
            </div>
          <div className="text-bg-dark text-left p-2">
              <p>{region.resume}</p>
                          
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-4" id="scrollspyHeading1">
        <h2>
          Patrimonio natural, arquitectónico, histórico que descubrir de{" "}
          {region.name}
        </h2>
      </div>

      <div className="row mx-5 p-4 card-row justify-content-center align-items-center">
      
        {indexPatrimonys.map((indexPatrimony) => {
          return (
            <div
              key={region.patrimonies[indexPatrimony].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <img
                  src={region.patrimonies[indexPatrimony].photo}
                  height="300px"
                  className="card-img-top"
                  alt={region.patrimonies[indexPatrimony].name}
                />
                <div className="card-body">
                  <h3 className="card-title text-center">
                    {region.patrimonies[indexPatrimony].name}
                  </h3>
                  <div className="card-text text-center">
                    <img
                      src={region.patrimonies[indexPatrimony].logo}
                      height="100px"
                    ></img>
                    <div>
                      <Link to={`/patrimonio/${region.patrimonies[indexPatrimony].id}`}>
                      <button className="btn btn-outline-danger mt-4">
                          Ver lugar
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
       
      </div>
      <div className="text-center p-4" id="scrollspyHeading2">
        <h3>Donde comer bien en {region.name}</h3>
      </div>
      <div className="row mx-5 p-4 card-row justify-content-center align-items-center">
        {indexRestorations.map((indexRestoration) => {
          return (
            <div
              key={region.restorations[indexRestoration].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <img
                  src={region.restorations[indexRestoration].photo}
                  height="300px"
                  className="card-img-top"
                  alt={region.restorations[indexRestoration].name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {region.restorations[indexRestoration].name}
                  </h5>
                  <div className="card-text text-center">
                    <img
                      src={region.restorations[indexRestoration].logo}
                      height="100px"
                    ></img>
                    <div>
                      <Link
                        to={`/restoration/${region.restorations[indexRestoration].id}`}
                      >
                        <button className="btn btn-outline-danger mt-4">
                          Ver lugar
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center p-4" id="scrollspyHeading3">
        <h3>Alojamientos con encanto de {region.name}</h3>
      </div>

      <div className="row mx-5 p-4 card-row justify-content-center align-items-center">
        
        {indexAccommodations.map((indexAccommodation) => {
          return (
            <div
              key={region.accomodation[indexAccommodation].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <img
                  src={region.accomodation[indexAccommodation].photo}
                  height="300px"
                  className="card-img-top"
                  alt={region.accomodation[indexAccommodation].name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {region.accomodation[indexAccommodation].name}
                  </h5>
                  <div className="card-text text-center">
                    <img
                      src={region.accomodation[indexAccommodation].logo}
                      height="100px"
                    ></img>
                    <div>
                      <Link
                        to={`/accommodation/${region.accomodation[indexAccommodation].id}`}
                      >
                        <button className="btn btn-outline-danger mt-4">
                          Ver lugar
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
      </div>
      
      <div className="text-center p-4" id="scrollspyHeading4">
        <h3>Visitas / Experiencias Guiadas en {region.name}</h3>
      </div>
      <div className="row mx-5 p-4 card-row justify-content-center align-items-center">
        {indexExperiences.map((indexExperience) => {
          return (
            <div
              key={region.experiences[indexExperience].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <img
                  src={region.experiences[indexExperience].photo}
                  height="300px"
                  className="card-img-top"
                  alt={region.experiences[indexExperience].name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {region.experiences[indexExperience].name}
                  </h5>
                  <div className="card-text text-center">
                    <img
                      src={region.experiences[indexExperience].logo}
                      height="100px"
                    ></img>
                    <div>
                      <Link to={`/experience/${region.experiences[indexExperience].id}`}>
                      <button className="btn btn-outline-danger mt-4">
                          Ver lugar
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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

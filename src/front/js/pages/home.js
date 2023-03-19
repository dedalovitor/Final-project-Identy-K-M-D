import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Search } from "../component/search";
import { Discover } from "../component/discoverregions";
import { NewFile } from "../component/newfile";
import { CardRegion } from "../component/cardregion";
import { CardRestoration } from "../component/cardrestoration";
import { CardPatrimony } from "../component/cardpatrimony";
import { CardAccommodation } from "../component/cardaccommodation";
import { CardExperience } from "../component/cardexperience";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [regions, setRegions] = useState([]);
  const [indexRegions, setIndexRegions] = useState([]);
  const [restorations, setRestorations] = useState([]);
  const [indexRestorations, setIndexRestorations] = useState([]);
  const [patrimonys, setPatrimonys] = useState([]);
  const [indexPatrimonys, setIndexPatrimonys] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [indexAccommodations, setIndexAccommodations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [indexExperiences, setIndexExperiences] = useState([]);

  useEffect(() => {
    getCurrentRegion();
  }, []);

  const getCurrentRegion = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/regions");
    const data = await response.json();
    if (response.ok) {
      setRegions(data.result);
      setIndexRegions([0, 1, 2, 3]);
    }
  };

  useEffect(() => {
    getCurrentPatrimony();
  }, []);

  const getCurrentPatrimony = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/patrimonys");
    const data = await response.json();
    if (response.ok) {
      setPatrimonys(data.result);
      setIndexPatrimonys([0, 1, 2, 3]);
    }
  };

  useEffect(() => {
    getCurrentAccommodation();
  }, []);

  const getCurrentAccommodation = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/accommodations"
    );
    const data = await response.json();
    if (response.ok) {
      setAccommodations(data.result);
      setIndexAccommodations([0, 1, 2, 3]);
    }
  };

  useEffect(() => {
    getCurrentRestoration();
  }, []);

  const getCurrentRestoration = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/restorations");
    const data = await response.json();
    if (response.ok) {
      setRestorations(data.result);
      setIndexRestorations([0, 1, 2, 3]);
    }
  };

  useEffect(() => {
    getCurrentExperience();
  }, []);

  const getCurrentExperience = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/experiences");
    const data = await response.json();
    if (response.ok) {
      setExperiences(data.result);
      setIndexExperiences([0, 1, 2, 3]);
    }
  };

  return (
    <>
      <div
        className="container h-25 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "https://images4.alphacoders.com/975/97548.jpg",
          backgroundSize: "cover",
        }}
      >
        <div className="container h-25 d-flex justify-content-center align-items-center p-4">
          <div>
            <button
              type="button"
              className="buttonhome btn btn-outline-danger m-2 "
            >
              <a href="#scrollspyHeading1">
                Lugares que Visitar/Patrimonio
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1009/1009921.png"
                  className="img-patrimony"
                  alt="Responsive image"
                ></img>
              </a>
            </button>
            <button
              type="button"
              className="buttonhome btn btn-outline-success m-2"
            >
              <a href="#scrollspyHeading2">
                {" "}
                Restaurantes/Gastronomia
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1980/1980788.png"
                  className="img-restoration"
                  alt="Responsive image"
                ></img>
              </a>
            </button>
            <button
              type="button"
              className="buttonhome btn btn-outline-primary m-2"
            >
              <a href="#scrollspyHeading3">
                Alojamientos
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2933/2933772.png"
                  className="img-accommodation"
                  alt="Responsive image"
                ></img>
              </a>
            </button>
            <button
              type="button"
              className="buttonhome btn btn-outline-warning m-2"
            >
              <a href="#scrollspyHeading4">
                Visitas Guiadas
                <img
                  src="https://www.pc-nexus.net/diplomas/fondoexp.png"
                  className="img-route"
                  alt="Responsive image"
                ></img>
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="row mx-5 p-4">
        <Discover />
      </div>
      <div className="text-center p-4">
        <h3>Ciudades con encanto</h3>
      </div>
      <div className="detailcitycard row mx-5 p-4 card-row justify-content-center align-items-center">
        {indexRegions[0] > 0 ? (
          <button
            className="btn btn-outline-danger previousRegion"
            onClick={() => {
              const newIndexRegion = [...indexRegions];
              setIndexRegions(newIndexRegion.map((x) => x - 1));
            }}
          >
            <h2 style={{ marginTop: "-3px" }}>←</h2>
          </button>
        ) : null}
        {indexRegions.map((indexRegion) => {
          return (
            <div
              key={regions[indexRegion].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <div className="card-logo">
                  <img src={regions[indexRegion].logo} height="30px"></img>
                </div>
                <img
                  src={regions[indexRegion].photo}
                  height="200px"
                  className="card-img-top"
                  alt={regions[indexRegion].photo}
                />

                <div className="card-body row">
                  <div className="col-6 d-flex align-items-center">
                    <h5 className="namecard card-title m-0">
                      {regions[indexRegion].name}
                    </h5>
                  </div>
                  <div className="col-6">
                    <div className="text-end">
                      <Link to={`/ciudad/${regions[indexRegion].id}`}>
                        <button className="btn btn-outline-danger">
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
        {indexRegions[indexRegions.length - 1] < regions.length - 1 ? (
          <button
            className="btn btn-outline-danger nextRegion"
            onClick={() => {
              const newIndexRegion = [...indexRegions];
              setIndexRegions(newIndexRegion.map((x) => x + 1));
            }}
          >
            <h2 style={{ marginTop: "-3px" }}>→</h2>
          </button>
        ) : null}
      </div>
      <div className="text-center p-4" id="scrollspyHeading1">
        <h3>Patrimonio natural, arquitectónico, histórico que descubrir</h3>
      </div>

      <div className="detailcitycard row mx-5 p-4 card-row justify-content-center align-items-center">
        {indexPatrimonys[0] > 0 ? (
          <button
            className="btn btn-outline-danger previousPatrimony"
            onClick={() => {
              const newIndexPatrimony = [...indexPatrimonys];
              setIndexPatrimonys(newIndexPatrimony.map((x) => x - 1));
            }}
          >
            <h2 style={{ marginTop: "-3px" }}>←</h2>
          </button>
        ) : null}
        {indexPatrimonys.map((indexPatrimony) => {
          return (
            <div
              key={patrimonys[indexPatrimony].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <div className="card-logo">
                  <img
                    src={patrimonys[indexPatrimony].logo}
                    height="30px"
                  ></img>
                </div>
                <img
                  src={patrimonys[indexPatrimony].photo}
                  height="200px"
                  className="card-img-top"
                  alt={patrimonys[indexPatrimony].photo}
                />
                <div className="card-body row">
                  <div className="col-6 d-flex align-items-center">
                    <h5 className="namecard card-title m-0">
                      {patrimonys[indexPatrimony].name}
                    </h5>
                  </div>
                    <div className="col-6">
                      <div className="text-end">
                        <Link
                          to={`/patrimonio/${patrimonys[indexPatrimony].id}`}
                        >
                          <button className="btn btn-outline-danger">
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
        {indexPatrimonys[indexPatrimonys.length - 1] < patrimonys.length - 1 ? (
          <button
            className="btn btn-outline-danger nextPatrimony"
            onClick={() => {
              const newIndexPatrimony = [...indexPatrimonys];
              setIndexPatrimonys(newIndexPatrimony.map((x) => x + 1));
            }}
          >
            <h2 style={{ marginTop: "-3px" }}>→</h2>
          </button>
        ) : null}
      </div>
      <div className="text-center p-4" id="scrollspyHeading2">
        <h3>Donde comer bien</h3>
      </div>

      <div className="detailcitycard row mx-5 p-4 card-row justify-content-center align-items-center">
        {indexRestorations[0] > 0 ? (
          <button
            className="btn btn-outline-danger previousRestoration"
            onClick={() => {
              const newIndexRestoration = [...indexRestorations];
              setIndexRestorations(newIndexRestoration.map((x) => x - 1));
            }}
          >
            <h2 style={{ marginTop: "-3px" }}>←</h2>
          </button>
        ) : null}
        {indexRestorations.map((indexRestoration) => {
          return (
            <div
              key={restorations[indexRestoration].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <div className="card-logo">
                  <img
                    src={restorations[indexRestoration].logo}
                    height="30px"
                  ></img>
                </div>
                <img
                  src={restorations[indexRestoration].photo}
                  height="200px"
                  className="card-img-top"
                  alt={restorations[indexRestoration].photo}
                />
                <div className="card-body row">
                  <div className="col-6 d-flex align-items-center">
                    <h5 className="namecard card-title m-0">
                      {restorations[indexRestoration].name}</h5>
                    
                  </div>
                  <div className="col-6">
                    <div className="text-end">
                      <Link
                        to={`/restoration/${restorations[indexRestoration].id}`}
                      >
                        <button className="btn btn-outline-danger">
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
        {indexRestorations[indexRestorations.length - 1] <
        restorations.length - 1 ? (
          <button
            className="btn btn-outline-danger nextRestoration"
            onClick={() => {
              const newIndexRestoration = [...indexRestorations];
              setIndexRestorations(newIndexRestoration.map((x) => x + 1));
            }}
          >
            <h2 style={{ marginTop: "-3px" }}>→</h2>
          </button>
        ) : null}
      </div>
      <div className="text-center p-4" id="scrollspyHeading3">
        <h3>Alojamientos con encanto</h3>
      </div>

      <div className="detailcitycard row mx-5 p-4 card-row justify-content-center align-items-center">
        {indexAccommodations[0] > 0 ? (
          <button
            className="btn btn-outline-danger previousAccommodation"
            onClick={() => {
              const newIndexAccommodation = [...indexAccommodations];
              setIndexAccommodations(newIndexAccommodation.map((x) => x - 1));
            }}
          >
            <h2 style={{ marginTop: "-3px" }}>←</h2>
          </button>
        ) : null}
        {indexAccommodations.map((indexAccommodation) => {
          return (
            <div
              key={accommodations[indexAccommodation].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <div className="card-logo">
                  <img
                    src={accommodations[indexAccommodation].logo}
                    height="30px"
                  ></img>
                </div>
                <img
                  src={accommodations[indexAccommodation].photo}
                  height="200px"
                  className="card-img-top"
                  alt={accommodations[indexAccommodation].name}
                />
                <div className="card-body row">
                  <div className="col-6 d-flex align-items-center">
                    <h5 className="namecard card-title m-0">
                    {accommodations[indexAccommodation].name}
                  </h5>
                  </div>
                  <div className="col-6">
                    <div className="text-end">
                      <Link
                        to={`/accommodation/${accommodations[indexAccommodation].id}`}
                      >
                        <button className="btn btn-outline-danger">
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
        {indexAccommodations[indexAccommodations.length - 1] <
        accommodations.length - 1 ? (
          <button
            className="btn btn-outline-danger nextAccommodation"
            onClick={() => {
              const newIndexAccommodation = [...indexAccommodations];
              setIndexAccommodations(newIndexAccommodation.map((x) => x + 1));
            }}
          >
            <h2 style={{ marginTop: "-3px" }}>→</h2>
          </button>
        ) : null}
      </div>
      <div className="text-center p-4" id="scrollspyHeading4">
        <h3>Visitas / Experiencias Guiadas</h3>
      </div>

      <div className="detailcitycard row mx-5 p-4 card-row justify-content-center align-items-center">
        {indexExperiences[0] > 0 ? (
          <button
            className="btn btn-outline-danger previousExperience"
            onClick={() => {
              const newIndexExperience = [...indexExperiences];
              setIndexExperiences(newIndexExperience.map((x) => x - 1));
            }}
          >
            <h2>←</h2>
          </button>
        ) : null}
        {indexExperiences.map((indexExperience) => {
          return (
            <div
              key={experiences[indexExperience].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <div className="card-logo">
                  <img
                    src={experiences[indexExperience].logo}
                    height="30px"
                  ></img>
                </div>
                <img
                  src={experiences[indexExperience].photo}
                  height="200px"
                  className="card-img-top"
                  alt={experiences[indexExperience].photo}
                />
                <div className="card-body row">
                  <div className="col-6 d-flex align-items-center">
                    <h5 className="namecard card-title m-0">
                    {experiences[indexExperience].name}                 </h5>
                    </div>
                  <div className="col-6">
                    <div className="text-end">
                  
                    <Link to={`/experience/${experiences[indexExperience].id}`}>
                      <button className="btn btn-outline-danger">
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

        {indexExperiences[indexExperiences.length - 1] <
        experiences.length - 1 ? (
          <button
            className="btn btn-outline-danger nextExperience"
            onClick={() => {
              const newIndexExperience = [...indexExperiences];
              setIndexExperiences(newIndexExperience.map((x) => x + 1));
            }}
          >
            <h2 style={{ marginTop: "-3px" }}>→</h2>
          </button>
        ) : null}
      </div>
    </>
  );
};

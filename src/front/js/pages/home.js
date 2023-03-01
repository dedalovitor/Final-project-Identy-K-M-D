import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Search } from "../component/search";
import { Discover } from "../component/discoverregions";
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
        <div>
          <button type="button" className="btn btn-outline-primary m-2">
            Alojamientos
          </button>
          <button type="button" className="btn btn-outline-dark m-2">
            Cosas que hacer
          </button>
          <button type="button" className="btn btn-outline-success m-2">
            Restaurantes/Gastronomia
          </button>
          <button type="button" className="btn btn-outline-danger m-2">
            Lugares que Visitar/Patrimonio
          </button>
          <button type="button" className="btn btn-outline-warning m-2">
            Visitas Guiadas
          </button>
        </div>
      </div>
      <div className="row mx-5 p-4">
        <Search />
      </div>
      <div className="row mx-5 p-4">
        <Discover />
      </div>
      <div className="text-center">
        <h3>Ciudades con encanto</h3>
      </div>
      <div className="row mx-5 p-4 card-row">
        {indexRegions[0] > 0 ? (
          <button
            className="btn btn-primary previousRegion"
            onClick={() => {
              const newIndexRegion = [...indexRegions];
              setIndexRegions(newIndexRegion.map((x) => x - 1));
            }}
          >
            <h2>←</h2>
          </button>
        ) : null}
        {indexRegions.map((indexRegion) => {
          return (
            <div
              key={regions[indexRegion].id}
              className="col-2 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card">
                <img
                  src={regions[indexRegion].photo}
                  height="300px"
                  className="card-img-top"
                  alt={regions[indexRegion].name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {regions[indexRegion].name}
                  </h5>
                  <div className="card-text text-center">
                    <img src={regions[indexRegion].logo} height="100px"></img>
                    <div>
                      <Link to={`/${regions[indexRegion].name}`}>
                        <button className="btn btn-primary mt-4">
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
            className="btn btn-primary nextRegion"
            onClick={() => {
              const newIndexRegion = [...indexRegions];
              setIndexRegions(newIndexRegion.map((x) => x + 1));
            }}
          >
            <h2>→</h2>
          </button>
        ) : null}
      </div>
      <div className="text-center">
        <h3>Patrimonio natural, arquitectónico, histórico que descubrir</h3>
      </div>

      <div className="row mx-5 p-4 card-row">
        {indexPatrimonys[0] > 0 ? (
          <button
            className="btn btn-primary previousPatrimony"
            onClick={() => {
              const newIndexPatrimony = [...indexPatrimonys];
              setIndexPatrimonys(newIndexPatrimony.map((x) => x - 1));
            }}
          >
            <h2>←</h2>
          </button>
        ) : null}
        {indexPatrimonys.map((indexPatrimony) => {
          return (
            <div
              key={patrimonys[indexPatrimony].id}
              className="col-2 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card">
                <img
                  src={patrimonys[indexPatrimony].photo}
                  height="300px"
                  className="card-img-top"
                  alt={patrimonys[indexPatrimony].name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {patrimonys[indexPatrimony].name}
                  </h5>
                  <div className="card-text text-center">
                    <img
                      src={patrimonys[indexPatrimony].logo}
                      height="100px"
                    ></img>
                    <div>
                      <Link to={`/${patrimonys[indexPatrimony].name}`}>
                        <button className="btn btn-primary mt-4">
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
            className="btn btn-primary nextPatrimony"
            onClick={() => {
              const newIndexPatrimony = [...indexPatrimonys];
              setIndexPatrimonys(newIndexPatrimony.map((x) => x + 1));
            }}
          >
            <h2>→</h2>
          </button>
        ) : null}
      </div>

      <div className="text-center">
        <h3>Donde comer bien</h3>
      </div>

      <div className="row mx-5 p-4 card-row">
        {indexRestorations[0] > 0 ? (
          <button
            className="btn btn-primary previousRestoration"
            onClick={() => {
              const newIndexRestoration = [...indexRestorations];
              setIndexRestorations(newIndexRestoration.map((x) => x - 1));
            }}
          >
            <h2>←</h2>
          </button>
        ) : null}
        {indexRestorations.map((indexRestoration) => {
          return (
            <div
              key={restorations[indexRestoration].id}
              className="col-2 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card">
                <img
                  src={restorations[indexRestoration].photo}
                  height="300px"
                  className="card-img-top"
                  alt={restorations[indexRestoration].name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {restorations[indexRestoration].name}
                  </h5>
                  <p className="card-text text-center">
                    {restorations[indexRestoration].type_bussiness}
                  </p>
                  <div className="card-text text-center">
                    <img
                      src={restorations[indexRestoration].logo}
                      height="100px"
                    ></img>
                    <div>
                      <Link to={`/${restorations[indexRestoration].name}`}>
                        <button className="btn btn-primary mt-4">
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
            className="btn btn-primary nextRestoration"
            onClick={() => {
              const newIndexRestoration = [...indexRestorations];
              setIndexRestorations(newIndexRestoration.map((x) => x + 1));
            }}
          >
            <h2>→</h2>
          </button>
        ) : null}
      </div>
      <div className="text-center">
        <h3>Alojamientos con encanto</h3>
      </div>

      <div className="row mx-5 p-4 card-row">
        {indexAccommodations[0] > 0 ? (
          <button
            className="btn btn-primary previousAccommodation"
            onClick={() => {
              const newIndexAccommodation = [...indexAccommodations];
              setIndexAccommodations(newIndexAccommodation.map((x) => x - 1));
            }}
          >
            <h2>←</h2>
          </button>
        ) : null}
        {indexAccommodations.map((indexAccommodation) => {
          return (
            <div
              key={accommodations[indexAccommodation].id}
              className="col-2 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card">
                <img
                  src={accommodations[indexAccommodation].photo}
                  height="300px"
                  className="card-img-top"
                  alt={accommodations[indexAccommodation].name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {accommodations[indexAccommodation].name}
                  </h5>
                  <p className="card-text text-center">
                    {accommodations[indexAccommodation].type_bussiness}
                  </p>
                  <div className="card-text text-center">
                    <img
                      src={accommodations[indexAccommodation].logo}
                      height="100px"
                    ></img>
                    <div>
                      <Link to={`/${accommodations[indexAccommodation].name}`}>
                        <button className="btn btn-primary mt-4">
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
            className="btn btn-primary nextAccommodation"
            onClick={() => {
              const newIndexAccommodation = [...indexAccommodations];
              setIndexAccommodations(newIndexAccommodation.map((x) => x + 1));
            }}
          >
            <h2>→</h2>
          </button>
        ) : null}
      </div>
      <div className="text-center">
        <h3>Visitas / Experiencias Guiadas</h3>
      </div>

      <div className="row mx-5 p-4 card-row">
        {indexExperiences[0] > 0 ? (
          <button
            className="btn btn-primary previousExperience"
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
              className="col-2 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card">
                <img
                  src={experiences[indexExperience].photo}
                  height="300px"
                  className="card-img-top"
                  alt={experiences[indexExperience].name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {experiences[indexExperience].name}
                  </h5>
                  <div className="card-text text-center">
                    <img
                      src={experiences[indexExperience].logo}
                      height="100px"
                    ></img>
                    <div>
                      <Link to={`/${experiences[indexExperience].name}`}>
                        <button className="btn btn-primary mt-4">
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
            className="btn btn-primary nextExperience"
            onClick={() => {
              const newIndexExperience = [...indexExperiences];
              setIndexExperiences(newIndexExperience.map((x) => x + 1));
            }}
          >
            <h2>→</h2>
          </button>
        ) : null}
      </div>
    </>
  );
};

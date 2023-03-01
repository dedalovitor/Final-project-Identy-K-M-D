import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Search } from "../component/search";
import { CardRegion } from "../component/cardregion";
import { CardRestoration } from "../component/cardrestoration";
import { CardPatrimony } from "../component/cardpatrimony";
import { CardAccommodation } from "../component/cardaccommodation";

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

  return (
    <>
      <div className="container">
        {store.currentUserEmail
          ? "Hola usuario" + store.currentUserEmail
          : "Please register or login"}
      </div>
      <div
        className="container h-25 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "https://images4.alphacoders.com/975/97548.jpg",
          backgroundSize: "cover",
        }}
      >
        <Search />
      </div>
      <div className="text-center">
        <h3>Ciudades con encanto</h3>
      </div>
      <div className="row mx-5 p-4">
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
                  <p className="card-text text-center">
                    {regions[indexRegion].resume}
                  </p>
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

      <div className="row mx-5 p-4">
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
                  <p className="card-text text-center">
                    {patrimonys[indexPatrimony].resume}
                  </p>
                  <div className="card-text text-center">
                    <img
                      src={patrimonys[indexPatrimony].logo}
                      height="100px"
                    ></img>
                    <div>
                      <Link to={`/${regions[indexPatrimony].name}`}>
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

      <div className="row mx-5 p-4">
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
                    {restorations[indexRestoration].resume}
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

      <div className="row mx-5 p-4">
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
                    {accommodations[indexAccommodation].resume}
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
    </>
  );
};

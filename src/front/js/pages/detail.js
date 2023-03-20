import React, { useState, useEffect, useContext } from "react";
import { Commentbox } from "../component/commentbox";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const CityDetail = () => {
  const params = useParams();
  console.log(params.id);
  const { store, actions } = useContext(Context);
  const [region, setRegion] = useState({ restorations: [], accomodation: [], experiences: [], patrimonies: [] });
  const [indexRestorations, setIndexRestorations] = useState([]);
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
      <div
        className="container h-25 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "https://images4.alphacoders.com/975/97548.jpg",
          backgroundSize: "cover",
        }}
      >
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
                className="buttonhome btn btn-outline-danger ps-4 pe-4 m-2"
              >
                <a href="#scrollspyHeading1">
                  Patrimonio
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
                  Restaurantes
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
                  Experiencias
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
              key={region.patrimonies[indexPatrimony].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <div className="card-logo">
                  <img
                    src={region.patrimonies[indexPatrimony].logo}
                    height="30px"
                  ></img>
                </div>
                <img
                  src={region.patrimonies[indexPatrimony].photo}
                  height="200px"
                  className="card-img-top"
                  alt={region.patrimonies[indexPatrimony].name}
                />
                <div className="card-body">
                  <h5 className="namecard card-title ml-2">
                    {region.patrimonies[indexPatrimony].name}
                  </h5>
                  <div className="card-text text-center">
                    <div>
                      <div className="text-end ms-2">
                        <Link
                          to={`/patrimonio/${region.patrimonies[indexPatrimony].id}`}
                        >
                          <button className="btn btn-outline-danger ps-4 pe-4">
                            Ver
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {indexPatrimonys[indexPatrimonys.length - 1] < region.patrimonies.length - 1 ? (
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
        <h3>Dónde comer bien en {region.name}</h3>
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
              key={region.restorations[indexRestoration].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <div className="card-logo">
                  <img
                    src={region.restorations[indexRestoration].logo}
                    height="30px"
                  ></img>
                </div>
                <img
                  src={region.restorations[indexRestoration].photo}
                  height="200px"
                  className="card-img-top"
                  alt={region.restorations[indexRestoration].name}
                />
                <div className="card-body">
                  <h5 className="namecard card-title ml-2">
                    {region.restorations[indexRestoration].name}
                  </h5>
                  <div className="text-end ms-2">
                    <div>
                      <Link
                        to={`/restoration/${region.restorations[indexRestoration].id}`}
                      >
                        <button className="btn btn-outline-danger ps-4 pe-4">
                          Ver
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
          region.restorations.length - 1 ? (
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
        <h3>Alojamientos con encanto de {region.name}</h3>
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
              key={region.accomodation[indexAccommodation].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <div className="card-logo">
                  <img
                    src={region.accomodation[indexAccommodation].logo}
                    height="30px"
                  ></img>
                </div>
                <img
                  src={region.accomodation[indexAccommodation].photo}
                  height="200px"
                  className="card-img-top"
                  alt={region.accomodation[indexAccommodation].name}
                />
                <div className="card-body">
                  <h5 className="namecard card-title ml-2">
                    {region.accomodation[indexAccommodation].name}
                  </h5>
                  <div className="text-end ms-2">
                    <div>
                      <Link
                        to={`/accommodation/${region.accomodation[indexAccommodation].id}`}
                      >
                        <button className="btn btn-outline-danger ps-4 pe-4">
                          Ver
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
          region.accomodation.length - 1 ? (
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
        <h3>Visitas / Experiencias Guiadas en {region.name}</h3>
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
              key={region.experiences[indexExperience].id}
              className="col-2 col-sm-6 col-md-4 col-lg-2"
            >
              <div className="card">
                <div className="card-logo">
                  <img
                    src={region.experiences[indexExperience].logo}
                    height="30px"
                  ></img>
                </div>
                <img
                  src={region.experiences[indexExperience].photo}
                  height="200px"
                  className="card-img-top"
                  alt={region.experiences[indexExperience].name}
                />
                <div className="card-body">
                  <h5 className="namecard card-title ml-2">
                    {region.experiences[indexExperience].name}
                  </h5>
                  <div className="text-end ms-2">
                    <div>
                      <Link
                        to={`/experience/${region.experiences[indexExperience].id}`}
                      >
                        <button className="btn btn-outline-danger ps-4 pe-4">
                          Ver
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
          region.experiences.length - 1 ? (
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
      <div className="text-center p-4" id="scrollspyHeading4">
        <h3>Mapa de {region.name}</h3>
      </div>
      <div className="row col-6 mx-auto p-4">

        <iframe
          src={region.coordinates}
          width="800"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        />
      </div>

    </>
  );
};

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardRegion } from "../component/cardregion";
import { CardPatrimony } from "../component/cardpatrimony";

export const DiscoRegion = () => {
  const { store, actions } = useContext(Context);
  const [regions, setRegions] = useState([]);
  const [indexRegions, setIndexRegions] = useState([]);
  const [patrimonys, setPatrimonys] = useState([]);
  const [indexPatrimonys, setIndexPatrimonys] = useState([]);

  useEffect(() => {
    getCurrentRegion();
  }, []);

  const getCurrentRegion = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/regions_with_patrimony"
    );
    const data = await response.json();
    if (response.ok) {
      setRegions(data.result.sort((a, b) => a.name.localeCompare(b.name)));
      setIndexRegions([0, 1, 2, 3, 4, 5, 6, 7]);
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
      ></div>
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
      <div className="text-center p-4">
        <h3>Ciudades con encanto</h3>
      </div>
      <div className="mx-5 p-4 ">
        {indexRegions.map((indexRegion) => {
          return (
            <div className="row m-2">
              <div
                key={regions[indexRegion].id}
                className="col-2 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-left p-4">
                      {regions[indexRegion].name}
                    </h5>
                    <p className="card-text text-left">
                      {regions[indexRegion].resume}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col p-4">
                <div className="row mx-5 p-4 card-row">
                  {regions[indexRegion].patrimonys.map((patrimony) => {
                    return (
                      <div className="col-2 col-sm-6 col-md-4 col-lg-3">
                        <div className="card">
                          <img
                            src={patrimony.photo}
                            height="200px"
                            className="card-img-top"
                            alt={patrimony.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title text-center">
                              {patrimony.name}
                            </h5>

                            <div className="card-text text-center">
                              <div>
                                <Link to={`/patrimonio/${patrimony.id}`}>
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
                  {indexPatrimonys[indexPatrimonys.length - 1] <
                  patrimonys.length - 1 ? (
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

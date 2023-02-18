import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Search } from "../component/search";
import { CardRegion } from "../component/cardregion";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    getCurrentRegion();
  }, []);

  const getCurrentRegion = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/regions"
    );
    const data = await response.json();
    if (response.ok) setRegions(data.result);
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
        <Search />
      </div>
      <div className="row">
        {regions.map((region) => {
          return (
            <div className="col-2 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <img
                  src={region.photo}
                  height="300px"
                  className="card-img-top"
                  alt={region.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{region.name}</h5>
                  <p className="card-text text-center">{region.resume}</p>
                  <div className="card-text text-center">
                    <img src={region.logo} height="100px"></img>
                    <div>
                      <Link to={`/${region.name}`}>
                        <button className="btn btn-primary">Ver lugar</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

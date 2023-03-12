import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Search = () => {
  const [city, setCity] = useState("");
  const [regions, setRegions] = useState([]);
  const [indexRegions, setIndexRegions] = useState([]);
  useEffect(() => {
    getCurrentRegion();
  }, []);

  const getCurrentRegion = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/regions");
    const data = await response.json();
    if (response.ok) {
      setRegions(data.result);
      setIndexRegions([0, 1, 2, 3, 4 , 5 , 6 ,7]);
    }
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="row">
      <div className="input-group col-6 rounded p-4 custom-search align-items-center d-flex justify-content-center">
        <div className="mr-2">
          <select
            className="form-control"
            value={city}
            onChange={handleCityChange}
          >
            <option value="">Selecciona una ciudad</option>
            <option value="Sevilla">Sevilla</option>
            
          </select>
        </div>
              </div>
    </div>
  );
};

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardRegion } from "../component/cardregion";
import { CardPatrimony } from "../component/cardpatrimony";

export const DiscoRegion = () => {
  const { store, actions } = useContext(Context);
  const [regions, setRegions] = useState([]);
  const [indexPatrimonys, setIndexPatrimonys] = useState([]);
  const [newIndexPatrimonys, setnewIndexPatrimonys] = useState({});

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
      const indexList = {};
      for (let x = 0; x < data.result.length; x++) {
        indexList[data.result[x].id] = [0, 1, 2, 3];
      }
      setnewIndexPatrimonys(indexList);
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

      <div className="text-center p-4">
        <h3>Ciudades con encanto</h3>
      </div>
      <div className="mx-5 p-4 ">
        {regions.map((region) => {
          return (
            <div className="row m-2">
              <div key={region.id} className="col-2 col-sm-6 col-md-4 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-left p-4">{region.name}</h5>
                    <p className="card-text text-left">{region.resume}</p>
                  </div>
                </div>
              </div>
              <div className="col p-4">
                <div className="row mx-5 p-4 card-row">
                  {Object.keys(newIndexPatrimonys).length >0 && newIndexPatrimonys[region.id][0] > 0 ? (
                    <button
                      className="btn btn-outline-danger previousPatrimonyRegion"
                      onClick={() => {
                        const newIndexPatrimony = [...newIndexPatrimonys[region.id]].map((x) => x - 1);
                        setnewIndexPatrimonys({...newIndexPatrimonys,[region.id]: newIndexPatrimony});
                      }}
                    >
                      <h2 style={{ marginTop: "-3px" }}>←</h2>
                    </button>
                  ) : null}
                  {Object.keys(newIndexPatrimonys).length >0 && newIndexPatrimonys[region.id].map((patrimony) => {
                    if (patrimony<=region.patrimonys.length-1){
                      return (
                        <div className="carddisco col-2 col-sm-6 col-md-4 col-lg-3">
                          <img
                            src={region.patrimonys[patrimony].photo}
                            height="200px"
                            className="card-img-top"
                            alt={region.patrimonys[patrimony].name}
                          />
                          <div className="card-body row">
                            <div className="col-6 d-flex align-items-center">
                              <h5 className="namecard card-title m-0 ">
                                {region.patrimonys[patrimony].name}
                              </h5>
                            </div>
                            <div className="col-6">
                              <div className="text-end ">
                                <Link to={`/patrimonio/${region.patrimonys[patrimony].id}`}>
                                  <button className="btn btn-outline-danger">
                                    Ver lugar
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                   
                  })}
                  {Object.keys(newIndexPatrimonys).length >0 &&
                  newIndexPatrimonys[region.id][
                    newIndexPatrimonys[region.id].length - 1
                  ] <
                    region.patrimonys.length - 1 ? (
                    <button
                      className="btn btn-outline-danger nextPatrimonyRegion"
                      onClick={() => {
                        const newIndexPatrimony = [...newIndexPatrimonys[region.id]].map((x) => x + 1);
                        setnewIndexPatrimonys({...newIndexPatrimonys,[region.id]: newIndexPatrimony});
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

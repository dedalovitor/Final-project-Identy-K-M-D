import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const [card, setCard] = useState([]);

  useEffect(() => { }, [store.userInfo.favorites]);

  return (
    <div className="container justify-content-center">
      <div className="text-center" >
        <h1>Mi lista de favoritos</h1>
      </div>

      <div className="row d-flex col-12 justify-content-center align-items-center">
        <div className="row justify-content-center align-items-center">
          {store.userInfo.favorites.map((favorite) => {
            return (
              <div key={favorite.id} className="col-3 m-1">
                <div className="card">
                  <img
                    src={favorite.data.photo}
                    height="200px"
                    className="card-img-top"
                    alt={favorite.data.name}
                  />
                  <div className="card-body">
                    <h5 className="namecard card-title text-center">
                      {favorite.data.name}
                    </h5>
                    <div className="card-text text-center">

                      <div>

                        <Link to={`/${favorite.data.type}/${favorite.data.id}`}>
                          <button className="btn btn-outline-danger me-4 ps-3 pe-3">
                            Ver
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger text-danger bg-white"
                          onClick={() =>
                            actions.addFavorite(
                              favorite.data.id,
                              favorite.data.type
                            )
                          }
                        >
                          <i class="fa-solid fa-heart"></i>
                        </button>

                      </div>

                    </div>
                  </div>
                </div>
              </div>

            );
          })}
        </div>
      </div>
    </div>
  );
};

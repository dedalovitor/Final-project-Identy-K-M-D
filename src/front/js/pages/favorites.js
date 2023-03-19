import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const [card, setCard] = useState([]);

  useEffect(() => {}, [store.userInfo.favorites]);

  return (
    <div>
      <h1>Mi lista de favoritos</h1>
      {store.userInfo.favorites.map((favorite) => {
        return (
          <div key={favorite.id} className="col-2 col-sm-6 col-md-4 col-lg-2">
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
                  <img src={favorite.data.logo} height="30px"></img>
                  <div>
                    <Link to={`/${favorite.data.type}/${favorite.data.id}`}>
                      <button className="btn btn-outline-danger mt-4">
                        Ver lugar
                      </button>
                    </Link>
                    <button
                      className="btn btn-outline-danger text-danger bg-white mt-4"
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
  );
};

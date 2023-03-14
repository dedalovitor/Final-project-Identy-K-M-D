import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FavoritesButton } from "../component/favoritesbutton";
import { Context } from "../store/appContext";

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const [favorite, setFavorite] = useState(store.favorites);
  const [elements, setElements] = useState([]);
  const params = useParams();

  useEffect(() => {
    actions.getFavorites(params.id);
  }, []);

  //añadir favorito
  /*/ 
  añades el favorito en el flux
  y cada vez que se modifique, lo guardas en el back
*/

  const handleAddFavorite = (id) => {
    addFavorite(id);
    setFavorite(true);
  };

  const handleDeleteFavorite = (id) => {
    setFavorite(favorite.filter((f) => f.id !== id)); //esconder
    //eliminar como tal -> fetch(method)
  };

  const addFavorite = (id) => {
    fetch(`${process.env.BACKEND_URL}/addfavorite/${id}`, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // const element = elements.find((e) => e.id === id);
        // setFavorites((favorites) => [...favorites, element]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function FavoriteItem({ favorite, onDelete }) {
    const handleDelete = () => {
      fetch(`/deletefavorites/${favorite.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          onDelete(favorite.id);
        })
        .catch((error) => console.error(error));
    };

    return (
      <div>
        <span>{name}</span>

        {favorite ? (
          <span>✔️</span>
        ) : (
          <button onClick={handleAddFavorite}>Agregar a favoritos</button>
        )}
        {favorite.map((favorite) => (
          <div key={favorite.id}>
            <div>
              <h1>favorite={favorite}</h1>
              <span className="" onClick={handleDeleteFavorite}>
                X
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

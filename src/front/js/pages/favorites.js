import React, { useState, useEffect } from "react";

function Element({ id, name, addFavorite }) {
  const [favorite, setFavorite] = useState(false);

  const handleAddFavorite = () => {
    addFavorite(id);
    setFavorite(true);
  };

  return (
    <div>
      <span>{name}</span>
      {favorite ? (
        <span>✔️</span>
      ) : (
        <button onClick={handleAddFavorite}>Agregar a favoritos</button>
      )}
    </div>
  );
}

function Elements({ elements, addFavorite }) {
  return (
    <div>
      {elements.map((element) => (
        <Element
          key={element.id}
          id={element.id}
          name={element.name}
          addFavorite={addFavorite}
        />
      ))}
    </div>
  );
}

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
      <p>{favorite.id}</p>
      <p>{favorite.region_id}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}

function Favorites() {
  const [elements, setElements] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/elements")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setElements(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const addFavorite = (id) => {
    fetch(`/addfavorite?id=${id}`, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        const element = elements.find((e) => e.id === id);
        setFavorites((favorites) => [...favorites, element]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteFavorite = (id) => {
    setFavorites((favorites) => favorites.filter((f) => f.id !== id));
  };

  return (
    <div>
      <Elements elements={elements} addFavorite={addFavorite} />
      <h2>Favoritos</h2>
      <button
        onClick={() => {
          fetch("/favorites", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setFavorites(data);
            })
            .catch((error) => console.error(error));
        }}
      >
        Obtener Favoritos
      </button>
      <div>
        {favorites.map((favorite) => (
          <FavoriteItem
            key={favorite.id}
            favorite={favorite}
            onDelete={handleDeleteFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;

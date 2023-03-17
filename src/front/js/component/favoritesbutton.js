import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const FavoritesButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      class="btn btn-outline-success"
      onClick={() => navigate("/favorites")}
    >
      Favorites
    </button>
  );
};

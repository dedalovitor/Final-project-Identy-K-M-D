import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Footer = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="container">
      <p>FOOTER</p>
      <Link to="/regionregister">
        <p>Region register</p>
      </Link>
    </div>
  );
};

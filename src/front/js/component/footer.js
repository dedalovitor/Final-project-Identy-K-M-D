import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Footer = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="navbar navbar-light bg-light">
      FOOTER
    </div>
  );
};

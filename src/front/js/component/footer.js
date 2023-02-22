import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Footer = () => {
  const { store, actions } = useContext(Context);
  return <div className="navbarFooter navbar-light bg-light">FOOTER</div>;
};

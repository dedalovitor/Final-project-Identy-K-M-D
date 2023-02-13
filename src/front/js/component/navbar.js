import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <p className="svg-component">{SvgComponent}</p>
        </Link>
        <div className="buttons content-end">
          <Link to="/">
            <i class="fa-solid fa-pencil"></i>
            <button className="btn btn-light">Opinión</button>
          </Link>
          <Link to="/">
            <i className="fa-regular fa-heart"></i>
            <button className="btn btn-light">Viajes</button>
          </Link>
        </div>
        <div className="ml-auto">
          {store.currentUserEmail ? (
            <button
              className="btn btn-danger"
              onClick={async () => {
                if (await actions.logout()) {
                  Navigate("/");
                }
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-success">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={393.333}
    height={133.333}
    viewBox="0 0 295 100"
    {...props}
  >
    <path d="M29.4 1C6.1 5.9-6.2 31.9 4.1 53.9 7.3 60.7 43.5 97 47 97c2.1 0 7-4.4 23.3-20.8 23.9-24.2 25.2-26 25.2-38.7 0-11.7-4.8-20.9-13-25.2-3.4-1.8-12.2-2.1-15-.5-1.6.8-2.7.3-6.3-2.9C53.5 2.2 39.8-1.2 29.4 1zm19.1 9.9c2.2 1 5.5 3 7.3 4.6 2.6 2.1 3 3 2.1 4.1-1.6 1.9-2.5 1.8-6.2-1-4.3-3.1-9-4.6-14.8-4.6-16.2 0-26.5 14.9-21.7 31.4C16.9 51.2 43 78 47 78c3.6 0 23.5-20.3 27-27.5 3.5-7.4 3.5-19-.1-26.3L71.3 19h3.5c7.3 0 14.3 11.7 12.8 21.2-1.1 7-4.5 11.4-23 29.8L47 87.5l-16.1-16c-8.8-8.8-17.1-17.8-18.5-20.1-7.5-12.7-3.3-30.1 9.4-38.2 8.4-5.4 17.8-6.2 26.7-2.3zM42.6 23c1.5.6 4 2.2 5.6 3.5 3.8 3.2 10.4 3.4 14.1.5l2.6-2.1 1.5 3c2.6 5 3 10.4 1.1 16.2-1.5 4.3-3.6 7.2-11.1 14.9l-9.3 9.5-11.2-11c-6.1-6.1-11.7-12.4-12.5-14.2-5.3-12.2 6.8-25 19.2-20.3zM111.5 13.2c-.3 1.3-.4 12-.3 23.8l.3 21.5 3.9.3c2.4.2 4.2-.2 4.7-1 1.4-2.2 1.1-44.2-.3-45.6-.7-.7-2.7-1.2-4.5-1.2-2.6 0-3.4.5-3.8 2.2zM152.7 11.7c-.4.3-.7 3.9-.7 8v7.4l-3-1.6c-1.6-.8-5.2-1.5-8.1-1.5-4.6 0-5.5.4-8.9 3.8-8.8 8.8-7.2 25.3 3 30.4 4.6 2.3 9.7 2.3 13.7-.1 2.7-1.7 3.2-1.8 3.7-.5.4 1.1 1.7 1.4 4.3 1.2l3.8-.3.3-21.5c.1-11.8 0-22.5-.3-23.8-.4-1.7-1.2-2.2-3.9-2.2-1.8 0-3.6.3-3.9.7zm-3.9 22.5c2.8 3.1 3.6 7 2.2 11.2-3.4 10.4-15 7.7-15-3.4 0-6.2 2.8-10 7.4-10 2.1 0 4 .8 5.4 2.2zM245.2 16.2c-.6.6-1.2 2.9-1.2 5 0 3.1-.4 3.8-2 3.8s-2 .7-2 3.5.4 3.5 2 3.5c1.8 0 2 .7 2 8.5 0 10.1 1.6 14.7 5.9 16.9 3.9 2.1 11 2.1 11.7.1 1.2-3-.5-6.4-3.3-6.7-3.8-.4-5.3-3.9-5.3-12.1V32h4.1c3.9 0 4-.1 3.7-3.3-.3-2.9-.6-3.2-4-3.5-3.6-.3-3.7-.4-4-5-.3-4.4-.5-4.7-3.3-5-1.7-.2-3.6.3-4.3 1zM174 26.2c-5.2 3.6-7.3 7.1-7.8 13.1-.5 6.9 1 11.5 5.1 15.4 6 5.7 14.3 6.8 21.7 3 5.2-2.6 5.7-3.6 3.1-6.8-1.9-2.3-1.9-2.3-5.5-.6-4.4 2.1-6.8 2.1-10.5.3-2.2-1.2-5.1-5.2-5.1-7.1 0-.2 5.3-.6 11.8-.7l11.7-.3-.1-4c-.1-9-5.9-14.5-15.4-14.5-4.3 0-6.5.6-9 2.2zM204.7 24.6c-.4.4-.7 8.3-.7 17.6v16.9l4.3-.3 4.2-.3.5-10c.5-10.8 1.7-14.1 5.6-15.5 6.9-2.6 7.8-1.1 8.4 13.2l.5 12.3h8V28.8l-2.8-2.4c-4-3.4-12-3.4-17 0l-3.6 2.5-.3-2.2c-.2-1.6-1.1-2.3-3.3-2.5-1.7-.2-3.4 0-3.8.4z" />
    <path d="M262.4 25.5c-.4.8 2.4 8.5 6 16.9 5.3 12.4 6.4 15.9 5.7 17.8-1.3 3.4-3.5 4.9-6.7 4.6-2.2-.2-3.1.3-4.3 2.5-1.5 2.6-1.5 2.9.4 4.3 3.3 2.5 11.1 1.3 14.5-2.2 3.3-3.5 17.2-38.5 16.8-42.3-.2-2-.9-2.7-3.1-2.9-1.6-.2-3.5.2-4.2.8-.8.7-2.9 5.6-4.7 11.1-1.8 5.4-3.5 9.5-3.8 9.1-.4-.4-1.9-4.3-3.5-8.7-3.9-11.2-4.8-12.5-9.1-12.5-2.2 0-3.7.6-4 1.5z" />
  </svg>
);

export default SvgComponent;

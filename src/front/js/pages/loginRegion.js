import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Navigate } from "react-router-dom";

export const LoginRegion = () => {
  const Navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="text-center mt-5">
      LOGIN
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setError(false);
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setError(false);
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            actions.sendLoginRegionCredential(email, password);
            Navigate("/");
          }}
        >
          Login
        </button>
        {error ? (
          <p className="alert alert-danger">Error en credenciales</p>
        ) : null}
      </div>
    </div>
  );
};

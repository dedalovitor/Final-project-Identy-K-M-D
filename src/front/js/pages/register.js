import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const gettinRegister = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      navigate("/login");
    } else {
      setError(data.response);
    }
  };

  return (
    <div className="text-center mt-5">
      REGISTER
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setError(false);
              setName(e.target.value);
            }}
          ></input>
        </div>
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
        <button className="btn btn-primary" onClick={() => gettinRegister()}>
          Register
        </button>
        {error ? (
          <p className="alert alert-danger">Error en credenciales</p>
        ) : null}
      </div>
    </div>
  );
};

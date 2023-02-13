import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Regionregister = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [contactPersonTelf, setContactPersonTelf] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [nif, setNif] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [regions, setRegions] = useState("");

  const gettinRegionregister = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/regionregister",
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }
    );
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
        <div>
          <label htmlFor="contact person name">Contact name</label>
          <input
            name="name"
            placeholder="name"
            value={contactPersonName}
            onChange={(e) => {
              setError(false);
              setContactPersonName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="contact person tel">Contact tel</label>
          <input
            name="tel"
            placeholder="tel"
            value={contactPersonTelf}
            onChange={(e) => {
              setError(false);
              setContactPersonTelf(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="nif">Nif</label>
          <input
            name="nif"
            placeholder="nif"
            value={nif}
            onChange={(e) => {
              setError(false);
              setNif(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            name="Address"
            placeholder="Adress"
            value={address}
            onChange={(e) => {
              setError(false);
              setAddress(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            name="country"
            placeholder="country"
            value={country}
            onChange={(e) => {
              setError(false);
              setCountry(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            name="city"
            placeholder="city"
            value={city}
            onChange={(e) => {
              setError(false);
              setCity(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="regions">Regions</label>
          <input
            name="regions"
            placeholder="regions"
            value={regions}
            onChange={(e) => {
              setError(false);
              setRegions(e.target.value);
            }}
          ></input>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => gettinRegionregister()}
        >
          Register
        </button>
        {error ? (
          <p className="alert alert-danger">Error en credenciales</p>
        ) : null}
      </div>
    </div>
  );
};

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
          contactPersonName: contactPersonName,
          contactPersonTelf: contactPersonTelf,
          address: address,
          country: country,
          city: city,
          nif: nif,
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

    <div className="container">
      <div className="row justify-content-center">

        <div className="col-5 mt-5">
          <div className="card p-4">
            <h5>REGISTRAR REGIÓN</h5>
            <div>
              <div>
                <p class="mb-n1">Pon tu nombre de usuario (obligatorio)</p>
                <input
                  className="col-12"
                  name="name"
                  placeholder="nombre de usuario"
                  value={name}
                  onChange={(e) => {
                    setError(false);
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <p class="mb-n1">Escribe tu email (obligatorio)</p>
                <input
                  className="col-12"
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
                <p class="mb-n1">Escribe tu password (obligatorio)</p>
                <input
                  className="col-12"
                  name="password"
                  placeholder="debe de contener 6 caracteres alfanuméricos"
                  value={password}
                  onChange={(e) => {
                    setError(false);
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <p class="mb-n1">Escribe el nombre de tu persona de contacto</p>
                <input
                  className="col-12"
                  name="name"
                  placeholder="nombre y apellidos tal y como aparecen en el DNI"
                  value={contactPersonName}
                  onChange={(e) => {
                    setError(false);
                    setContactPersonName(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <p class="mb-n1">Escribe el número de teléfono de la persona de contacto</p>
                <input
                  className="col-12"
                  name="tel"
                  placeholder="número personal de teléfono"
                  value={contactPersonTelf}
                  onChange={(e) => {
                    setError(false);
                    setContactPersonTelf(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <p class="mb-n1">Introduce el NIF de tu organización pública</p>
                <input
                  className="col-12"
                  name="nif"
                  placeholder="número NIF"
                  value={nif}
                  onChange={(e) => {
                    setError(false);
                    setNif(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <p class="mb-n1">Introduce la dirección de tu organización pública</p>
                <input
                  className="col-12"
                  name="Address"
                  placeholder="dirección y código postal "
                  value={address}
                  onChange={(e) => {
                    setError(false);
                    setAddress(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <p class="mb-n1">Indica el país de tu organización pública</p>
                <input
                  className="col-12"
                  name="country"
                  placeholder="país"
                  value={country}
                  onChange={(e) => {
                    setError(false);
                    setCountry(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <p class="mb-n1">Introduce la ciudad de tu organización pública</p>
                <input
                  className="col-12"
                  name="city"
                  placeholder="ciudad"
                  value={city}
                  onChange={(e) => {
                    setError(false);
                    setCity(e.target.value);
                  }}
                ></input>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-outline-danger mt-4"
                  onClick={() => gettinRegionregister()}
                >
                  Registrarse
                </button>
                {error ? (
                  <p className="alert alert-danger">Error en credenciales</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

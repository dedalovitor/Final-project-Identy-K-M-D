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

    <div className="container">
      <div className="row justify-content-center">



        <div className="col-4 mt-5">
          <div className="card p-4">
            <h5>REGISTRAR USUARIO</h5>
            <div>
              <div>
                <p class="mb-n1">Pon tu nombre de usuario (obligatorio)</p>
                <input className="col-12"
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
                  type="email"
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
                  type="password"
                  placeholder="debe de contener 6 caracteres alfanuméricos"
                  value={password}
                  onChange={(e) => {
                    setError(false);
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
              <div className="text-center">
                <button className="btn btn-outline-danger mt-4" onClick={() => gettinRegister()}>
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
    </div >


  );
};

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { MyComponent } from "../component/mycomponent";

export const Login = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const sendLoginCredential = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      const userType = await actions.getCurrentUser();
      userType == "user" ? navigate("/") : userType == "region" ? navigate("/profileuserregion") : navigate("/login")

    } else {
      setError(true);
    }
  };

  return (

    <div className="container">
      <div className="row justify-content-center">



        <div className="col-3 mt-5">
          <div className="card p-4">
            <h5>LOGIN</h5>
            <div>
              <div >
                <p class="mb-n1">Email</p>
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
                <p class="mb-n1">Password</p>
                <input
                  className="col-12"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setError(false);
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-outline-primary mt-4"
                  onClick={() => sendLoginCredential()}
                >
                  Login
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

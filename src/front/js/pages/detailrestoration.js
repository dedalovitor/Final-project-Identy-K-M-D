import React, { useState, useEffect, useContext } from "react";
import { Commentbox } from "../component/commentbox";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const RestorationDetail = () => {
  const { store, actions } = useContext(Context);
  const [restorations, setRestorations] = useState({});
  const [comments, setComments] = useState([]);
  const [indexComments, setIndexComments] = useState([]);
  const params = useParams();
  useEffect(() => {
    getCurrentRestoration();
    getCurrentCommentsRestoration();
  }, []);
  const getCurrentRestoration = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/restorations/" + params.id
    );
    const data = await response.json();
    if (response.ok) {
      setRestorations(data.result);
    }
  };
  const getCurrentCommentsRestoration = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/commentsrestoration/" + params.id
    );
    const data = await response.json();
    if (response.ok) {
      setComments(data);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col p-4 restoration-image">
            <div className="text-bg-dark text-center">
              <img
                src={restorations.photo}
                className="imagerestoration"
                height="500"
                width="700"
              />
            </div>
          </div>
          <div className="col p-4">
            <div className="row">
              <div className="col-12">
                <div className="text-bg-dark text-center">
                  <h1>{restorations.name}</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>{restorations.resume}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Tipo de negocio: {restorations.type_bussiness}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Teléfono de contacto: {restorations.contact}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Horarios de apertura: {restorations.time_open}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Dirección: {restorations.location}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <a href="#scrollspyHeading1">Escribe tu comentario</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container justify-content-between">
        <div className="row">
          <div className="col p-4 restoration-image">
            <div className="text-bg-dark text-left">
              {comments &&
                comments.map((comentarios) => {
                  return (
                    <div
                      className="boxcomment mt-4"
                      style={{ width: "115%" }}
                      key={comentarios.id}
                    >
                      <h5 className="text-left">
                        <h5 className="text-left">
                          Comentario escrito por: {comentarios.user.name}
                        </h5>
                      </h5>
                      <div className="">
                        <h5 className="text-left">{comentarios.text}</h5>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col p-4 ">
            <div className="row col-10 mx-auto p-4">
              <iframe
                src={restorations.coordinates}
                width="800"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="row col-12 ">
          <div className="col-7 p-4">
            <div className="col-3 p-4"></div>
          </div>
        </div>
      </div>
      {store.userInfo ? (
        <div className="col-sm-12 text-center m-5" id="scrollspyHeading1">
          <Commentbox user_id={store.userInfo.id} restoration_id={params.id} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

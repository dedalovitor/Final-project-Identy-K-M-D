import React, { useState, useEffect, useContext } from "react";
import { Commentbox3 } from "../component/commentbox3";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const AccommodationDetail = () => {
  const { store, actions } = useContext(Context);
  const [accommodations, setAccommodations] = useState({});
  const [comments, setComments] = useState([]);
  const [indexComments, setIndexComments] = useState([]);
  const params = useParams();
  useEffect(() => {
    getCurrentAccommodation();
    getCurrentCommentsAccommodation();
  }, []);
  const getCurrentAccommodation = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/accommodations/" + params.id
    );
    const data = await response.json();
    if (response.ok) {
      setAccommodations(data.result);
    }
  };
  const getCurrentCommentsAccommodation = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/commentsaccommodation/" + params.id
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
          <div className="col p-4 accommodation-image">
            <div className="text-bg-dark text-center">
              <img
                src={accommodations.photo}
                className="imageaccommodation"
                height="500"
                width="700"
              />
            </div>
          </div>
          <div className="col p-4">
            <div className="row">
              <div className="col-12">
                <div className="text-bg-dark text-center">
                  <h1>{accommodations.name}</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>{accommodations.resume}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Tipo de negocio: {accommodations.type_bussiness}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Teléfono de contacto: {accommodations.contact}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Horarios de apertura: {accommodations.time_open}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Dirección: {accommodations.location}</p>
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
          <div className="col p-4 accommodation-image">
            <div className="text-bg-dark text-left">
              {comments &&
                comments.map((comentarios) => {
                  console.log(comentarios);
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
                src={accommodations.coordinates}
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
        <div className="col-sm-12 text-center m-5">
          <Commentbox3
            user_id={store.userInfo.id}
            accommodation_id={params.id}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

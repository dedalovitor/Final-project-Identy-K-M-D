import React, { useState, useEffect, useContext } from "react";
import { Commentbox4 } from "../component/commentbox4";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const ExperienceDetail = () => {
  const { store, actions } = useContext(Context);
  const [experiences, setExperiences] = useState({});
  const [comments, setComments] = useState([]);
  const [indexComments, setIndexComments] = useState([]);
  const params = useParams();
  useEffect(() => {
    getCurrentExperience();
    getCurrentCommentsExperience();
  }, []);
  const getCurrentExperience = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/experiences/" + params.id
    );
    const data = await response.json();
    if (response.ok) {
      setExperiences(data.result);
    }
  };
  const getCurrentCommentsExperience = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/commentsexperience/" + params.id
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
          <div className="col p-4 experience-image">
            <div className="text-bg-dark text-center">
              <img
                src={experiences.photo}
                className="imageexperience"
                height="500"
                width="700"
              />
            </div>
          </div>
          <div className="col p-4">
            <div className="row">
              <div className="col-12">
                <div className="text-bg-dark text-center">
                  <h1>{experiences.name}</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>{experiences.resume}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Teléfono de contacto: {experiences.contact}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Horarios de apertura: {experiences.time_open}</p>
                </div>
                <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Dirección: {experiences.location}</p>
                </div>
              </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
              <a href="#scrollspyHeading1">
                Escribe tu comentario
                </a>
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
            {/* {comments &&
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
              })} */}
            </div>
          </div>
          <div className="col p-4 ">
            <div className="row col-10 mx-auto p-4">
              
              <iframe
                src={experiences.coordinates}
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
      {store.userInfo ? (
        <div className="col-sm-12 text-center m-5" id="scrollspyHeading1">
          <Commentbox4 user_id={store.userInfo.id} experience_id={params.id} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

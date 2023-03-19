import React, { useState, useEffect, useContext } from "react";
import { Commentbox2 } from "../component/commentbox2";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const PatrimonyDetail = () => {
  const { store, actions } = useContext(Context);
  const [patrimonys, setPatrimonys] = useState({});
  const [comments, setComments] = useState([]);
  const [indexComments, setIndexComments] = useState([]);
  const params = useParams();
  useEffect(() => {
    getCurrentPatrimony();
    getCurrentCommentsPatrimony();
  }, []);
  const getCurrentPatrimony = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/patrimonys/" + params.id
    );
    const data = await response.json();
    if (response.ok) {
      setPatrimonys(data.result);
    }
  };

  const getCurrentCommentsPatrimony = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/commentspatrimony/" + params.id
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
          <div className="col p-4 patrimony-image">
            <div className="text-bg-dark text-center">
              <img
                src={patrimonys.photo}
                className="imagepatrimony"
                height="500"
                width="700"
              />
            </div>
          </div>
          <div className="col p-4">
            <div className="row">
              <div className="col-12">
                <div className="text-bg-dark text-center">
                  <h1>{patrimonys.name}</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>{patrimonys.resume}</p>
                </div>
              </div>
              <div className="col-12">
              <div className="text-bg-dark text-left p-2">
                  <p>Tipo de patrimonio: {patrimonys.type_bussiness}</p>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Teléfono de contacto: {patrimonys.contact}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Horarios de apertura: {patrimonys.time_open}</p>
                </div>
                <div className="col-12">
                <div className="text-bg-dark text-left p-2">
                  <p>Dirección: {patrimonys.location}</p>
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
                src={patrimonys.coordinates}
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
          <Commentbox2 user_id={store.userInfo.id} patrimony_id={params.id} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

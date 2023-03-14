import React, { useState, useEffect, useContext } from "react";
import { Commentbox2 } from "../component/commentbox2";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const PatrimonyDetail = () => {
  const { store, actions } = useContext(Context);
  const [patrimonys, setPatrimonys] = useState({});
  const [comments, setComments] = useState({});
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
      console.log(data);
      setComments(data.result);
    }
  };
  return (
    <>
      <div className="container h-25 d-flex justify-content-center align-items-center p-4"></div>

      <div className="container">
        <div className="row">
          <div className="col p-4 patrimony-image">
            <div className="text-bg-dark text-center">
              <img
                src={patrimonys.photo}
                className="imagepatrimony"
                height="500"
                width="700"
              ></img>
            </div>
          </div>
          <div className="col p-4 patrimony-resume">
            <div className="text-bg-dark text-center">
              <h1>{patrimonys.name}</h1>
            </div>
            <div className="text-bg-dark text-left p-2">
              <p>{patrimonys.resume}</p>
            </div>
          </div>
        </div>
      </div>
      <iframe
        src={patrimonys.location}
        width="600"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      />
      {store.userInfo ? (
        <div className="col-sm-12 text-center m-5">
          <Commentbox2 user_id={store.userInfo.id} patrimony_id={params.id} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

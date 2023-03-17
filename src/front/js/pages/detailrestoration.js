import React, { useState, useEffect, useContext } from "react";
import { Commentbox } from "../component/commentbox";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const RestorationDetail = () => {
  const { store, actions } = useContext(Context);
  const [restorations, setRestorations] = useState({});
  const [comments, setComments] = useState({});
  const [indexComments, setIndexComments] = useState([]);
  const params = useParams();
  useEffect(() => {
    getCurrentRestoration();
    getCurrentCommentsRestoration();
    console.log(setComments);
  }, [setComments]);
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
      console.log(data);
      setComments(data.result);
    }
  };
  console.log(comments);
  return (
    <>
      <div className="container h-25 d-flex justify-content-center align-items-center p-4">
        <div>
          <button type="button" className="btn btn-outline-danger m-2">
            Lugares que Visitar/Patrimonio
          </button>
          <button type="button" className="btn btn-outline-success m-2">
            Restaurantes/Gastronomia
          </button>
          <button type="button" className="btn btn-outline-primary m-2">
            Alojamientos
          </button>
          <button type="button" className="btn btn-outline-warning m-2">
            Visitas Guiadas
          </button>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col p-4 restoration-image">
            <div className="text-bg-dark text-center">
              <img
                src={restorations.photo}
                className="imagerestoration"
                height="500"
                width="700"
              ></img>
            </div>
          </div>
          <div className="col p-4 restorationy-resume">
            <div className="text-bg-dark text-center">
              <h1>{restorations.name}</h1>
            </div>
            <div className="text-bg-dark text-left p-2">
              <p>{restorations.resume}</p>
            </div>
          </div>
        </div>
      </div>

      {/* {comments.map((indexComment) => {
        return (
          <div className="">
            <h5 className="text-center">{comments[indexComment].user}</h5>
            <div className="">
              <h5 className="text-center">{comments[indexComment].text}</h5>
            </div>
          </div>
        );
      })} */}
      {store.userInfo ? (
        <div className="col-sm-12 text-center m-5">
          <Commentbox user_id={store.userInfo.id} restoration_id={params.id} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

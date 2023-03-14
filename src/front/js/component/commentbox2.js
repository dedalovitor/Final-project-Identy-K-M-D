import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Commentbox2 = (props) => {
  const { store, actions } = useContext(Context);
  const [comment, setComment] = useState("");
  const [successComment, setsuccessComment] = useState(false);
  const params = useParams();
  const createCommentPatrimony = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/addcommentspatrimony/" + params.id,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          comment: comment,
          user_id: props.user_id,
          user_region_id: props.user_region_id,
          patrimony_id: props.patrimony_id,
        }),
      }
    );
    setsuccessComment(true);
  };

  return (
    <div>
      <p>
        Escrito por {store.userInfo.name}:
        <br />
        <textarea
          style={{ width: "700px", height: "200px" }}
          onChange={(e) => setComment(e.target.value)}
        />
      </p>
      <br />
      {successComment ? (
        <p>Su mensaje ha sido enviado con éxito</p>
      ) : (
        <button className="btn btn-success" onClick={createCommentPatrimony}>
          Enviar Comentario
        </button>
      )}
    </div>
  );
};

export default Commentbox2;

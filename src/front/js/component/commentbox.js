import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Commentbox = (props) => {
  const { store, actions } = useContext(Context);
  const [comment, setComment] = useState("");
  const [successComment, setsuccessComment] = useState(false);
  const params = useParams();
  const createCommentRestoration = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/addcomments/" + params.id,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ comment: comment, user_id: props.user_id, restoration_id: props.restoration_id }),
      }
    );
    successComment(true);
    if (response.ok) getCurrentUserComment();
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
        <button className="btn btn-success" onClick={createCommentRestoration}>
          Enviar Comentario
        </button>
      )}
    </div>
  );
};

export default Commentbox;

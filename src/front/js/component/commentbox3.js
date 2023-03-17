import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Commentbox3 = (props) => {
  const { store, actions } = useContext(Context);
  const [comment, setComment] = useState("");
  const [successComment, setSuccessComment] = useState(false);
  const params = useParams();
  const createCommentAccommodation = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/addcommentsaccommodation/" + params.id,
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
          accommodation_id: props.accommodation_id,
        }),
      }
    );
    setSuccessComment(true);
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
        <button
          className="btn btn-success"
          onClick={createCommentAccommodation}
        >
          Enviar Comentario
        </button>
      )}
    </div>
  );
};

export default Commentbox3;

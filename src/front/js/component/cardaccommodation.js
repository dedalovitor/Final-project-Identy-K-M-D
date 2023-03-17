import React, { useState } from "react";

export const CardAccommodation = () => {
  const { accommodation, setAccommodation } = useState({
    name: "",
    resume: "",
    photo: "",
    logo: "",
    type_bussiness: "",
  });
  return (
    <div className="cardAccommodation">
      <input
        name="name"
        value={accommodation.name}
        onChange={() =>
          setAccommodation({ ...accommodation, [e.name]: e.target.value })
        }
      ></input>
      <i class="fa-regular fa-heart"></i>
      <input
        name="resume"
        value={accommodation.resume}
        onChange={() =>
          setAccommodation({ ...accommodation, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="photo"
        value={accommodation.photo}
        onChange={() =>
          setAccommodation({ ...accommodation, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="logo"
        value={accommodation.logo}
        onChange={() =>
          setAccommodation({ ...accommodation, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="type_bussiness"
        value={accommodation.type_bussiness}
        onChange={() =>
          setAccommodation({ ...accommodation, [e.name]: e.target.value })
        }
      ></input>
    </div>
  );
};

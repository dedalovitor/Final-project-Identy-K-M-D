import React, { useState } from "react";

export const CardExperience = () => {
  const { experience, setExperience } = useState({
    name: "",
    resume: "",
    photo: "",
    logo: "",
  });
  return (
    <>
      <div className="cardexperience">
        <input
          name="name"
          value={experience.name}
          onChange={() =>
            setExperience({ ...experience, [e.name]: e.target.value })
          }
        ></input>
        <input
          name="resume"
          value={experience.resume}
          onChange={() =>
            setExperience({ ...experience, [e.name]: e.target.value })
          }
        ></input>
        <input
          name="photo"
          value={experience.photo}
          onChange={() =>
            setExperience({ ...experience, [e.name]: e.target.value })
          }
        ></input>
        <input
          name="logo"
          value={experience.logo}
          onChange={() =>
            setExperience({ ...experience, [e.name]: e.target.value })
          }
        ></input>
      </div>
    </>
  );
};

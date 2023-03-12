import React, { useState } from "react";

export const CardRestoration = () => {
  const { restoration, setRestoration } = useState({
    name: "",
    resume: "",
    photo: "",
    logo: "",
    type_bussiness: "",
  });
  return (
    <div className="cardrestoration">
      <input
        name="name"
        value={restoration.name}
        onChange={() =>
          setRestoration({ ...restoration, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="resume"
        value={restoration.resume}
        onChange={() =>
          setRestoration({ ...restoration, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="photo"
        value={restoration.photo}
        onChange={() =>
          setRestoration({ ...restoration, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="logo"
        value={restoration.logo}
        onChange={() =>
          setRestoration({ ...restoration, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="type_bussiness"
        value={restoration.type_bussiness}
        onChange={() =>
          setRestoration({ ...restoration, [e.name]: e.target.value })
        }
      ></input>
    </div>
  );
};

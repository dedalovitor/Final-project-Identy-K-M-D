import React, { useState } from "react";

export const CardRegion = () => {
  const { region, setRegion } = useState({
    name: "",
    resume: "",
    photo: "",
    logo: "",
  });
  return <div className="cardregion">
    <input
      name="name"
      value={region.name}
      onChange={() => setRegion({ ...region, [e.name]: e.target.value })}
    ></input>
    <input
      name="resume"
      value={region.resume}
      onChange={() => setRegion({ ...region, [e.name]: e.target.value })}
    ></input>
    <input
      name="photo"
      value={region.photo}
      onChange={() => setRegion({ ...region, [e.name]: e.target.value })}
    ></input>
    <input
      name="logo"
      value={region.logo}
      onChange={() => setRegion({ ...region, [e.name]: e.target.value })}
    ></input>
  </div>
};

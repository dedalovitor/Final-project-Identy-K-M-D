import React, { useState } from "react";

export const CardPatrimony = () => {
  const { patrimony, setPatrimony } = useState({
    name: "",
    resume: "",
    photo: "",
    logo: "",
  });
  return (
    <div className="cardpatrimony">
      <input
        name="name"
        value={patrimony.name}
        onChange={() =>
          setPatrimony({ ...patrimony, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="resume"
        value={patrimony.resume}
        onChange={() =>
          setPatrimony({ ...patrimony, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="photo"
        value={patrymony.photo}
        onChange={() =>
          setPatrimony({ ...patrimony, [e.name]: e.target.value })
        }
      ></input>
      <input
        name="logo"
        value={patrimony.logo}
        onChange={() =>
          setPatrimony({ ...patrimony, [e.name]: e.target.value })
        }
      ></input>
    </div>
  );
};

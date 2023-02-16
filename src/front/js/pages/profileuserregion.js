import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Profileuserregion = () => {
    const { store, actions } = useContext(Context);
    const [region, setRegion] = useState({ name: "", resume: "", photo: "", logo: "" });
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        getCurrentUserRegions();
    }, [])

    const getCurrentUserRegions = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/regions", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        const data = await response.json();
        setRegions(data.results);
    }

    const createRegion = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/region", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(region)
        });
        if (response.ok)
            getCurrentUserRegions();
    }

    const deleteRegion = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/region/" + id, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        if (response.ok) getCurrentUserRegions();
    }


    return (
        <div className="container">
            {store.currentUserEmail ?
                <>
                    <div className="card COL-5 w-25 p-3">
                        {Object.keys(region).map((key, i) => {
                            if (typeof region[key] != "boolean") {
                                return <input placeholder={key} key={i} name={key} defaultValue={region[key]}
                                    onChange={(e) => setRegion({ ...region, [key]: e.target.value })}>
                                </input>
                            } else {
                                return <input type="checkbox" key={i} name={key} checked={region[key]}
                                    onChange={(e) => setRegion({ ...region, [key]: e.target.checked })}>
                                </input>
                            }

                        })}
                        <button className="btn btn-success" onClick={() => createRegion()}>CREATE REGION</button>
                    </div>

                    <div className="row">
                        {regions?.map((region) => {
                            return <div key={region.id} className="card" style={{ width: "18rem" }}>
                                <img className="card-img-top" src="https://www.cdc.gov/healthypets/images/pets/angry-dog.jpg?_=03873" alt="Card image cap" />
                                <div className="card-body">
                                    <p className="card-text"> name: {region.name} </p>
                                    <p className="card-text"> resume: {region.resume} </p>
                                    <p className="card-text"> photo: {region.photo} </p>
                                    <p className="card-text"> logo: {region.logo} </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => deleteRegion(region.id)}>DEL</button>
                                </div>
                            </div>
                        })}

                    </div>
                </> :
                "Please register or login"}
        </div >
    );

};

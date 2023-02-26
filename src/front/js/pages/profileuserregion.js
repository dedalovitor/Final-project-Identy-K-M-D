import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Profileuserregion = () => {
    const { store, actions } = useContext(Context);
    const [region, setRegion] = useState({ name: "", resume: "", photo: "", logo: "" });
    const [regions, setRegions] = useState([]);
    const [patrimony, setPatrimony] = useState({ name: "", resume: "", photo: "", logo: "" });
    const [patrimonys, setPatrimonys] = useState([]);
    const [restoration, setRestoration] = useState({ name: "", resume: "", photo: "", logo: "", type_bussiness: "" });
    const [restorations, setRestorations] = useState([]);


    useEffect(() => {
        getCurrentUserRegions();
    }, [])

    useEffect(() => {
        getCurrentRegionPatrimony();
    }, [])

    useEffect(() => {
        getCurrentRegionRestoration();
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

    const getCurrentRegionPatrimony = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/patrimonys", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        const data = await response.json();
        setPatrimonys(data.results);
    }

    const getCurrentRegionRestoration = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/restorations", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        const data = await response.json();
        setRestorations(data.results);
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
        if (response.ok) getCurrentUserRegions();
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


    const createPatrimony = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/patrimony", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(patrimony)
        });
        if (response.ok) getCurrentRegionPatrimony();
    }

    const deletePatrimony = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/patrimony/" + id, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        if (response.ok) getCurrentRegionPatrimony();
    }

    const createRestoration = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/restoration", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(restoration)
        });
        if (response.ok) getCurrentRegionRestoration();
    }

    const deleteRestoration = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/restoration/" + id, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        if (response.ok) getCurrentRegionRestoration();
    }

    return (
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
                {regions.map((x) => {
                    return <div key={x.id} className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src="https://www.cdc.gov/healthypets/images/pets/angry-dog.jpg?_=03873" alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text"> name: {x.name} </p>
                            <p className="card-text"> resume: {x.resume} </p>
                            <p className="card-text"> photo: {x.photo} </p>
                            <p className="card-text"> logo: {x.logo} </p>

                        </div>
                        <div className="card-footer">
                            <button className="btn btn-danger" onClick={() => deleteRegion(x.id)}>DEL</button>
                        </div>
                    </div>
                })}

            </div>
            <div className="card COL-5 w-25 p-3">
                {Object.keys(patrimony).map((key, i) => {
                    if (typeof patrimony[key] != "boolean") {
                        return <input placeholder={key} key={i} name={key} defaultValue={patrimony[key]}
                            onChange={(e) => setPatrimony({ ...patrimony, [key]: e.target.value })}>
                        </input>
                    } else {
                        return <input type="checkbox" key={i} name={key} checked={patrimony[key]}
                            onChange={(e) => setPatrimony({ ...patrimony, [key]: e.target.checked })}>
                        </input>
                    }

                })}
                <button className="btn btn-success" onClick={() => createPatrimony()}>CREATE PATRIMONY</button>
            </div>
            <div className="row">
                {patrimonys.map((x) => {
                    return <div key={x.id} className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src="https://www.cdc.gov/healthypets/images/pets/angry-dog.jpg?_=03873" alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text"> name: {x.name} </p>
                            <p className="card-text"> resume: {x.resume} </p>
                            <p className="card-text"> photo: {x.photo} </p>
                            <p className="card-text"> logo: {x.logo} </p>

                        </div>
                        <div className="card-footer">
                            <button className="btn btn-danger" onClick={() => deletePatrimony(x.id)}>DEL</button>
                        </div>
                    </div>
                })}

            </div>
            <div className="card COL-5 w-25 p-3">
                {Object.keys(restoration).map((key, i) => {
                    return <input placeholder={key} key={i} name={key} defaultValue={restoration[key]}
                        onChange={(e) => setRestoration({ ...restoration, [key]: e.target.value })}>
                    </input>
                }

                )}
                <button className="btn btn-success" onClick={() => createRestoration()}>CREATE RESTORATION</button>
            </div>
            <div className="row">
                {restorations.map((x) => {
                    return <div key={x.id} className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src="https://www.cdc.gov/healthypets/images/pets/angry-dog.jpg?_=03873" alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text"> name: {x.name} </p>
                            <p className="card-text"> resume: {x.resume} </p>
                            <p className="card-text"> photo: {x.photo} </p>
                            <p className="card-text"> logo: {x.logo} </p>
                            <p className="card-text"> type bussiness: {x.type_bussiness} </p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-danger" onClick={() => deleteRestoration(x.id)}>DEL</button>
                        </div>
                    </div>
                })}

            </div>
        </>
    );

};

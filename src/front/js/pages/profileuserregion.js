import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { NewFile } from "../component/newfile";
import { useNavigate } from "react-router-dom";

export const Profileuserregion = () => {
    const { store, actions } = useContext(Context);
    const [region, setRegion] = useState({ name: "", resume: "", photo: "", logo: "" });
    const [regions, setRegions] = useState([]);
    const [patrimony, setPatrimony] = useState({ name: "", resume: "", photo: "", logo: "", type_bussiness: "", time_open: "", location: "", coordinates: "", contact: "" });
    const [patrimonys, setPatrimonys] = useState([]);
    const [restoration, setRestoration] = useState({ name: "", resume: "", photo: "", logo: "", type_bussiness: "", time_open: "", location: "", coordinates: "", cart: "", contact: "" });
    const [restorations, setRestorations] = useState([]);
    const [accommodation, setAccommodation] = useState({ name: "", resume: "", photo: "", logo: "", type_bussiness: "", time_open: "", location: "", coordinates: "", contact: "" });
    const [accommodations, setAccommodations] = useState([]);
    const [experience, setExperience] = useState({ name: "", resume: "", photo: "", logo: "", type_bussiness: "", time_open: "", meeting_point: "", coordinates: "", contact: "" });
    const [experiences, setExperiences] = useState([]);


    useEffect(() => {
        getCurrentUserRegions();
    }, [])

    useEffect(() => {
        getCurrentRegionPatrimony();
    }, [])

    useEffect(() => {
        getCurrentRegionRestoration();
    }, [])

    useEffect(() => {
        getCurrentRegionAccommodation();
    }, [])

    useEffect(() => {
        getCurrentRegionExperience();
    }, [])

    const getCurrentUserRegions = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/regions_user", {
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
        const response = await fetch(process.env.BACKEND_URL + "/api/patrimonys_user", {
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
        const response = await fetch(process.env.BACKEND_URL + "/api/restorations_user", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        const data = await response.json();
        setRestorations(data.results);
    }

    const getCurrentRegionAccommodation = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/accommodations_user", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        const data = await response.json();
        setAccommodations(data.results);
    }

    const getCurrentRegionExperience = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/experiences_user", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        const data = await response.json();
        setExperiences(data.results);
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
    const createAccommodation = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/accommodation", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(accommodation)
        });
        if (response.ok) getCurrentRegionAccommodation();
    }

    const deleteAccommodation = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/accommodation/" + id, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        if (response.ok) getCurrentRegionAccommodation();
    }

    const createExperience = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/experience", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(experience)
        });
        if (response.ok) getCurrentRegionExperience();
    }

    const deleteExperience = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/experience/" + id, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        if (response.ok) getCurrentRegionExperience();
    }

    return (
        <>
            <nav id="navbar-example2" className="navbar bg-info px-3 mb-3 d-flex justify-content-center">
                <ul class="nav nav-pills h4">
                    <li class="nav-item">
                        <a class="nav-link link-light" href="#scrollspyHeading1">Tu región</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-light" href="#scrollspyHeading2">Patrimonio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-light" href="#scrollspyHeading3">Restauración</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-light" href="#scrollspyHeading4">Hostelería</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-light" href="#scrollspyHeading5">Experiencias</a>
                    </li>
                </ul>
            </nav>
            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
                <div className="container mt-5">
                    <p className="h2" id="scrollspyHeading1">Tu región</p>
                    <div className="row col-12">
                        <div className="col-4">
                            <div className="card">
                                <input name="name" value={region.name} onChange={(e) => setRegion({ ...region, "name": e.target.value })}></input>
                                <input name="resume" value={region.resume} onChange={(e) => setRegion({ ...region, "resume": e.target.value })}></input>

                                <NewFile />

                                <button className="btn btn-success" onClick={() => createRegion()}>CREATE REGION</button>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row">
                                {regions.map((x) => {
                                    return <div key={x.id} className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={x.photo} alt="Card image cap" />
                                        <img className="card-img-top" src={x.logo} alt="Card image cap" />
                                        <div className="card-body">
                                            <p className="card-text"> name: {x.name} </p>
                                            <p className="card-text"> resume: {x.resume} </p>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger" onClick={() => deleteRegion(x.id)}>DEL</button>
                                        </div>
                                    </div>
                                })}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <p className="h2" id="scrollspyHeading2">Tu patrimonio</p>
                    <div className="row col-12">
                        <div className="col-4">
                            <div className="card">
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
                        </div>
                        <div className="col-8">
                            <div className="row">
                                {patrimonys.map((x) => {
                                    return <div key={x.id} className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={x.photo} alt="Card image cap" />
                                        <img className="card-img-top" src={x.logo} alt="Card image cap" />
                                        <div className="card-body">
                                            <p className="card-text"> name: {x.name} </p>
                                            <p className="card-text"> resume: {x.resume} </p>
                                            <p className="card-text"> type bussiness: {x.type_bussiness} </p>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger" onClick={() => deletePatrimony(x.id)}>DEL</button>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <p className="h2" id="scrollspyHeading3">Tu restauración</p>
                    <div className="row col-12">
                        <div className="col-4">
                            <div className="card">
                                {Object.keys(restoration).map((key, i) => {
                                    return <input placeholder={key} key={i} name={key} defaultValue={restoration[key]}
                                        onChange={(e) => setRestoration({ ...restoration, [key]: e.target.value })}>
                                    </input>
                                })}
                                <button className="btn btn-success" onClick={() => createRestoration()}>CREATE RESTORATION</button>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row">
                                {restorations.map((x) => {
                                    return <div key={x.id} className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={x.photo} alt="Card image cap" />
                                        <img className="card-img-top" src={x.logo} alt="Card image cap" />
                                        <div className="card-body">
                                            <p className="card-text"> name: {x.name} </p>
                                            <p className="card-text"> resume: {x.resume} </p>
                                            <p className="card-text"> type bussiness: {x.type_bussiness} </p>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger" onClick={() => deleteRestoration(x.id)}>DEL</button>
                                        </div>
                                    </div>
                                })}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <p className="h2" id="scrollspyHeading4">Tu hostelería</p>
                    <div className="row col-12">
                        <div className="col-4">
                            <div className="card">
                                {Object.keys(accommodation).map((key, i) => {
                                    return <input placeholder={key} key={i} name={key} defaultValue={accommodation[key]}
                                        onChange={(e) => setAccommodation({ ...accommodation, [key]: e.target.value })}>
                                    </input>
                                }

                                )}
                                <button className="btn btn-success" onClick={() => createAccommodation()}>CREATE ACCOMMODATION</button>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row">
                                {accommodations.map((x) => {
                                    return <div key={x.id} className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={x.photo} alt="Card image cap" />
                                        <img className="card-img-top" src={x.logo} alt="Card image cap" />
                                        <div className="card-body">
                                            <p className="card-text"> name: {x.name} </p>
                                            <p className="card-text"> resume: {x.resume} </p>
                                            <p className="card-text"> type bussiness: {x.type_bussiness} </p>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger" onClick={() => deleteAccommodation(x.id)}>DEL</button>
                                        </div>
                                    </div>


                                })}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-5">
                    <p className="h2" id="scrollspyHeading5">Tus experiencias</p>
                    <div className="row col-12">
                        <div className="col-4">
                            <div className="card">
                                {Object.keys(experience).map((key, i) => {
                                    return <input placeholder={key} key={i} name={key} defaultValue={experience[key]}
                                        onChange={(e) => setExperience({ ...experience, [key]: e.target.value })}>
                                    </input>
                                }

                                )}
                                <button className="btn btn-success" onClick={() => createExperience()}>CREATE EXPERIENCE</button>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row">
                                {experiences.map((x) => {
                                    return <div key={x.id} className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={x.photo} alt="Card image cap" />
                                        <img className="card-img-top" src={x.logo} alt="Card image cap" />
                                        <div className="card-body">
                                            <p className="card-text"> name: {x.name} </p>
                                            <p className="card-text"> resume: {x.resume} </p>
                                            <p className="card-text"> type bussiness: {x.type_bussiness} </p>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger" onClick={() => deleteExperience(x.id)}>DEL</button>
                                        </div>
                                    </div>


                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

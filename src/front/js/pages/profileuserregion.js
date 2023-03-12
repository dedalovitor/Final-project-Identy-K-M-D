import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { MyComponent } from "../component/mycomponent";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


export const Profileuserregion = () => {
    const { store, actions } = useContext(Context);
    const [region, setRegion] = useState({ name: "", resume: "" });
    const [regions, setRegions] = useState([]);
    const [patrimony, setPatrimony] = useState({ name: "", resume: "", type_bussiness: "patrimonio natural", time_open: "", location: "", longitud: "", latitud: "", contact: "" });
    const [patrimonys, setPatrimonys] = useState([]);
    const [restoration, setRestoration] = useState({ name: "", resume: "", type_bussiness: "restaurante", time_open: "", location: "", longitud: "", latitud: "", contact: "" });
    const [restorations, setRestorations] = useState([]);
    const [accommodation, setAccommodation] = useState({ name: "", resume: "", type_bussiness: "hotel", time_open: "", location: "", longitud: "", latitud: "", contact: "" });
    const [accommodations, setAccommodations] = useState([]);
    const [experience, setExperience] = useState({ name: "", resume: "", type_bussiness: "turismo activo", time_open: "", meeting_point: "", longitud: "", latitud: "", contact: "" });
    const [experiences, setExperiences] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [logo, setLogo] = useState(null);
    const [cart, setCart] = useState(null);
    const [patrimonyChoice, setPatrimonyChoice] = useState([]);
    const [restorationChoice, setRestorationChoice] = useState([]);
    const [experienceChoice, setExperienceChoice] = useState([]);
    const [accommodationChoice, setAccommodationChoice] = useState([]);



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

    useEffect(() => {
        getCurrentPatrimonyChoices();
    }, [])

    useEffect(() => {
        getCurrentRestorationChoices();
    }, [])

    useEffect(() => {
        getCurrentExperienceChoices();
    }, [])

    useEffect(() => {
        getCurrentAccommodationChoices();
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const [map, setMap] = React.useState(null)

    const center = {
        lat: 39.45712255279278,
        lng: -0.3541559016389045
    }

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
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

    const getCurrentPatrimonyChoices = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/patrimony_choice", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
            }
        });
        const data = await response.json();
        setPatrimonyChoice(data.results);
    }

    const getCurrentRestorationChoices = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/restoration_choice", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
            }
        });
        const data = await response.json();
        setRestorationChoice(data.results);
    }

    const getCurrentExperienceChoices = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/experience_choice", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
            }
        });
        const data = await response.json();
        setExperienceChoice(data.results);
    }

    const getCurrentAccommodationChoices = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/accommodation_choice", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
            }
        });
        const data = await response.json();
        setAccommodationChoice(data.results);
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
        let body = new FormData();
        body.append("photo", photo[0]);
        body.append("logo", logo[0]);
        body.append("region", JSON.stringify(region));
        const response = await fetch(process.env.BACKEND_URL + "/api/region", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: body
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
        let body = new FormData();
        body.append("photo", photo[0]);
        body.append("logo", logo[0]);
        body.append("patrimony", JSON.stringify(patrimony));
        const response = await fetch(process.env.BACKEND_URL + "/api/patrimony", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: body
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
        let body = new FormData();
        body.append("photo", photo[0]);
        body.append("logo", logo[0]);
        body.append("cart", cart[0]);
        body.append("restoration", JSON.stringify(restoration));
        const response = await fetch(process.env.BACKEND_URL + "/api/restoration", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: body
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
        let body = new FormData();
        body.append("photo", photo[0]);
        body.append("logo", logo[0]);
        body.append("accommodation", JSON.stringify(accommodation));
        const response = await fetch(process.env.BACKEND_URL + "/api/accommodation", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: body
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
        let body = new FormData();
        body.append("photo", photo[0]);
        body.append("logo", logo[0]);
        body.append("experience", JSON.stringify(experience));
        const response = await fetch(process.env.BACKEND_URL + "/api/experience", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: body
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

                                <p>Sube la foto</p>
                                <input type="file" onChange={e => setPhoto(e.target.files)} />
                                <p>Sube el logo</p>
                                <input type="file" onChange={e => setLogo(e.target.files)} />


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
                                <input name="name" placeholder="name" value={patrimony.name} onChange={(e) => setPatrimony({ ...patrimony, "name": e.target.value })}></input>
                                <input name="resume" placeholder="resume" value={patrimony.resume} onChange={(e) => setPatrimony({ ...patrimony, "resume": e.target.value })}></input>
                                <input name="location" placeholder="location" value={patrimony.location} onChange={(e) => setPatrimony({ ...patrimony, "location": e.target.value })}></input>
                                <input name="time_open" placeholder="time open" value={patrimony.time_open} onChange={(e) => setPatrimony({ ...patrimony, "time_open": e.target.value })}></input>
                                <input name="latitud" placeholder="latitud" value={patrimony.latitud} onChange={(e) => setPatrimony({ ...patrimony, "latitud": e.target.value })}></input>
                                <input name="longitud" placeholder="longitud" value={patrimony.longitud} onChange={(e) => setPatrimony({ ...patrimony, "longitud": e.target.value })}></input>
                                <input name="contact" placeholder="contact" value={patrimony.contact} onChange={(e) => setPatrimony({ ...patrimony, "contact": e.target.value })}></input>
                                <select class="form-select" aria-label="Default select example" onChange={(e) => setPatrimony({ ...patrimony, "type_bussiness": e.target.value })}>
                                    <option disabled>tipo de patrimonio</option>
                                    {patrimonyChoice.map((x) => {
                                        return <option key={x} value={x} >{x}</option>
                                    })}

                                </select>
                                <p>Sube la foto</p>
                                <input type="file" onChange={e => setPhoto(e.target.files)} />
                                <p>Sube el logo</p>
                                <input type="file" onChange={e => setLogo(e.target.files)} />

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
                                            <p className="card-text"> location: {x.location} </p>
                                            <p className="card-text"> time_open: {x.time_open} </p>
                                            <p className="card-text"> contact: {x.contact} </p>
                                            <p className="card-text"> type bussiness: patrimonio {x.type_bussiness} </p>
                                            <GoogleMap
                                                mapContainerStyle={{
                                                    width: '400px',
                                                    height: '400px'
                                                }}
                                                center={center}
                                                zoom={14}

                                                onLoad={onLoad}
                                                onUnmount={onUnmount}
                                            >
                                                { /* Child components, such as markers, info windows, etc. */}
                                                <></>
                                            </GoogleMap>
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
                                <input name="name" placeholder="name" value={restoration.name} onChange={(e) => setRestoration({ ...restoration, "name": e.target.value })}></input>
                                <input name="resume" placeholder="resume" value={restoration.resume} onChange={(e) => setRestoration({ ...restoration, "resume": e.target.value })}></input>
                                <input name="location" placeholder="location" value={restoration.location} onChange={(e) => setRestoration({ ...restoration, "location": e.target.value })}></input>
                                <input name="time_open" placeholder="time open" value={restoration.time_open} onChange={(e) => setRestoration({ ...restoration, "time_open": e.target.value })}></input>
                                <input name="latitud" placeholder="latitud" value={restoration.latitud} onChange={(e) => setRestoration({ ...restoration, "latitud": e.target.value })}></input>
                                <input name="longitud" placeholder="longitud" value={restoration.longitud} onChange={(e) => setRestoration({ ...restoration, "longitud": e.target.value })}></input>
                                <input name="contact" placeholder="contact" value={restoration.contact} onChange={(e) => setRestoration({ ...restoration, "contact": e.target.value })}></input>
                                <select class="form-select" aria-label="Default select example" onChange={(e) => setRestoration({ ...restoration, "type_bussiness": e.target.value })}>
                                    <option disabled>tipo de restauración</option>
                                    {restorationChoice.map((x) => {
                                        return <option key={x} value={x} >{x}</option>
                                    })}

                                </select>
                                <p>Sube la foto</p>
                                <input type="file" onChange={e => setPhoto(e.target.files)} />
                                <p>Sube el logo</p>
                                <input type="file" onChange={e => setLogo(e.target.files)} />
                                <p>Sube la carta</p>
                                <input type="file" onChange={e => setCart(e.target.files)} />

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
                                            <p className="card-text"> location: {x.location} </p>
                                            <p className="card-text"> time_open: {x.time_open} </p>
                                            <p className="card-text"> contact: {x.contact} </p>
                                            <p className="card-text"> type bussiness: {x.type_bussiness} </p>
                                            <a href={x.cart} download>ve la carta</a>
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
                                <input name="name" placeholder="name" value={accommodation.name} onChange={(e) => setAccommodation({ ...accommodation, "name": e.target.value })}></input>
                                <input name="resume" placeholder="resume" value={accommodation.resume} onChange={(e) => setAccommodation({ ...accommodation, "resume": e.target.value })}></input>
                                <input name="time_open" placeholder="time open" value={accommodation.time_open} onChange={(e) => setAccommodation({ ...accommodation, "time_open": e.target.value })}></input>
                                <input name="latitud" placeholder="latitud" value={accommodation.latitud} onChange={(e) => setAccommodation({ ...accommodation, "latitud": e.target.value })}></input>
                                <input name="longitud" placeholder="longitud" value={accommodation.longitud} onChange={(e) => setAccommodation({ ...accommodation, "longitud": e.target.value })}></input>
                                <input name="contact" placeholder="contact" value={accommodation.contact} onChange={(e) => setAccommodation({ ...accommodation, "contact": e.target.value })}></input>
                                <select class="form-select" aria-label="Default select example" onChange={(e) => setAccommodation({ ...accommodation, "type_bussiness": e.target.value })}>
                                    <option disabled>tipo de hostelería</option>
                                    {accommodationChoice.map((x) => {
                                        return <option key={x} value={x} >{x}</option>
                                    })}

                                </select>
                                <p>Sube la foto</p>
                                <input type="file" onChange={e => setPhoto(e.target.files)} />
                                <p>Sube el logo</p>
                                <input type="file" onChange={e => setLogo(e.target.files)} />
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
                                            <p className="card-text"> location: {x.location} </p>
                                            <p className="card-text"> time_open: {x.time_open} </p>
                                            <p className="card-text"> contact: {x.contact} </p>
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
                                <input name="name" placeholder="name" value={experience.name} onChange={(e) => setExperience({ ...experience, "name": e.target.value })}></input>
                                <input name="resume" placeholder="resume" value={experience.resume} onChange={(e) => setExperience({ ...experience, "resume": e.target.value })}></input>
                                <input name="meeting point" placeholder="meeting point" value={experience.meeting_point} onChange={(e) => setExperience({ ...experience, "meeting_point": e.target.value })}></input>
                                <input name="time_open" placeholder="time open" value={experience.time_open} onChange={(e) => setExperience({ ...experience, "time_open": e.target.value })}></input>
                                <input name="latitud" placeholder="latitud" value={experience.latitud} onChange={(e) => setExperience({ ...experience, "latitud": e.target.value })}></input>
                                <input name="longitud" placeholder="longitud" value={experience.longitud} onChange={(e) => setExperience({ ...experience, "longitud": e.target.value })}></input>
                                <input name="contact" placeholder="contact" value={experience.contact} onChange={(e) => setExperience({ ...experience, "contact": e.target.value })}></input>
                                <select class="form-select" aria-label="Default select example" onChange={(e) => setExperience({ ...experience, "type_bussiness": e.target.value })}>
                                    <option disabled>tipo de experiencia</option>
                                    {experienceChoice.map((x) => {
                                        return <option key={x} value={x} >{x}</option>
                                    })}

                                </select>
                                <p>Sube la foto</p>
                                <input type="file" onChange={e => setPhoto(e.target.files)} />
                                <p>Sube el logo</p>
                                <input type="file" onChange={e => setLogo(e.target.files)} />

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
                                            <p className="card-text"> meeting point: {x.meeting_point} </p>
                                            <p className="card-text"> time_open: {x.time_open} </p>
                                            <p className="card-text"> contact: {x.contact} </p>
                                            <p className="card-text"> type bussiness: turismo {x.type_bussiness} </p>
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

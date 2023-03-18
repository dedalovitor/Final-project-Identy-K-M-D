import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { MyComponent } from "../component/mycomponent";
import { useNavigate } from "react-router-dom";
//import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'; 


export const Profileuserregion = () => {
    const { store, actions } = useContext(Context);
    const [region, setRegion] = useState({ name: "", resume: "" });
    const [regions, setRegions] = useState([]);
    const [patrimony, setPatrimony] = useState({ name: "", resume: "", type_bussiness: "patrimonio natural", time_open: "", location: "", coordinates: "", contact: "" });
    const [patrimonys, setPatrimonys] = useState([]);
    const [restoration, setRestoration] = useState({ name: "", resume: "", type_bussiness: "restaurante", time_open: "", location: "", coordinates: "", contact: "" });
    const [restorations, setRestorations] = useState([]);
    const [accommodation, setAccommodation] = useState({ name: "", resume: "", type_bussiness: "hotel", time_open: "", location: "", coordinates: "", contact: "" });
    const [accommodations, setAccommodations] = useState([]);
    const [experience, setExperience] = useState({ name: "", resume: "", type_bussiness: "turismo activo", time_open: "", meeting_point: "", coordinates: "", contact: "" });
    const [experiences, setExperiences] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [logo, setLogo] = useState(null);
    const [photopatrimony, setPhotoPatrimony] = useState(null);
    const [logopatrimony, setLogoPatrimony] = useState(null);
    const [photorestoration, setPhotoRestoration] = useState(null);
    const [logorestoration, setLogoRestoration] = useState(null);
    const [photoaccommodation, setPhotoAccommodation] = useState(null);
    const [logoaccommodation, setLogoAccommodation] = useState(null);
    const [photoexperience, setPhotoExperience] = useState(null);
    const [logoexperience, setLogoExperience] = useState(null);

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

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    // })

    // const [map, setMap] = React.useState(null)

    // const center = {
    //     lat: 39.45712255279278,
    //     lng: -0.3541559016389045
    // }

    // const onLoad = React.useCallback(function callback(map) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);

    //     setMap(map)
    // }, [])

    // const onUnmount = React.useCallback(function callback(map) {
    //     setMap(null)
    // }, [])

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
                <ul className="nav nav-pills h4">
                    <li className="nav-item">
                        <a className="nav-link link-light" href="#scrollspyHeading1">Tu región</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link-light" href="#scrollspyHeading2">Patrimonio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link-light" href="#scrollspyHeading3">Restauración</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link-light" href="#scrollspyHeading4">Hostelería</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link-light" href="#scrollspyHeading5">Experiencias</a>
                    </li>
                </ul>
            </nav>
            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-body-tertiary p-3 rounded-2" tabIndex="0">
                <div className="container mt-5">
                    <p className="h2 title-pur-sec" id="scrollspyHeading1">Tu región</p>
                    <div className="row col-12">
                        <div className="col-4">
                            <div className="card">
                                <p class="mb-n1">Pon el nombre de tu región (obligatorio)</p>
                                <input name="name" placeholder="nombre de la región" value={region.name} onChange={(e) => setRegion({ ...region, "name": e.target.value })}></input>
                                <p class="mb-n1">Añade la descripción de tu región</p>
                                <input name="resume" placeholder="descripción de la región" value={region.resume} onChange={(e) => setRegion({ ...region, "resume": e.target.value })}></input>

                                <div>
                                    <p class="mb-n1">Sube la foto destacada de tu región</p>


                                    <div class="file-select" id="src-file1" >
                                        <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setPhoto(e.target.files)} />
                                    </div>
                                </div>




                                <p>Sube el logo</p>
                                <input type="file" onChange={e => setLogo(e.target.files)} />

                                <button className="btn btn-success" onClick={() => createRegion()}>CREAR REGIÓN</button>
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
                                <p class="mb-n1">Pon el nombre de tu patrimonio (obligatorio)</p>
                                <input name="name" placeholder="Nombre del patrimonio" value={patrimony.name} onChange={(e) => setPatrimony({ ...patrimony, "name": e.target.value })}></input>
                                <p class="mb-n1">Añade la descripción de tu patrimonio</p>
                                <input name="resume" placeholder="Descripción del patrimonio" value={patrimony.resume} onChange={(e) => setPatrimony({ ...patrimony, "resume": e.target.value })}></input>
                                <p class="mb-n1">Facilita la dirección de tu patrimonio</p>
                                <input name="location" placeholder="Dirección del patrimonio" value={patrimony.location} onChange={(e) => setPatrimony({ ...patrimony, "location": e.target.value })}></input>
                                <p class="mb-n1">Indica los días y horarios de cierre y apertura de tu patrimonio</p>
                                <input name="time_open" placeholder="Días y horas de apertura y cierre" value={patrimony.time_open} onChange={(e) => setPatrimony({ ...patrimony, "time_open": e.target.value })}></input>
                                <p class="mb-n1">Introduce el iframe de localización en Google Maps de tu patrimonio</p>
                                <input name="coordinates" placeholder="iframe de localización de Google Maps" value={patrimony.coordinates} onChange={(e) => setPatrimony({ ...patrimony, "coordinates": e.target.value })}></input>
                                <p class="mb-n1">Indica el teléfono y/o mail de contacto de tu patrimonio</p>
                                <input name="contact" placeholder="Información de contacto: teléfono, mail, etc" value={patrimony.contact} onChange={(e) => setPatrimony({ ...patrimony, "contact": e.target.value })}></input>
                                <p class="mb-n1">Selecciona el tipo de patrimonio que es</p>
                                <select className="form-select" aria-label="Default select example" onChange={(e) => setPatrimony({ ...patrimony, "type_bussiness": e.target.value })}>
                                    <option disabled>tipo de patrimonio</option>
                                    {patrimonyChoice.map((x) => {
                                        return <option key={x} value={x} >{x}</option>
                                    })}

                                </select>
                                <p class="mb-n1">Sube la foto destacada de tu patrimonio</p>
                                <input style={{ display: "none" }} type="file" onChange={e => setPhotoPatrimony(e.target.files)} />
                                <div className="row">
                                    <button className="col-4 p-4 button-pur" onClick={() => document.querySelector('input[type="file"]').click()}><i class="fa-solid fa-camera fa-3x"></i></button>
                                    {photo ? photo[0].name : null}
                                </div>

                                <p class="mb-n1">Sube el logo de tu patrimonio</p>
                                <input style={{ display: "none" }} type="file" onChange={e => setLogoPatrimony(e.target.files)} />
                                <div className="row">
                                    <button className="col-4 p-4 button-pur mb-4" onClick={() => document.querySelector('input[type="file"]').click()}><i class="fa-solid fa-camera fa-3x"></i></button>
                                    {logo ? logo[0].name : null}
                                </div>


                                <button className="btn btn-success" onClick={() => createPatrimony()}>CREAR PATRIMONIO</button>
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
                                <p class="mb-n1">Pon el nombre de tu establecimiento de restauración (obligatorio)</p>
                                <input name="name" placeholder="Nombre del establecimiento de restauración" value={restoration.name} onChange={(e) => setRestoration({ ...restoration, "name": e.target.value })}></input>
                                <p class="mb-n1">Añade la descripción de tu establecimiento de restauración</p >
                                <input name="resume" placeholder="Descripción del establecimiento de restauración" value={restoration.resume} onChange={(e) => setRestoration({ ...restoration, "resume": e.target.value })}></input>
                                <p class="mb-n1">Facilita de dirección de tu establecimiento de restauración</p>
                                <input name="location" placeholder="Dirección del establecimiento de restauración" value={restoration.location} onChange={(e) => setRestoration({ ...restoration, "location": e.target.value })}></input>
                                <p class="mb-n1">Indica los días y horarios de cierre y apertura de tu establecimiento de restauración</p>
                                <input name="time_open" placeholder="Días y horarios de apertura y cierre" value={restoration.time_open} onChange={(e) => setRestoration({ ...restoration, "time_open": e.target.value })}></input>
                                <p class="mb-n1">Introduce el iframe de localización en Google Maps de tu establecimiento de restauración</p>
                                <input name="coordinates" placeholder="iframe de localización de Google Maps" value={restoration.coordinates} onChange={(e) => setRestoration({ ...restoration, "coordinates": e.target.value })}></input>
                                <p class="mb-n1">Indica el teléfono y/o mail de contacto de tu establecimiento de restauración</p>
                                <input name="contact" placeholder="Información de contacto: teléfono, mail, etc" value={restoration.contact} onChange={(e) => setRestoration({ ...restoration, "contact": e.target.value })}></input>
                                <p class="mb-n1">Selecciona el tipo de establecimiento de restauración que es</p>
                                <select className="form-select" aria-label="Default select example" onChange={(e) => setRestoration({ ...restoration, "type_bussiness": e.target.value })}>
                                    <option disabled>tipo de restauración</option>
                                    {restorationChoice.map((x) => {
                                        return <option key={x} value={x} >{x}</option>
                                    })}

                                </select>
                                <p class="mb-n1">Sube la foto destacada de tu establecimiento de restauración</p>
                                <input style={{ display: "none" }} type="file" onChange={e => setPhotoRestoration(e.target.files)} />
                                <div className="row">
                                    <button className="col-4 p-4 button-pur" onClick={() => document.querySelector('input[type="file"]').click()}><i class="fa-solid fa-camera fa-3x"></i></button>
                                    {photo ? photo[0].name : null}
                                </div>

                                <p class="mb-n1">Sube el logo de tu establecimiento de restauración</p>
                                <input style={{ display: "none" }} type="file" onChange={e => setLogoRestoration(e.target.files)} />
                                <div className="row">
                                    <button className="col-4 p-4 button-pur mb-4" onClick={() => document.querySelector('input[type="file"]').click()}><i class="fa-solid fa-camera fa-3x"></i></button>
                                    {logo ? logo[0].name : null}
                                </div>

                                <button className="btn btn-success" onClick={() => createRestoration()}>CREAR RESTAURACIÓN</button>
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
                                <p class="mb-n1">Pon el nombre de tu establecimiento hostelero (obligatorio)</p>
                                <input name="name" placeholder="Nombre del establecimiento hostelero" value={accommodation.name} onChange={(e) => setAccommodation({ ...accommodation, "name": e.target.value })}></input>
                                <p class="mb-n1">Añade la descripción de tu establecimiento hostelero</p>
                                <input name="resume" placeholder="Descripción del establecimiento hostelero" value={accommodation.resume} onChange={(e) => setAccommodation({ ...accommodation, "resume": e.target.value })}></input>
                                <p class="mb-n1">Facilita de dirección de tu establecimiento hostelero</p>
                                <input name="location" placeholder="Dirección del establecimiento hostelero" value={accommodation.location} onChange={(e) => setAccommodation({ ...accommodation, "location": e.target.value })}></input>
                                <p class="mb-n1">Indica los días y horarios de cierre y apertura de tu establecimiento hostelero</p>
                                <input name="time_open" placeholder="Días y horarios de apertura y cierre" value={accommodation.time_open} onChange={(e) => setAccommodation({ ...accommodation, "time_open": e.target.value })}></input>
                                <p class="mb-n1">Introduce el iframe de localización en Google Maps de tu establecimiento hostelero</p>
                                <input name="coordinates" placeholder="iframe de localización de Google Maps" value={accommodation.coordinates} onChange={(e) => setAccommodation({ ...accommodation, "coordinates": e.target.value })}></input>
                                <p class="mb-n1">Indica el teléfono y/o mail de contacto de tu establecimiento hostelero</p>
                                <input name="contact" placeholder="Información de contacto: teléfono, mail, etc" value={accommodation.contact} onChange={(e) => setAccommodation({ ...accommodation, "contact": e.target.value })}></input>
                                <p class="mb-n1">Selecciona el tipo de establecimiento hostelero que es</p>
                                <select className="form-select" aria-label="Default select example" onChange={(e) => setAccommodation({ ...accommodation, "type_bussiness": e.target.value })}>
                                    <option disabled>tipo de establecimiento hostelero</option>
                                    {accommodationChoice.map((x) => {
                                        return <option key={x} value={x} >{x}</option>
                                    })}

                                </select>
                                <p class="mb-n1">Sube la foto destacada de tu establecimiento hostelero</p>
                                <input style={{ display: "none" }} type="file" onChange={e => setPhotoAccommodation(e.target.files)} />
                                <div className="row">
                                    <button className="col-4 p-4 button-pur" onClick={() => document.querySelector('input[type="file"]').click()}><i class="fa-solid fa-camera fa-3x"></i></button>
                                    {photo ? photo[0].name : null}
                                </div>

                                <p class="mb-n1">Sube el logo de tu establecimiento hostelero</p>
                                <input style={{ display: "none" }} type="file" onChange={e => setLogoAccommodation(e.target.files)} />
                                <div className="row">
                                    <button className="col-4 p-4 button-pur mb-4" onClick={() => document.querySelector('input[type="file"]').click()}><i class="fa-solid fa-camera fa-3x"></i></button>
                                    {logo ? logo[0].name : null}
                                </div>
                                <button className="btn btn-success" onClick={() => createAccommodation()}>CREAR HOSTELERÍA</button>
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
                                <p class="mb-n1">Pon el nombre de tu experiencia (obligatorio)</p>
                                <input name="name" placeholder="Nombre de la experiencia" value={experience.name} onChange={(e) => setExperience({ ...experience, "name": e.target.value })}></input>
                                <p class="mb-n1">Añade la descripción de tu experiencia</p>
                                <input name="resume" placeholder="Descripción de la experiencia" value={experience.resume} onChange={(e) => setExperience({ ...experience, "resume": e.target.value })}></input>
                                <p class="mb-n1">Facilita de dirección del punto de inicio de tu experiencia</p>
                                <input name="meeting point" placeholder="Dirección del punto de inicio de la experiencia" value={experience.meeting_point} onChange={(e) => setExperience({ ...experience, "meeting_point": e.target.value })}></input>
                                <p class="mb-n1">Indica los días y horarios en los que se puede realizar tu experiencia</p>
                                <input name="time_open" placeholder="Días y horarios en los que se puede realizar la experiencia" value={experience.time_open} onChange={(e) => setExperience({ ...experience, "time_open": e.target.value })}></input>
                                <p class="mb-n1">Introduce el iframe de localización en Google Maps del punto de inicio de tu experiencia</p>
                                <input name="coordinates" placeholder="iframe de localización de Google Maps" value={experience.coordinates} onChange={(e) => setExperience({ ...experience, "coordinates": e.target.value })}></input>
                                <p class="mb-n1">Indica el teléfono y/o mail de contacto de tu experiencia</p>
                                <input name="contact" placeholder="Información de contacto: teléfono, mail, etc" value={experience.contact} onChange={(e) => setExperience({ ...experience, "contact": e.target.value })}></input>
                                <p class="mb-n1">Selecciona el tipo de experiencia que es</p>
                                <select className="form-select" aria-label="Default select example" onChange={(e) => setExperience({ ...experience, "type_bussiness": e.target.value })}>
                                    <option disabled>tipo de experiencia</option>
                                    {experienceChoice.map((x) => {
                                        return <option key={x} value={x} >{x}</option>
                                    })}

                                </select>
                                <p class="mb-n1">Sube la foto destacada de tu experiencia</p>
                                <input style={{ display: "none" }} type="file" onChange={e => setPhotoExperience(e.target.files)} />
                                <div className="row">
                                    <button className="col-4 p-4 button-pur" onClick={() => document.querySelector('input[type="file"]').click()}><i class="fa-solid fa-camera fa-3x"></i></button>
                                    {photo ? photo[0].name : null}
                                </div>

                                <p class="mb-n1">Sube el logo de tu experiencia</p>
                                <input style={{ display: "none" }} type="file" onChange={e => setLogoExperience(e.target.files)} />
                                <div className="row">
                                    <button className="col-4 p-4 button-pur mb-4" onClick={() => document.querySelector('input[type="file"]').click()}><i class="fa-solid fa-camera fa-3x"></i></button>
                                    {logo ? logo[0].name : null}
                                </div>

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

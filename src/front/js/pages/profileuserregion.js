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
            <div id="myGroup">
                <h4 className="text-center mt-3">Mi Perfil de Región</h4>
                <div className="container h-25 d-flex justify-content-center align-items-center p-4">

                    <div>
                        <button

                            className="buttonhome btn btn-outline-secondary m-2" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"
                        >

                            Región
                            <i className="fa-solid fa-map-location-dot ms-5"></i>

                        </button>
                        <button
                            type="button"
                            className="buttonhome btn btn-outline-danger m-2 " data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample1"
                        >
                            <a href="#scrollspyHeading2">
                                Patrimonio
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1009/1009921.png"
                                    className="img-patrimony"
                                    alt="Responsive image"
                                ></img>
                            </a>
                        </button>
                        <button
                            type="button"
                            className="buttonhome btn btn-outline-success m-2" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample2"
                        >
                            <a href="#scrollspyHeading3">
                                {" "}
                                Restauración
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/1980/1980788.png"
                                    className="img-restoration"
                                    alt="Responsive image"
                                ></img>
                            </a>
                        </button>
                        <button
                            type="button"
                            className="buttonhome btn btn-outline-primary m-2" data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample3"
                        >
                            <a href="#scrollspyHeading4">
                                Hostelería
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/2933/2933772.png"
                                    className="img-accommodation"
                                    alt="Responsive image"
                                ></img>
                            </a>
                        </button>
                        <button
                            type="button"
                            className="buttonhome btn btn-outline-warning m-2" data-bs-toggle="collapse" href="#collapseExample4" role="button" aria-expanded="false" aria-controls="collapseExample4"
                        >
                            <a href="#scrollspyHeading5">
                                Experiencias
                                <img
                                    src="https://rincondeademuz.info/wp-content/uploads/2023/03/Fondo.png"
                                    className="img-route"
                                    alt="Responsive image"
                                ></img>
                            </a>
                        </button>
                    </div>
                </div>

                <div className="container">
                    <div id="collapseExample" className="collapse show container mt-3" data-bs-parent="#myGroup">
                        <div className="col-12">
                            <div className="row justify-content-center align-items-center  mt-3 mb-4">
                                {regions.map((x) => {
                                    return <div key={x.id} className="card p-2 m-2" style={{ width: "18rem" }}>
                                        <div className="card-body">
                                            <p className="card-text h3">{x.name} </p>
                                        </div>
                                        <div className="card-logo">
                                            <img className="profileuserregionlogo" src={x.logo} height="30px"></img>
                                        </div>
                                        <img
                                            src={x.photo}
                                            height="200px"
                                            className="card-img-top"
                                            alt={x.photo}
                                        />

                                        <div className="card-footer d-flex justify-content-between">
                                            <button className="btn btn-danger mt-2 mb-2" onClick={() => deleteRegion(x.id)}>Eliminar</button>
                                            <Link to={`/ciudad/${x.id}`}>
                                                <button className="btn btn-outline-danger mt-2">
                                                    Ver página
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>

                        <div className="row justify-content-center align-items-center">
                            <div className="card p-4 col-6 m-2">
                                <p className="h2 title-pur-sec" id="scrollspyHeading1">Crea tu región</p>
                                <p class="mb-n1">Pon el nombre de tu región (obligatorio)</p>
                                <input name="name" placeholder="nombre de la región" value={region.name} onChange={(e) => setRegion({ ...region, "name": e.target.value })}></input>
                                <p class="mb-n1">Añade la descripción de tu región</p>
                                <textarea name="resume" placeholder="descripción de la región" value={region.resume} onChange={(e) => setRegion({ ...region, "resume": e.target.value })}></textarea >

                                <div>
                                    <p class="mb-n1">Sube la foto destacada de tu región</p>
                                    <div class="file-select" id="src-file1" >
                                        <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setPhoto(e.target.files)} />
                                    </div>
                                </div>
                                <div>
                                    <p class="mb-n1">Sube el logo de tu región</p>
                                    <div class="file-select" id="src-file1" >
                                        <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setLogo(e.target.files)} />
                                    </div>
                                </div>

                                <button className="btn btn-outline-danger mt-4" onClick={() => createRegion()}>CREAR REGIÓN</button>


                            </div>
                        </div>



                    </div>
                    <div id="collapseExample1" className="collapse container mt-2" data-bs-parent="#myGroup">

                        <div className="row col-12">
                            <div className="row justify-content-center align-items-center">
                                <div className="row justify-content-center align-items-right">
                                    <div id="simple-list-example" class="d-flex flex-column gap-2 simple-list-example-scrollspy text-center">
                                    </div>
                                    <button id="navbar-example2"
                                        type="button"
                                        className="buttonhome btn btn-danger m-2 col-2"
                                    >
                                        <a href="#simple-list-item-1">
                                            Ver mi Patrimonio
                                        </a>
                                    </button>


                                </div>
                                <div className="card p-4 col-6 m-2">
                                    <p className="h2">Crea tu patrimonio</p>
                                    <p class="mb-n1">Pon el nombre de tu patrimonio (obligatorio)</p>
                                    <input name="name" placeholder="Nombre del patrimonio" value={patrimony.name} onChange={(e) => setPatrimony({ ...patrimony, "name": e.target.value })}></input>
                                    <p class="mb-n1">Añade la descripción de tu patrimonio</p>
                                    <textarea name="resume" placeholder="Descripción del patrimonio" value={patrimony.resume} onChange={(e) => setPatrimony({ ...patrimony, "resume": e.target.value })}></textarea>
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
                                    <div>
                                        <p class="mb-n1">Sube la foto destacada de tu patrimonio</p>
                                        <div class="file-select" id="src-file1" >
                                            <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setPhoto(e.target.files)} />
                                        </div>
                                    </div>
                                    <div>
                                        <p class="mb-n1">Sube el logo de tu patrimonio</p>
                                        <div class="file-select" id="src-file1" >
                                            <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setLogo(e.target.files)} />
                                        </div>
                                    </div>


                                    <button className="btn btn-outline-danger mt-4" onClick={() => createPatrimony()}>CREAR PATRIMONIO</button>
                                </div>
                            </div>
                            <div className="col-12" data-bs-spy="scroll" data-bs-target="#scrollspyHeading1" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
                                <div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">
                                    <div className="text-center">
                                        <h4 id="simple-list-item-1">Mi patrimonio</h4>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-items-center mt-3 mb-4" id="scrollspyHeading1">
                                    {patrimonys.map((x) => {
                                        return <div key={x.id} className="card p-2 m-2" style={{ width: "18rem" }}>
                                            <div className="card-logo">
                                                <img className="profileuserregionlogo" src={x.logo} height="30px"></img>
                                            </div>
                                            <img
                                                src={x.photo}
                                                height="200px"
                                                className="card-img-top"
                                                alt={x.photo}
                                            />
                                            <div className="card-body">
                                                <p className="card-text"> Nombre: {x.name} </p>
                                                <p className="card-text"> Tipo: patrimonio {x.type_bussiness} </p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <button className="btn btn-danger mt-2 mb-2" onClick={() => deletePatrimony(x.id)}>Eliminar</button>
                                                <Link to={`/patrimonio/${x.id}`}>
                                                    <button className="btn btn-outline-danger mt-2">
                                                        Ver página
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="collapseExample2" className="collapse container mt-3" data-bs-parent="#myGroup">
                        <div className="row col-12">
                            <div className="row justify-content-center align-items-center">
                                <div className="row justify-content-center align-items-right">
                                    <div id="simple-list-example" class="d-flex flex-column gap-2 simple-list-example-scrollspy text-center">
                                    </div>
                                    <button id="navbar-example2"
                                        type="button"
                                        className="buttonhome btn btn-danger m-2 col-2"
                                    >
                                        <a href="#simple-list-item-2">
                                            Ver mi Restauración
                                        </a>
                                    </button>


                                </div>

                                <div className="card p-4 col-6">
                                    <p className="h2">Crea tu restauración</p>
                                    <p class="mb-n1">Pon el nombre de tu establecimiento de restauración (obligatorio)</p>
                                    <input name="name" placeholder="Nombre del establecimiento de restauración" value={restoration.name} onChange={(e) => setRestoration({ ...restoration, "name": e.target.value })}></input>
                                    <p class="mb-n1">Añade la descripción de tu establecimiento de restauración</p >
                                    <textarea name="resume" placeholder="Descripción del establecimiento de restauración" value={restoration.resume} onChange={(e) => setRestoration({ ...restoration, "resume": e.target.value })}></textarea>
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
                                    <div>
                                        <p class="mb-n1">Sube la foto destacada de tu establecimiento de restauración</p>
                                        <div class="file-select" id="src-file1" >
                                            <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setPhoto(e.target.files)} />
                                        </div>
                                    </div>
                                    <div>
                                        <p class="mb-n1">Sube el logo de tu establecimiento de restauración</p>
                                        <div class="file-select" id="src-file1" >
                                            <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setLogo(e.target.files)} />
                                        </div>
                                    </div>

                                    <button className="btn btn-outline-danger mt-4" onClick={() => createRestoration()}>CREAR RESTAURACIÓN</button>
                                </div>
                            </div>
                            <div className="col-12" data-bs-spy="scroll" data-bs-target="#simple-list-item-2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
                                <div data-bs-spy="scroll" data-bs-target="#simple-list-item-2" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">
                                    <div className="text-center">
                                        <h4 id="simple-list-item-2">Mi restauración</h4>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-items-center mt-3 mb-4">
                                    {restorations.map((x) => {
                                        return <div key={x.id} className="card p-2 m-2" style={{ width: "18rem" }}>
                                            <div className="card-logo">
                                                <img className="profileuserregionlogo" src={x.logo} height="30px"></img>
                                            </div>
                                            <img
                                                src={x.photo}
                                                height="200px"
                                                className="card-img-top"
                                                alt={x.photo}
                                            />
                                            <div className="card-body">
                                                <p className="card-text"> Nombre: {x.name} </p>
                                                <p className="card-text"> Tipo: {x.type_bussiness} </p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <button className="btn btn-danger mt-2 mb-2" onClick={() => deleteRestoration(x.id)}>Eliminar</button>
                                                <Link to={`/restoration/${x.id}`}>
                                                    <button className="btn btn-outline-danger mt-2">
                                                        Ver página
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="collapseExample3" className="collapse container mt-3" data-bs-parent="#myGroup">
                        <div className="row col-12">
                            <div className="row justify-content-center align-items-center">
                                <div className="row justify-content-center align-items-right">
                                    <div id="simple-list-example" class="d-flex flex-column gap-2 simple-list-example-scrollspy text-center">
                                    </div>
                                    <button id="navbar-example2"
                                        type="button"
                                        className="buttonhome btn btn-danger m-2 col-2"
                                    >
                                        <a href="#simple-list-item-3">
                                            Ver mi Hostelería
                                        </a>
                                    </button>


                                </div>
                                <div className="card p-4 col-6 m-2">
                                    <p className="h2" id="scrollspyHeading4">Crea tu hostelería</p>
                                    <p class="mb-n1">Pon el nombre de tu establecimiento hostelero (obligatorio)</p>
                                    <input name="name" placeholder="Nombre del establecimiento hostelero" value={accommodation.name} onChange={(e) => setAccommodation({ ...accommodation, "name": e.target.value })}></input>
                                    <p class="mb-n1">Añade la descripción de tu establecimiento hostelero</p>
                                    <textarea name="resume" placeholder="Descripción del establecimiento hostelero" value={accommodation.resume} onChange={(e) => setAccommodation({ ...accommodation, "resume": e.target.value })}></textarea>
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
                                    <div>
                                        <p class="mb-n1">Sube la foto destacada de tu establecimiento hostelero</p>
                                        <div class="file-select" id="src-file1" >
                                            <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setPhoto(e.target.files)} />
                                        </div>
                                    </div>
                                    <div>
                                        <p class="mb-n1">Sube el logo de tu establecimiento hostelero</p>
                                        <div class="file-select" id="src-file1" >
                                            <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setLogo(e.target.files)} />
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-danger mt-4" onClick={() => createAccommodation()}>CREAR HOSTELERÍA</button>
                                </div>
                            </div>
                            <div className="col-12" data-bs-spy="scroll" data-bs-target="#scrollspyHeading1" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
                                <div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">
                                    <div className="text-center">
                                        <h4 id="simple-list-item-3">Mi hostelería</h4>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-items-center mt-3 mb-4">
                                    {accommodations.map((x) => {
                                        return <div key={x.id} className="card p-2 m-2" style={{ width: "18rem" }}>
                                            <div className="card-logo">
                                                <img className="profileuserregionlogo" src={x.logo} height="30px"></img>
                                            </div>
                                            <img
                                                src={x.photo}
                                                height="200px"
                                                className="card-img-top"
                                                alt={x.photo}
                                            />
                                            <div className="card-body">
                                                <p className="card-text"> Nombre: {x.name} </p>
                                                <p className="card-text"> Tipo: {x.type_bussiness} </p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <button className="btn btn-danger mt-2 mb-2" onClick={() => deleteAccommodation(x.id)}>Eliminar</button>
                                                <Link to={`/accommodation/${x.id}`}>
                                                    <button className="btn btn-outline-danger mt-2">
                                                        Ver página
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>


                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="collapseExample4" className="collapse container mt-3" data-bs-parent="#myGroup">
                    <div className="row col-12">
                        <div className="row justify-content-center align-items-center">
                            <div className="row justify-content-center align-items-right">
                                <div id="simple-list-example" class="d-flex flex-column gap-2 simple-list-example-scrollspy text-center">
                                </div>
                                <button id="navbar-example2"
                                    type="button"
                                    className="buttonhome btn btn-danger m-2 col-2"
                                >
                                    <a href="#simple-list-item-4">
                                        Ver mis Experiencias
                                    </a>
                                </button>


                            </div>
                            <div className="card p-4 col-6 m-2">
                                <p className="h2">Crea tus experiencias</p>
                                <p class="mb-n1">Pon el nombre de tu experiencia (obligatorio)</p>
                                <input name="name" placeholder="Nombre de la experiencia" value={experience.name} onChange={(e) => setExperience({ ...experience, "name": e.target.value })}></input>
                                <p class="mb-n1">Añade la descripción de tu experiencia</p>
                                <textarea name="resume" placeholder="Descripción de la experiencia" value={experience.resume} onChange={(e) => setExperience({ ...experience, "resume": e.target.value })}></textarea>
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
                                <div>
                                    <p class="mb-n1">Sube la foto destacada de tu experiencia</p>
                                    <div class="file-select" id="src-file1" >
                                        <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setPhoto(e.target.files)} />
                                    </div>
                                </div>
                                <div>
                                    <p class="mb-n1">Sube el logo de tu experiencia</p>
                                    <div class="file-select" id="src-file1" >
                                        <input name="src-file1" aria-label="Archivo" type="file" onChange={e => setLogo(e.target.files)} />
                                    </div>
                                </div>

                                <button className="btn btn-outline-danger mt-4" onClick={() => createExperience()}>CREAR EXPERIENCIA</button>
                            </div>
                        </div>

                        <div className="col-12" data-bs-spy="scroll" data-bs-target="#scrollspyHeading1" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
                            <div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">
                                <div className="text-center">
                                    <h4 id="simple-list-item-4">Mis experiencias</h4>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center mt-3 mb-4">
                                {experiences.map((x) => {
                                    return <div key={x.id} className="card p-2 m-2" style={{ width: "18rem" }}>
                                        <div className="card-logo">
                                            <img className="profileuserregionlogo" src={x.logo} height="30px"></img>
                                        </div>
                                        <img
                                            src={x.photo}
                                            height="200px"
                                            className="card-img-top"
                                            alt={x.photo}
                                        />
                                        <div className="card-body">
                                            <p className="card-text"> Nombre: {x.name} </p>
                                            <p className="card-text"> tipo: turismo {x.type_bussiness} </p>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between">
                                            <button className="btn btn-danger mt-2 mb-2" onClick={() => deleteExperience(x.id)}>Eliminar</button>
                                            <Link to={`/experience/${x.id}`}>
                                                <button className="btn btn-outline-danger mt-2">
                                                    Ver página
                                                </button>
                                            </Link>
                                        </div>
                                    </div>


                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );

};

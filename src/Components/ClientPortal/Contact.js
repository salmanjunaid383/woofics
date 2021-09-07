import React, { useState, useEffect } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import loginside from "../../Images/loginside.jpg";
import axios from "axios";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import jwt_decode from "jwt-decode";
import "../ClientPortal/Contact.css";
import Pusher from "pusher-js";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LandingPage from "../LandingPage/components/LandingPage";
import Navbar from "../Navbar";
import Footer from "../LandingPage/components/Footer";
import { TextField } from "@material-ui/core";
import ScrollToTop from '../ScrollToTop'
import CustomClientAuth from "../CustomClientAuth";
// import "../../Components/Contact.css"

///About us page
export default function Contact() {
  ScrollToTop();
  const activebtn = {
    borderRadius: 10,
    backgroundColor: "#f95c87",
    borderColor: "#f95c87",
    borderWidth: 3,
    fontWeight: "700",
    color: "white",
  };

  const deactivebtn = {
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#f95c87",
    borderWidth: 3,
    fontWeight: "700",
    color: "grey",
  };
    const { fid } = useParams()
    

  const display1 = "none";
  const display2 = "block";

  const [button1, setbutton1] = useState(activebtn);
  const [button2, setbutton2] = useState(deactivebtn);
  const [button3, setbutton3] = useState(deactivebtn);
  const [hide1, sethide1] = useState(display2);
  const [hide2, sethide2] = useState(display1);
  const [hide3, sethide3] = useState(display1);

  function setbtnstyle1() {
    setbutton1(activebtn);
    setbutton2(deactivebtn);
    setbutton3(deactivebtn);
    sethide1(display2);
    sethide2(display1);
    sethide3(display1);
  }
  function setbtnstyle12() {
    setbutton2(activebtn);
    setbutton1(deactivebtn);
    setbutton3(deactivebtn);
    sethide1(display1);
    sethide2(display2);
    sethide3(display1);
  }
  function setbtnstyle3() {
    setbutton3(activebtn);
    setbutton1(deactivebtn);
    setbutton2(deactivebtn);
    sethide1(display1);
    sethide2(display1);
    sethide3(display2);
  }
 
  useEffect(() => {
   
    if(fid==='1')
    {
      
      setbtnstyle1();    
    }
    if(fid==='2')
    {
      console.log("Setbtn")
      setbtnstyle12();    
    }
    if(fid==='3')
    {
      setbtnstyle3();
    }
  },[])


  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");

  function Message() {
    const res = axios.post(`https://api.woofics.com/api/contact`, {
        name: name,
        email: email,
        message: message,
    },{
      headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
    })
        .then((response) => {
           
           alert("Message Sent!")
        }, (Error) => {
            // 
        });
}




  // useEffect(() => {
  //   Message()
  // }, [])



  return (
    <>
    <div  className="new-nav">
      <Navbar/>
      </div>
      
      <div className="mt-5 pt-5">
        <div className="container" style={{marginTop:"20px"}}>
          <div className="row mx-auto">
            <div className="col-md-12 text-center">
              <span className="text-center w-100 mx-auto">
                <button
                  className="btn mx-2 px-3 py-2 "
                  style={button1}
                  onClick={() => setbtnstyle1()}
                >
                  Sobre nosotras
                </button>
                <button
                  className="btn mx-2 px-3 py-2 "
                  style={button2}
                  onClick={() => setbtnstyle12()}
                >
                  Preguntas frecuentes
                </button>
                <button
                  className="btn mx-2 px-3 py-2 "
                  style={button3}
                  onClick={() => setbtnstyle3()}
                >
                  Contacta Con Nosotras
                </button>
              </span>
            </div>
            <div className="col-md-12 text-center" style={{ display: hide1 }}>
              <div className="my-5">
                <h1 style={{ fontWeight: "700", color: "grey" }}>
                  Sobre Woofic
                </h1>
                <h4 style={{ fontSize: 19 }}>
                  Woofic.com es una plataforma que opera como broker de
                  proveedores de pantallas de Led.. A través de la plataforma
                  ayudamos en la elección y contratación del mejor proveedor
                  para su proyecto. La plataforma, aporta transparencia y
                  objetividad al proceso de compra, que es totalmente gratuito.
                </h4>
              </div>
              <div className="my-5">
                <h1 style={{ fontWeight: "700", color: "grey" }}>
                  Cómo funciona.{" "}
                </h1>
                <h4 style={{ fontSize: 19 }}>
                  Responde en menos de 2 minutos a unas preguntas sobre tu
                  proyecto y en un plazo máximo de 48 horas, recibirás las
                  mejores ofertas de diferentes proveedores, para que puedas
                  compararlas y elegir la que mejor que se adapte a lo que
                  necesites
                </h4>
              </div>
              <div className="my-5">
                <h1 style={{ fontWeight: "700", color: "grey" }}>
                  Nuestro objectivo{" "}
                </h1>
                <h4 style={{ fontSize: 19 }}>
                  Nuestro principal objetivo es ahorrar tiempo y dinero.
                  Simplificando al máximo la toma de decisiones, aportando
                  transparencia e imparcialidad al proceso de elección.
                </h4>
              </div>
              <div className="my-5">
                <h1 style={{ fontWeight: "700", color: "grey" }}>Valores </h1>
                <h4 style={{ fontSize: 19 }}>
                  <span style={{ fontWeight: "700", color: "grey" }}>
                    {" "}
                    Confianza y Calidad{" "}
                  </span>
                  <br /> Nuestros proveedores son nuestros principales
                  valedores, el proceso de selección para ser proveedor no es
                  automático, sino que se verifica personalmente para que cumpla
                  con los estándares exigidos por Woofic. Contamos con procesos
                  continuos de mejora y valoración de los proveedores , para
                  saber en todo momento si cumplen los estándares de Calidad en
                  Servicio, Producto y Atención al cliente . <br />
                  <br />
                  <span style={{ fontWeight: "700", color: "grey" }}>
                    {" "}
                    Transparencia
                  </span>
                  <br /> Nuestro servicio es completamente gratuito para los
                  usuarios. Los precios que te ofrecen los proveedores en Woofic
                  son los mismos que encontrarás en cada compañía preguntando de
                  forma individual, incluso en ocasiones pueden ser mejores,
                  gracias a la competencia entre proveedores, ajustan sus
                  precios para cerrar los proyectos . No hay comisiones, ni
                  subidas de precio. Y entonces ¿de dónde sale nuestro
                  beneficio? Es sencillo, cada vez que un usuario requiere
                  presupuesto, los proveedores pagan una cuota fija para poder
                  presentar la oferta al usuario.
                </h4>
              </div>
            </div>

            <div className="container mx-auto " style={{ display: hide2 }}>
              <div className="row">
                <div className="col-md-10 mx-auto">
                  <div class="woofic_lastnews_header">
                    <div class="woofic_lastnews_heading text-center">
                    PREGUNTAS FRECUENTES
                    </div>
                    <div class="woofic_lastnews_hline"></div>
                  </div>
                </div>
                <div className="col-md-10 mx-auto">
                  <div class="accordion" id="accordionExample">
                    <div class="card">
                      <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                          >
                            <h4>¿Cómo actúa Woofic?</h4>
                          </button>
                        </h2>
                      </div>

                      <div
                        id="collapseOne"
                        class="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          Woofic envía a sus colaboradores (proveedores) el
                          cuestionario cumplimentado por el cliente, dentro de un
                          plazo máximo de 48 horas que tienen los proveedores para
                          responder preguntas y presentar una oferta vinculante.
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <h4>¿Por qué tengo que registrarme?</h4>
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseTwo"
                        class="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          Woofic es una plataforma integral, en la que podrás
                          recibir y gestionar ofertas, realizar valoraciones de proveedores
                          y muchas más ventajas, por eso es necesario
                          para registrarse, para poder acceder a su personal
                          panel de administración.
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingFour">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                          >
                            <h4>¿Woofic favorece a alguna empresa?</h4>
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseFour"
                        class="collapse"
                        aria-labelledby="headingFour"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          No. Woofic.com es un portal totalmente independiente, nosotros
                          solo poner a los clientes en contacto con los proveedores y cada
                          proveedor hace su oferta personalizada directamente al
                          cliente final, el orden en el que se obtienen los resultados
                          que se muestra por defecto es por orden de llegada, la primera
                          la cotización se muestra en la posición 1 y así sucesivamente.
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingFive">
                        <h2 class="mb-0">
                          <button
                            class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                          >
                            <h4>¿Cómo gana dinero Woofic.com?</h4>
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseFive"
                        class="collapse"
                        aria-labelledby="headingFive"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          Nuestro servicio es completamente gratuito. Las ofertas que tu
                          encontrará de los diferentes proveedores en Woofic son
                          las mismas que encontrarás en cada empresa. Existen
                          sin comisiones, sin incrementos de precio. Cada vez que un
                          se contrate proyecto, producto o servicio, cobramos un
                          comisión al proveedor, nunca al usuario.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mx-auto " style={{ display: hide3 }}>
              <div className="row">
                <div className="col-md-12 mx-auto">
                  <div className="" style={{ height: "100%" }}>
                    <div class="container">
                      <div class="row mx-auto">
                        <div className="col-md-6 border-right mt-md-5 pt-md-5 w-75">
                          <h3>Nosotras queremos saber tu opinión</h3>
                          <TextField
                            className="w-75 my-1"
                            id="standard-basic"
                            label="Name *"
                            onChange={(e)=>setname(e.target.value)}
                            />
                          <br />
                          <TextField
                            className="w-75 my-1"
                            id="standard-basic"
                            label="Email *"
                            onChange={(e)=>setemail(e.target.value)}
                            />
                          <br />
                          <TextField
                            className="w-75 my-1"
                            id="standard-basic"
                            label="Message *"
                            onChange={(e)=>setmessage(e.target.value)}
                            multiline={true}
                          />
                          <br />
                          <br />

                          <button className="btn btn-primary" onClick={()=>Message()}>
                          Enviar Mensaje
                          </button>
                        </div>
                        <div className="col-md-6 my-auto pt-md-5 mt-md-5 pl-md-5">
                          <h4 style={{marginTop:"20px"}}>Escríbanos a:</h4>
                          <h5 className="h5" className="text-primary">
                            <a>hola@woofics.com</a>
                          </h5>
                          <br />
                          <h4 style={{marginTop:"20px"}}>Telephone:</h4>
                          <h5 className="h5" className="text-primary">
                            <a>+34 648 411 313</a>
                          </h5>
                          <br />
                          <br />

                          <h5 className="h5 follow">Síguenos:</h5>

                          <div className="social_icons" style={{marginTop:"20px"}}>
                            <span
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                border:"3px solid #F62B84",
                                padding: 7,
                                margin: 7,
                                
                              }}
                            >
                              <a
                                target="_blank"
                                href="https://www.facebook.com/Woofic-110333384466812"
                              >
                                <i className="px-2 fa fa-facebook"></i>
                              </a>
                            </span>
                            <span
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                border:"3px solid #F62B84",
                                padding: 7,
                                margin: 7,
                                color: "white",
                              }}
                            >
                              <a target="_blank" href="woofic.com@gmail.com">
                                <i className="px-1 fa fa-twitter"></i>
                              </a>
                            </span>
                            <span
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                border:"3px solid #F62B84",

                                padding: 7,
                                margin: 7,
                                color: "white",
                              }}
                            >
                              <a target="_blank" href="https://www.instagram.com/woofic_com/">
                                <i className="px-1 fa fa-instagram"></i>
                              </a>
                            </span>
                            <span
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                border:"3px solid #F62B84",

                                padding: 7,
                                margin: 7,
                                color: "white",
                              }}
                            >
                              <a
                                target="_blank"
                                href="https://www.linkedin.com/company/woofic"
                              >
                                <i className="px-1 fa fa-linkedin"></i>
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

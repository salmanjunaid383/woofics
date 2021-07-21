import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import loginside from "../../Images/loginside.jpg";
import axios from "axios";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import jwt_decode from "jwt-decode";
import "./Contact.css";
import fran from "./fran.jpg";
import Pusher from "pusher-js";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LandingPage from "../LandingPage/components/LandingPage";
import logo from "../LandingPage/images/wooficc.png";
import Navbar from "../Navbar";
import Footer from "../LandingPage/components/Footer";
import { TextField } from "@material-ui/core";
import ScrollToTop from '../ScrollToTop'
import CustomClientAuth from "../CustomClientAuth";

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




  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");

  function Message() {
    const res = axios.post(`https://api.woofics.com/api/contact`, {
        name: name,
        email: email,
        message: message,
    })
        .then((response) => {
           console.log(response)
           alert("Message Sent!")
        }, (Error) => {
            // console.log(Error);
        });
}




  // useEffect(() => {
  //   Message()
  // }, [])



  return (
    <>
      <Navbar />
      <div className="mt-5 pt-5">
        <div className="container">
          <div className="row mx-auto">
            <div className="col-md-12 text-center">
              <span className="text-center w-100 mx-auto">
                <button
                  className="btn mx-2 px-3 py-2 "
                  style={button1}
                  onClick={() => setbtnstyle1()}
                >
                  About us
                </button>
                <button
                  className="btn mx-2 px-3 py-2 "
                  style={button2}
                  onClick={() => setbtnstyle12()}
                >
                  Frequent Questions
                </button>
                <button
                  className="btn mx-2 px-3 py-2 "
                  style={button3}
                  onClick={() => setbtnstyle3()}
                >
                  Contact us
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
                      FREQUENTLY ASKED QUESTION
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
                            <h4>How does Woofic work?</h4>
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
                          Woofic sends its collaborators (suppliers) the
                          questionnaire filled out by the client, within a
                          maximum period of 48 hours the suppliers have to
                          answer questions and present a binding offer.
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
                            <h4>Why do I have to register?</h4>
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
                          Woofic is a comprehensive platform, in which you will
                          receive and manage offers, perform supplier ratings
                          and many more advantages, that is why it is necessary
                          to register, to be able to access your personal
                          administration panel.
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
                            <h4>Does Woofic favor any company?</h4>
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
                          No. Woofic.com is a totally independent portal, we
                          only put customers in contact with suppliers and each
                          supplier makes its personalized offer directly to the
                          final customer, the order in which the results are
                          shown by default is by order of arrival, the first
                          quote is displayed at position 1 so on.
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
                            <h4>How does Woofic.com make money?</h4>
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
                          Our service is completely free. The offers that you
                          will find from the different providers in Woofic are
                          the same that you will find in each company. There are
                          no commissions, no price increases. Every time a
                          project, product or service is contracted, we charge a
                          commission to the provider, never to the user.
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
                          <h3>We Want to know your opinion</h3>
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
                            Send Message
                          </button>
                        </div>
                        <div className="col-md-6 my-auto pt-md-5 mt-md-5 pl-md-5">
                          <h4>Write to us at:</h4>
                          <h5 className="h5" className="text-primary">
                            <a>hola@woofics.com</a>
                          </h5>
                          <br />
                          <h4>Telephone:</h4>
                          <h5 className="h5" className="text-primary">
                            <a>+34 680 49 47 29</a>
                          </h5>
                          <br />
                          <br />

                          <h5 className="h5">Follow us:</h5>

                          <div>
                            <span
                              style={{
                                backgroundColor: "lightgray",
                                borderRadius: "50%",
                                padding: 10,
                                margin: 7,
                                color: "white",
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
                                backgroundColor: "lightgray",
                                borderRadius: "50%",
                                padding: 10,
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
                                backgroundColor: "lightgray",
                                borderRadius: "50%",
                                padding: 10,
                                margin: 7,
                                color: "white",
                              }}
                            >
                              <a target="_blank" href="woofic.com@gmail.com">
                                <i className="px-1 fa fa-instagram"></i>
                              </a>
                            </span>
                            <span
                              style={{
                                backgroundColor: "lightgray",
                                borderRadius: "50%",
                                padding: 10,
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

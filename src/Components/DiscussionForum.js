import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import './DiscussionForum.css'
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar'
import Footer from './LandingPage/components/Footer'
import ScrollToTop from "./ScrollToTop";


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #6f819e',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign: 'center'
    },
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 40 + rand();
    const left = 40 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function DiscussionForum() {
    ScrollToTop();
    let history = useHistory();


    const [questions, setQuestions] = useState([]);


    var token = localStorage.getItem("user_token");

    const [show, setShow] = useState(true);



    // function Forum(e) {
    //     e.preventDefault();

    //     const { data: response } = axios.post(`https://api.woofics.com/api/forum_question`, {
    //         question: question,
    //         asked_by: 'Hyder Ali maroof',
    //         user_id:"2"
    //     })
    //         .then((response) => {
    //             
    //             handleClose()
    //             getQuestion();
    //         }, (error) => {
    //             
    //         });
    // }

    function getQuestion() {

        const { data: response } = 
axios.get(`https://api.woofics.com/api/forum_question`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setQuestions(response.data);

            }, (error) => {
                
            });
    }

    useEffect(() => {
        getQuestion();
    }, [])


    // Modal

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    return (
        <>
            {/* <div class="topnav" id="myTopnav">
                <Link to="/" >
                    <img src={logo} className="img-fluid float-left w-50 pl-lg-4" />
                </Link>
                <Link className="sm-mt-3" to="/">Home</Link>
                <Link to="/allblog">Blog</Link>
                <Link to='/contactus'>About Us</Link>
                <Link to='/calculadora_de_precios'>Price Calculator</Link>
                <Link to="/foro_de_discusion">Forum</Link>
                <Link to="/login" className="float-right mr-lg-4"> <button type="submit" class="f-button btn btn-white text-white ">Login/Register</button></Link>
                <a href="javascript:void(0);" class="icon" onClick={myFunction}>
                    <i class="fa fa-bars"></i>
                </a>
            </div> */}
            <Navbar />
            {/* 
            <div class="container mt-100">

                <div class="row">
                    <div class="col-md-12">
                        {questions == "" ? <div class="alert alert-success w-100 text-center m-5 col-md-12" role="alert">
                                        No Discussions! </div>
                                        : 
                            questions.map((val, id) => {
                                return (
                                    <>

                                        <Link to={`/másdetallesforumdiscussion/${val.id}`}>
                                            <div class="card mb-4">
                                                <div class="card-header">
                                                    <div class="media flex-wrap w-100 align-items-center"> 
                                                        <div class="media-body ml-3"> <a href="javascript:void(0)" data-abc="true">{val.asked_by}</a>
                                                            <div class="text-muted small">{(val.created_at).slice(0, 10)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <p> {val.question}</p>
                                                </div>
                                                <div class="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                                                <div class="px-4 pt-3"></div>
                                                    <div class="px-4 pt-3"> <button type="button" class="btn btn-primary"><i class="ion ion-md-create"></i>&nbsp; View all Replies</button> </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )
                            }).reverse()
                        }
                    </div>
                </div>
            </div>
 */}


            <div className="container text-center mx-auto mt-lg-5">
                <div className="row mx-auto">
                    <div className="col-sm-12 col-md-12">
                        <div className="woofic_lastnews_header">
                            <div className="woofic_lastnews_heading">PREGUNTAS FRECUENTES</div>
                            <div className="woofic_lastnews_hline"></div>
                        </div>
                    </div>
                    <div className="col-md-10 mx-auto">
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button
                                            className="btn btn-link btn-block text-left collapsed"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseOne"
                                            aria-expanded="false"
                                            aria-controls="collapseOne"
                                        >
                                            ¿Cómo actúa Woofic?
                                        </button>
                                    </h2>
                                </div>

                                <div
                                    id="collapseOne"
                                    className="collapse"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        Woofic envía a sus colaboradores (proveedores) el cuestionario
                                        cumplimentado por el cliente, en un plazo máximo de 48
                                        horas que los proveedores tienen para responder preguntas y presentar un
                                        oferta vinculante.
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <button
                                            className="btn btn-link btn-block text-left collapsed"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            ¿Por qué tengo que registrarme?
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="collapseTwo"
                                    className="collapse"
                                    aria-labelledby="headingTwo"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        Woofic es una plataforma integral, en la que recibirás y gestionarás ofertas, realizarás
                                        calificaciones de proveedores y muchas más ventajas, por eso es necesario registrarse, ser
                                        poder acceder a su panel de administración personal.

                                    </div>
                                </div>
                            </div>
                            {/* <div class="card">
                <div class="card-header" id="headingThree">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Why use Woofic instead of contracting directly with the
                      provider?
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    Make secure payments through the platform. The conditions
                    are set by you, penalties for delays, blocking the last
                    payment until it has been installed or delivered. Woofic has
                    insurance in case the supplier does not deliver the screen
                    or the delivery is not in optimal condition. Many more
                    advantages HERE.
                  </div>
                </div>
              </div> */}
                            <div className="card">
                                <div className="card-header" id="headingFour">
                                    <h2 className="mb-0">
                                        <button
                                            className="btn btn-link btn-block text-left collapsed"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseFour"
                                            aria-expanded="false"
                                            aria-controls="collapseFour"
                                        >
                                            ¿Woofic favorece a alguna empresa?
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="collapseFour"
                                    className="collapse"
                                    aria-labelledby="headingFour"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        No. Woofic.com es un portal totalmente independiente, solo ponemos
                                        clientes en contacto con proveedores y cada proveedor hace
                                        su oferta personalizada directamente al cliente final, el
                                        El orden en el que se muestran los resultados por defecto es por orden.
                                        de llegada, la primera cita se muestra en la posición 1, por lo que
                                        en.
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingFive">
                                    <h2 className="mb-0">
                                        <button
                                            className="btn btn-link btn-block text-left collapsed"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseFive"
                                            aria-expanded="false"
                                            aria-controls="collapseFive"
                                        >
                                            ¿Cómo gana dinero Woofic.com?
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="collapseFive"
                                    className="collapse"
                                    aria-labelledby="headingFive"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        Nuestro servicio es completamente gratuito. Las ofertas que harás
                                        encontrar de los diferentes proveedores en Woofic son los mismos
                                        que encontrarás en cada empresa. No existen
                                        comisiones, sin incrementos de precio. Cada vez que un proyecto,
                                        se contrate producto o servicio, cobramos una comisión a
                                        al proveedor, nunca al usuario.
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


import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import logo from './LandingPage/images/wooficc.png';
import loginside from '../Images/service.png'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Alert, Button } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './DiscussionForum.css'
import side_image from './LandingPage/images/side_image.png';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Navbar from './Navbar'
import Footer from './LandingPage/components/Footer'


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
    //             console.log(response);
    //             handleClose()
    //             getQuestion();
    //         }, (error) => {
    //             console.log(error);
    //         });
    // }

    function getQuestion() {

        const { data: response } = axios.get(`https://api.woofics.com/api/forum_question`)
            .then((response) => {
                setQuestions(response.data);

            }, (error) => {
                console.log(error);
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
                <Link to='/pricecalculator'>Price Calculator</Link>
                <Link to="/discussionforum">Forum</Link>
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

                                        <Link to={`/moredetailsdiscussionforum/${val.id}`}>
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
                        <div class="woofic_lastnews_header">
                            <div class="woofic_lastnews_heading">FREQUENTLY ASKED QUESTION</div>
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
                                            How does Woofic work?
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
                                        Woofic sends its collaborators (suppliers) the questionnaire
                                        filled out by the client, within a maximum period of 48
                                        hours the suppliers have to answer questions and present a
                                        binding offer.
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
                                            Why do I have to register?
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
                                        Woofic is a comprehensive platform, in which you will receive and manage offers, perform
                                        supplier ratings and many more advantages, that is why it is necessary to register, to be
                                        able to access your personal administration panel.

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
                                            Does Woofic favor any company?
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
                                        No. Woofic.com is a totally independent portal, we only put
                                        customers in contact with suppliers and each supplier makes
                                        its personalized offer directly to the final customer, the
                                        order in which the results are shown by default is by order
                                        of arrival, the first quote is displayed at position 1 so
                                        on.
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
                                            How does Woofic.com make money?
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
                                        Our service is completely free. The offers that you will
                                        find from the different providers in Woofic are the same
                                        that you will find in each company. There are no
                                        commissions, no price increases. Every time a project,
                                        product or service is contracted, we charge a commission to
                                        the provider, never to the user.
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


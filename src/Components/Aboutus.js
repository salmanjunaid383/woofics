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

export default function Aboutus() {
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
<Footer />
        </>
    );
}


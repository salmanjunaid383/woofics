import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import './DiscussionForum.css'
import { makeStyles } from '@material-ui/core/styles';
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
    //             
    //             handleClose()
    //             getQuestion();
    //         }, (error) => {
    //             
    //         });
    // }

    function getQuestion() {

//         const { data: response } = 
// axios.get(`https://api.woofics.com/api/forum_question`,{
//             headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
//           })
//             .then((response) => {
//                 setQuestions(response.data);

//             }, (error) => {
                
//             });
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
            <Navbar />

            <div className="container mt-100">

                <div className="row">
                    <div className="col-md-12">
                        {questions == "" ? <div className="alert alert-success w-100 text-center m-5 col-md-12" role="alert">
                        No hay discusiones! </div>
                                        : 
                            questions.map((val, id) => {
                                return (
                                    <>

                                        <Link to={`/másdetallesforumdiscussion/${val.id}`}>
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <div className="media flex-wrap w-100 align-items-center"> 
                                                        <div className="media-body ml-3"> <a href="javascript:void(0)" data-abc="true">{val.asked_by}</a>
                                                            <div className="text-muted small">{(val.created_at).slice(0, 10)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <p> {val.question}</p>
                                                </div>
                                                <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                                                <div className="px-4 pt-3"></div>
                                                    <div className="px-4 pt-3"> <button type="button" className="btn btn-primary"><i className="ion ion-md-create"></i>&nbsp; Ver Todas las Respuestas</button> </div>
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


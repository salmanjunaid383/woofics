import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import './DiscussionForum.css'
import Navbar from './Navbar'
import Footer from './LandingPage/components/Footer'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Pusher from 'pusher-js';

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function Moredetailsdiscussionforum() {
    
    let history = useHistory();

    const { quid } = useParams()
    const [question, setQuestion] = useState("");
    const [user, setUser] = useState("");


    // var token = localStorage.getItem("user_token");
    // var decoded = jwt_decode(token);
    function getUserData() {

        // const { data: response } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
        //     .then((response) => {
        //         setUser(response.data);

        //     }, (error) => {
        //         console.log(error);
        //     });
    }


    function getQuestion() {

        const { data: response } = axios.get(`https://api.woofics.com/api/forum_question/${quid}`)
            .then((response) => {
                console.log("form question" +response)
                setQuestion(response.data);
            }, (error) => {
                console.log(error);
            });
    }

    const [allreplies, setAllreplies] = useState([]);

    function getReply() {

        const { data: response } = axios.get(`https://api.woofics.com/api/forum_answer/${quid}`)
            .then((response) => {
                setAllreplies(response.data);
            }, (error) => {
                console.log(error);
            });
    }


    const [reply, setReply] = useState("");

    function Forum(e) {
        e.preventDefault();

        const { data: response } = axios.post(`https://api.woofics.com/api/forum_answer`, {
            answer: reply,
            forum_question_id: quid,
            replied_by: user.first_name + " " + user.last_name
        })
            .then((response) => {
                getQuestion();
                getReply();
                setReply('');
            }, (error) => {
                console.log(error);
            });
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            Forum()

        }
    }




    useEffect(() => {
        // const pusher = new Pusher('e22c56269c9258608b2c', {
        //     cluster: 'ap1'
        //   });;
        // const channel = pusher.subscribe(""+decoded.sub+"");   
        // console.log("channel success "+ channel);    
        // channel.bind("my-event",function(returnData){
        //     getReply();
        // });
        getQuestion();
        getReply();
        getUserData();
    }, [])



    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();

    // var adminSideBar;
    // var clientSideBar;  
    // var providerSideBar;
    // var supplierSideBar;
    // const role = jwt_decode(localStorage.getItem('user_token'))
    //                     if (role.role === 'Client') {
    //                         clientSideBar=true;
    //                     } else if (role.role === 'ServiceProvider')
    //                         providerSideBar=true;
    //                     else if (role.role === 'Supplier') {
    //                         supplierSideBar=true;
    //                     } else {
    //                         adminSideBar=true;
    //                     }

    return (
        <>

<section className="nav-section" style={{backgroundImage:"linear-gradient(to right, #934CFF 10%, #F62B84)",height:"60px"}} >
            <Navbar />
            </section>
            <div className="d-sm-flex">
           

                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    


                   <div className="page-wrapper bg-light">
                        <div class="container mt-100">
                            <div class="row">
                                <div class="col-md-10 mx-auto">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <div class="media flex-wrap w-100 align-items-center"> 
                                            {/* <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg" class="d-block ui-w-40 rounded-circle" alt="" /> */}
                                                <div class="media-body ml-3 ChatCapitalize"> <a href="javascript:void(0)" data-abc="true">{question.asked_by}</a>
                                                    <div class="text-muted small"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <p> {question.question}
                                            </p>
                                        </div>
                                        <div class="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                                            { allreplies == '' ? <h3  className="text-center mx-auto m-lg-5"> No reply...</h3> :
                                                allreplies.map((val, id) => {
                                                    return (
                                                        <>

                                                            <div className="container w-75 my-2">
                                                                <div class="media flex-wrap w-100 align-items-center">
                                                                     {/* <img src="https://image.freepik.com/free-vector/smiling-girl-avatar_102172-32.jpg" class="d-block ui-w-40 rounded-circle" alt="" /> */}
                                                                    <div class="media-body ml-3 w-100 ChatCapitalize"> <a href="javascript:void(0)" data-abc="true">{val.replied_by}</a>
                                                                        <div class="text-muted small">{(val.created_at).slice(0, 10)}</div>
                                                                    </div>
                                                                    <div className="mt-2 border-top w-100">
                                                                        <p> {val.answer}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
            <Footer/>

        </>
    );
}

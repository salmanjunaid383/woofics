import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import './BLog.css';
import logo from './LandingPage/images/wooficc.png';
import Navbar from './Navbar'
import Footer from './LandingPage/components/Footer'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Contact.css'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function ContactUs() {
    let history = useHistory();

    const classes = useStyles();

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
                setname("")
                setemail("")
                setmessage("")
            }, (Error) => {
                console.log(Error);
            });
    }



    return (
        <>

            <Navbar />
            <div className="container.fluid">
                <div className="" style={{ height: '100%' }}>
                    <div class="container">
                        <div class="row mx-auto">
                            <div className="col-md-6 border-right mt-md-5 pt-md-5 w-75">
                                <h3>We Want to know your opinion</h3>
                                <TextField className="w-75 my-1" id="standard-basic" label="Name *"
                                    onChange={(e) => setname(e.target.value)}
                                />
                                <br />
                                <TextField className="w-75 my-1" id="standard-basic" label="Email *"
                                    onChange={(e) => setemail(e.target.value)}
                                />
                                <br />
                                <TextField className="w-75 my-1" id="standard-basic" label="Message *"
                                    onChange={(e) => setmessage(e.target.value)}
                                />
                                <br />
                                <br />

                                <button className="btn btn-primary" onClick={()=>Message()}>Send Message</button>

                            </div>
                            <div className="col-md-6 my-auto pt-md-5 mt-md-5 pl-md-5">
                                <h4>Write to us at:</h4>
                                <h5 className="text-primary"><a>hola@woofics.com</a></h5>
                                <br />
                                <h4>Telephone:</h4>
                                <h5 className="text-primary"><a>+34 680 49 47 29</a></h5>
                                <br />
                                <br />

                                <h5>Follow us:</h5>

                                <div>
                                    <span style={{ backgroundColor: "lightgray", borderRadius: "50%", padding: 10, margin: 7, color: 'white' }}><a target="_blank" href="https://www.facebook.com/Woofic-110333384466812"><i className="px-2 fa fa-facebook"></i></a></span>
                                    <span style={{ backgroundColor: "lightgray", borderRadius: "50%", padding: 10, margin: 7, color: 'white' }}><a target="_blank" href="woofic.com@gmail.com"><i className="px-1 fa fa-twitter"></i></a></span>
                                    <span style={{ backgroundColor: "lightgray", borderRadius: "50%", padding: 10, margin: 7, color: 'white' }}><a target="_blank" href="woofic.com@gmail.com"><i className="px-1 fa fa-instagram"></i></a></span>
                                    <span style={{ backgroundColor: "lightgray", borderRadius: "50%", padding: 10, margin: 7, color: 'white' }}><a target="_blank" href="https://www.linkedin.com/company/woofic"><i className="px-1 fa fa-linkedin"></i></a></span>
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


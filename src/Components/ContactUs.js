import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import './BLog.css';
import Navbar from './Navbar'
import Footer from './LandingPage/components/Footer'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Contact.css'
import ScrollToTop from './ScrollToTop'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function ContactUs() {
    ScrollToTop();
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
                
                alert("Message Sent!")
                setname("")
                setemail("")
                setmessage("")
            }, (Error) => {
                
            });
    }



    return (
        <>
            {/* <div className="new-nav"> */}
            <Navbar/>
            {/* </div> */}
            <div className="container.fluid for-mobile">
                <div className="" style={{ height: '100%' }}>
                    <div className="container ">
                        <div className="row mx-auto mobile-res">
                            <div className="col-12  col-md-6 border-right mt-md-5 pt-md-5 w-75">
                                <h3>Queremos saber tu opinión</h3>
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

                                <button className="btn btn-primary" onClick={()=>Message()} style={{marginTop:"10px"}}>Enviar Mensaje</button>

                            </div>
                            <div className="col-12 col-md-6 my-auto pt-md-5 mt-md-5 pl-md-5 for-margin">
                                <h4>Escríbanos a:</h4>
                                <h5 className="text-primary" style={{textTransform:'lowercase'}}><a>hola@woofics.com</a></h5>
                                <br />
                                <h4>Telephone:</h4>
                                <h5 className="text-primary"><a>+34 648 411 313</a></h5>
                                <br />
                                <br />

                                <h4 className="mob-mar" style={{marginTop:"-21px",marginBottom:"3px"}}>Síguenos:</h4>

                                <div className="social_icons" style={{marginTop:"2px"}}>
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
                                href="https://www.facebook.com/Woofic-110333384466812" rel="noreferrer"
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
                              <a target="_blank" href="https://twitter.com/Woofic1" rel="noreferrer">
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
                              <a target="_blank" href="https://www.instagram.com/woofics_com/" rel="noreferrer">
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
                                href="https://www.linkedin.com/company/woofic" rel="noreferrer"
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

            <Footer />
        </>
    );
}


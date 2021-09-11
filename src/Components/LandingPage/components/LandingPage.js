import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import '../css/LandingPage.css';
import side_image from '../images/img-01.png';
import { Link, useHistory } from 'react-router-dom'
import 'react-whatsapp-widget/dist/index.css'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Navbar from '../../Navbar'




const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        // backgroundColor: theme.palette.background.paper,
        // margin: theme.spacing(15, 2),
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        overflow: 'hidden',
        width: '100%',
        height: '90vh',
    },
}));

function LandingPage() {
    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    const classes = useStyles();
    const [openpop, setOpenpop] = React.useState(false);

    const handleOpenpop = () => {
        setOpenpop(true);
    };

    const handleClosepop = () => {
        setOpenpop(false);
    };


    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    var token = localStorage.getItem("user_token");

    const [show, setShow] = useState(true);

    function LoginBtn(e) {
        e.preventDefault();


        if (email === "" && password === "") {
            setOpen2(true)
        }
        else if (password.length < 8) {
            setOpen(true)
        }
        else {

            const { data: response } = axios.post(`https://api.woofics.com/api/login`, {
                email: email,
                password: password,
            })
                .then((response) => {
                    localStorage.setItem('user_token', response.data);
                    if (response) {
                        const role = jwt_decode(localStorage.getItem('user_token'))
                        if (role.role === 'Client') {
                            history.push("/tablero");
                        } else if (role.role === 'ServiceProvider')
                            history.push("/tablerodeadministración");
                        else if (role.role === 'Supplier') {
                            history.push("/tablero_de_proveedores");
                        } else {
                            history.push("/tablerodemandos");
                        }
                    }
                    // 
                }, (error) => {
                    setOpen3(true)
                    
                    history.push('/login');
                });
        }
    }
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };


    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen3(false);
    };

    //AuthGuard









    // Google Auth

    const responseGoogle = (respons) => {
        const res = axios.post(`https://api.woofics.com/api/social_login`, {
            email: respons.profileObj.email,
        })
            .then((response) => {
                localStorage.setItem('user_token', response.data);
                if (response) {
                    const role = jwt_decode(localStorage.getItem('user_token'))
                    if (role.role === 'Client') {
                        history.push("/tablero");
                    } else if (role.role === 'ServiceProvider')
                        history.push("/tablerodeadministración");
                    else if (role.role === 'Supplier') {
                        history.push("/tablero_de_proveedores");
                    } else {
                        history.push("/tablerodemandos");
                    }
                }
                // 
            }, (error) => {
                setOpen3(true)
                
                history.push('/login');
            });
    }

    //Facebook Auth

    return (
        <>
            <div className="container.fluid" >
                <div className="woofic_background" >


                    <Navbar />

                    {/* <div class="topnav fixed-top" id="myTopnav">
                        <Link to="/" >
                            <img src={logo} className="img-fluid float-left w-50 pl-lg-4" />
                        </Link>
                        <Link className="mt-3 mt-md-0" to="/">Home</Link>
                        <Link to="/allblog">Blog</Link>
                        <Link to='/contactus'>About Us</Link>
                        <Link to='/calculadora_de_precios'>Price Calculator</Link>
                        <Link to="/foro_de_discusion">Forum</Link>
                        <Link className="float-right mr-lg-4">
                            <button type="submit" class="f-button btn btn-white text-white " onClick={handleOpenpop}>Login/Register</button>
                        </Link>
                        <a href="javascript:void(0);" class="icon" onClick={myFunction}>
                            <i class="fa fa-bars"></i>
                        </a>
                    </div> */}



                    {/*
                    <div class="container">
                        <div class="row">

                             <div class="woofic_navbar w-100">
                                <div class="float-left pr-lg-4 w-25">
                                    <Link to="/">
                                        <img src={logo} className="img-fluid float-left"/>
                                    </Link>
                                </div>
                                <ol class="woofic_list text-right w-100">
                                    <li  className=""><Link className="text-dark" to="/">Home</Link></li>
                                    <li className=""><Link to="/allblog">Blog</Link></li>
                                    <li className=""><Link to='/contactus'>About Us</Link></li>
                                    <li className="" ><Link to='/calculadora_de_precios'>Price Calculator</Link></li>
                                    <li className=""><Link to="/foro_de_discusion">Forum</Link></li>
                                </ol>
                                <div class="woofic_button">
                                    <Link to="/login"> <button type="submit" class="f-button btn btn-white text-white">Login/Register</button></Link>
                                    <button type="submit" class="s-button btn btn-danger">Supplier</button>
                                </div>
                            </div>
                        </div>
                            </div> */}

                    <div id='stars'></div>
                    <div id='stars2'></div>
                    <div id='stars3'></div>
                    <div id='title'>
                        <div className="container woofic_slogan_container">
                            <div className="row">
                                <div className="col-md-7 col-sm-12">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="woofic_slogan text-left mt-lg-5 pt-lg-5 pt-sm-2" >
                                                    Encuentra, compara y contrata a los principales proveedores de pantallas led
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="woofic_receive_button text-left mt-lg-4" style={{marginBottom:"20px"}}>
                                                    <Link to="/cita_principal">Recibir ofertas</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-5 col-sm-7 mt-md-5 d-none d-md-block">
                                    <div className="side_ige w-100 mx-auto my-auto ">
                                        <img src={side_image} className="img-fluid man-image" />
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {/* <div> */}

            {/* </div> */}

            {/* <div>
    <CookieBanner
      message="Yes, we use cookies. If you don't like it change website, we won't miss you!"
      onAccept={() => {}}
    //   cookie="user-has-accepted-cookies"
       />
  </div> */}

        </>
    );
}
export default LandingPage;
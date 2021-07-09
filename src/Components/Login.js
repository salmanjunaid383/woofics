import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import loginside from '../Images/service.png'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Alert, Button } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


export default function Login() {
    let history = useHistory();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[wait,setWait] = useState('Log In')


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

            setWait('Please wait...')
            const { data: response } = axios.post(`https://api.woofics.com/api/login`, {
                email: email,
                password: password,
            })
                .then((response) => {
                    localStorage.setItem('user_token', response.data);
                    if (response) {
                        setWait('Log In')
                        const role = jwt_decode(localStorage.getItem('user_token'))
                        if (role.role === 'Client') {
                            history.push('/dashboard');
                        } else if (role.role === 'ServiceProvider')
                            history.push('/admindashboard');
                        else if (role.role === 'Supplier') {
                            history.push('/supplierdashboard');
                        } else {
                            history.push('/superdashboard');
                        }
                    }
                    // console.log(response)
                }, (error) => {
                    setWait('Log In')
                    setOpen3(true)
                    console.log(error);
                    history.push('/');
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
                    history.push('/dashboard');
                } else if (role.role === 'ServiceProvider')
                    history.push('/admindashboard');
                else if (role.role === 'Supplier') {
                    history.push('/supplierdashboard');
                } else {
                    history.push('/superdashboard');
                }
            }
            // console.log(response)
        }, (error) => {
            setOpen3(true)
            console.log(error);
            history.push('/');
        });
    }

    //Facebook Auth




    return (
        <>
            <div className="container mt-lg-5 mt-md-2 mt-sm-1 mx-auto  " >
                <div >
                    <div className="row d-flex ">
                        <div className="col-lg-6 mx-auto border px-3">
                            <div className=" py-3 px-4">
                                <div className="row">
                                    <img src="assets/plugins/images/woofic.jpeg " className="img-fluid w-50 mx-auto text-center mb-3" />
                                </div>
                                <div className="row w-75 mx-auto"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Email Address</h6>
                                </label> <input className="mb-4" onChange={(e) => setEmail(e.target.value)} type="email" required name="email" placeholder="Enter a valid email address" /> </div>
                                <div className="row w-75 mx-auto"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Password</h6>
                                </label> <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Enter password" /> </div>
                                <div className="row mb-4 w-100 mx-auto">
                                    <div className="custom-control custom-checkbox custom-control-inline"><a className="ml-5 mb-0 text-sm" onClick={()=>history.push('/forgetpwd')}>Forgot Password?</a> </div>
                                </div>
                                <div className="mb-4 mx-auto d-flex justify-content-center w-100">
                                    <button type="submit" className="btn btn-blue mx-auto" style={{ backgroundColor: 'rgb(118, 50, 63)' }} onClick={LoginBtn}>{wait}</button>
                                </div>
                                <div className="row mb-4">
                                    <div className="line"></div><small className="or text-center">or</small><div className="line"></div>
                                </div>
                                <div className="row mb-4 pl-1 mx-auto">
                                    <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                                    {/* <div className="facebook text-center mr-3">
                                        <div className="fa fa-facebook"></div>
                                    </div>
                                    <div className="twitter text-center mr-3">
                                        <div className="fa fa-instagram"></div>
                                    </div> */}
                                    <GoogleLogin
                                        clientId="101523716211-l7m06jsccfe7fa6u3tdinal5fofer8qt.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <div className="linkedin text-center mr-3" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                <div className="fa fa-google" ></div>
                                            </div>
                                        )}
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                <div className="row mb-4 pl-3 pr-auto"> <small className="font-weight-bold">Don't have an account? <Link className="text-danger" to="/client">Register</Link></small> </div>
                            </div>
                            <div className="text-center mx-auto mb-3">
                                <Link to="/"><button className="btn btn-success ">Go Home</button></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



            {/* Snackbar */}

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={"Password must be 8 digits long !"}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open2}
                autoHideDuration={6000}
                onClose={handleClose2}
                message={"Please fill all feilds!"}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open3}
                autoHideDuration={6000}
                onClose={handleClose3}
                message={"Wrong email password!"}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </>
    );
}


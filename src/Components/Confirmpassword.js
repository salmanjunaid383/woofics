import React, { useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import loginside from '../Images/service.png'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Alert, Button } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


export default function Confirmpassword() {

    let history = useHistory();
    const {rid} = useParams()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    function LoginBtn(e) {
        e.preventDefault();
        if (email === "" && password === "") {
            setOpen2(true)
        }
        else if (password.length < 8) {
            setOpen(true)
        }
        else if (password !== email) {
            setOpen3(true)
        }
        else {

            const { data: response } = axios.put(`https://api.woofics.com/api/password/${rid}`, {
                password: password,
            })
                .then((response) => {
                        history.push("/login");
                    // console.log(response)
                }, (error) => {
                    setOpen3(true)
                    console.log(error);
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
    }

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
                                    <h6 className="mb-0 text-sm">Password</h6>
                                </label> <input className="mb-4" onChange={(e) => setEmail(e.target.value)} type="password" name="email" placeholder="Enter new password " /> </div>
                                <div className="row w-75 mx-auto"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Confirm Password</h6>
                                </label> <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Enter confirm password" /> </div>
                                
                                <div className="mb-4 mx-auto d-flex justify-content-center w-100">
                                    <button type="submit" className="btn btn-blue mx-auto" style={{ backgroundColor: 'rgb(118, 50, 63)' }} onClick={LoginBtn}>Reset Password</button>
                                </div>
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
                message={"Password mismatch!"}
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


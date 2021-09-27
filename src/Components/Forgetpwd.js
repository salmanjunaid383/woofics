import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import logo2 from './LandingPage/images/woofics-new/WooficsLogo.png';

export default function Forgetpwd() {
    let history = useHistory();


    const [email, setEmail] = useState("");

    const [show, setShow] = useState(true);

    function LoginBtn(e) {
        e.preventDefault();


        if (email === "" ) {
            setOpen2(true)
        }
        else {

            const { data: response } = axios.post(`https://api.woofics.com/api/email_password`, {
                email: email,
            })
                .then((response) => {
                    setOpen(true)
                    
                    // localStorage.setItem('user_token', response.data);
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


    return (
        <>
            <div className="container mt-lg-5 mt-md-2 mt-sm-1 mx-auto  " >
                <div >
                    <div className="row d-flex ">
                        <div className="col-lg-6 mx-auto border px-3">
                            <div className=" py-3 px-4">
                                <div className="row">
                                    <img src={logo2} alt="Woofics " className="img-fluid w-50 mx-auto text-center mb-3" />
                                </div>
                                <div className="row w-75 mx-auto"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Dirección de correo electrónico</h6>
                                </label> <input className="mb-4" onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Introduzca una dirección de correo electrónico válida" /> </div>
                                <div className="mb-4 mx-auto d-flex justify-content-center w-100">
                                    <button type="submit" className="btn btn-blue mx-auto" style={{ backgroundColor: 'rgb(249, 92, 135)' }} onClick={LoginBtn}>Continuar</button>
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
                message={"Check your inbox to verify email!"}
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


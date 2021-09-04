import React, { useState,useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import './Nav.css'
import message from './—Pngtree—chat icon_4756851.png'
import Pusher from 'pusher-js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CustomSupplierAuth from "../CustomSupplierAuth";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


export default function Nav() {
    // CustomSupplierAuth();
    const history = useHistory()

    const url = window.location.href
  


    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;




    // popver Profile

    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;


    //Pusher Message

    const [mxg, setMxg] = useState('');
    // var toke = localStorage.getItem('token').toString()
    // var pusher = new Pusher('f7c71cbabef9234b8101', {
    //     cluster: 'ap1'
    // });     
    
    // var channel = pusher.subscribe(toke);


    const [openmessage, setOpen] = React.useState(false);

    // useEffect(()=>{
    //     channel.bind('my-event', function (data) {
    //         setMxg('New Message : ' + " " + JSON.stringify(data.message))
    //         if(JSON.stringify(data.message)){
    //             setOpen(true);
    //         }
    //     })
    // },[])

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
                data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full" className=" no-printme">
                <header className="topbar" data-navbarbg="skin5">
                    <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                        <div className="navbar-header" data-logobg="skin6">
                            <Link className="navbar-brand " to="/supplierdashboard">
                                <span className="logo-text text-dark p-0 m-0 text-center">
                                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop:"20px", marginBottom:"10px"}} />
                                </span>
                            </Link>
                            <a className="nav-toggler waves-effect waves-light text-dark d-block d-md-none"
                                href="javascript:void(0)"><i className="ti-menu ti-close"></i></a>
                        </div>
                        <div className="navbar-collapse collapse" id="navbarSupportedContent" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }}>
                            <ul className="navbar-nav d-none d-md-block d-lg-none">
                                <li className="nav-item">
                                    <a className="nav-toggler nav-link waves-effect waves-light text-white"
                                        href="javascript:void(0)"><i className="ti-menu ti-close"></i></a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto d-flex align-items-center">

                                {/* <li className=" in">
                                    <form role="search" className="app-search d-none d-md-block mr-3">
                                        <input type="text" placeholder="Search..." className="form-control mt-0" />
                                        <a href="" className="active">
                                            <i className="fa fa-search"></i>
                                        </a>
                                    </form>
                                </li> */}

                                <li>
                                    <a className="profile-pic" aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                        <span className="text-white font-medium Ring"><i className="fas fa-bell mr-2 "></i></span>
                                    </a>
                                </li>
                                <li>
                                    <a className="profile-pic" aria-describedby={id} variant="contained" color="primary" onClick={handleClick2}>
                                        <span className="text-white font-medium "><img className="img-fluid mb-2" src="https://image.flaticon.com/icons/png/512/147/147144.png" style={{ width: "40px" }} /></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography}>
                        <a className="profile-pic" >
                            <img src="assets/plugins/images/users/varun.jpg" alt="user-img" width="36" className="img-circle" />
                            <span className="text-black font-medium ml-1"> Steve le ha enviado una solicitud de registro </span>
                        </a>
                    </Typography>
                    <Typography className={classes.typography}>
                        <a className="profile-pic" >
                            <img src="assets/plugins/images/users/varun.jpg" alt="user-img" width="36" className="img-circle" />
                            <span className="text-black font-medium ml-1"> Steve le ha enviado una solicitud de registro </span>
                        </a>
                    </Typography>
                    <Typography className={classes.typography}>
                        <a className="profile-pic" >
                            <img src="assets/plugins/images/users/varun.jpg" alt="user-img" width="36" className="img-circle" />
                            <span className="text-black font-medium ml-1"> Steve le ha enviado una solicitud de registro </span>
                        </a>
                    </Typography>
                    <Typography className={classes.typography}>
                        <a className="profile-pic" >
                            <img src="assets/plugins/images/users/varun.jpg" alt="user-img" width="36" className="img-circle" />
                            <span className="text-black font-medium ml-1"> Steve le ha enviado una solicitud de registro </span>
                        </a>
                    </Typography>
                </Popover>



                {/* //profile popover */}

                <Popover
                    id={id2}
                    open={open2}
                    anchorEl={anchorEl2}
                    onClose={handleClose2}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography}>
                        <Link className="profile-pic" to="/supplierupdateprofile" style={{ textDecoration: 'none' }}>
                            <i className="fa fa-user mx-3"></i>
                            <span className="text-black font-medium mr-3">Perfil</span>
                        </Link>
                    </Typography>
                    <Typography className={classes.typography}>
                        <a className="profile-pic" onClick={() => { localStorage.removeItem('user_token'); history.push('/login') }}>
                            <i className="fa fa-sign-out mx-3"></i>
                            <span className="text-black font-medium mr-3">Cerrar Sesión</span>
                        </a>
                    </Typography>

                </Popover>


                {url === 'http://woofic.nastechltd.co/supchat' ? 
                    ' '
                 : 
                <div className="row">
                    <div className="col-md-12 ">
                        <Link to="/supchat">
                        <img src={message} style={{ width: '50px',    position: 'fixed',float: 'right', bottom: '28px', right: '30px', zIndex: '100',backgroundColor:'rgba(7, 72, 138, 0.71)',borderRadius:'50px'}} />
                        </Link>
                    </div>
                </div>
                    }
            </div>


            {url === 'http://woofic.nastechltd.co/supchat' ?
            ' '
                        :
                        <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                            open={openmessage}
                            autoHideDuration={6000}
                            onClose={handleCloseMessage}
                            message={mxg}
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                            }
                            />
                        
                }
        </>
    );
}


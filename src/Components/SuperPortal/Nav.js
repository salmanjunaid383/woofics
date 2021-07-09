import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CustomAdminAuth from "../CustomAdminAuth";



const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


export default function Nav() {
    CustomAdminAuth();

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



    return (
        <>
            <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
                data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
                <header className="topbar" data-navbarbg="skin5">
                    <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                        <div className="navbar-header" data-logobg="skin6">
                            <Link className="navbar-brand " to="/admindashboard">
                                <span className="logo-text text-dark p-0 m-0 text-center">
                                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px' }} />
                                </span>
                            </Link>
                            <a className="nav-toggler waves-effect waves-light text-dark d-block d-md-none"
                                href="javascript:void(0)"><i className="ti-menu ti-close"></i></a>
                        </div>
                        <div className="navbar-collapse collapse" id="navbarSupportedContent" style={{ backgroundColor: '#76323f' }}>
                            <ul className="navbar-nav d-none d-md-block d-lg-none">
                                <li className="nav-item">
                                    <a className="nav-toggler nav-link waves-effect waves-light text-white"
                                        href="javascript:void(0)"><i className="ti-menu ti-close"></i></a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto d-flex align-items-center">

                                <li className=" in">
                                    <form role="search" className="app-search d-none d-md-block mr-3">
                                        <input type="text" placeholder="Search..." className="form-control mt-0" />
                                        <a href="" className="active">
                                            <i className="fa fa-search"></i>
                                        </a>
                                    </form>
                                </li>
                                <li>
                                    <a className="profile-pic" aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                      <span className="text-white font-medium"><i className="fas fa-bell mr-2"></i></span>
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
                        <span className="text-black font-medium ml-1"> Steave has sent an registration request to you </span>
                    </a>
                    </Typography>
                    <Typography className={classes.typography}>
                        <a className="profile-pic" >
                        <img src="assets/plugins/images/users/varun.jpg" alt="user-img" width="36" className="img-circle" />
                        <span className="text-black font-medium ml-1"> Steave has sent an registration request to you </span>
                    </a>
                    </Typography>
                    <Typography className={classes.typography}>
                        <a className="profile-pic" >
                        <img src="assets/plugins/images/users/varun.jpg" alt="user-img" width="36" className="img-circle" />
                        <span className="text-black font-medium ml-1"> Steave has sent an registration request to you </span>
                    </a>
                    </Typography>
                    <Typography className={classes.typography}>
                        <a className="profile-pic" >
                        <img src="assets/plugins/images/users/varun.jpg" alt="user-img" width="36" className="img-circle" />
                        <span className="text-black font-medium ml-1"> Steave has sent an registration request to you </span>
                    </a>
                    </Typography>
                </Popover>

            </div>
        </>
    );
}


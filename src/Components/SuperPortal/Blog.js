import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Sidebar'
import Nav from './Nav'
import './BLog.css';

import FindInPageIcon from '@material-ui/icons/FindInPage';
import RateReviewIcon from '@material-ui/icons/RateReview';





//Sidebar
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PollIcon from '@material-ui/icons/Poll';
import SuperDashboard from './SuperDashboard';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AssistantIcon from '@material-ui/icons/Assistant';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import DvrIcon from '@material-ui/icons/Dvr';
import HelpIcon from '@material-ui/icons/Help';
import BookIcon from '@material-ui/icons/Book';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import NotificationsIcon from '@material-ui/icons/Notifications';
import jwt_decode from 'jwt-decode'

import Badge from '@material-ui/core/Badge';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import CustomAdminAuth from "../CustomAdminAuth";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: "white",
        boxShadow: 'none',
        border: "none",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        backgroundImage: "linear-gradient(180deg, #F62B84 0%, #934CFF 100%)",
        width: drawerWidth,
        boxShadow: 'none',
        border: "none"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    },
    typography: {
        padding: theme.spacing(1),
    },
    link: {
        textDecoration: 'none',
        color: '#cdcdcd',
        fontWeight: 'bolder'
    },
    // background-image:linear-gradient(180deg, #934CFF 0%, #F62B84 100%);
    item: {
        color: 'white',
        margin: '0px'
        , "&:hover": {
            color: 'white',
            margin: '0px'
        }
    },
}));



export default function Blog() {
    CustomAdminAuth();
    let history = useHistory();

    const [blog, setBlog] = useState([]);
    useEffect(() => {
        createBlog();
    }, [])

    function createBlog() {
        const { data: response } = axios.get(`https://api.woofics.com/api/blog`)
            .then((response) => {
                console.log("Blog Response "+response)
                if (response) {
                    console.log("Blog response data "+response.data)
                    setBlog(response.data)
                }
            }, (Error) => {
                console.log("Blog post "+Error);
            });
    }

    function deleteBlog(id) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/blog/${id}`)
                .then((response) => {
                    createBlog()
                }, (Error) => {
                    console.log("delete error")
                    console.log(Error);
                });
        }
    }

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const url = window.location.href



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        notification()
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



    const Data = [
        {
            name: 'Admin Dashboard',
            icon: <DashboardIcon style={{ color: "#cdcdcd" }} />,
            to: '/superdashboard'
        },
        {
            name: 'Registrations',
            icon: <PollIcon style={{ color: "#cdcdcd" }} />,
            to: '/registration'
        },
        {
            name: 'Services',
            icon: <FindInPageIcon style={{ color: "#cdcdcd" }} />,
            to: '/viewservices'
        },
        {
            name: 'Offers',
            icon: <LoyaltyIcon style={{ color: "#cdcdcd" }} />,
            to: '/offerbadge'
        },
        {
            name: 'Reviews',
            icon: <RateReviewIcon style={{ color: "#cdcdcd" }} />,
            to: '/viewreviews'
        },
        {
            name: 'Coupons',
            icon: <LocalOfferIcon style={{ color: "#cdcdcd" }} />,
            to: '/couponslist'
        },
        {
            name: 'Led ',
            icon: <DvrIcon style={{ color: "#cdcdcd" }} />,
            to: '/ledlist'
        },
        {
            name: 'Get Inspire',
            icon: <FeaturedVideoIcon style={{ color: "#cdcdcd" }} />,
            to: '/getinspired'
        },
        {
            name: 'Advertise',
            icon: <PhotoAlbumIcon style={{ color: "#cdcdcd" }} />,
            to: '/advertised'
        },
        {
            name: 'Ledger',
            icon: <HourglassEmptyIcon style={{ color: "#cdcdcd" }} />,
            to: '/ledger'
        },
         {
            name: 'Data of Interest',
            icon: <SwapVertIcon style={{ color: "#cdcdcd" }} />,
            to: '/dataofint'
        },
        {
            name: 'Charges',
            icon: <EqualizerIcon style={{ color: "#cdcdcd" }} />,
            to: '/charges'
        },
        {
            name: 'View Contacts',
            icon: <ContactMailIcon style={{ color: "#cdcdcd" }} />,
            to: '/viewcontact'
        },
        
       
        {
            name: 'Help List',
            icon: <HelpIcon style={{ color: "#cdcdcd" }} />,
            to: '/helplist'
        },
        {
            name: 'Complain',
            icon: <AssistantIcon style={{ color: "#cdcdcd" }} />,
            to: '/admincomplain'
        },
        {
            name: 'Blog',
            icon: <BookIcon style={{ color: "white" }} />,
            to: '/blog'
        },
    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/superdashboard">
                <span className="logo-text text-dark p-0 m-0 text-center">
                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop:"20px", marginBottom:"10px"}} />
                </span>
            </Link>
            <div className={classes.toolbar} />
           
            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                     <ListItem button key={text} className={text.name == "Blog"? classes.item : ''}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} style={{marginLeft:"-17px"}} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    // const container = window !== undefined ? () => window().document.body : undefined;

    const [newnoti, setnewnoti] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function notification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`)
            .then((response) => {
                setnewnoti(response.data)
                seen()
            }, (Error) => {
                console.log(Error);
            });
    }
   function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
                .then((response) => {notification()
                }, (Error) => {
                        console.log(Error);
                });
}

    const [unseen, setunseen] = useState([]);
    function seen() {
        const { data: response } = axios.get(`https://api.woofics.com/api/unseen/${decoded.sub}`)
            .then((response) => {
                setunseen(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }
    useEffect(() => {
        seen()
    }, [])
    return (
        <>
            <div className="d-sm-flex">
                {/* <CssBaseline /> */}
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <ul className="ml-auto d-flex my-auto">
                            <li className="my-auto">
                                <a className="profile-pic" aria-describedby={id} variant="contained" data-toggle="tooltip" data-placement="top" title="Notifications" color="primary" onClick={handleClick}>
                                    <span className="text-white font-medium  Ring"><Badge color="secondary" variant={unseen == 0 ? '' : 'dot'} >
                                        <NotificationsIcon color="primary" />
                                    </Badge></span>
                                </a>
                            </li>
                            <li>
                                <a className="profile-pic" aria-describedby={id} variant="contained" color="primary" onClick={handleClick2}>
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src="https://image.flaticon.com/icons/png/512/147/147144.png" style={{ width: "40px" }} /></span>
                                </a>
                            </li>
                        </ul>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            // container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                        <div class="container">
                            <div className="d-md-flex mb-3">
                                    <h3 className="box-title mb-0 mx-auto text-center mt-2"> BLOG </h3>
                            </div>

                            <div id="blog" class="row">

                                <div class="col-md-12">
                                    
                                    <div className="mr-auto mb-3 mt-2">
                                        <a class="btn pull-right greenbtn text-white mb-3" onClick={() => history.push('/createblog')}>Create New Blog</a>
                                    </div>
                                   
                                </div>
                                <div className="col-md-10 text-left mx-auto">
                                    {blog == '' ? <div className="my-lg-3 mx-auto text-center w-100">Nothing to show! Start creating Blogs...</div>
                                        : blog.map((val, id) => {
                                            return (
                                                <>
                                                    
                                                    <div class="card mb-3 w-100">

                                                        <div class="row ">
                                                            <div class="col-md-4 my-auto">
                                                                <img src={val.image} alt="..."  className="img-fluid"/>
                                                            </div>
                                                            <div class="col-md-8 my-auto">
                                                                <div class="card-body">
                                                                
                                                                    <h3 class="card-title">{val.author}</h3>
                                                                    <h5 class="card-text">{val.article}</h5>
                                                                    <p class="card-text"><small class="text-muted ">Date: {(val.created_at).slice(0, 10)}</small></p>
                                                                    <button value={val.id} class="btn btn-danger" onClick={e => deleteBlog(e.target.value)} >Delete</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }).reverse()}

                                </div>
                                <div class="col-md-12 gap10"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

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
               
                                {newnoti == '' ? <Typography className={classes.typography}>
                                        <a className="profile-pic" >
                                                <span className="text-black font-medium ml-1">No Notification !</span>
                                        </a>
                                </Typography> :
                                        newnoti.slice(0, 5).map((val) => {
                                                return (
                                                        <>
                                                                <Link to={`/${val.link}`}>
                                                                        <Typography className={`${classes.typography} bg-light text-dark`} >
                                                                                <a className="profile-pic" >
                                                                                        <span className="text-black font-medium ml-1">{val.notification} <span className="float-right text-danger pl-md-2" onClick={()=>notificationDelete(val.id)}><i className="fa fa-close"></i></span></span>
                                                                                </a>
                                                                        </Typography>
                                                                </Link>
                                                        </>
                                                )
                                        }).reverse()

                                        }
                                        <Link to='/adminallnotification'>
                                        <Typography className={`${classes.typography} bg-dark text-light`} >
                                        <a className="profile-pic" >
                                                <span className="text-black font-medium ml-1">See all Notification <span className="float-right text-light pl-md-2"><i className="fa fa-arrow-right"></i></span></span>
                                        </a>
                                </Typography>
                                    </Link>
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
                    <a className="profile-pic" onClick={() => { history.push('/') }}>
                        <i className="fa fa-home mx-3"></i>
                        <span className="text-black font-medium mr-3">Go home</span>
                    </a>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { localStorage.clear(); history.push('/') }}>
                        <i className="fa fa-sign-out mx-3"></i>
                        <span className="text-black font-medium mr-3">Logout</span>
                    </a>
                </Typography>

            </Popover>


        </>
    );
}


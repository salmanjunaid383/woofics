import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import '../ClientPortal/Help.css';
import loginside from '../../Images/loginside.jpg'
import axios from 'axios';
import Sidebar from './Sidebar'
import Nav from './Nav'
import StarRatings from 'react-star-ratings';
import jwt_decode from 'jwt-decode'
import Pusher from 'pusher-js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
//Sidebar
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
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
import message from './—Pngtree—chat icon_4756851.png'
import DashboardIcon from '@material-ui/icons/Dashboard';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Dashboard from './Dashboard';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AssistantIcon from '@material-ui/icons/Assistant';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import CallEndIcon from '@material-ui/icons/CallEnd';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Pusherr from './../Pusherr';


import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CustomClientAuth from "../CustomClientAuth";


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




export default function Help() {
    CustomClientAuth();
    let history = useHistory();

    const [query, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const token = localStorage.getItem('user_token');
    var decoded = jwt_decode(token);

    const [disable,setDisable] = useState('disabled');


    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/help`, {
            question: query,
            user_id: decoded.sub,
            description: answer,
        })
            .then((response) => {
                if (response) {
                    setOpenn(true);
                    setQuestion('');
                    setAnswer('')
                history.push('/responses');
                }
            }, (Error) => {
                console.log(Error);
                history.push('/help');
            });
    }

    const [openn, setOpenn] = React.useState(false);
    const handleClosee = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenn(false);
    };


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
            name: ' Dashboard',
            icon: <DashboardIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'dashboard'
        },
        {
            name: 'Services',
            icon: <InsertEmoticonIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'addservice'
        },
        {
            name: 'Offers',
            icon: <LocalOfferIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'customeroffer'
        },
        {
            name: 'Projects',
            icon: <PlaylistAddCheckIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'project'
        },
        {
            name: 'Service Provider',
            icon: <AssistantIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'suppliers'
        },
        {
            name: 'Discussion Forum',
            icon: <ContactMailIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'clientdiscussionforum'
        },
        {
            name: 'Help',
            icon: <LiveHelpIcon  style={{color:"white"}}/>,
            to: 'help'
        },
        {
            name: 'Complain',
            icon: <CallEndIcon  style={{ color: "#cdcdcd" }}/>,
            to: 'complain'
        },


    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/dashboard">
                <span className="logo-text text-dark p-0 m-0 text-center">
                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop:"20px", marginBottom:"10px"}}/>
                </span>
            </Link>
            <div className={classes.toolbar} />
           
            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                          <ListItem button key={text} className={text.name == "Help"? classes.item : ''}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    // const container = window !== undefined ? () => window().document.body : undefined;

    const [name, setName] = useState([]);

    function notification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`)
            .then((response) => {
                setName(response.data)
                seen()
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

     //................Chat Seen
     const [UnseenMxg, setUnseenMxg] = useState([]);
     function chatnotification() {
         const { data: response } = axios.get(`https://api.woofics.com/api/chat_unseen/${decoded.sub}`)
             .then((response) => {
                 setUnseenMxg(response.data)
                 seen()
             }, (Error) => {
                 console.log(Error);
             });
     }

    useEffect(() => {        chatnotification()

        seen()
    }, [])


    const [Imagedata, setImageData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((res) => {
                setImageData(res.data)
            }
            )

    }

   function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
                .then((response) => {notification()
                }, (Error) => {
                        console.log(Error);
                });
}

    useEffect(() => {
        getData()
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
                                <Link to="/chat" className="profile-pic" aria-describedby={id} variant="contained" color="primary" >
                                    <span className="text-white font-medium  "><Badge color="secondary" variant={UnseenMxg == 0 ? '' : 'dot'} >
                                        <MailIcon color="primary"/>
                                    </Badge></span>
                                </Link>
                            </li>
                            <li className="my-auto">
                                <a className="profile-pic" aria-describedby={id} variant="contained" data-toggle="tooltip" data-placement="top" title="Notifications" color="primary" onClick={handleClick}>
                                    <span className="text-white font-medium  Ring"><Badge color="secondary" variant={unseen == 0 ? '' : 'dot'} >
                                        <NotificationsIcon color="primary" />
                                    </Badge></span>
                                </a>
                            </li>
                            <li>
                                <a className="profile-pic" aria-describedby={id} data-toggle="tooltip" data-placement="top" title="Settings" variant="contained" color="primary" onClick={handleClick2}>
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src={Imagedata.profile_image !== null ? Imagedata.profile_image :  "https://image.flaticon.com/icons/png/512/147/147144.png" }  style={{ width: "40px",borderRadius:"50px" }}/></span>
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
                    <Pusherr />

                   <div className="page-wrapper bg-light">
                        <div class="container p-4">
                            <div class="row">
                                <div class="col-md-8 mx-auto">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="col-md-12 row" style={{ padding: '0px', marginBottom: '10px' }}>

                                                <div class="col-md-2">
                                                    <img src="http://dinus.org/img/fakultas/FIK/cs/cs.svg" />
                                                    <div style={{ marginLeft: '30px' }}>
                                                        <img src="http://dinus.org/img/fakultas/FIK/cs/cs.png" width="70px" height="70px" class="img-circle" style={{ border: '3px solid #052C52' }} />
                                                    </div>
                                                </div>
                                                <div class="col-md-10">
                                                    <hr />
                                                    <p style={{ paddingLeft: '55px', fontSize: '1.3em' }}><strong>Admin</strong></p>
                                                    <Link to="/Responses" className="pt-3  responseLinkStaz"  >
                                                        Responses
                                                    </Link>

                                                </div>


                                            </div>

                                            <form>
                                                <table class="table">
                                                    <tr>
                                                        <td>
                                                            <input class="form-control" type="text" placeholder="query" value={query} onChange={(e) => setQuestion(e.target.value)} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <textarea class="form-control" rows="4" value={answer} placeholder="Description text . . ." onChange={(e) => setAnswer(e.target.value)}></textarea>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button class={`btn btn-sm ${query == '' || answer == '' ? disable : ''}`}  onClick={Feedback} style={{ width: '100%', backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }}><i class="fa fa-envelope-o" style={{ paddingRight: '5px' }}></i> Send</button>
                                                        </td>
                                                    </tr>
                                                </table>

                                            </form>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>


                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openn}
                        autoHideDuration={6000}
                        onClose={handleClosee}
                        message={'Sent ✔️'}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosee}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
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
               {name == '' ? <Typography className={classes.typography}>
                    <a className="profile-pic" >
                        <span className="text-black font-medium ml-1">No Notification !</span>
                    </a>
                </Typography> :
                    name.slice(0, 5).map((val) => {
                        return (
                            <>
                                <Link to={`/${val.link}`}>
                                    <Typography className={`${classes.typography} bg-light text-dark`} >
                                        <a className="profile-pic" >
                                            <span className="text-black font-medium ml-1">{val.notification} <span className="float-right text-danger pl-md-2" onClick={() => notificationDelete(val.id)}><i className="fa fa-close"></i></span></span>
                                        </a>
                                    </Typography>
                                </Link>
                            </>
                        )
                    }).reverse()

                }
                <Link to='/clientallnotification'>
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
          <Link
            className="profile-pic"
            to="/updateprofile"
            style={{ textDecoration: "none" }}
          >
            <i className="fa fa-user mx-3"></i>
            <span className="text-black font-medium mr-3">Profile</span>
          </Link>
        </Typography>
        <Typography className={classes.typography}>
          <a className="profile-pic" onClick={() => history.push("/responses")}>
            <i className="fa fa-support mx-3"></i>
            <span className="text-black font-medium mr-3">Help & Support</span>
          </a>
        </Typography>
        <hr />
        <Typography className={classes.typography}>
          <a className="profile-pic" onClick={() => history.push("/mycoupon")}>
            <i className="fa fa-heart mx-3"></i>
            <span className="text-black font-medium mr-3">My Coupons</span>
          </a>
        </Typography>
        <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { history.push('/') }}>
                        <i className="fa fa-home mx-3"></i>
                        <span className="text-black font-medium mr-3">Go home</span>
                    </a>
                </Typography>
        <Typography className={classes.typography}>
          <a
            className="profile-pic"
            onClick={() => {
              localStorage.removeItem("user_token");
              history.push("/");
            }}
          >
            <i className="fa fa-sign-out mx-3"></i>
            <span className="text-black font-medium mr-3">Logout</span>
          </a>
        </Typography>
      </Popover>


            {url === 'http://woofic.nastechltd.co/chat' ?
                ' '
                :
                <Link to="/chat">
                    <img src={message} style={{ width: '50px', position: 'fixed', float: 'right', bottom: '28px', right: '30px', zIndex: '100', backgroundColor: 'rgba(7, 72, 138, 0.71)', borderRadius: '50px' }} />
                </Link>
            }

        </>
    );
}


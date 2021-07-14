import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import loginside from '../../Images/loginside.jpg'
import axios from 'axios';
import Sidebar from './Sidebar'
import Nav from './Nav'
import StarRatings from 'react-star-ratings';
import jwt_decode from 'jwt-decode';
import Pusher from 'pusher-js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Pusherr from './../Pusherr';


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
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AssistantIcon from '@material-ui/icons/Assistant';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ListIcon from '@material-ui/icons/List';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CustomProviderAuth from "../CustomProviderAuth";
import TextField from '@material-ui/core/TextField';
import { loadStripe } from "@stripe/stripe-js";

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



export default function ProviderLedger() {
    CustomProviderAuth();
    let history = useHistory();

    const [form, setForm] = useState([]);
    const [article, setArticle] = useState([]);

    const [check, setcheck] = useState('false')
    const[providerName,setProviderName]= useState('')
    const[description,setDescription]=useState('')
    const[currency,setCurrency]=useState('')
    const[amount,setAmount]=useState(0)
    const[userId,setUserId]=useState(0)
    const[totalAmount,setTotalAmount]=useState(0)

    useEffect(() => {
        if (!localStorage.getItem('user_token')) {
            history.push('/')
        }

    })

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function getServiceledger() {

        const { data: response } = axios.get(`https://api.woofics.com/api/service_provider_balance/${decoded.sub}`)
            .then((response) => {
                setUserId(decoded.sub)
                setArticle(response.data[0])
                setTotalAmount(response.data.balance)
                console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }
    useEffect(() => {
        getServiceledger();
    }, [])
    const stripePromise = loadStripe("pk_test_51IIWuIApAAjWKIoNrjwEcTyuCykDQVAqXWIBpwsNt1trDbRXD9n6uKPRvZlDKdQLNyIRiKaSAwpPgbUAjhEkqOJ400HEEcjDh1");

    async function stripePayment(e){
        console.log(name,currency,description,amount,userId);
        e.preventDefault();
        const stripe = await stripePromise;
        const { data: response } = axios.post(`https://api.woofics.com/api/stripe_payment`, {         
            name: providerName,
            description: description,
            currency: 'usd',
            amount: amount,
            user_id: userId
        })
            .then((response) => {
                stripe.redirectToCheckout({
                    sessionId: response.data.session_id,
                });
            }, (Error) => {
                console.log(Error);
            });
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
        notificationfun()
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
    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }



    const Data = [
        {
            name: 'Dashboard',
            icon: <DashboardIcon style={{ color: "#cdcdcd" }} />,
            to: '/admindashboard'
        },
        {
            name: 'Todo',
            icon: <PlaylistAddCheckIcon style={{ color: "#cdcdcd" }} />,
            to: '/todo'
        },
        {
            name: 'Offers List',
            icon: <ListIcon style={{ color: "#cdcdcd" }} />,
            to: '/offerlist'
        },
        {
            name: 'Ledger',
            icon: <BorderColorIcon style={{ color: "white" }} />,
            to: '/providerledger'
        },
        {
            name: 'Help',
            icon: <LiveHelpIcon style={{ color: "#cdcdcd" }} />,
            to: '/providerhelp'
        },
        {
            name: 'Complain',
            icon: <CallEndIcon style={{ color: "#cdcdcd" }} />,
            to: '/providercomplain'
        },

    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/admindashboard">
                <span className="logo-text text-dark p-0 m-0 text-center">
                    <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop:"20px", marginBottom:"10px"}} />
                </span>
            </Link>
            <div className={classes.toolbar} />

            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                        <ListItem button key={text} className={text.name == "Ledger" ? classes.item : ''}>
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

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function notificationfun() {
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

    const [Imagedata, setImageData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((res) => {
                setImageData(res.data.profile_image)
            }
            )

    }
    function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
            .then((response) => {
            }, (Error) => {
                console.log(Error);
            });
    }

    useEffect(() => {
        chatnotification()
        seen()
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
                                <Link to="/providerchat" className="profile-pic" aria-describedby={id} variant="contained" color="primary" >
                                    <span className="text-white font-medium  "><Badge color="secondary" variant={UnseenMxg == 0 ? '' : 'dot'} >
                                        <MailIcon color="primary" />
                                    </Badge></span>
                                </Link>
                            </li>
                            <li className="my-auto">
                                <a className="profile-pic" aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                    <span className="text-white font-medium  Ring"><Badge color="secondary" variant={unseen == 0 ? '' : 'dot'}>
                                        <NotificationsIcon color="primary" />
                                    </Badge></span>
                                </a>
                            </li>
                            <li>
                                <a className="profile-pic" aria-describedby={id} variant="contained" color="primary" data-toggle="tooltip" data-placement="top" title="Settings" onClick={handleClick2}>
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src={Imagedata !== null ? Imagedata :  "https://image.flaticon.com/icons/png/512/147/147144.png" } style={{ width: "40px", borderRadius: "50px" }} /></span>
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
                        <div class="container">
                            <div id="blog" class="row">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="d-md-flex mb-3">
                                                <h1 className="box-title h1 mb-0 text-center mx-auto">Ledger</h1>
                                            </div>


                                            <div class="form-horizontal form-material" style={{ textAlign: 'left', transition:"0.3s"}}>
                                                        <div className="row mt-4 mx-auto">
                                                            <div className="col-lg-8 col-xlg-9 col-md-12 mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                            <div class="card">
                                                            <div class="card-body">
                                                            <div className="row mt-4">
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setProviderName(e.target.value)}
                                                                    label="Name"
                                                                    placeholder="Name"

                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                    label="Description"
                                                                    placeholder="Description"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>  
                                                                
                                                                
                                                                    
                                                            </div>
                                                            <div className="row mt-5">
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setCurrency(e.target.value)}
                                                                    label="Currency"
                                                                    placeholder="Currency"
                                                                    disabled="true"
                                                                    value = "usd"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setAmount(e.target.value)}
                                                                    label="Amount"
                                                                    placeholder="Amount"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                                    
                                                                    
                                                            </div>
                                                            <div class="mb-4 mt-4 text-center mx-auto">
                                                                    <div class="col-sm-12 text-center">
                                                                    <button class={`btn text-white mt-2 greenbtn text-white `}  onClick={(e) => stripePayment(e)}>Pay Invoice</button>
                                                                    </div>
                                                            </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 mb-4 mt-4 w-100 text-center mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                                <div class="col-sm-12 text-center">
                                                                    {/* <button class={`btn text-white greenbtn text-white `}  onClick={() => supplierRental()}>Add</button> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                            </div>

                                            




                                            <div className="table-responsive">
                                                <table className="table no-wrap" style={{tableLayout:"fixed", width:"100%"}}>
                                                    <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white text-center">#</th>
                                                            <th className="border-top-0 text-white text-center">BALANCE</th>
                                                            <th className="border-top-0 text-white text-center">CREATED AT</th>
                                                            {/* <th></th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            
                                                            article == '' ? <h3 className="mt-5 text-center"> Nothing to show!</h3> :
                                                                article.map((val, id) => {
                                                                    return (
                                                                        <>
                                                                            <tr>
                                                                                <td className="txt-oflo text-center">{returnIndex()}</td>
                                                                                <td className="txt-oflo text-center">{val.balance}</td>
                                                                                <td className="txt-oflo text-center">{(val.created_at).slice(0,10)}</td>
                                                                                {/* <td></td> */}
                                                                                {/* <td className="text-danger text-center"><button class={val.locked !== 0 ? "btn text-white btn-danger" : "btn text-white btn-success"} value={val.id} onClick={(e) => history.push(`/ledgerview/${val.id}`)}>View more</button></td> */}
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                })}
                                                                {
                                                            article !== '' ?
                                                            <tr style={{marginTop:'10px'}}><td className="txt-oflo text-center">Total Amount : {totalAmount} $ </td>
                                                                <td className="txt-oflo text-center"></td>
                                                                <td className="txt-oflo text-center"><button class={/*val.locked !== 0 ?*/"btn text-white btn-success"}  onClick={() => setcheck('true')}>Generate Invoice</button></td>
                                                                {/* <td className="txt-oflo text-center"></td> */}
                                                                
                                                            </tr> : <h3></h3> 
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
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
                <Link to='/providerallnotification'>
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
                    <Link className="profile-pic" to="/adminupdateprofile" style={{ textDecoration: 'none' }}>
                        <i className="fa fa-user mx-3"></i>
                        <span className="text-black font-medium mr-3">Profile</span>
                    </Link>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => history.push('/providerresponses')}>
                        <i className="fa fa-support mx-3"></i>
                        <span className="text-black font-medium mr-3">Help & Support</span>
                    </a>
                </Typography>
                <hr />
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { history.push('/') }}>
                        <i className="fa fa-home mx-3"></i>
                        <span className="text-black font-medium mr-3">Go home</span>
                    </a>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { localStorage.removeItem('user_token'); history.push('/') }}>
                        <i className="fa fa-sign-out mx-3"></i>
                        <span className="text-black font-medium mr-3">Logout</span>
                    </a>
                </Typography>

            </Popover>


            {url === 'http://woofic.nastechltd.co/providerchat' ?
                ' '
                :

                <Link to="/providerchat">
                    <img src={message} style={{ width: '50px', position: 'fixed', float: 'right', bottom: '28px', right: '30px', zIndex: '100', backgroundColor: 'rgba(7, 72, 138, 0.71)', borderRadius: '50px' }} />
                </Link>
            }


            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={mxg}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            /> */}
        </>
    );
}


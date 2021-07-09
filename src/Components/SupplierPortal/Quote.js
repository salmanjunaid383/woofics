import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Sidebar'
import Nav from './Nav'
import jwt_decode from 'jwt-decode'
import Pusher from 'pusher-js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import firebase from '../Firebase'



//Sidebar
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import message from './—Pngtree—chat icon_4756851.png'
import DashboardIcon from '@material-ui/icons/Dashboard';
import PollIcon from '@material-ui/icons/Poll';
import SupplierDashboard from './SupplierDashboard';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AssistantIcon from '@material-ui/icons/Assistant';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import CallEndIcon from '@material-ui/icons/CallEnd';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Pusherr from './../Pusherr';
import CustomSupplierAuth from "../CustomSupplierAuth";



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



export default function Quote() {
    CustomSupplierAuth();
    const history = useHistory()
    // const classes = useStyles();

    const [description, setDescription] = useState('');
    const [comments, setcomments] = useState('');
    const [price, setprice] = useState('');
    const [date, setDate] = useState('');
    const [phase, setPhase] = useState();
    const [progress, setProgress] = useState('Send Quotation');
    const [disable, setDisable] = useState('disabled');


    //token decode
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    var qid = localStorage.getItem("qid");
    const { serrid } = useParams()

    const [service, setservice] = useState([]);
    const [servicet, setservicet] = useState([]);
    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/form/${serrid}`)
            .then((response) => {
                setservice(response.data.form)
                setservicet(response.data.package)
                console.log(response.data)

            }, (Error) => {
                console.log(Error);
            });
    }, [])


    function sendQuote(e) {
        e.preventDefault();
        alert("You will be charged this amount, are you sure to send quotation?")
        setProgress('Loading...')
        if (description === "" || comments === "" || price === "" || date === "" || phase === "") {
            setOpenn2(true);
        } else {
            const response = axios.post(`https://api.woofics.com/api/supplier_quotation`, {
                description: description,
                extra_comment: comments,
                form_id: qid,
                supplier_id: decoded.sub,
                price: price,
                status: 'pending',
                payment_phase_id: phase,
                delivery_days: date
            })
                .then((response) => {
                    setProgress('Send Quotation')
                    localStorage.removeItem('qid')
                    history.push('/sentquotation')
                }, (Error) => {
                    //  
                    setOpenn(true);
                    console.log(Error);
                });
        }
    }


    const [blog, setBlog] = useState([])

    function getOptions() {
        const { data: response } = axios.get(`https://api.woofics.com/api/payment_phase`)
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                console.log(Error);
            });
    }

    useEffect(() => {
        getOptions()
    }, [])


    const [openn, setOpenn] = React.useState(false);
    const [openn2, setOpenn2] = React.useState(false);

    const handleClosee = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenn(false);
    };

    const handleClosee2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenn2(false);
    };



    function StyledRadio(props) {
        const classes = useStyles();

        return (
            <Radio
                className={classes.root}
                disableRipple
                color="default"
                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
                {...props}
            />
        );
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
            name: 'Supplier Dashboard',
            icon: <DashboardIcon style={{ color: "#cdcdcd" }} />,
            to: '/supplierdashboard'
        },
        {
            name: 'Projects',
            icon: <PollIcon style={{ color: "#cdcdcd" }} />,
            to: '/supproject'
        },
        {
            name: 'Todo',
            icon: <LocalOfferIcon style={{ color: "#cdcdcd" }} />,
            to: '/suppliertodo'
        },
        {
            name: 'Services',
            icon: <PlaylistAddCheckIcon style={{ color: "white" }} />,
            to: '/quotation'
        },
        {
            name: 'Sent Quotation',
            icon: <AssistantIcon style={{ color: "#cdcdcd" }} />,
            to: '/sentquotation'
        },
        {
            name: 'Ledger',
            icon: <BorderColorIcon style={{ color: "white" }} />,
            to: 'supplierledger'
        },
        {
            name: 'Help',
            icon: <LiveHelpIcon style={{ color: "#cdcdcd" }} />,
            to: '/suphelp'
        },
        {
            name: 'Complain',
            icon: <CallEndIcon style={{ color: "#cdcdcd" }} />,
            to: '/supcomplain'
        },
    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/supplierdashboard">
                <span className="logo-text text-dark p-0 m-0 text-center">
                    <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px' }} />
                </span>
            </Link>
            <div className={classes.toolbar} />

            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                        <ListItem button key={text} className={text.name == "Services" ? classes.item : ''}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} />
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
            .then((response) => {
                notification()
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

    const [Imagedata, setImageData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((res) => {
                setImageData(res.data)
            }
            )

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
    useEffect(() => {
        getData()
        seen()
        chatnotification()
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
                                <Link to="/supchat" className="profile-pic" data-toggle="tooltip" data-placement="top" title="Chat" aria-describedby={id} variant="contained" color="primary" >
                                    <span className="text-white font-medium  "><Badge color="secondary" variant={UnseenMxg == 0 ? '' : 'dot'}>
                                        <MailIcon color="primary" />
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
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src={Imagedata.profile_image} style={{ width: "40px", borderRadius: "50px" }} /></span>
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

                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-8 col-xlg-9 col-md-12 mx-auto">
                                    <div class="card">
                                        <div class="card-body">
                                            <form class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row">
                                                    <div className="w-100">
                                                        <h3 className="w-100 text-center">Service Details</h3>
                                                        <table class="table table-hover">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Package Charge</td>
                                                                    <td>{servicet.charge}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Package Name</td>
                                                                    <td>{servicet.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Name</td>
                                                                    <td>{service.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Email</td>
                                                                    <td>{service.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Adverse Weather</td>
                                                                    <td>{service.adverse_weather}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Buy</td>
                                                                    <td>{service.buy}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Carcass Material</td>
                                                                    <td>{service.carcass_material}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Comments</td>
                                                                    <td>{service.comments}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Company</td>
                                                                    <td>{service.company}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Contact</td>
                                                                    <td>{service.contact}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Control System</td>
                                                                    <td>{service.control_system}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Sustomer Type</td>
                                                                    <td>{service.customer_type}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Delivery Time</td>
                                                                    <td>{service.delivery_time}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Description</td>
                                                                    <td>{service.description}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Documents</td>
                                                                    <td>{service.documents}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Entity</td>
                                                                    <td>{service.entity}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Fly Cases</td>
                                                                    <td>{service.fly_cases}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Indoor</td>
                                                                    <td>{service.indoor}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Installation</td>
                                                                    <td>{service.installation}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Model</td>
                                                                    <td>{service.model}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Postal Code</td>
                                                                    <td>{service.postal_code}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Screen Access</td>
                                                                    <td>{service.screen_access}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Screen Height</td>
                                                                    <td>{service.screen_height}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Screen Orientation</td>
                                                                    <td>{service.screen_orientation}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Screen Use</td>
                                                                    <td>{service.screen_use}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Screen Width</td>
                                                                    <td>{service.screen_width}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Sector</td>
                                                                    <td>{service.sector}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Sensor</td>
                                                                    <td>{service.sensor}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Shipping</td>
                                                                    <td>{service.shipping}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Structure</td>
                                                                    <td>{service.structure}</td>
                                                                </tr>


                                                                <tr>
                                                                    <td>Visual Distance</td>
                                                                    <td>{service.visual_distance}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Warranty</td>
                                                                    <td>{service.warranty}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>


                                                    </div> <hr />
                                                    <div className="col-md-12">
                                                        <label class="col-md-12 pt-3">Description</label>
                                                        <div class="col-md-12 border-bottom p-0">
                                                            <textarea rows="4" class="form-control p-0 border-0" placeholder="Add Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            onChange={(e) => setcomments(e.target.value)}
                                                            id="standard-textarea"
                                                            label="Comments"
                                                            placeholder="Add Comments"
                                                            multiline
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }} />                                                </div>
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            id="standard-number"
                                                            placeholder="Service Quotation"
                                                            fullWidth
                                                            label="Price"
                                                            type="number"
                                                            onChange={(e) => setprice(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-5">
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            placeholder="Delivery Days for Service"
                                                            id="standard-number"
                                                            fullWidth
                                                            label="Delivery Days"
                                                            type="number"
                                                            onChange={(e) => setDate(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-6  px-2 w-100 p-0 ">
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend">Payment Phase</FormLabel>
                                                            <RadioGroup defaultValue="two-phase" className="d-inline" aria-label="phase" name="customized-radios">
                                                                {blog.map((val) => {
                                                                    return (
                                                                        <>
                                                                            <FormControlLabel value={val.phase_type} onChange={() => setPhase(val.id)} control={<StyledRadio />} label={val.phase_type} />
                                                                        </>
                                                                    )
                                                                })
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div class="form-group mb-4 mt-4">
                                                    <div class="col-sm-12 text-center">
                                                        <button class={`btn text-white ${date == '' || price == '' || comments == '' || description == '' || phase == '' ? disable : ''}`} style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={sendQuote}>{progress}</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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
                                            <span className="text-black font-medium ml-1">{val.notification} <span className="float-right text-danger pl-md-2" onClick={() => notificationDelete(val.id)}><i className="fa fa-close"></i></span></span>
                                        </a>
                                    </Typography>
                                </Link>
                            </>
                        )
                    }).reverse()

                }
                <Link to='/supallnotification'>
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
                    <Link className="profile-pic" to="/supplierupdateprofile" style={{ textDecoration: 'none' }}>
                        <i className="fa fa-user mx-3"></i>
                        <span className="text-black font-medium mr-3">Profile</span>
                    </Link>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => history.push('/supresponses')}>
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
                    <a className="profile-pic" onClick={() => { localStorage.clear(); history.push('/') }}>
                        <i className="fa fa-sign-out mx-3"></i>
                        <span className="text-black font-medium mr-3">Logout</span>
                    </a>
                </Typography>

            </Popover>


            {url === 'http://woofic.nastechltd.co/supchat' ?
                ' '
                :
                <Link to="/supchat">
                    <img src={message} style={{ width: '50px', position: 'fixed', float: 'right', bottom: '28px', right: '30px', zIndex: '100', backgroundColor: 'rgba(7, 72, 138, 0.71)', borderRadius: '50px' }} />
                </Link>
            }
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openn2}
                autoHideDuration={4000}
                onClose={handleClosee2}
                message="Please fill all input feilds!"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
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
                open={openn}
                autoHideDuration={4000}
                onClose={handleClosee}
                message="Quotation already sent!"
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


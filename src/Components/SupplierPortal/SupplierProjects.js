import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import loginside from '../../Images/loginside.jpg'
import axios from 'axios';
import Sidebar from './Sidebar'
import Nav from './Nav'
import StarRatings from 'react-star-ratings';
import jwt_decode from 'jwt-decode';
// import Supppliers from "./Suppliers";
import Pusher from 'pusher-js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { loadStripe } from "@stripe/stripe-js";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import './countdown.css'
import tick from './tick.png'


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
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import firebase from '../Firebase'
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






export default function SupplierProjects() {
    CustomSupplierAuth();
    let history = useHistory();

    const { sid } = useParams();
    const { uid } = useParams();


    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [form, setForm] = useState([]);
    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');
    const [ddays, setdays] = useState();
    const [completed, setCompleted] = useState('');


    useEffect(() => {

        function Feedback() {
            const res = axios.get(`https://api.woofics.com/api/supplier_project/${uid}`)
                .then((res) => {
                    if (res) {
                        setForm(res.data)
                        setdays(res.data.due_date)
                        setCompleted(res.data.status)
                    }
                }, (error) => {
                    console.log(Error);
                });

        }
        Feedback();
    }, [])

    useEffect(() => {

        function Supplierid() {
            const res = axios.get(`https://api.woofics.com/api/users/${sid}`)
                .then((res) => {
                    if (res) {
                        setSupplier(res.data)
                    }
                }, (error) => {
                    console.log(Error);
                });

        }
        Supplierid();
    }, [])






    //Chat

    const [name, setName] = useState('');

    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((response) => {
                setName(response.data.first_name + " " + response.data.last_name)
            }, (Error) => {
                console.log(Error);
            });
    }, [])


    // const[suser,setaUser] = useState('');
    // const[sname,setaName] = useState('');

    function SendData(user, uname) {
        const { data: response } = axios.post(`https://api.woofics.com/api/associate`, {
            main_user: decoded.sub,
            associate_user: user,
            avatar: 'xyz.jpg',
            associate_name: uname,
            main_name: name
        })
            .then((response) => {
                if (response) {
                    history.push('/chat')
                }
            }, (Error) => {
                console.log(Error);
            });
    }

    //Timer


    const [days, setddays] = useState('')
    const [hours, setdhours] = useState('')
    const [minutes, setdminutes] = useState('')
    const [seconds, setdseconds] = useState('')

    let myGreeting = setInterval(() => {
        clearInterval()
        const countdownleft = new Date(ddays).getTime();
        const nowTime = new Date().getTime();
        const left = countdownleft - nowTime;

        setddays(Math.floor(left / (1000 * 60 * 60 * 24)));
        setdhours(Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setdminutes(Math.floor((left % (1000 * 60 * 60)) / (1000 * 60)));
        setdseconds(Math.floor((left % (1000 * 60)) / (1000)));

        // if (left < 0) {
        //     clearInterval(x);
        //     document.getElementById("demo").innerHTML = "EXPIRED";
        // }
        if (left < 0) {
            clearInterval(myGreeting);
            setddays('L');
            setdhours('A');
            setdminutes('T');
            setdseconds('E')
        } else if (completed == 'Completed') {
            clearInterval(myGreeting);
            setddays(0);
            setdhours(0);
            setdminutes(0);
            setdseconds(0)
        }
        clearTimeout(myGreeting)
    }, 1000);



    // Todo
    const [todo, setTodo] = useState("");
    const [deadline, setDeadLine] = useState("");



    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/supplier_project_todo`, {
            supplier_project_id: form.id,
            task: todo,
            deadline: deadline,
            completed: false
        })
            .then((response) => {
                if (response) {
                    getTodo();
                    setTodo('');
                    setDeadLine('')
                }
            }, (error) => {
                console.log(Error);
                alert('Please Add Todo and Select Date')
            });
    }

    const [data, setData] = useState([])
    function getTodo() {

        const { data: response } = axios.get(`https://api.woofics.com/api/supplier_project_todo/${form.id}`)
            .then((response) => {
                setData(response.data)
            }, (error) => {
                console.log(Error);
            });
    }

    useEffect(() => {
        getTodo()
    }, [])


    // DeleteTodo
    function deleteTodo(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/supplier_project_todo/${e}`)
            .then((response) => {
                getTodo();
            }, (error) => {
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
            icon: <PollIcon style={{ color: "white" }} />,
            to: '/supproject'
        },
        {
            name: 'Todo',
            icon: <LocalOfferIcon style={{ color: "#cdcdcd" }} />,
            to: '/suppliertodo'
        },
        {
            name: 'Services',
            icon: <PlaylistAddCheckIcon style={{ color: "#cdcdcd" }} />,
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
            to: 'suphelp'
        },
        {
            name: 'Complain',
            icon: <CallEndIcon style={{ color: "#cdcdcd" }} />,
            to: 'supcomplain'
        },
    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/supplierdashboard">
                <span className="logo-text text-dark p-0 m-0 text-center">
                    <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop:"20px", marginBottom:"10px"}} />
                </span>
            </Link>
            <div className={classes.toolbar} />

            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                        <ListItem button key={text} className={text.name == "Projects" ? classes.item : ''}>
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
                console.log(response.data)
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
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src={Imagedata.profile_image !== null ? Imagedata.profile_image :  "https://image.flaticon.com/icons/png/512/147/147144.png" } style={{ width: "40px", borderRadius: "50px" }} /></span>
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
                        <div className="container">
                            <div id="blog" className="row">
                                {form.status == "Completed" ? <div className="container-fluid mt-2">
                                    <div className="row bg-light ">
                                        <div className="col-md-4 text-right d-none d-md-block d-lg-block">
                                            <img className="img-fluid" src={tick} style={{ height: '60px' }} />Payment Done
                                        </div>
                                        <div className="col-md-4 text-center d-none d-md-block d-lg-block">
                                            <img className="img-fluid" src={tick} style={{ height: '60px' }} />Order Delivered
                                        </div>
                                        <div className="col-md-4 text-left">
                                            <img className="img-fluid" src={tick} style={{ height: '60px' }} />Order Mark as Completed
                                        </div>
                                    </div>
                                </div> : ''}
                                <div className="container">
                                    <div class="car p-3">
                                        <div className="mx-auto d-flex justify-content-center align-item-center">
                                            <div id="clockdiv" className="mx-auto text-center">
                                                <div className="mx-2"><span>{days}</span><div class="smalltext text-dark mx-2">Days</div></div>
                                                <div className="mx-2"><span >{hours}</span><div class="smalltext text-dark mx-2">Hours</div></div>
                                                <div className="mx-2"><span >{minutes}</span><div class="smalltext text-dark mx-2">Minutes</div></div>
                                                <div className="mx-2"><span >{seconds}</span><div class="smalltext text-dark mx-2">Seconds</div></div>
                                            </div>
                                        </div>
                                        <div class="card-body pb-5">
                                            <div className="border p-5">
                                                <h4 className="mt-0">
                                                    <img class="card-img-top img-fluid mr-3" style={{ width: '40px' }} src="https://img.pngio.com/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png" alt="Card image cap" />
                                                    {supplier.first_name + " " + supplier.last_name}
                                                    <span className="ml-2">
                                                        <StarRatings
                                                            starRatedColor='rgb(230, 67, 47)'
                                                            rating={rating1}
                                                            starDimension="15px"
                                                            starSpacing="3px"
                                                        />
                                                    </span>
                                                </h4>
                                                <i className="fa fa-map-marker px-2 mb-4 ml-5 text-muted"> {supplier.location}</i>
                                                <h2 className="float-right">$ {form.price}</h2>
                                                <table class="table table-hover table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Description</th>
                                                            <td> {form.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Delivery Days</th>
                                                            <td>{form.delivery_days} Days</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" >Status</th>
                                                            <td className={form.status === 'Completed' ? 'text-success' : 'text-primary'}>{form.status}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Current Payment Phase</th>
                                                            <td>{form.current_phase}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Paid</th>
                                                            <td>{form.paid}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Payment Left </th>
                                                            <td>{form.amount_left}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button class="btn pull-right marginBottom10 mx-3" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={supplier.id} onClick={() => SendData(supplier.id, supplier.first_name + " " + supplier.last_name)}>Chat</button>

                                            </div>
                                            <div class="row m-1 p-4">
                                                <div class="col " >
                                                    <div class="p-1 h1 text-primary text-center mx-auto display-inline-block" >
                                                        <i class="fa fa-check bg-primary text-white rounded p-2"> </i>
                                                        <bold>Manage Project</bold>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row m-1 p-3 ">
                                                <div class="col col-11 mx-auto">
                                                    <div class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                                                        <div class="col">
                                                            <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." onChange={(e) => setTodo(e.target.value)} value={todo} />
                                                        </div>
                                                        <div class="col-auto m-0 px-2 d-flex align-items-center">
                                                            <label class="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due date not set</label>
                                                            <input class="form-control form-control-md border-0 add-todo-input bg-transparent rounded" type="date" placeholder="Add new .." onChange={(e) => setDeadLine(e.target.value)} />
                                                            <i class="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none" data-toggle="tooltip" data-placement="bottom" title="Clear Due date"></i>
                                                        </div>
                                                        <div class="col-auto px-0 mx-0 mr-2">
                                                            <button type="button" onClick={Feedback} class="btn btn-primary">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="p-2 mx-4 border-black-25 border-bottom"></div>
                                            <div class="row mx-1 px-5 pb-3 w-80">
                                                <div class="col mx-auto">

                                                    {
                                                        data.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <div class="row px-3 align-items-center todo-item rounded">
                                                                        <div class="col px-1 m-1 d-flex align-items-center">
                                                                            <p type="text" class="form-control form-control-lg border-0 bg-transparent rounded px-3" value={val.task} title={val.task} >{val.task}</p>
                                                                            <p type="text" class="form-control form-control-lg border-0 rounded px-3 d-none" value={val.task} >{val.task}</p>
                                                                        </div>
                                                                        <div class="col-auto m-1 p-0 px-3">
                                                                            <div class="row">
                                                                                <div class="col-auto d-flex align-items-center rounded bg-white border border-warning">
                                                                                    <i class="fa fa-hourglass-2 my-2 px-2 text-warning btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Due on date"></i>
                                                                                    <h6 class="text my-2 pr-2">{val.deadline}</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-auto m-1 p-0">
                                                                            <div class="row d-flex align-items-center justify-content-end">
                                                                                <h5 class="m-0 p-0 px-2">
                                                                                    <i class="fa fa-trash-o text-danger btn m-0 px-2" data-toggle="tooltip" data-placement="bottom" title="Delete todo" onClick={() => deleteTodo(val.id)}></i>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        }).reverse()
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {/* <div class="container mt-1 p-2 rounded mx-auto bg-light shadow"> */}
                                    {/* </div> */}
                                </div>

                                {/* </div> */}
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


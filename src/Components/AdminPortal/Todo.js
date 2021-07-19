import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import loginside from '../../Images/loginside.jpg'
import axios from 'axios';
import Sidebar from '../AdminPortal/Sidebar'
import Nav from '../AdminPortal/Nav'
import StarRatings from 'react-star-ratings';
import './Todo.css'
import jwt_decode from 'jwt-decode'

//Sidebar
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
import message from './—Pngtree—chat icon_4756851.png'
import DashboardIcon from '@material-ui/icons/Dashboard';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ListIcon from '@material-ui/icons/List';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import CallEndIcon from '@material-ui/icons/CallEnd'; 

import CustomProviderAuth from "../CustomProviderAuth";


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




export default function Todo() {
    CustomProviderAuth();
    let history = useHistory();

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)


    const [todo, setTodo] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [disable,setDisable] = useState('disabled');



    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/service_todo`, {
            user_id: decoded.sub,
            task: todo,
            deadline: deadline,
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

        const { data: response } = axios.get(`https://api.woofics.com/api/service_todo/${decoded.sub}`)
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
        var result = window.confirm("Want to delete?");
        if (result) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/service_todo/${e}`)
            .then((response) => {
                getTodo();
            }, (error) => {
                console.log(Error);
            });
    }}




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


    useEffect(()=>{
        if(!localStorage.getItem('user_token')){
            history.push('/')
        }
        
    })


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
            name: 'Dashboard',
            icon: <DashboardIcon style={{ color: "#cdcdcd" }}/>,
            to: '/admindashboard'
        },
        {
            name: 'Todo',
            icon: <PlaylistAddCheckIcon  style={{color:"white"}}/>,
            to: '/todo'
        },
        {
            name: 'Offers List',
            icon: <ListIcon style={{ color: "#cdcdcd" }}/>,
            to: '/offerlist'
        },
        {
            name: 'Ledger',
            icon: <BorderColorIcon  style={{color:"white"}}/>,
            to: '/providerledger'
        },
        {
            name: 'Help',
            icon: <LiveHelpIcon style={{ color: "#cdcdcd" }}/>,
            to: '/providerhelp'
        },
        {
            name: 'Complain',
            icon: <CallEndIcon style={{ color: "#cdcdcd" }}/>,
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
                          <ListItem button key={text} className={text.name == "Todo"? classes.item : ''}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} style={{marginLeft:"-17px"}} />
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
       function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
            .then((response) => {
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
   
       useEffect(() => {
           chatnotification()
           seen()
           getData()
       }, [])


    return (
        <>

            <div className={classes.root}>
                <CssBaseline />
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
                                        <MailIcon color="primary"/>
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
                                <a className="profile-pic" aria-describedby={id} variant="contained" color="primary" onClick={handleClick2}>
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src={Imagedata !== null ? Imagedata :  "https://image.flaticon.com/icons/png/512/147/147144.png" } style={{ width: "40px",borderRadius:"50px" }}/></span>
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
                    

                    <div class="container mt-1 p-2 rounded mx-auto">
                        <div class="row p-lg-4">
                            <div class="col-lg-12 col-md-12 col-sm-12 " >
                                <div class="p-1 h4 text-primary text-center mx-auto display-inline-block for-size" >
                                    <i class="fa fa-check bg-primary text-white rounded"> </i>
                                    <bold> My Todo-s</bold>
                                </div>
                            </div>
                        {/* </div>
                        <div class="row m-1 p-3"> */}
                            <div class="col-lg-12 col-md-12 col-sm-12  col-11 mx-auto">
                                <div class="row rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                                    <div class="col">
                                        <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." onChange={(e) => setTodo(e.target.value)} value={todo} />
                                    </div>
                                    <div class="col-auto m-0 px-2 d-flex align-items-center">
                                        <input class="form-control form-control-md border-0 add-todo-input bg-transparent rounded" type="date" placeholder="Add new .." onChange={(e) => setDeadLine(e.target.value)} value={deadline}/>
                                        <i class="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none" data-toggle="tooltip" data-placement="bottom" title="Clear Due date"></i>
                                    </div>
                                    <div class="col-auto px-0 mx-0 mr-2">
                                        <button type="button" onClick={Feedback} class={`btn btn-primary ${todo == '' || deadline =='' ? disable : ''}`}>Agregar</button>
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
                                                    <div class="col-auto m-1 p-0 d-flex align-items-center">
                                                    </div>
                                                    <div class="col px-1 m-1 d-flex align-items-center">
                                                        <p type="text" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" readonly value={val.task} title={val.task} >{val.task}</p>
                                                        <p type="text" class="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"  >{val.task}</p>
                                                    </div>
                                                    <div class="col-auto m-1 p-0 px-3 mx-auto">
                                                        <div class="row">
                                                            <div class="col-auto d-flex align-items-center rounded bg-white border border-warning">
                                                                <i class="fa fa-hourglass-2 my-2 px-2 text-warning btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Due on date"></i>
                                                                <h6 class="text my-2 pr-2">{val.deadline}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-auto m-1 p-0 mx-auto">
                                                        <div class="row d-flex align-items-center justify-content-end">
                                                            <h3 class="m-0 p-0 px-2">
                                                                <i class="fa fa-trash-o fa-3x   text-danger btn" data-toggle="tooltip" data-placement="bottom" title="Delete todo" onClick={() => deleteTodo(val.id)} style={{cursor:"pointer" , fontSize:30}}></i>
                                                            </h3>
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
                    {/* </div> */}
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
                    <span className="text-black font-medium ml-1">Sin Notificación !</span>
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
                        <span className="text-black font-medium ml-1">Ver Todas Las Notificaciones <span className="float-right text-light pl-md-2"><i className="fa fa-arrow-right"></i></span></span>
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
                        <span className="text-black font-medium mr-3">Perfil</span>
                    </Link>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => history.push('/providerresponses') }>
                        <i className="fa fa-support mx-3"></i>
                        <span className="text-black font-medium mr-3">Servicio De Asistencia</span>
                    </a>
                </Typography>
                <hr />
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { history.push('/') }}>
                        <i className="fa fa-home mx-3"></i>
                        <span className="text-black font-medium mr-3">Vete a Casa</span>
                    </a>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { localStorage.removeItem('user_token'); history.push('/') }}>
                        <i className="fa fa-sign-out mx-3"></i>
                        <span className="text-black font-medium mr-3">Cerrar Sesión</span>
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



        </>
    );
}


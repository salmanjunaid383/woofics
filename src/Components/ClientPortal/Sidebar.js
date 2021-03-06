import React, { useState, useEffect } from "react";
import { Link, useHistory,useLocation } from 'react-router-dom'
import axios from 'axios';
import './Sidebar.css'
import jwt_decode from 'jwt-decode'

import logo from '../LandingPage/images/woofics-new/WhatsApp-Image-2021-08-25-at-2.43-Copy.png'
//Sidebar

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
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
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import CallEndIcon from '@material-ui/icons/CallEnd';

import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CustomClientAuth from "../CustomClientAuth";
import Pusher from 'pusher-js';

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
        color:"#000"
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
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





export default function Sidebar() {
    CustomClientAuth();
    const history = useHistory();
    const location = useLocation()
    const[pathName,setPathName]=useState();
    

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    useEffect(() => {
        if(location.pathname==="/miservicio")
        {
            setPathName("/servicio_adicional")
        }
        else{
            setPathName(location.pathname)
        }
        
        const pusher = new Pusher('e22c56269c9258608b2c', {
            cluster: 'ap1'
          });
        const channel = pusher.subscribe(""+decoded.sub+"");   
        
        channel.bind("my-event",function(returnData){
            
            seen();
        });
        chatnotification()
        seen();
        getData();
        return () => {
            pusher.disconnect() // This worked for me
          };
    }, [])


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


    const [name, setName] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    // useEffect(() => {
    //     // const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`)
    //     //     .then((response) => {
    //     //         setName(response.data)
    //     //     }, (Error) => {
    //     //         
    //     //     });
    // }, [])

    const Data = [
        {
            name: 'Panel',
            icon: <DashboardIcon  />,
            to: "/tablero"
        },
        {
            name: 'Servicios',
            icon: <InsertEmoticonIcon  />,
            to: "/servicio_adicional"
        },
        {
            name: 'Ofertas',
            icon: <LocalOfferIcon  />,
            to: '/oferta_al_cliente'
        },
        {
            name: 'Proyectos',
            icon: <PlaylistAddCheckIcon  />,
            to: "/proyecto"
        },
        {
            name: 'Proveedor de servicio',
            icon: <AssistantIcon  />,
            to: "/proveedores"
        },
        {
            name: 'Foro de discusion',
            icon: <ContactMailIcon  />,
            to: '/foro_de_discusión_del_cliente'
        },
        {
            name: 'Ayuda',
            icon: <LiveHelpIcon  />,
            to: "/ayuda"
        },
        {
            name: 'Quejarse',
            icon: <CallEndIcon  />,
            to: "/quejar"
        },


    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/tablero">
                <span className="logo-text text-dark p-0 m-0 text-center">
                    <img src={logo} alt="Logo" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop: "20px", marginBottom: "10px" }} />
                </span>
            </Link>
            <div className={classes.toolbar} />

            <List>
                {Data.map((text, index) => (
                    
                    <Link to={{pathname:text.to, state: {from:text.to}}} className={classes.link}  >
                        {text.to === pathName ? 
                            <ListItem button key={text} style={{backgroundColor:"rgba(0, 0, 0, 0.04)"}} >
                            <ListItemIcon ><span style={{color:'white'}}>{text.icon}</span></ListItemIcon>
                            <ListItemText  primary={text.name} style={{marginLeft:"-17px", color:'white'}} />
                        </ListItem> :
                            <ListItem button key={text}  >
                            <ListItemIcon ><span style={{color:'#8da2b1'}}>{text.icon}</span></ListItemIcon>
                            <ListItemText  primary={text.name} style={{marginLeft:"-17px"}} />
                        </ListItem>
                        }
                        
                        
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
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setnewnoti(response.data)
                seen()
            }, (Error) => {
                
            });
    }

    const [unseen, setunseen] = useState([]);
    function seen() {
        const { data: response } = axios.get(`https://api.woofics.com/api/unseen/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setunseen(response.data)
                
            }, (Error) => {
                
            });
    }

    //................Chat Seen
    const [UnseenMxg, setUnseenMxg] = useState([]);
    function chatnotification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/chat_unseen/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setUnseenMxg(response.data)
                seen()
            }, (Error) => {
                
            });
    }

    

    function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                notification()
            }, (Error) => {
                
            });
    }

    const [Imagedata, setImageData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((res) => {
                setImageData(res.data)
            }
            )

    }
    // useEffect(() => {
    //     getData()
    // }, [])


    return (
        <>


            <div className="d-sm-flex">
                {/* <CssBaseline /> */}
                <AppBar position="fixed" className={classes.appBar} id="nav-responsive" >
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
                                        <MailIcon color="primary" />
                                    </Badge></span>
                                </Link>
                            </li>
                            <li className="my-auto">
                                <a className="profile-pic" aria-describedby={id} variant="contained" data-toggle="tooltip" data-placement="top" title="Notifications" color="primary" onClick={handleClick}>
                                    <span className="text-white font-medium  Ring"><Badge color="secondary" variant={unseen === 0 ? '' : ''} >
                                        {
                                            unseen === 0 ? null : <p className={"notification"}>{unseen}</p> 
                                        }
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
                <nav className={classes.drawer} aria-label="mailbox folders" id="responsive-sidenav">
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
                        <span className="text-black font-medium ml-1">Sin Notificación !</span>
                    </a>
                </Typography> :
                    newnoti.slice(0, 5).map((val) => {
                        return (
                            <>
                                <Link to={`/${val.link}`}>
                                    <Typography className={`${classes.typography} bg-light text-dark`}  >
                                        <a className="profile-pic" >
                                            <span className="text-black font-medium ml-1">{val.notification} </span>
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
                    <Link
                        className="profile-pic"
                        to="/actualización_del_perfil"
                        style={{ textDecoration: "none" }}
                    >
                        <i className="fa fa-user mx-3"></i>
                        <span className="text-black font-medium mr-3">Perfil</span>
                    </Link>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => history.push("/respuestas")}>
                        <i className="fa fa-support mx-3"></i>
                        <span className="text-black font-medium mr-3">Servicio de Asistencia</span>
                    </a>
                </Typography>

                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { history.push('/') }}>
                        <i className="fa fa-home mx-3"></i>
                        <span className="text-black font-medium mr-3">Vete a Casa</span>
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
                        <span className="text-black font-medium mr-3">Cerrar Sesión</span>
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


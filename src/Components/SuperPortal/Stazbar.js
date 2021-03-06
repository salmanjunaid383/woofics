import React, { useState, useEffect } from "react";
import { Link, useHistory,useLocation } from 'react-router-dom'
import axios from 'axios';
// import './BLog.css';
import Badge from '@material-ui/core/Badge';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import './SupCoupons.css'
import '../SuperPortal/Stazbar.css'
import backgroundImage from './Dashboard.png';
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
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PollIcon from '@material-ui/icons/Poll';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssistantIcon from '@material-ui/icons/Assistant';
import DvrIcon from '@material-ui/icons/Dvr';
import HelpIcon from '@material-ui/icons/Help';
import BookIcon from '@material-ui/icons/Book';
import NotificationsIcon from '@material-ui/icons/Notifications';
import jwt_decode from 'jwt-decode'
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import CustomAdminAuth from "../CustomAdminAuth";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Pusher from 'pusher-js';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';

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
        color:'#000',
        border: "none",
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
        backgroundImage: `url(${backgroundImage})`,
        width: drawerWidth,
        boxShadow: 'none',
        border: "none",
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '100% 30%',
  
   
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
            margin: '0px',
        }
    },
}));



export default function StazBar() {
    CustomAdminAuth();
    let history = useHistory();
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    const location = useLocation();
    const[pathName,setPathName]=useState();
    const[routeCheck,setRouteCheck]=useState(false);
    

      useEffect(() => {
        var test = location.pathname;
        test=test.split("/")[1]    
        if(test==="ver_servicio_m??s")
        {
            console.log(true)
            setPathName("/ver_servicios")
        }
        else if(location.pathname==="/led")
        {
            setPathName("/ledlist")
        }
        else if(location.pathname==="/createimg")
        {
            setPathName("/getinspired")
        }
        else if(location.pathname.split('/')[1]==="lista_de_contabilidad")
        {
            setPathName("/libro_mayor")
        }
        else if(location.pathname.split('/')[1]==="clientem??sdetallesforumdiscussion")
        {
            setPathName("/foro_de_discusi??n_del_cliente")
        }
        else if(location.pathname.split('/')[1]==="createforms")
        {
            setPathName("/cargos")
        }
        else if(location.pathname.split('/')[1]==="createblog")
        {
            setPathName("blog")
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
        seen()
        return () => {
            pusher.disconnect() // This worked for me
          };
    }, [])

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }

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
            name: 'Panel de administraci??n',
            icon: <DashboardIcon    />,
            to: "/tablerodemandos"
        },
        {
            name: 'Inscripciones',
            icon: <PollIcon  />,
            to: '/registration'
        },
        {
            name: 'Servicios',
            icon: <FindInPageIcon  />,
            to: '/ver_servicios'
        },
        {
            name: 'Ofertas',
            icon: <LoyaltyIcon  />,
            to: '/offerbadge'
        },
        // {
        //     name: 'Reviews',
        //     icon: <RateReviewIcon  />,
        //     to: '/viewreviews'
        // },
        {
            name: 'Led ',
            icon: <DvrIcon  />,
            to: '/ledlist'
        },
        {
            name: 'Insp??rate',
            icon: <FeaturedVideoIcon  />,
            to: '/getinspired'
        },
        {
            name: 'Anunciar',
            icon: <PhotoAlbumIcon  />,
            to: '/anunciada'
        },
        {
            name: 'Libro mayor',
            icon: <HourglassEmptyIcon  />,
            to: "/libro_mayor"
        },
        {
            name:"Invoices",
            icon: <ReceiptIcon></ReceiptIcon>,
            to: '/admininvoice'
        },
         {
            name: 'Datos de inter??s',
            icon: <SwapVertIcon  />,
            to: '/dataofint'
        },
        {
            name: 'Cargos',
            icon: <EqualizerIcon  />,
            to: '/cargos'
        },
        {
            name: 'Ver contactos',
            icon: <ContactMailIcon  />,
            to: '/ver_contacto'
        },
        {
            name: "Logo",
            icon: <ImageIcon />,
            to: "/logo"
        },
        {
            name: "Descripci??n",
            icon: <DescriptionIcon />,
            to: "/descripci??n"
        },
        {
            name: 'Foro de discusion',
            icon: <AssignmentIcon />,
            to :'/foro_de_discusi??n_del_cliente'
        },
        {
            name: 'Lista de ayuda',
            icon: <HelpIcon  />,
            to: '/lista_de_ayuda'
        },
        {
            name: 'Quejarse',
            icon: <AssistantIcon  />,
            to: '/admin_quejarse'
        },
        {
            name: 'Blog',
            icon: <BookIcon  />,
            to: '/blog'
        },
    ]
    function getRoute(){
        for(var i =0;i<Data.length;i++){
            try{
                if(Data[i].to===location.state.from){
                    setRouteCheck(true)
                }
            }
            catch{

            }
            
        }
    }

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/tablerodemandos">
                <span className="logo-text text-dark p-0 m-0 text-center">
                {/* assets/plugins/images/Woofic-2.png */}
                   <img src={logo} alt="Logo" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop:"20px", marginBottom:"10px"}} />
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
    

    return (
        <>
            <div className="d-sm-flex">
                {/* <CssBaseline /> */}
                <AppBar position="fixed" className={classes.appBar} id="nav-responsive">
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
                                    <span className="text-white font-medium  Ring"><Badge color="secondary" variant={unseen === 0 ? '' : ''} >
                                        {
                                            unseen ===  0 ? '' :<p className={"notification"}>{unseen}</p> 
                                        }
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
                <nav className={classes.drawer} aria-label="mailbox folders" id="responsive-sidenav" > 
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
                        <span className="text-black font-medium ml-1">No Notification !</span>
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
                <Link to='/notificaci??n_de_administrador'>
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
                        <span className="text-black font-medium mr-3">Vete a Casa</span>
                    </a>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { localStorage.clear(); history.push('/') }}>
                        <i className="fa fa-sign-out mx-3"></i>
                        <span className="text-black font-medium mr-3">Cerrar Sesi??n</span>
                    </a>
                </Typography>

            </Popover>

        </>
    );
}


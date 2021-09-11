import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import jwt_decode from 'jwt-decode';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


//Sidebar
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
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

/// ?????????????????????????????????????????????????????????????????????????????

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



export default function Feedback() {
    CustomClientAuth();
    let history = useHistory();
    const {fid} = useParams()

    const [rating1, setRating1] = useState(0);
    const changeRating1 = (value) => {
        setRating1(value)
    }
    const [rating2, setRating2] = useState(0);
    const changeRating2 = (value) => {
        setRating2(value)
    }
    const [rating3, setRating3] = useState(0);
    const changeRating3 = (value) => {
        setRating3(value)
    }
    const [rating4, setRating4] = useState(0);
    const changeRating4 = (value) => {
        setRating4(value)
    }
    const [rating5, setRating5] = useState(0);
    const changeRating5 = (value) => {
        setRating5(value)
    }

    const token = localStorage.getItem('user_token');
    var decoded = jwt_decode(token);


    const total = rating1 + rating2 + rating3 + rating4 + rating5
    const average = total / 5

    const allquestion = [
        {
            'question': '1. On a rating of 5, how was the overall project?',
            'rating': rating1
        },
        {
            'question': '2. How would you rate your experience obtaining the supplier/service providers quote?',
            'rating': rating2
        },
        { 'question': '3. How was the payment process?', 'rating': rating3 },
        { 'question': '4. How would you rate your experience with Woofic?', 'rating': rating4 },
        { 'question': '5. How likely are you going to recommend Woofic to your friends or colleagues?', 'rating': rating5 }
    ]

    const [question, setQuestion] = useState("");
    const [comments, setComments] = useState("");

    function Feedback(e) {
        e.preventDefault();
        const { data: response } = axios.post(`https://api.woofics.com/api/feedback`, {
            client_id: decoded.sub,
            user_id: fid,
            comments: comments,
            overall_rating: average,
            questions: allquestion,
        },{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setOpenNoti(true)
                history.push('/coupon');
            }, (error) => {
                
                history.push('/feedback');
                alert("Please fillout all fields !")
            });

        //     const  res  = axios.post(`https://api.woofics.com/api/question`, {
        // })
        //     .then((res)=> {
        //         if (res){
        //             history.push("/tablerodeadministración");
        //         }
        //     }, (error) => {
        //         
        //         history.push('/feedback');
        //          
        //     });

    }

    const [mxg, setMxg] = useState('');

    const [opennoti, setOpenNoti] = React.useState(false);

    const handleCloseNoti = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNoti(false);
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
            to: "/tablero"
        },
        {
            name: 'Services',
            icon: <InsertEmoticonIcon  style={{ color: "#cdcdcd" }}/>,
            to: "/servicio_adicional"
        },
        {
            name: 'Offers',
            icon: <LocalOfferIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/oferta_al_cliente'
        },
        {
            name: 'Projects',
            icon: <PlaylistAddCheckIcon  style={{color:"white"}}/>,
            to: "/proyecto"
        },
        {
            name: 'Service Provider',
            icon: <AssistantIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/suppliers'
        },
        {
            name: 'Discussion Forum',
            icon: <ContactMailIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/foro_de_discusión_del_cliente'
        },
        {
            name: 'Help',
            icon: <LiveHelpIcon  style={{ color: "#cdcdcd" }}/>,
            to: "/ayuda"
        },
        {
            name: 'Complain',
            icon: <CallEndIcon  style={{ color: "#cdcdcd" }}/>,
            to: "/quejar"
        },


    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/tablero">
                <span className="logo-text text-dark p-0 m-0 text-center">
                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop:"20px", marginBottom:"10px"}} />
                </span>
            </Link>
            <div className={classes.toolbar} />
           
            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                          <ListItem button key={text} className={text.name == "Projects"? classes.item : ''}>
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

    function notification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setName(response.data)
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

    useEffect(() => {        chatnotification()

        seen()
    }, [])

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

   function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
                .then((response) => {notification()
                }, (Error) => {
                        
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
                    

                   <div className="page-wrapper bg-light">

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-8 col-xlg-9 col-md-12 mx-auto">
                                    <div className="card">
                                        <div className="card-body">
                                            <form className="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <label className="col-md-12 p-0 h5">Reseñas</label>
                                                <div className="col-md-12 border-bottom p-0">
                                                    <p>1. Con una calificación de 5, ¿cómo fue el proyecto en general?</p>
                                                    <p> <StarRatings
                                                        starRatedColor='rgb(230, 67, 47)'
                                                        rating={rating1}
                                                        starDimension="20px"
                                                        starSpacing="10px"
                                                        changeRating={changeRating1}
                                                    /></p>
                                                    <p>2. ¿Cómo calificaría su experiencia al obtener la cotización del proveedor / proveedor de servicios?</p>
                                                    <p> <StarRatings
                                                        starRatedColor='rgb(230, 67, 47)'
                                                        rating={rating2}
                                                        starDimension="20px"
                                                        starSpacing="10px"
                                                        changeRating={changeRating2}
                                                    /></p>
                                                    <p>3. ¿Cómo fue el proceso de pago?</p>
                                                    <p> <StarRatings
                                                        starRatedColor='rgb(230, 67, 47)'
                                                        rating={rating3}
                                                        starDimension="20px"
                                                        starSpacing="10px"
                                                        changeRating={changeRating3}
                                                    /></p>
                                                    <p>4. ¿Cómo calificaría su experiencia con Woofic?</p>
                                                    <p> <StarRatings
                                                        starRatedColor='rgb(230, 67, 47)'
                                                        rating={rating4}
                                                        starDimension="20px"
                                                        starSpacing="10px"
                                                        changeRating={changeRating4}
                                                    /></p>
                                                    <p>5. ¿Qué probabilidades hay de que recomiende Woofic a sus amigos o colegas?</p>
                                                    <p> <StarRatings
                                                        starRatedColor='rgb(230, 67, 47)'
                                                        rating={rating5}
                                                        starDimension="20px"
                                                        starSpacing="10px"
                                                        changeRating={changeRating5}
                                                    /></p>
                                                </div>
                                                <label className="col-md-12 p-0">Comentarios</label>
                                                <div className="col-md-12 border-bottom p-0">
                                                    <textarea rows="4" className="form-control p-0 border-0" placeholder="Add Comments for Feedback" onChange={(e) => setComments(e.target.value)}></textarea>
                                                </div>
                                                <div className="form-group mb-4">
                                                    <div className="col-sm-12 mt-3">
                                                        <button className="btn text-white" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={Feedback}>Realimentación</button>
                                                    </div>
                                                </div>
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
                        open={opennoti}
                        autoHideDuration={6000}
                        onClose={handleCloseNoti}
                        message="Review sent ✅"
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseNoti}>
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
                        <span className="text-black font-medium ml-1">Sin notificación !</span>
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
            <span className="text-black font-medium mr-3">Servicio de asistencia</span>
          </a>
        </Typography>
        <hr />
        <Typography className={classes.typography}>
          <a className="profile-pic" onClick={() => history.push("/mycoupon")}>
            <i className="fa fa-heart mx-3"></i>
            <span className="text-black font-medium mr-3">Mis Cupones</span>
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


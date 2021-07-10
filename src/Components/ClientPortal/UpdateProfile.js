import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Sidebar from '../ClientPortal/Sidebar'
import Nav from '../ClientPortal/Nav';
import jwt_decode from 'jwt-decode'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



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
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { storage } from "../Firebase"
import firebase from '../Firebase'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Pusherr from './../Pusherr';
import './Todo.css'
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



export default function UpdateProfile() {
    CustomClientAuth();

    const history = useHistory();

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [sector, setSector] = useState("");
    const [location, setLocation] = useState("");
    const [contact_number, setContact] = useState("");
    const [progress, setProgress] = useState("Update Profile")
    const [imageUrl, setImageUrl] = useState('')

    const [opennoti, setOpennoti] = React.useState(false);
    const handleClosenoti = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpennoti(false);
    };

    function LoginBtn(e) {
        e.preventDefault();
        setProgress("Loading...")
        const { data: response } = axios.put(
            `https://api.woofics.com/api/client/${decoded.sub}`,
            {
                first_name: firstname,
                last_name: lastname,
                email: email,
                sector: sector,
                location: location,
                contact_number: contact_number,
                profile_image: imageUrl
            }).then((response) => {
                setOpennoti(true);
                setProgress('Update Profile')
                setTimeout(() => {
                    history.push("/dashboard");
                }, 1000);
            }, (Error) => {
                 
            });

    }


    //socail buttons disabled
    const [socialauth, setsocialauth] = useState([])
    const [googleauth, setgoogleauth] = useState('')
    const [facebookauth, setfacebookauth] = useState('')
    const [instgramauth, setinstgramauth] = useState('')
    const [profilImaege, setProfileImage] = useState('')

    // useEffect(() => {
    function getSocialData() {
        const res = axios.get(`https://api.woofics.com/api/social_media/${decoded.sub}`)
            .then((res) => {
                console.log(res.data)
                setsocialauth(res.data)
                res.data.map((val) => {
                    if (val.app == 'Google') {
                        setgoogleauth('disabled')
                    }
                    else if (val.app == 'Facebook') {
                        setfacebookauth('disabled')
                    }
                    else if (val.app == 'Instagram') {
                        setinstgramauth('disabled')
                    }
                })
            })
    }


    const [data, setData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)
                setEmail(res.data.email)
                setSector(res.data.sector)
                setLocation(res.data.location)
                setContact(res.data.contact_numberr)
                setImageUrl(res.data.profile_image)
                getSocialData()
            }
            )

    }
    useEffect(() => {
        getData()
    }, [])
    // getSocialData()


    // }, [])


    // Google Auth

    const [google_email, setGoogle_email] = useState('')
    // const [disabled,setDisable_google_btn] = useState(false)


    const responseGoogle = (respons) => {
        console.log(respons.profileObj.email);
        console.log(decoded.sub);
        const res = axios.post(`https://api.woofics.com/api/social_media`, {
            email: respons.profileObj.email,
            app: 'Google',
            user_id: decoded.sub
        })
            .then((res) => {
                console.log(res)
                // setDisable_google_btn(true)
                setOpenpop(true);
                getData()
            }
            ).catch((Error) => {
                      
                console.log(Error)
            })
    }


    const responseFacebook = (response) => {
        const res = axios.post(`https://api.woofics.com/api/social_media`, {
            email: response.email,
            app: 'Facebook',
            user_id: decoded.sub
        })
            .then((response) => {
                setOpenpop(true);
                getData()
            }, (error) => {
             
                console.log(error);
            });
    }


    
    const [openpop, setOpenpop] = useState(false)
    const handleClosepop = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenpop(false);
    };


    //Facebook Auth

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const weburl = window.location.href



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
            name: 'Dashboard',
            icon: <DashboardIcon  style={{color:"white"}}/>,
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
            icon: <LiveHelpIcon  style={{ color: "#cdcdcd" }}/>,
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
                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop:"20px", marginBottom:"10px"}} />
                </span>
            </Link>
            <div className={classes.toolbar} />
           
            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                          <ListItem button key={text} className={text.name == "Dashboard"? classes.item : ''}>
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
                console.log(response.data)
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

    useEffect(() => {
        chatnotification()

        seen()
    }, [])

    function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
            .then((response) => {
                notification()
            }, (Error) => {
                console.log(Error);
            });
    }
    //..............................IMagse
    const [imageProgress, setImageProgress] = useState('')


    const onchange = async (e) => {
        setImageProgress('Loading...')
        const file = e.target.files[0];
        const ImagesRef = firebase.storage().ref('images').child(file.name);
        await ImagesRef.put(file)
        ImagesRef.getDownloadURL().then((url) => {
            setImageProgress('')
            setImageUrl(url)
            const { data: response } = axios.put(
                `https://api.woofics.com/api/client/${decoded.sub}`,
                {
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                    sector: sector,
                    location: location,
                    contact_number: contact_number,
                    profile_image: imageUrl
                }).then((response) => {
                    setImageProgress('')
                }, (Error) => {
                     
                });
        })
    }

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
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src={data.profile_image != 'xyz.jpeg' ? data.profile_image : 'https://www.pinclipart.com/picdir/middle/165-1653686_female-user-icon-png-download-user-colorful-icon.png'} style={{ width: "40px", borderRadius: "50px" }} /></span>
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

                    <div className="page-wrapper px-lg-5">
                        <div class="container-fluid">
                            <div class="row mx-auto border bg-light">
                                <div class="col-lg-8 col-xlg-9 col-md-12 col-sm-12 ">
                                    <div class="">
                                        <div class="card-body">
                                            <form class="form-horizontal form-material" >
                                                <div className="row">
                                                    <div class="form-group mb-4 col-md-6">
                                                        <label class="col-md-6 p-0 bold">First Name</label>
                                                        <input type="text" defaultValue={data.first_name}
                                                            class="form-control p-0 border-0" onChange={(e) => setFirstname(e.target.value)} /> </div>
                                                    <div class="form-group mb-4 col-md-6">
                                                        <label class="col-md-6 p-0 bold">Last Name</label>
                                                        <input type="text" defaultValue={data.last_name}
                                                            class="form-control p-0 border-0" onChange={(e) => setLastname(e.target.value)} /> </div>
                                                </div>
                                                <div className="row">

                                                    <div class="form-group mb-4 col-md-6">
                                                        <label for="example-email" class="col-md-12 p-0">Email</label>
                                                        <input type="email" defaultValue={data.email}
                                                            class="form-control p-0 border-0" name="example-email"
                                                            id="example-email1" onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                    <div class="form-group mb-4 col-md-6">
                                                        <label class="col-md-12 p-0">Phone No</label>
                                                        <input type="text" defaultValue={data.contact_number}
                                                            class="form-control p-0 border-0" onChange={(e) => setContact(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div class="form-group mb-4 row col-md-6">
                                                        <label class="col-md-12 p-0">Sector</label>
                                                        <input type="text" defaultValue={data.sector}
                                                            class="form-control p-0 border-0" onChange={(e) => setSector(e.target.value)} />
                                                    </div>
                                                    <div class="form-group mb-4 row col-md-6">
                                                        <label class="col-md-12 p-0">Location</label>
                                                        <input type="text" defaultValue={data.location}
                                                            class="form-control p-0 border-0" onChange={(e) => setLocation(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div class="form-group mb-4">
                                                    <div class="col-sm-12 text-center ">
                                                        <button class="btn text-white" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={LoginBtn}>{progress}</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-xlg-3 col-md-12 border-left">
                                    <div class="">
                                        <div class=" pt-5 w-50 mx-auto" >
                                            <img alt="user" className="img-fluid" src={imageUrl} />
                                            {imageProgress}
                                        </div>
                                        <input type="file" id='file' name='img' onChange={onchange} value={Data.img} className='imagesinput mx-auto' accept='image/*' />
                                    </div>
                                    <div className="text-center">
                                        <h5 className="h5">Connect your social accounts</h5>
                                        <FacebookLogin
                                                    appId="2736881086597729"
                                                    // autoLoad={true}
                                                    // render={renderProps => (
                                                        // <div className="facebook text-center mr-3">
                                                        //     <div className="fa fa-facebook"></div>
                                                        // </div>
                                                    // )}
                                                    icon="fa fa-facebook"
                                                    fields="name,email,picture"
                                                    // onClick={componentClicked}
                                                    callback={responseFacebook}
                                                    cssClass="my-facebook-button"
                                                    textButton={<span class="ml-3">Facebook</span>}
                                                     />
                                        <GoogleLogin
                                            clientId="101523716211-l7m06jsccfe7fa6u3tdinal5fofer8qt.apps.googleusercontent.com"
                                            render={renderProps => (
                                                <div onClick={renderProps.onClick} disabled={renderProps.disabled} className={`col-md-12 bg-danger text-light my-2 p-2 border btn btn-success ${googleauth}`} >
                                                    <i className="fa fa-google"> Google</i>
                                                </div>
                                            )}
                                            buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
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
                        open={openpop}
                        autoHideDuration={6000}
                        onClose={handleClosepop}
                        message={"Your Social Account has been connected with Woofic"}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosepop}>
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

            {weburl === 'http://woofic.nastechltd.co/chat' ?
                ' '
                :
                <Link to="/chat">
                    <img src={message} style={{ width: '50px', position: 'fixed', float: 'right', bottom: '28px', right: '30px', zIndex: '100', backgroundColor: 'rgba(7, 72, 138, 0.71)', borderRadius: '50px' }} />
                </Link>
            }

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={opennoti}
                autoHideDuration={6000}
                onClose={handleClosenoti}
                message='Profile Updated '
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosenoti}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />


        </>
    );
}


import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Sidebar'
import Nav from './Nav'
import jwt_decode from 'jwt-decode'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import Pusherr from './../Pusherr';




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
import { useTheme } from '@material-ui/core/styles';
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
import Badge from '@material-ui/core/Badge';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import RateReviewIcon from '@material-ui/icons/RateReview';

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
        backgroundColor:"white",
        boxShadow:'none',
        border:"none"
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
        width: drawerWidth,
        boxShadow:'none',
        border:"none"
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
        color: 'black'
    } ,
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '500ch',
        },
    }, icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },       item:{
        backgroundColor:"rgb(11 104 197)",
        boxShadow:'3px 0px 5px gray',
        borderRadius:"10px",
        color:'white',
        margin:'0px'
    ,    "&:hover": {
           backgroundColor:"rgb(11 104 197)",
           boxShadow:'3px 0px 5px gray',
           borderRadius:"10px",
           color:'white',
           margin:'0px'
       }
    }, 
}));


export default function PaymentPhase() {
    CustomAdminAuth();
    const history = useHistory()
    const classes = useStyles();

    //token decode
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)



    const [name, setname] = useState('');
    const [wait, setwait] = useState('Add Payment Phase');
    const [disable, setdisable] = useState('disabled');

    function sendQuote(e) {
        e.preventDefault();
        setwait('Please wait...')
        const response = axios.post(`https://api.woofics.com/api/payment_phase`, {
            phase_type: name,
            breakdowns: feild
        })
            .then((response) => {
                setwait('Add Payment Phase')
                history.push('/paymentphase')
            }, (Error) => {
                 
                setwait('Add Payment Phase')
                console.log(Error);
            });
    }


    //Adding Feilds

    const [feild, setfeild] = useState([
        { phase_level: '', percentage: '' }
    ])


    function handleChange(e, index) {
        const { name, value } = e.target;
        const list = [...feild];
        list[index][name] = value;
        setfeild(list);
        console.log(list);
    }

    function AddMore() {
        setfeild([...feild, { phase_level: '', percentage: '' }])
    }

    //Remove Feilds
    function RemoveFeild(index) {
        const list = [...feild];
        list.splice(index, 1);
        setfeild(list)
    }



    //Sidebaaaaar/..........................
    // const { window } = props;
    // const classes = useStyles();
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
            name: 'Payment Phase',
            icon: <LocalAtmIcon style={{ color: "white" }} />,
            to: '/paymentphase'
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
            icon: <BookIcon style={{ color: "#cdcdcd" }} />,
            to: '/blog'
        },
    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/superdashboard">
                <span className="logo-text text-dark p-0 m-0 text-center">
                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px' }} />
                </span>
            </Link>
            <div className={classes.toolbar} />
           
            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                     <ListItem button key={text} className={text.name == "Payment Phase"? classes.item : ''}>
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
                    <Pusherr />

                   <div className="page-wrapper bg-light">

                        <div class="container-fluid">
                            <div class="row">
                                <div className="text-left col-lg-12 col-xlg-12 col-md-12 mx-auto d-md-block d-none">
                                    <i className="fas fa-chevron-left fa-2x" onClick={() => history.goBack()} style={{ cursor: 'pointer' }}></i>
                                </div>
                                <div class="col-lg-10 col-xlg-10 col-md-12 mx-auto">
                                    <div class="">
                                        <div class="">
                                            <form class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row mt-5">
                                                    <div className="col-md-6 text-center p-2 w-100 p-0">
                                                        <TextField
                                                            placeholder="Phase Type"
                                                            id="standard-number"
                                                            fullWidth
                                                            label="Phase Type"
                                                            type="number"
                                                            onChange={(e) => setname(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="w-100">
                                                        <div className="table-responsive-sm w-100">
                                                            <table className="table table-striped ">
                                                                <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                                    <tr>
                                                                        <th className="right">Phase Level</th>
                                                                        <th className="right">Percentage</th>
                                                                        <th className="right"></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        feild.map((val, i) => {
                                                                            return (
                                                                                <>
                                                                                    <tr>
                                                                                        <td className="left"><input placeholder="Level " name='phase_level' value={val.phase_level} onChange={e => handleChange(e, i)} /></td>
                                                                                        <td className="center"><input className="w-75" type="number" name='percentage' value={val.percentage} onChange={e => handleChange(e, i)} /></td>
                                                                                        <td className="right">{feild.length !== 1 && <i className="fa fa-remove p-2 text-center pt-1 bg-dark text-light" onClick={(i) => RemoveFeild()}></i>}</td>
                                                                                        <td className="right">{feild.length - 1 === i && <i className="fa fa-plus p-2 text-center pt-1 bg-dark text-light" onClick={AddMore}></i>}</td>
                                                                                    </tr>
                                                                                </>
                                                                            )

                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            <div class="form-group mb-4 mt-4">
                                                                <div class="col-sm-12 text-center">
                                                                    <button class={`btn text-white ${name == '' ? disable : ''}  ${name != feild.length  ? disable : ''}`} style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={sendQuote}>{wait}</button>
                                                                </div>
                                                            </div>
                                                        </div>
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


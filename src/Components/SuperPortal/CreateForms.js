import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import loginside from '../../Images/loginside.jpg'
import axios from 'axios';
import Sidebar from './Sidebar'
import Nav from './Nav'
import StarRatings from 'react-star-ratings';
import Badge from '@material-ui/core/Badge';



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
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import jwt_decode from 'jwt-decode'
import Pusherr from './../Pusherr';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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


export default function CreateForms() {
    CustomAdminAuth();
    let history = useHistory();

    const { ford } = useParams()

    const [chargeOne, setchargeOne] = useState()
    const [chargeTwo, setchargeTwo] = useState()
    const [chargeThree, setchargeThree] = useState()
    const [Name, setName] = useState("")
    const [chargefour, setchargefour] = useState("")
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    const [check, setcheck] = useState('false')
    const [check2, setcheck2] = useState('false')
    const [check3, setcheck3] = useState('false')

    const [valueCharge, setvalueCharge] = useState([]);
    const [paymentPackag, setpaymentPackag] = useState([]);
    const [supplierRenta, setsupplierRenta] = useState([]);
    const [serviceCharge, setserviceCharge] = useState([]);

    function valueCharges() {
        const { data: response } = axios.get(`https://api.woofics.com/api/value_charges`)
            .then((response) => {
                if(response.data[0]==null)
                {
                    setvalueCharge("Sorry no charge data found")
                }
                else{
                    setvalueCharge(response.data[0])
                }
                
                console.log("charges data")
                console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }


    function paymentPackage() {
        const { data: response } = axios.get(`https://api.woofics.com/api/payment_package`)
            .then((response) => {
                setpaymentPackag(response.data)
                console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }


    function supplierRen() {
        const { data: response } = axios.get(`https://api.woofics.com/api/supplier_rental`)
            .then((response) => {
                if(response.data[0] == null)
                {
                    setsupplierRenta("Sorry no rental data found")
                }
                else{
                    setsupplierRenta(response.data[0])
                }
                
                console.log(response.data[0])
            }, (Error) => {
                console.log(Error);
            });
    }


    function serviceCharg() {
        const { data: response } = axios.get(`https://api.woofics.com/api/service_provider_charge`)
            .then((response) => {
                if(response.data[0]==null)
                {
                    setserviceCharge("sorry no service data found");
                }
                else
                {
                    setserviceCharge(response.data[0])
                }
                
                console.log("service provider charges "+ response.data[0])
            }, (Error) => {
                console.log(Error);
            });
    }

    useEffect(() => {
        if (ford === "value") {
            valueCharges()
        } else if (ford === "supplier") {
            paymentPackage()
        } else if (ford === "rental") {
            supplierRen()
        } else {
            serviceCharg()
        }
    }, [])


    function valCharge() {
        // e.preventDefault();

        const { data: response } = axios.put(`https://api.woofics.com/api/value_charges/${valueCharge.id}`, {
            charge: chargeOne
        })
            .then((response) => {
                valueCharges()
                console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }


    function paymentPack() {
        // e.preventDefault();

        const { data: response } = axios.post(`https://api.woofics.com/api/payment_package`, {
            name: Name,
            charge: chargefour,
            start: start,
            end: end
        })
            .then((response) => {
                paymentPackage()
                console.log(response.data)
                setName("");
                setchargefour("");
                setstart("");
                setend("")
            }, (Error) => {
                console.log(Error);
            });
    }

    function paymentPackDel(id) {
        // e.preventDefault();

        const { data: response } = axios.delete(`https://api.woofics.com/api/payment_package/${id}`)
            .then((response) => {
                paymentPackage()
            }, (Error) => {
                console.log(Error);
            });
    }


    function supplierRental() {
        // e.preventDefault();

        const { data: response } = axios.put(`https://api.woofics.com/api/supplier_rental/${supplierRenta.id}`, {
            charge: chargeTwo
        })
            .then((response) => {
                supplierRen()
                console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }
    function supplierRentalDel(iiid) {
        // e.preventDefault();

        const { data: response } = axios.put(`https://api.woofics.com/api/supplier_rental/${iiid}`, {
            charge: chargeTwo
        })
            .then((response) => {
                supplierRen()
                console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }


    function serviceCharges() {
        // e.preventDefault();

        const { data: response } = axios.put(`https://api.woofics.com/api/service_provider_charge/${serviceCharge.id}`, {
            charge: chargeThree
        })
            .then((response) => {
                serviceCharg()
                console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }
    function serviceChargesDel(iid) {
        // e.preventDefault();

        const { data: response } = axios.delete(`https://api.woofics.com/api/service_provider_charge/${iid}`, {
            charge: chargeThree
        })
            .then((response) => {
                serviceCharg()
                console.log(response.data)
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
            icon: <EqualizerIcon style={{ color: "white" }} />,
            to: '/charges'
        },
        {
            name: 'View Contacts',
            icon: <ContactMailIcon style={{ color: "#cdcdcd" }} />,
            to: '/viewcontact'
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
                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px', marginTop:"20px", marginBottom:"10px"}} />
                </span>
            </Link>
            <div className={classes.toolbar} />

            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                        <ListItem button key={text} className={text.name == "Charges" ? classes.item : ''}>
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
                            <div class="d-md-flex mb-3">
                                <h3 class="box-title mb-0 mx-auto text-center">CARGOS</h3>
                            </div> 
                            <div class="row">
                                <div className="text-left col-lg-12 col-xlg-12 col-md-12 mx-auto d-md-block d-none">
                                    <i className="fas fa-chevron-left fa-2x" onClick={() => history.goBack()} style={{ cursor: 'pointer', marginBottom:'10px' }}></i>
                                </div>
                                <div class="col-lg-8 col-xlg-9 col-md-12 mx-auto">
                                    <div class="card">
                                        <div class="card-body">
                                            {ford === "supplier" ? <div class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row mt-4">
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            id="standard-textarea"
                                                            label="Name"
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder="Add Name"
                                                            multiline
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }} />                                                </div>
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            onChange={(e) => setchargefour(e.target.value)}
                                                            id="standard-number"
                                                            placeholder="Service Charge"
                                                            fullWidth
                                                            label="Charge"
                                                            type="number"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-5">
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            placeholder="Starting Date"
                                                            id="standard-number"
                                                            fullWidth
                                                            label="Start"
                                                            onChange={(e) => setstart(e.target.value)}
                                                            type="number"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            placeholder="Ending Date"
                                                            onChange={(e) => setend(e.target.value)}
                                                            id="standard-number"
                                                            fullWidth 
                                                            label="End"
                                                            type="number"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div class="mb-4 mt-4 text-center mx-auto">
                                                        <div class="col-sm-12 text-center">
                                                            <button class={`btn text-white mt-3 greenbtn text-white `}  onClick={() => paymentPack()}>Add</button>
                                                        </div>
                                                    </div>
                                                    <table class="table table-hover mt-2 text-center">
                                                        <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                            <tr>
                                                                <th scope="col " className="text-white" >#</th>
                                                                <th scope="col " className="text-white" >Nombre</th>
                                                                <th scope="col " className="text-white" >Cargo</th>
                                                                <th scope="col " className="text-white" >Comienzo</th>
                                                                <th scope="col " className="text-white" >Final</th>
                                                                <th scope="col " className="text-white" >Comportamiento</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {paymentPackag.map((val, i) => {
                                                                return (<>
                                                                    <tr>
                                                                        <th scope="row">1</th>
                                                                        <td>{val.name}</td>
                                                                        <td>{val.charge}</td>
                                                                        <td>{val.start}</td>
                                                                        <td>{val.end}</td>
                                                                        <td><button class={`btn btn-danger text-white`} onClick={() => paymentPackDel(val.id)}>Borrar </button></td>
                                                                    </tr>
                                                                </>)
                                                            })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div> : ford === "value" ? <div class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row mt-4 text-center">
                                                    <div className="col-md-6 text-center mx-auto px-2 w-100 p-0" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                        <TextField
                                                            id="standard-textarea"
                                                            label="Charges"
                                                            onChange={(e) => setchargeOne(e.target.value)}
                                                            placeholder="Add Charges"
                                                            multiline
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }} />
                                                        <div class="col-sm-12 text-center">
                                                            <button class={`btn text-white mt-2 greenbtn text-white `}  onClick={() => valCharge()}>Agregar</button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 text-center mx-auto px-2 w-100 p-0">
                                                        <table class="table table-hover" style={{tableLayout:"fixed"}}>
                                                            <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                                <tr style={{tableLayout:"fixed"}}>
                                                                    <th scope="col" className="text-white">#</th>
                                                                    <th scope="col" className="text-white">Cargo</th>
                                                                    <th scope="col" className="text-white">Comportamiento</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">1</th>
                                                                    <td>{valueCharge.charge}</td>
                                                                    <td><button class={`btn text-white mr-2 greenbtn text-white `}  onClick={() => setcheck('true')}>Editar</button></td>
                                                                    {/* <button class={`btn btn-danger text-white`} onClick={valueCharges}>Delete </button> */}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div> :
                                                ford === "rental" ?

                                                    <div class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                        <div className="row mt-4 mx-auto">
                                                            <div className="col-md-6 text-center mx-auto px-2 w-100 p-0" style={{ display: check2 === 'true' ? 'block' : 'none' }}>
                                                                <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setchargeTwo(e.target.value)}
                                                                    label="Charges"
                                                                    placeholder="Add Charges"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                            <div class="col-md-12 mb-4 mt-4 w-100 text-center mx-auto" style={{ display: check2 === 'true' ? 'block' : 'none' }}>
                                                                <div class="col-sm-12 text-center">
                                                                    <button class={`btn text-white greenbtn text-white `}  onClick={() => supplierRental()}>Agregar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 text-center mx-auto px-2 w-100 p-0">
                                                            <table class="table table-hover" style={{tableLayout:"fixed"}}>
                                                                <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                                    <tr>
                                                                        <th scope="col" className="text-white">#</th>
                                                                        <th scope="col" className="text-white">Cargo</th>
                                                                        <th scope="col" className="text-white">Comportamiento</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">1</th>
                                                                        <td>{supplierRenta.charge}</td>
                                                                        <td><button class={`btn text-white mr-2 greenbtn text-white `}  onClick={() => setcheck2('true')}>Editar</button></td> 
                                                                        {/* <button class={`btn btn-danger text-white`} onClick={() => supplierRentalDel(supplierRenta.id)}>Delete </button> */}
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    :

                                                    <div class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                        <div className="row mt-4 mx-auto">
                                                            <div className="col-md-6 text-center mx-auto px-2 w-100 p-0" style={{ display: check3 === 'true' ? 'block' : 'none' }}>
                                                                <TextField
                                                                    id="standard-textarea"
                                                                    label="Charges"
                                                                    onChange={(e) => setchargeThree(e.target.value)}
                                                                    placeholder="Add Charges"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                        </div>
                                                        <div class=" col-md-12 mb-4 mt-4 w-100 text-center mx-auto " style={{ display: check3 === 'true' ? 'block' : 'none' }}>
                                                            <div class="col-sm-12 text-center">
                                                                <button class={`btn text-white greenbtn text-white `}  onClick={serviceCharges}>Agregar</button>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 text-center mx-auto px-2 w-100 p-0">
                                                            <table class="table table-hover" style={{tableLayout:"fixed"}}>
                                                                <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                                    <tr>
                                                                        <th scope="col" className="text-white">#</th>
                                                                        <th scope="col" className="text-white">AddCharge</th>
                                                                        <th scope="col" className="text-white">Comportamiento</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">1</th>
                                                                        <td>{serviceCharge.charge}</td>
                                                                        <td><button class={`btn text-white mr-2 greenbtn text-white `}  onClick={() => setcheck3('true')}>Editar</button></td>
                                                                        {/* <button class={`btn btn-danger text-white`} onClick={() => serviceChargesDel(serviceCharge.id)}>Delete </button> */}
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                            }
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
                        <span className="text-black font-medium ml-1">Sin Notificación !</span>
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
                <Link to='/adminallnotification'>
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
                    <a className="profile-pic" onClick={() => { history.push('/') }}>
                        <i className="fa fa-home mx-3"></i>
                        <span className="text-black font-medium mr-3">Vete a Casa</span>
                    </a>
                </Typography>
                <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { localStorage.clear(); history.push('/') }}>
                        <i className="fa fa-sign-out mx-3"></i>
                        <span className="text-black font-medium mr-3">Cerrar Sesión</span>
                    </a>
                </Typography>

            </Popover>


            {/*<div className="page-wrapper bg-light">
                    <div class="container">
                        <div id="blog" class="row ">

                            {blog.map((val, id) => {
                                return (
                                    <>
                                        <div className="my-3 col-md-8 border mx-auto shadow-sm p-3">
                                            <div className="row">

                                                <div class="col-md-8 mx-auto ">
                                                    <h3>{val.first_name} {val.last_name}   ({val.location})</h3>
                                                    <h5>{val.email}</h5>
                                                </div>
                                                <div class="col-md-4">
                                                    <button class="btn pull-right marginBottom10" style={{ backgroundColor: 'rgb(169 86 102)', color: 'white' }} value={val.id} onClick={approveReg}>{val.locked !== 0 ? 'Pending...':'APPROVED' }</button>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )
                            })}

                        </div>
                    </div>
                </div> */}
        </>
    );
}


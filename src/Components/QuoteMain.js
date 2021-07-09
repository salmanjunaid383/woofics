import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
import { useTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
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
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Navbar from './Navbar';
import one from '../Images/one.jpg';
import two from '../Images/two.webp';
import three from '../Images/three.png';

import Footer from './LandingPage/components/Footer';


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
    }, root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


export default function QuoteMain() {
    let history = useHistory();



    const [description, setdescription] = useState("");
    const [buy, setbuy] = useState("");
    const [indoor, setindoor] = useState("");
    const [install, setinstall] = useState("");
    const [model, setmodel] = useState("");
    const [visuald, setvisuald] = useState("");
    const [screenuse, setscreenuse] = useState("");
    const [screenbase, setscreenbase] = useState();
    const [screenheight, setscreenheight] = useState("");
    const [screenaccess, setscreenaccess] = useState('');
    const [screenorientation, setscreenorientation] = useState("");
    const [controlsys, setcontrolsys] = useState("");
    const [adverseweather, setadverseweather] = useState("");
    const [structure, setstructure] = useState("");
    const [deliverytime, setdeliverytime] = useState("");
    const [shipping, setshipping] = useState("");
    const [sensor, setsensor] = useState("");
    const [warranty, setwarranty] = useState("");
    const [carcass, setcarcass] = useState("");
    const [flycases, setflycases] = useState("");
    const [entity, setentity] = useState("");
    const [name, setname] = useState("");
    const [contact, setcontact] = useState("");
    const [company, setcompany] = useState("");
    const [customertype, setcustomertype] = useState("");
    const [sector, setsector] = useState("");
    const [postalcode, setpostalcode] = useState();
    const [comments, setcomments] = useState("");
    const [expiredate, setexpiredate] = useState("");
    const [clientid, setclientid] = useState("");
    const [doc, setdoc] = useState("");
    const [email, setemail] = useState("");
    const [progress, setprogress] = useState("Publish your Service?");


    const [malik, setmalik] = useState('disabled')

    function SendService() {

        alert("Seems you are not logged in.. Please login or Create your account first!")
        history.push("/")

        // console.log(description,
        //     buy,
        //     indoor,
        //     install,
        //     model,
        //     visuald,
        //     screenuse,
        //     screenbase,
        //     screenheight,
        //     screenaccess,
        //     screenorientation,
        //     controlsys,
        //     adverseweather,
        //     structure,
        //     deliverytime,
        //     shipping,
        //     sensor,
        //     warranty,
        //     carcass,
        //     flycases,
        //     entity,
        //     name,
        //     contact,
        //     company,
        //     customertype,
        //     sector,
        //     postalcode,
        //     comments,
        //     email)
        // setprogress('Please wait...')
        // const token = localStorage.getItem('user_token');
        // var decoded = jwt_decode(token);

        // const { data: response } = axios.post(`https://api.woofics.com/api/form`, {
        //     description: description,
        //     buy: buy,
        //     indoor: indoor,
        //     installation: install,
        //     model: model,
        //     visual_distance: visuald,
        //     screen_use: screenuse,
        //     screen_base: screenbase,
        //     screen_height: screenheight,
        //     screen_access: screenaccess,
        //     screen_orientation: screenorientation,
        //     control_system: controlsys,
        //     adverse_weather: adverseweather,
        //     structure: structure,
        //     delivery_time: deliverytime,
        //     shipping: shipping,
        //     sensor: sensor,
        //     warranty: warranty,
        //     carcase_material: carcass,
        //     fly_cases: flycases,
        //     name: name,
        //     contact: contact,
        //     company: company,
        //     customer_type: customertype,
        //     sector: sector,
        //     postal_code: postalcode,
        //     comments: comments,
        //     entity: entity,
        //     email: email,
        //     documents: doc,
        //     client_id: decoded.sub
        // })
        //     .then((response) => {
        //         setprogress('Published')
        //         alert('THANK YOU FOR YOUR TIME.  WITHIN 48 HOURS, YOU WILL RECEIVE THE BEST PERSONALIZED OFFERS FOR YOUR PROJECT ')
        //         history.push('/myservice')
        //     }, (error) => {
        //         setprogress('Publish your Service?')
        //         alert('You left some feilds empty !')
        //     });
    }




    function getSteps() {
        // , 'Use', 'Dimension', 'Orientation', 'Extreme Wheather', 'Basic Info'
        return ['USE', 'SCREEN', 'INSTALLATION', 'Extra Data', 'Contact Details'];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <div className="w-50 pt-lg-5 my-lg-5 " >
                    <h4 className="text-left w-100 text-dark">Do you want to purchase or rent ?</h4>
                    <input value="purchase" onChange={(e) => setbuy(e.target.value)}
                        type="radio" name="emotion"
                        id="sad" class="input-hidden " />
                    <label for="sad">
                        <img
                            src="https://www.nicepng.com/png/detail/46-463074_overseas-purchase-svg-png-icon-free-download-purchase.png"
                            alt="I'm sad"
                            className="mx-lg-5 p-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center">PURCHASE</h4>
                    </label>

                    <input value="rent" onChange={(e) => setbuy(e.target.value)}
                        type="radio" name="emotion"
                        id="happy" class="input-hidden" />
                    <label for="happy">
                        <img
                            src="data:image/png;base64,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"
                            alt="I'm happy" className="p-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center">RENT</h4>
                    </label>
                    <br />
                    <br />

                    <h4 className="text-left w-100 text-dark">Do you want for indoor or outdoor ?</h4>
                    <input value="indoor" onChange={(e) => setindoor(e.target.value)}
                        type="radio" name="ff"
                        id="sadd" class="input-hidden " />
                    <label for="sadd">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3VMEMNOqtMCbm09-ybyc_roZbsJG2UdT_wXZze1yQrIGlnQFIm5nHnOy2Ko8-7t56TFA&usqp=CAU"
                            alt="I'm sad"
                            className="mx-lg-5 p-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center">INDOOR</h4>
                    </label>

                    <input value="outdoor" onChange={(e) => setindoor(e.target.value)}
                        type="radio" name="ff"
                        id="happyy" class="input-hidden" />
                    <label for="happyy">
                        <img
                            src="data:image/png;base64,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"
                            alt="I'm happy" className="p-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center">OUTDOOR</h4>
                    </label>
                    <br />
                    <br />

                    <h4 className="text-left w-100 text-dark">Fixed installation or installation for event ?</h4>
                    <div className="w-100  my-lg-2"><TextField onChange={(e) => setinstall(e.target.value)} className="w-50" id="outlined-basic" label="Installation or installation for event ?" variant="outlined" /> </div>
                    <br />
                    <br />

                    <div>
                        <h4 className="text-left w-100 text-dark">Do you know the model you are looking for?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setmodel(e.target.value)}>
                                <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <br />
                    <br />
                    <div>
                        <h4 className="text-left w-100 text-dark d-inline">Maximum and minimum vision distance?</h4>
                        <div>
                            <TextField type="number" onChange={(e) => setvisuald(e.target.value)} className="w-50 mx-lg-2" id="outlined-basic" label="Maximum and minimum " variant="outlined" />
                            {/* <TextField type="number" onChange={(e) => setscreenheight(e.target.value)} className="w-25 mx-lg-2" id="outlined-basic" label="Maximum" variant="outlined" /> */}
                        </div>
                    </div>
                    <br />
                    <br />
                    <h4 className="text-left w-100 text-dark">Use of Screen?</h4>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setscreenuse(e.target.value)}>
                            <FormControlLabel value="FAIR/EVENT/CONCERTS/PLATO TV" control={<Radio color="primary" />} label="FAIR/EVENT/CONCERTS/PLATO TV" />
                            <FormControlLabel value="ORPORATE IMAGE" control={<Radio color="primary" />} label="ORPORATE IMAGE" />
                            <FormControlLabel value="ADVERTISING" control={<Radio color="primary" />} label="ADVERTISING" />
                            <FormControlLabel value="INFORMATION" control={<Radio color="primary" />} label="INFORMATION" />
                            <FormControlLabel value="TRAFFIC" control={<Radio color="primary" />} label="TRAFFIC" />
                            <FormControlLabel value="SPORTS EVENT" control={<Radio color="primary" />} label="SPORTS EVENT" />
                            <FormControlLabel value="CONTROL ROOM" control={<Radio color="primary" />} label="CONTROL ROOM" />
                        </RadioGroup>
                    </FormControl>
                    {/* <p className="d-inline w-100">
                        <div className="w-50 text-left float-left">
                            <input type="radio" className="w-25 text-left" onchange={(e) => setscreenuse(e.target.value)} value="FAIR/EVENT/CONCERTS/PLATO TV" />FAIR/EVENT/CONCERTS/PLATO-TV
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" className="w-25 text-left" onchange={(e) => setscreenuse(e.target.value)} value="CORPORATE IMAGE" />CORPORATE IMAGE
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" className="w-25 text-left" onchange={(e) => setscreenuse(e.target.value)} value="ADVERTISING" />ADVERTISING
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" className="w-25 text-left" onchange={(e) => setscreenuse(e.target.value)} value="INFORMATION" />INFORMATION
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" className="w-25 text-left" onchange={(e) => setscreenuse(e.target.value)} value="TRAFFIC" />TRAFFIC
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" className="w-25 text-left" onchange={(e) => setscreenuse(e.target.value)} value="SPORTS EVENT" />SPORTS EVENT
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" className="w-25 text-left" onchange={(e) => setscreenuse(e.target.value)} value="CONTROL ROOM" />CONTROL ROOM
                        </div>
                    </p> */}
                    <br />
                    <br />
                    <br />
                    <br />


                </div>
            case 1:
                return <div className="w-100 my-lg-5">
                    <div>
                        <h4 className="text-left w-100 text-dark d-inline">Screen dimension?</h4>
                        <div>
                            <TextField value={screenbase} type="number" onChange={(e) => setscreenbase(e.target.value)} className="w-25 mx-lg-2" id="outlined-basic" label="Base (cm) " variant="outlined" />
                            <TextField value={screenheight} type="number" onChange={(e) => setscreenheight(e.target.value)} className="w-25 mx-lg-2" id="outlined-basic" label="Height (cm) " variant="outlined" />
                        </div>
                    </div>
                    <br />
                    <br />

                    <h4 className="text-left w-100 text-dark">Screen?</h4>
                    <input value="front" onChange={(e) => setscreenaccess(e.target.value)}
                        type="radio" name="fqf"
                        id="sadd" class="input-hidden " />
                    <label for="sadd">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3VMEMNOqtMCbm09-ybyc_roZbsJG2UdT_wXZze1yQrIGlnQFIm5nHnOy2Ko8-7t56TFA&usqp=CAU"
                            alt="I'm sad"
                            className="mx-lg-5 p-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center">Front access</h4>
                    </label>

                    <input value="rear" onChange={(e) => setscreenaccess(e.target.value)}
                        type="radio" name="fqf"
                        id="happpy" class="input-hidden" />
                    <label for="happpy">
                        <img
                            src="data:image/png;base64,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"
                            alt="I'm happy" className="p-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center">Rear access</h4>
                    </label>

                    <br />
                    <br />
                    <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">Control System?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setcontrolsys(e.target.value)}>
                                <FormControlLabel value="SYNCHRONE (Live Broadcast)" control={<Radio color="primary" />} label="SYNCHRONE (Live Broadcast)" />
                                <FormControlLabel value="ASYNCHRONOUS (From Memory)" control={<Radio color="primary" />} label="ASYNCHRONOUS (From Memory)" />
                                <FormControlLabel value="VIDEO PROCESSOR (Managing Different Signals)" control={<Radio color="primary" />} label="VIDEO PROCESSOR (Managing Different Signals)" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="qqq1" className="w-25 text-left" onchange={(e) => setcontrolsys(e.target.value)} value="SYNCHRONE (Live Broadcast)" />SYNCHRONE (Live Broadcast)
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="qqq1" className="w-25 text-left" onchange={(e) => setcontrolsys(e.target.value)} value="ASYNCHRONOUS (From Memory)" />ASYNCHRONOUS (From Memory)
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="qqq1" className="w-25 text-left" onchange={(e) => setcontrolsys(e.target.value)} value="VIDEO PROCESSOR (Managing Different Signals)" />VIDEO PROCESSOR (Managing Different Signals)
                        </div> */}
                    </p>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            case 2:
                return <div className="w-100 my-lg-5">
                    <h4 className="text-left w-100 text-dark">Screen Orientation?</h4>
                    <input
                        type="radio" name="fqwgqwfq"
                        id="ssaad" class="input-hidden " value='north' onChange={(e) => setscreenorientation(e.target.value)} />

                    <label value="north" for="ssaad">
                        <img
                            src="data:image/png;base64,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"
                            alt="North"
                            className="mx-lg-4 p-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center">NORTH</h4>
                    </label>

                    <input
                        type="radio" name="fqwgqwfq"
                        id="hahappy" class="input-hidden" value='south' onChange={(e) => setscreenorientation(e.target.value)} />
                    <label value="South" for="hahappy">
                        <img
                            src="data:image/png;base64,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"
                            alt="south" className="mx-lg-4 p-2" style={{ cursor: "pointer", transform: 'rotate(180deg)' }} />
                        <h4 className="text-center">SOUTH</h4>
                    </label>
                    <input
                        type="radio" name="fqwgqwfq"
                        id="uugly" class="input-hidden" value='east' onChange={(e) => setscreenorientation(e.target.value)} />
                    <label value="East" for="uugly">
                        <img
                            src="data:image/png;base64,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"
                            alt="east" className="mx-lg-4 p-2" style={{ cursor: "pointer", transform: 'rotate(90deg)' }} />
                        <h4 className="text-center">EAST</h4>
                    </label>
                    <input
                        type="radio" name="fqwgqwfq"
                        id="ds" class="input-hidden" value='west' onChange={(e) => setscreenorientation(e.target.value)} />
                    <label value="West" for="ds">
                        <img
                            src="data:image/png;base64,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"
                            alt="west" className="mx-lg-4 p-2" style={{ cursor: "pointer", transform: 'rotate(270deg)' }} />
                        <h4 className="text-center">WEST</h4>
                    </label>

                    <br />
                    <br />
                    <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">Is the display exposed to adverse weather?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setadverseweather(e.target.value)}>
                                <FormControlLabel value="NEAR THE SEA" control={<Radio color="primary" />} label="NEAR THE SEA" />
                                <FormControlLabel value="HIGH MOUNTAIN" control={<Radio color="primary" />} label="HIGH MOUNTAIN" />
                                <FormControlLabel value="LITTLE EXTREME" control={<Radio color="primary" />} label="LITTLE EXTREME" />
                                <FormControlLabel value="HEAT VENTILATION" control={<Radio color="primary" />} label="HEAT VENTILATION" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="adsd" className="w-25 text-left" onchange={(e) => setadverseweather(e.target.value)} value="NEAR THE SEA" />NEAR THE SEA
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="adsd" className="w-25 text-left" onchange={(e) => setadverseweather(e.target.value)} value="HIGH MOUNTAIN" />HIGH MOUNTAIN
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="adsd" className="w-25 text-left" onchange={(e) => setadverseweather(e.target.value)} value="LITTLE EXTREME" />LITTLE EXTREME
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="adsd" className="w-25 text-left" onchange={(e) => setadverseweather(e.target.value)} value="HEAT VENTILATION" />HEAT VENTILATION
                        </div> */}
                    </p>


                    <br />
                    <br />
                    <br />
                    <h4 className="text-left w-100 text-dark">Need Structure?</h4>
                    <input
                        type="radio" name="fqwfqwfas"
                        id="dsdq" class="input-hidden " value='Monoposte' onChange={(e) => setstructure(e.target.value)} />

                    <label value="Monoposte" for="dsdq">
                        <img
                            src={one}
                            alt="North"
                            className="mx-auto mx-lg-4 p-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center mx-lg-2">Monoposte</h4>
                    </label>

                    <input
                        type="radio" name="fqwfqwfas"
                        id="Truss for events" class="input-hidden" value='Truss for events' onChange={(e) => setstructure(e.target.value)} />
                    <label value="Truss for events" for="Truss for events">
                        <img
                            src={two}
                            alt="Truss for events" className="mx-auto mx-lg-4 p-2  ml-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center mx-lg-2">Truss for events
                        </h4>
                    </label>

                    <input
                        type="radio" name="fqwfqwfas"
                        id="Mupi" class="input-hidden" value='Mupi' onChange={(e) => setstructure(e.target.value)} />
                    <label value="Mupi" for="Mupi">
                        <img
                            src={three}
                            alt="Mupi" className="mx-auto mx-lg-4 p-2  ml-2" style={{ cursor: "pointer" }} />
                        <h4 className="text-center mx-lg-2">Mupi
                        </h4>
                    </label>
                    <br />
                    <br />
                    <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">Delivery Time?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setdeliverytime(e.target.value)}>
                                <FormControlLabel control={<Radio color="primary" />} label="Select date from Calander" value="date" />
                                {deliverytime === "date" ? <> <TextField
                                    id="date"
                                    label="Select date"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setdeliverytime(e.target.value)}
                                    className="mr-3"
                                /> </> : null}
                                <FormControlLabel value="2 WEEKS STOCK (In stock)" control={<Radio color="primary" />} label="2 WEEKS STOCK (In stock)" />
                                <FormControlLabel value="4 PLANE WEEKS , (Express Manufacturing)" control={<Radio color="primary" />} label="4 PLANE WEEKS , (Express Manufacturing)" />
                                <FormControlLabel value="8 WEEKS BARCO (Standard Manufacturing)" control={<Radio color="primary" />} label="8 WEEKS BARCO (Standard Manufacturing)" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="gwegwe" className="w-25 text-left" onchange={(e) => setdeliverytime(e.target.value)} value="Select date from Calander" />Select date from Calander
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="gwegwe" className="w-25 text-left" onchange={(e) => setdeliverytime(e.target.value)} value="2 WEEKS STOCK (In stock)" />2 WEEKS STOCK (In stock)
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="gwegwe" className="w-25 text-left" onchange={(e) => setdeliverytime(e.target.value)} value="4 PLANE WEEKS , (Express Manufacturing)" />4 PLANE WEEKS , (Express Manufacturing)
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="gwegwe" className="w-25 text-left" onchange={(e) => setdeliverytime(e.target.value)} value="8 WEEKS BARCO (Standard Manufacturing)" />8 WEEKS BARCO (Standard Manufacturing)
                        </div> */}
                    </p>


                    <br />
                    <br />
                </div>;
            // <div className="w-100 my-lg-5"><TextField value={modal} onChange={(e) => setModal(e.target.value)} className="w-75" id="outlined-basic" label="Do you know the modal you are looking for?" variant="outlined" /> </div>;
            case 3:
                return <div className="w-100 my-lg-5">
                    <br />
                    <br />
                    <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">INSTALLATION OR SHIPPING?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setdeliverytime(e.target.value)}>
                                <FormControlLabel value="WEEKS" control={<Radio color="primary" />} label="WEEKS" />
                                <FormControlLabel value="SHIPPING" control={<Radio color="primary" />} label="SHIPPING" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="fwefwe" className="w-25 text-left" onchange={(e) => setshipping(e.target.value)} value="INSTALLATION" />INSTALLATION
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="fwefwe" className="w-25 text-left" onchange={(e) => setshipping(e.target.value)} value="SHIPPING" />SHIPPING
                        </div> */}
                    </p>
                    <br />
                    <br />
                    <br />
                    <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">BRIGHTNESS SENSOR / TEMPERATURE SENSOR?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setsensor(e.target.value)}>
                                <FormControlLabel value="BRIGHTNESS SENSOR" control={<Radio color="primary" />} label="BRIGHTNESS SENSOR" />
                                <FormControlLabel value="TEMPERATURE SENSOR" control={<Radio color="primary" />} label="TEMPERATURE SENSOR" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="bgweg" className="w-25 text-left" onchange={(e) => setsensor(e.target.value)} value="BRIGHTNESS SENSOR" />BRIGHTNESS SENSOR
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="bgweg" className="w-25 text-left" onchange={(e) => setsensor(e.target.value)} value="TEMPERATURE SENSOR" /> TEMPERATURE SENSOR
                        </div> */}
                    </p>
                    <br />
                    <br />
                    <br />
                    <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">POSSIBILITY TO INCREASE WARRANTY?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setwarranty(e.target.value)}>
                                <FormControlLabel value="2 years (default should be selected)" control={<Radio color="primary" />} label="2 years (default should be selected)" />
                                <FormControlLabel value="3 years" control={<Radio color="primary" />} label="3 years" />
                                <FormControlLabel value="5s year" control={<Radio color="primary" />} label="5s year" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="wgwea" className="w-25 text-left" onchange={(e) => setwarranty(e.target.value)} value="2 years (default should be selected)" />2 years (default should be selected)
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="wgwea" className="w-25 text-left" onchange={(e) => setwarranty(e.target.value)} value="3 years" />3 years
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="wgwea" className="w-25 text-left" onchange={(e) => setwarranty(e.target.value)} value="5s year" />5s year
                        </div> */}
                    </p>
                    <br />
                    <br />
                    <br />
                    <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">CARCASA MATERIAL?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setcarcass(e.target.value)}>
                                <FormControlLabel value="CHAPA SLIM MODEL 8mm thick" control={<Radio color="primary" />} label="CHAPA SLIM MODEL 8mm thick" />
                                <FormControlLabel value="ALUMINIUM SLIM MODEL 8mm thick" control={<Radio color="primary" />} label="ALUMINIUM SLIM MODEL 8mm thick" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="webe" className="w-25 text-left" onchange={(e) => setcarcass(e.target.value)} value="CHAPA SLIM MODEL 8mm thick" />CHAPA SLIM MODEL 8mm thick

                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="webe" className="w-25 text-left" onchange={(e) => setcarcass(e.target.value)} value="ALUMINIUM SLIM MODEL 8mm thick" />ALUMINIUM SLIM MODEL 8mm thick
                        </div> */}
                    </p>
                    <br />
                    <br />
                    <br />

                    <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">FLY CASES?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setflycases(e.target.value)}>
                                <FormControlLabel value="YES" control={<Radio color="primary" />} label="YES" />
                                <FormControlLabel value="NO" control={<Radio color="primary" />} label="NO" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="wqeqv" className="w-25 text-left" onchange={(e) => setflycases(e.target.value)} value="YES" />YES

                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="wqeqv" className="w-25 text-left" onchange={(e) => setflycases(e.target.value)} value="NO" />NO
                        </div> */}
                    </p>
                    <br />
                    <br />
                    <br />

                    <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">WHAT ARE YOU?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setentity(e.target.value)}>
                                <FormControlLabel value="PUBLIC ENTITY" control={<Radio color="primary" />} label="PUBLIC ENTITY" />
                                <FormControlLabel value="PRIVATE ENTITY" control={<Radio color="primary" />} label="PRIVATE ENTITY" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="bqea" className="w-25 text-left" onchange={(e) => setentity(e.target.value)} value="PUBLIC ENTITY" />PUBLIC ENTITY

                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="bqea" className="w-25 text-left" onchange={(e) => setentity(e.target.value)} value="PRIVATE ENTITY" />PRIVATE ENTITY

                        </div> */}
                    </p>
                    <br />
                    <br />
                    <br />


                </div>;
            case 4:
                return <div>
                    <div className="row">
                        <div className="col-md-12 my-lg-2"><TextField onChange={(e) => setname(e.target.value)} className="mx-1" id="outlined-basic" label="Name?" variant="outlined" /> <TextField type="number" onChange={(e) => setcontact(e.target.value)} className="mx-1" id="outlined-basic" label="Contact?" variant="outlined" /><TextField onChange={(e) => setcompany(e.target.value)} className="mx-1" id="outlined-basic" label="Company Name?" variant="outlined" /> </div>
                        <div className="col-md-12 my-lg-2"><TextField onChange={(e) => setpostalcode(e.target.value)} className="mx-1" id="outlined-basic" label="Postal Code?" variant="outlined" /><TextField onChange={(e) => setemail(e.target.value)} className="mx-1" id="outlined-basic" label="Email?" variant="outlined" />  <TextField onChange={(e) => setcomments(e.target.value)} className="mx-1" id="outlined-basic" label="Comments?" variant="outlined" /></div>
                    </div>
                    <div className="w-100 my-lg-2"> <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">Intermediary / end customer?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setcustomertype(e.target.value)}>
                                <FormControlLabel value="Intermediary" control={<Radio color="primary" />} label="Intermediary" />
                                <FormControlLabel value="End customer" control={<Radio color="primary" />} label="End customer" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="fegqbq" className="w-25 text-left" onchange={(e) => setcustomertype(e.target.value)} value="Intermediary" />Intermediary
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="fegqbq" className="w-25 text-left" onchange={(e) => setcustomertype(e.target.value)} value="End customer" /> End customer
                        </div> */}
                    </p></div>
                    <div className="w-100 my-lg-2"> <p className="d-inline w-100">
                        <h4 className="text-left w-100 text-dark">Sector?</h4>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" constolsys="posiconstolsys" defaultValue="top" onChange={(e) => setsector(e.target.value)}>
                                <FormControlLabel value="SPORT" control={<Radio color="primary" />} label="SPORT" />
                                <FormControlLabel value="RETAIL" control={<Radio color="primary" />} label="RETAIL" />
                                <FormControlLabel value="PUBLIC" control={<Radio color="primary" />} label="PUBLIC" />
                                <FormControlLabel value="HEALTH" control={<Radio color="primary" />} label="HEALTH" />
                                <FormControlLabel value="MOTOR" control={<Radio color="primary" />} label="MOTOR" />
                                <FormControlLabel value="OCIO" control={<Radio color="primary" />} label="OCIO" />
                                <FormControlLabel value="HOTELS" control={<Radio color="primary" />} label="HOTELS" />
                                <FormControlLabel value="CONGRESSES" control={<Radio color="primary" />} label="CONGRESSES" />
                            </RadioGroup>
                        </FormControl>
                        {/* <div className="w-50 text-left float-left">
                            <input type="radio" name="aa" className="w-25 text-left" onchange={(e) => setsector(e.target.value)} value="SPORT" />SPORT
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="aa" className="w-25 text-left" onchange={(e) => setsector(e.target.value)} value="RETAIL" />RETAIL
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="aa" className="w-25 text-left" onchange={(e) => setsector(e.target.value)} value="PUBLIC" />PUBLIC
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="aa" className="w-25 text-left" onchange={(e) => setsector(e.target.value)} value="HEALTH" />HEALTH
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="aa" className="w-25 text-left" onchange={(e) => setsector(e.target.value)} value="MOTOR" />MOTOR
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="aa" className="w-25 text-left" onchange={(e) => setsector(e.target.value)} value="OCIO" />OCIO
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="aa" className="w-25 text-left" onchange={(e) => setsector(e.target.value)} value="HOTELS" />HOTELS
                        </div>
                        <div className="w-50 text-left float-left">
                            <input type="radio" name="aa" className="w-25 text-left" onchange={(e) => setsector(e.target.value)} value="CONGRESSES" />CONGRESSES
                        </div> */}
                    </p></div>
                    <h4 className="text-left w-100 text-dark">Attach documents and images?</h4>
                    <div className="w-100 my-lg-2"><TextField onChange={(e) => setdoc(e.target.value)} className="w-50"   type="file"  /> </div>
                </div>

        }
    }



    const classes = useStyles();

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
    // const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const [open3, setOpen3] = React.useState(false);

    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen3(false);
    };

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const [display1, setDisplay1] = useState('none')
    const [display2, setDisplay2] = useState('none')
    const [display3, setDisplay3] = useState('block')

    function Displayone() {
        setDisplay1('none')
        setDisplay2('block')
        setDisplay3('none')

    }
    function Displaytwo() {
        setDisplay1('block')
        setDisplay2('none')
        setDisplay3('none')

    }
    function Displaythree() {
        setDisplay1('none')
        setDisplay2('none')
        setDisplay3('block')

    }



    return (
        <>

            <Navbar />


            <div className="page-wrapper bg-light" style={{ display: display1 }}>
                <div class="container-fluid" >
                    <div class="row">
                        <div className="col-md-12 pr-5 pt-5">
                            <i className="fa fa-chevron-left fa-2x" style={{ cursor: 'pointer' }} onClick={() => Displaythree()}></i>
                        </div>
                        <div class="col-lg-9 col-xlg-9 col-md-9 mx-auto text-center">
                            <div className={classes.root}>
                                <div className="d-none d-md-block mt-md-4">
                                    <Stepper activeStep={activeStep} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </div>
                                <div>
                                    {activeStep === steps.length ? (
                                        <div className="w-100 text-center my-md-5 my-sm-0">
                                            <Typography className={classes.instructions}>All steps completed</Typography>
                                            <Button
                                                // disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.backButton}
                                            >
                                                Back
                                            </Button>
                                            <Button variant="contained" color="primary" onClick={() => SendService()}>{progress}</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.backButton}
                                                >
                                                    Back
                                                </Button>
                                                <Button variant="contained" malik color="primary" onClick={handleNext}>
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="page-wrapper bg-light" style={{ display: display2 }}>
                <div class="container w-50 pt-lg-5 mt-lg-5">
                    <div className="col-md-12 pr-5">
                        <i className="fa fa-chevron-left fa-2x" style={{ cursor: 'pointer' }} onClick={() => Displaythree()}></i>
                    </div>
                    <div class="row text-center">
                        <div className="w-100 mx-auto mt-md-4">
                            <br />
                            <label>Please let us know what do you want! Mention every thing below:</label>
                            <textarea onChange={(e) => setdescription(e.target.value)}>
                            </textarea>
                        </div>
                        <div className="w-100 mx-auto ">
                            <h4 className="text-left w-100 text-dark">Name?</h4>
                            <div className="w-100 my-lg-2"><TextField onChange={(e) => setname(e.target.value)} className="w-50" id="outlined-basic" label="Name?" variant="outlined" /> </div>
                            <h4 className="text-left w-100 text-dark">Contact?</h4>
                            <div className="w-100 my-lg-2"><TextField type="number" onChange={(e) => setcontact(e.target.value)} className="w-50" id="outlined-basic" label="Contact?" variant="outlined" /> </div>
                            <h4 className="text-left w-100 text-dark">Company Name?</h4>
                            <div className="w-100 my-lg-2"><TextField onChange={(e) => setcompany(e.target.value)} className="w-50" id="outlined-basic" label="Company Name?" variant="outlined" /> </div>
                            <div className="w-100 my-lg-2"> <p className="d-inline w-100">
                                <h4 className="text-left w-100 text-dark">Intermediary / end customer?</h4>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q3" className="w-25 text-left" onChange={(e) => setcustomertype(e.target.value)} value="Intermediary" />Intermediary
                                </div>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q3" className="w-25 text-left" onChange={(e) => setcustomertype(e.target.value)} value="End customer" /> End customer
                                </div>
                            </p></div>
                            <div className="w-100 my-lg-2"> <p className="d-inline w-100">
                                <h4 className="text-left w-100 text-dark">Sector?</h4>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q1" className="w-25 text-left" onChange={(e) => setsector(e.target.value)} value="SPORT" />SPORT
                                </div>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q1" className="w-25 text-left" onChange={(e) => setsector(e.target.value)} value="RETAIL" />RETAIL
                                </div>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q1" className="w-25 text-left" onChange={(e) => setsector(e.target.value)} value="PUBLIC" />PUBLIC
                                </div>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q1" className="w-25 text-left" onChange={(e) => setsector(e.target.value)} value="HEALTH" />HEALTH
                                </div>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q1" className="w-25 text-left" onChange={(e) => setsector(e.target.value)} value="MOTOR" />MOTOR
                                </div>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q1" className="w-25 text-left" onChange={(e) => setsector(e.target.value)} value="OCIO" />OCIO
                                </div>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q1" className="w-25 text-left" onChange={(e) => setsector(e.target.value)} value="HOTELS" />HOTELS
                                </div>
                                <div className="w-50 text-left float-left">
                                    <input type="radio" name="q1" className="w-25 text-left" onChange={(e) => setsector(e.target.value)} value="CONGRESSES" />CONGRESSES
                                </div>
                            </p></div>
                            <h4 className="text-left w-100 text-dark">Postal Code?</h4>
                            <div className="w-100 my-lg-2"><TextField onChange={(e) => setpostalcode(e.target.value)} className="w-50" id="outlined-basic" label="Postal Code?" variant="outlined" /> </div>
                            <h4 className="text-left w-100 text-dark">Email?</h4>
                            <div className="w-100 my-lg-2"><TextField onChange={(e) => setemail(e.target.value)} className="w-50" id="outlined-basic" label="Email?" variant="outlined" /> </div>
                            <h4 className="text-left w-100 text-dark">Attach documents and images?</h4>
                            <div className="w-100 my-lg-2"><TextField onChange={(e) => setdoc(e.target.value)} className="w-50" id="outlined-basic" label="Attach documents and images?" type="file" variant="outlined" /> </div>
                            <h4 className="text-left w-100 text-dark">Comments?</h4>
                            <div className="w-100 my-lg-2"><TextField onChange={(e) => setcomments(e.target.value)} className="w-50" id="outlined-basic" label="Comments?" variant="outlined" /> </div>
                        </div>
                        <div className="w-100 text-center mx-auto my-3 ">
                            <button className="btn btn-primary" onClick={() =>
                                description === "" ||
                                    name === "" ||
                                    contact === "" ||
                                    company === "" ||
                                    customertype === "" ||
                                    sector === "" ||
                                    postalcode === null ||
                                    comments === "" ||
                                    email === "" ? alert("please fill these") : SendService()}>{progress}</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="page-wrapper bg-light" style={{ display: display3 }}>
                <div class="container-fluid">
                    <div class="row">
                        <div className="col-md-12 pr-5">
                            <Link to="/myservice" style={{ textDecoration: 'none', color: '#fff' }}> <button className="btn btn-primary float-right m-2">My Services</button></Link>
                        </div>
                        <h3 className="text-dark w-100 pl-lg-5" >Do you know what you are looking for? </h3>
                        <div className="w-100 pl-lg-5" >
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" onClick={() => Displayone()} />
                                    <FormControlLabel value="no" control={<Radio color="primary" />} label="No" onClick={() => Displaytwo()} />
                                </RadioGroup>
                            </FormControl>

                        </div>
                        {/* <div className="text-center w-100"> */}
                        {/* <p className="d-inline w-100 ">
                                        <div className="w-25 float-left ">
                                            <input type="radio" name="q1" className="w-25 text-left" value="yes" />Yes
                                          </div>
                                        <div className="w-75 text-left float-left">
                                            <input type="radio" name="q1" className="w-25 text-left" value="no" />No
                                         </div>
                                    </p> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <Footer />

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open3}
                autoHideDuration={6000}
                onClose={handleClose3}
                message={"Oops! seems you are not logged in. Please Login to your account to create an offer/quote."}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose3}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />

        </>
    );
}


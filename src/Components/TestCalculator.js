import React, { useState, useEffect } from "react";
import LandingPage from './LandingPage/components/LandingPage';
import "../Components/prize.css"
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom'
import logo from './LandingPage/images/wooficc.png';
import axios from 'axios';
import Navbar from './Navbar'
import Footer from './LandingPage/components/Footer'
import './Emailver.css'
import Input from '@material-ui/core/Input';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    ledScreen: {
        boxShadow: ' inset 0 0 10px #000000',
    }
}));



//...........................................................................................
function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
    {
        value: 0,
    },
    {
        value: 20,
    },
    {
        value: 37,
    },
    {
        value: 100,
    },
];

const IOSSlider = withStyles({
    root: {
        color: '#3880ff',
        height: 2,
        padding: '15px 0',
    },
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        marginTop: -14,
        marginLeft: -14,
        '&:focus, &:hover, &$active': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 12px)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    track: {
        height: 2,
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
})(Slider);

const PrettoSlider = withStyles({
    root: {
        color: '#f75980',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const AirbnbSlider = withStyles({
    root: {
        color: '#3a8589',
        height: 3,
        padding: '13px 0',
    },
    thumb: {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -12,
        marginLeft: -13,
        boxShadow: '#ebebeb 0 2px 2px',
        '&:focus, &:hover, &$active': {
            boxShadow: '#ccc 0 2px 3px 1px',
        },
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 3,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
    },
})(Slider);

function AirbnbThumbComponent(props) {
    return (
        <span {...props}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
        </span>
    );
}


//...........................................................................................

export default function PriceCalculator() {

    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };



    const [led, setLed] = useState([]);
    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/led`)
            .then((response) => {
                if (response) {
                    setLed(response.data)
                }
            }).catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            });
    }, [])

    const handleChange = e => setAge(e.target.value);


    const [area, setarea] = useState('');
    const [areaprice, setareaprice] = useState();
    const [height, setheight] = useState(0);
    const [width, setwidth] = useState(0);
    const [style, setStyle] = useState('')

    function AutoFunction(e) {
        setAge(e)
        setStyle(classes.ledScreen)
        // getCal()
    }
    function getCal() {
        const { data: response } = axios.post(`https://api.woofics.com/api/area`, {
            height: value,
            width: value2,
            led_id: age
        })
            .then((response) => {
                if (response) {
                    setarea(response.data)
                    setareaprice(response.data.led_option.price)
                    
                }
            }).catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            });
    }

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    function valuetext(value) {
        return `${value}°C`;
    }

    const [search, setSearch] = useState('')
    const [application, setApplication] = useState('')
    const [value, setValue] = React.useState(30);
    const [value2, setValue2] = React.useState(30);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSliderChange2 = (event, newValue) => {
        setValue2(newValue);
    };
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    const handleInputChange2 = (event) => {
        setValue2(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur2 = () => {
        if (value2 < 0) {
            setValue2(0);
        } else if (value2 > 100) {
            setValue2(100);
        }
    };

    return (
        <>

            <section className="nav-section" style={{backgroundImage:"linear-gradient(to right, #934CFF 10%, #F62B84)",height:"60px"}} >
            <Navbar />
            </section>
            
            <br />
            <h2 className="text-center text-primary pt-5">Led Screen Configurator</h2>
            <div className="container w-75 p-0 shadow" >
                <div className="row mx-auto   no-gutters" style={{ backgroundColor: "#f7527f", border: '5px #f95c87 solid' }}>
                    <div className="col-md-12 px-5 bg-white mobile" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                        <h3 className="pt-2"><b>Dimension</b></h3>
                        <div className={classes.root} noValidate autoComplete="off" style={{width:"70%"}}>
                            {/* <Tooltip title="Height should be in centimeter's" arrow placement="top">
                                <TextField id="standard-basic" className="w-50 px-2" type="number" label="Height (cm)" onChange={(e) => setheight(e.target.value)} />
                            </Tooltip>
                            <Tooltip title="Width should be in centimeter's" arrow placement="top">
                                <TextField id="standard-basic" className="w-50 " type="number" label="Width (cm)" onChange={(e) => setwidth(e.target.value)} />
                            </Tooltip> */}
                            <Typography gutterBottom>Height should be in centimeter's</Typography>
                            
                            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" className="w-75" value={typeof value === 'number' ? value : 0} onChange={handleSliderChange} /> <Input
                                className="mb-2 ml-3"
                                value={value}
                                margin="dense"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                            <Typography gutterBottom>Width should be in centimeter's</Typography>
                            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" className="w-75" value={typeof value2 === 'number' ? value2 : 0} onChange={handleSliderChange2} /> <Input
                                className="mb-2 ml-3"
                                value={value2}
                                margin="dense"
                                onChange={handleInputChange2}
                                onBlur={handleBlur2}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />

                        </div>
                        <h3 className="my-3"><b>Choose a Product</b></h3>
                        <div className="w-75 mr-2 margin-setting">
                            <span className="float-right w-50">
                                <span className="w-50">Location : </span>
                                <select className="w-100" onChange={(e) => setSearch(e.target.value)}>
                                    <option value=''>All</option>
                                    <option value="indoor">Indoor</option>
                                    <option value="outdoor">Outdoor</option>
                                    <option value="both">Both</option>
                                </select>
                            </span>
                        </div>
                        <div className="w-75 mb-4" onChange={(e) => setApplication(e.target.value)}>
                            <span className="w-50">Application : </span>
                            <span className="float-right w-50">
                                <select className="w-100">
                                    <option value=''>All</option>
                                    <option value="rent">Rental/Events</option>
                                    <option value="install">Fixed Installation</option>
                                    <option value="both">Both</option>
                                </select>
                            </span>
                        </div>
                        <div className="w-75 p-2 mt-4">
                            <div className="container" style={{ border: '2px #f95c87 solid' }}>
                                <div className="row" style={{ height: '300px', overflowY: 'scroll' }}>
                                    {led.filter((val) => {
                                        if (search == '') {
                                            return (val)
                                        } else if ((val.location).toLowerCase().includes(search)) {
                                            return (val)
                                        }
                                    }).filter((val) => {
                                        if (application == '') {
                                            return (val)
                                        } else if ((val.application).toLowerCase().includes(application)) {
                                            return (val)
                                        }
                                    }).map((val) => {
                                        return (
                                            <>
                                                <div className={`p-2 ledScreenList w-100 ${age == val.id ? style : ''}`} onClick={() => AutoFunction(val.id)}>
                                                    <div className="col-md-4 py-2">
                                                        <img src={val.image_url} className="img-fluid" />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h3>*{val.name}</h3>
                                                        <small><span>Location: {val.location}</span></small><br />
                                                        <small><span>Application: {val.application}</span></small><br />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 px-4" style={{ height: '100%' }}>
                        <div className="p-auto w-100">
                            <h3 className="pt-2 mt-3 text-white text-center" style={{fontSize:"30px"}}><b>Results</b></h3>
                            <div className="row text-center" style={{ alignSelf: 'center' }}>
                                <div className="col-md-4 p-4 text-white text-center"><p className="text-center pb-2 heading-margin">Resolution</p><span style={{  borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.resolution : '00'}</span></div>
                                <div className="col-md-4 p-4 text-white text-center"><p className="text-center pb-2 heading-margin">Dimensions</p><span style={{  borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.dimension : '00'}</span></div>
                                <div className="col-md-4 p-4 text-white text-center"><p className="text-center pb-2 heading-margin">Diagonal</p><span style={{  borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.diagnol : '00'}</span></div>
                                <div className="col-md-4 p-4 text-white text-center"><p className="text-center pb-2 heading-margin">Aspect Ratio</p><span style={{  borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.aspect_ratio : '00'}</span></div>
                                <div className="col-md-4 p-4 text-white text-center"><p className="text-center pb-2 heading-margin">Surface</p><span style={{  borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.surface : '00'}</span></div>
                                <div className="col-md-4 p-4 text-white text-center"><p className="text-center pb-2 heading-margin">Max. power</p><span style={{  borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.max_power_consumption : '00'}</span></div>
                                <div className="col-md-4 p-4 text-white text-center"><p className="text-center pb-2 heading-margin">Type Power</p><span style={{  borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.type_power_consumption : '00'}</span></div>
                                <div className="col-md-4 p-4 text-white text-center"><p className="text-center pb-2 heading-margin">Length</p><span style={{  borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.length : '00'}</span></div>
                                <div className="col-md-4 p-4 text-white text-center"><p className="text-center pb-2 heading-margin">Weight</p><span style={{  borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.weight : '00'}</span></div>
                                
                                

                                <div className="row" style={{width:"90%", margin:"auto"}}>
                                <div className="col-md-4 p-4 text-white text-center mx-auto" ><p className="text-center pb-2 heading-margin">View distance</p><span style={{ justifySelf:"center", borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.optimal_distance : '00'}</span></div>
                                <div className="col-md-4 p-4 text-white text-center mx-auto" ><p className="text-center pb-2 heading-margin">Led Tiles</p><span style={{ justifySelf:"center", borderRadius: "50%", borderColor: 'white', borderWidth: 2, width: "100px", height: "100px", borderStyle: 'dotted', alignSelf: 'center', padding: 20 }}>{area ? area.led_option.led_tiles : '00'}</span></div>
                                </div>
                                <div className="col-md-12 my-3 d-inline text-center mx-auto">
                                    
                                </div>

                                    <div className="col-md-6 ">
                                        <h3 class="text-white py-2 px-2" style={{ backgroundColor: "#934CFF" }}>Price : <span>{area ? area.led_option.price : '00'}</span></h3>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn " style={{ backgroundColor: "#40cc71", color: "white" }} onClick={getCal}> Calculate Total Price  </button>
                                    </div>
                                </div>
                            
                            {/* <table class="">
                                <tbody>
                                    <tr>
                                        <td><b> Resolution: </b></td>
                                        <td className="float-right w-50">{area ? area.led_option.resolution : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Dimensions: </b></td>
                                        <td className="float-right w-50">{area ? area.dimension : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Diagonal: </b></td>
                                        <td className="float-right w-50">{area ? area.led_option.diagnol : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Aspect ratio: </b></td>
                                        <td className="float-right w-50">{area ? area.led_option.aspect_ratio : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Surface: </b></td>
                                        <td className="float-right w-50">{area ? area.led_option.surface : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Max. power consumption:</b></td>
                                        <td className="float-right w-50">{area ? area.led_option.max_power_consumption : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Type Power Consumption: </b></td>
                                        <td className="float-right w-50">{area ? area.led_option.type_power_consumption : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Length: </b></td>
                                        <td className="float-right w-50">{area ? area.led_option.length : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Weight: </b></td>
                                        <td className="float-right w-50">{area ? area.led_option.weight : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Opt. view distance: </b></td>
                                        <td className="float-right w-50">{area ? area.led_option.optimal_distance : '00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b> Led Tiles: </b></td>
                                        <td className="float-right w-50">{area ? area.led_option.led_tiles : '00'}</td>
                                    </tr>
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
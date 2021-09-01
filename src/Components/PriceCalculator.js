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
    const [value, setValue] = React.useState(100);
    const [value2, setValue2] = React.useState(100);
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
        
        if(age !== ''){
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
    

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        
    };
    const handleSliderChange2 = (event, newValue) => {
        setValue2(newValue);
        
        
    };
    const handleInputChange =  (event) => {
        
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        if(age !== ''){
            
            const { data: response } = axios.post(`https://api.woofics.com/api/area`, {
            height: Number(event.target.value),
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
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    const handleInputChange2 =  (event) => {
        setValue2(event.target.value === '' ? '' : Number(event.target.value));
        if(age !== ''){
            const { data: response } = axios.post(`https://api.woofics.com/api/area`, {
            height: value,
            width: Number(event.target.value),
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

            <div className="container-fluid main-cal-parent" style={{ padding: "0px", display: "flex", }}>
                <div className="container-fluid back-image">


                    <div className="row main-row" >
                        <div className="col-1 heading">
                            <h4>Precio</h4>
                            <h1>Calculadora</h1>
                        </div>
                        <div className="col-sm-12 ">
                        <div className="row" style={{ height: '260px', overflowY: 'scroll' }}>
                                    {led.map((val) => {
                                        return (
                                            <>
                                                <div className={`p-2 ledScreenList w-100 ${age == val.id ? style : ''}`} onClick={() => AutoFunction(val.id)}>
                                                    <div className="col-md-4 py-2">
                                                        <img src={val.image_url} className="img-fluid" />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h3>*{val.name}</h3>
                                                        <small><span>Localización: {val.location}</span></small><br />
                                                        <small><span>Solicitud: {val.application}</span></small><br />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    }
                                </div>
                        </div>
                        <div className="col-sm-12">
                   
                            <div className={classes.root} style={{ margin: "auto",textAlign:"center" }}>

                            <Typography gutterBottom>La altura debe estar en centímetros</Typography>
                            
                            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" max={1000} className="w-100" value={typeof value === 'number' ? value : 0} onChange={handleSliderChange} 
                            onChangeCommitted={getCal} /> <Input
                                className="mb-2 ml-3" 
                                value={value}
                                margin="dense"
                                onChange={handleInputChange}
                                
                                max={10000}
                                onBlur={handleBlur}
                                inputProps={{
                                    
                                    step: 10,
                                    min: 0,
                                    max: 10000, 
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                

                                }}
                            />
                            </div>
                        </div>

                        <div className="col-sm-12">
                       
                            <div className={classes.root} style={{ margin: "auto",textAlign:"center" }}>
                                <Typography gutterBottom>El ancho debe estar en centímetros</Typography>
                            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" className="w-100" max={1000} value={typeof value2 === 'number' ? value2 : 0} onChange={handleSliderChange2} 
                            onChangeCommitted={getCal}  /> <Input
                                className="mb-2 ml-3"
                                value={value2}
                                margin="dense"
                                max={10000}
                                onChange={handleInputChange2}
                                onBlur={handleBlur2}
                                inputProps={{
                                    
                                    step: 10,
                                    min: 0,
                                    max: 10000,
                                    
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                            </div>
                        </div>

                        


                    </div>
                </div>

                {/* for result */}

                <div className="container-fluid result-back-image">


                    <div className="row main-row" >
                        <div className="col-1 heading">
                            <h4></h4>
                            <h1>Resultado</h1>
                        </div>

                        <div className="main-parent" style={{display:"flex",justifyContent:"space-between", flexWrap:"wrap",alignItems:"center"}}>
                            <div className="col-xl-6 col-6" >
                                <h1 className="result-heading">Resolución</h1>
                                <div class="circular" style={{margin:"auto"}}>
                                    <div class="inner"></div>
                                    <div class="outer"></div>
                                    <div class="numb">
                                    {area ? area.led_option.resolution : '00'}
                                </div>
                                    <div class="circle">
                                        <div class="dot">
                                            <span></span>
                                        </div>
                                        <div class="bar left">
                                            <div class="progress"></div>
                                        </div>
                                        <div class="bar right">
                                            <div class="progress"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-6" style={{}}>
                            <h1 className="result-heading">Superficie</h1>
                                <div class="circular" style={{margin:"auto"}}>
                                    <div class="inner"></div>
                                    <div class="outer"></div>
                                    <div class="numb">
                                    {area ? area.led_option.surface : '00'}
                                </div>
                                    <div class="circle">
                                        <div class="dot">
                                            <span></span>
                                        </div>
                                        <div class="bar left">
                                            <div class="progress"></div>
                                        </div>
                                        <div class="bar right">
                                            <div class="progress"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-6" >
                            <h1 className="result-heading">Máximo poder</h1>
                                <div class="circular" style={{margin:"auto"}}>
                                    <div class="inner"></div>
                                    <div class="outer"></div>
                                    <div class="numb">
                                    {area ? area.led_option.max_power_consumption : '00'}
                                </div>
                                    <div class="circle">
                                        <div class="dot">
                                            <span></span>
                                        </div>
                                        <div class="bar left">
                                            <div class="progress"></div>
                                        </div>
                                        <div class="bar right">
                                            <div class="progress"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-6" style={{}}>
                            <h1 className="result-heading">Tipo de Potencia</h1>
                                <div class="circular" style={{margin:"auto"}}>
                                    <div class="inner"></div>
                                    <div class="outer"></div>
                                    <div class="numb">
                                    {area ? area.led_option.type_power_consumption : '00'}
                                </div>
                                    <div class="circle">
                                        <div class="dot">
                                            <span></span>
                                        </div>
                                        <div class="bar left">
                                            <div class="progress"></div>
                                        </div>
                                        <div class="bar right">
                                            <div class="progress"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-6" >
                            <h1 className="result-heading">Larga</h1>
                                <div class="circular" style={{margin:"auto"}}>
                                    <div class="inner"></div>
                                    <div class="outer"></div>
                                    <div class="numb">
                                    {area ? area.led_option.length : '00'}
                                </div>
                                    <div class="circle">
                                        <div class="dot">
                                            <span></span>
                                        </div>
                                        <div class="bar left">
                                            <div class="progress"></div>
                                        </div>
                                        <div class="bar right">
                                            <div class="progress"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-6" style={{}}>
                            <h1 className="result-heading">Peso</h1>
                                <div class="circular" style={{margin:"auto"}}>
                                    <div class="inner"></div>
                                    <div class="outer"></div>
                                    <div class="numb">
                                    {area ? area.led_option.weight : '00'}
                                </div>
                                    <div class="circle">
                                        <div class="dot">
                                            <span></span>
                                        </div>
                                        <div class="bar left">
                                            <div class="progress"></div>
                                        </div>
                                        <div class="bar right">
                                            <div class="progress"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-xl-12 calculate-button">
                                <button type="submit">
                                    Calculate Total Price
                                </button>
                            </div> */}
                            <div className="col-xl-12 final-price">
                                <span className="price">Precio: </span>
                                <span className="value">{area ? area.led_option.price : '00'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}
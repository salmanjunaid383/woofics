import '../Components/stazcal.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});


export default function StazCal() {

    const classes = useStyles();
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const numb = document.querySelector(".numb");
    let counter = 0;
    setInterval(() => {
        if (counter == 100) {
            clearInterval();
        }
        //   else{
        //     counter+=1;
        //     numb.textContent = counter + "%";
        //   }
    }, 80);

    return (
        <>
            <div className="container-fluid main-cal-parent" style={{ padding: "0px", display: "flex" }}>
                <div className="container-fluid back-image">


                    <div className="row main-row" >
                        <div className="col-1 heading">
                            <h4>Precio</h4>
                            <h1>Calculadora</h1>
                        </div>
                        <div className="col-sm-12 for-vid">

                        </div>
                        <div className="col-sm-12">
                            <div className="price-heading">
                                <div className="heading">
                                Precio
                        </div>
                                <div className="value">
                                    $1,000,000
                        </div>
                            </div>
                            <div className={classes.root} style={{ margin: "auto" }}>
                                <Typography id="continuous-slider" gutterBottom>
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>

                        

                        <div className="col-sm-12">
                            <div className="price-heading">
                                <div className="heading">
                                Precio
                        </div>
                                <div className="value">
                                    $1,000,000
                        </div>
                            </div>
                            <div className={classes.root} style={{ margin: "auto" }}>
                                <Typography id="continuous-slider" gutterBottom>
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="price-heading">
                                <div className="heading">
                                    Precio
                        </div>
                                <div className="value">
                                    $1,000,000
                        </div>
                            </div>
                            <div className={classes.root} style={{ margin: "auto" }}>
                                <Typography id="continuous-slider" gutterBottom>
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
                                    </Grid>
                                </Grid>
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
                                        0%
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
                                        0%
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
                                        0%
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
                            <h1 className="result-heading">Tipo de potencia</h1>
                                <div class="circular" style={{margin:"auto"}}>
                                    <div class="inner"></div>
                                    <div class="outer"></div>
                                    <div class="numb">
                                        0%
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
                                        0%
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
                                        0%
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
                            <div className="col-xl-12 calculate-button">
                                <button type="submit">
                                Calcular Precio Total
                                </button>
                            </div>
                            <div className="col-xl-12 final-price">
                                <span className="price">Precio: </span>
                                <span className="value">$1200</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
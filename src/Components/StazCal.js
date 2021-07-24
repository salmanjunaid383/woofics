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
    return (
        <>
            <div className="container-fluid back-image">

                    
                <div className="row main-row" >
                    <div className="col-1 heading">
                        <h4>Price</h4>
                        <h1>Calculator</h1>
                    </div>
                    <div className="col-sm-12 for-vid">

                    </div>
                    <div className="col-sm-12">
                        <div className="price-heading">
                            <div className="heading">
                                Price
                        </div>
                            <div className="value">
                                $1,000,000
                        </div>
                        </div>
                        <div className={classes.root} style={{margin:"auto"}}> 
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
                                Price
                        </div>
                            <div className="value">
                                $1,000,000
                        </div>
                        </div>
                        <div className={classes.root} style={{margin:"auto"}}> 
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
                                Price
                        </div>
                            <div className="value">
                                $1,000,000
                        </div>
                        </div>
                        <div className={classes.root} style={{margin:"auto"}}> 
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
                                Price
                        </div>
                            <div className="value">
                                $1,000,000
                        </div>
                        </div>
                        <div className={classes.root} style={{margin:"auto"}}> 
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
                                Price
                        </div>
                            <div className="value">
                                $1,000,000
                        </div>
                        </div>
                        <div className={classes.root} style={{margin:"auto"}}> 
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

        </>
    )
}
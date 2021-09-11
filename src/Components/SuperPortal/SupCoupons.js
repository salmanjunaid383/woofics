import React, { useState } from "react";
import { useHistory  } from 'react-router-dom'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import StazBar from './Stazbar'
import CustomAdminAuth from "../CustomAdminAuth";





const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function SupCoupons() {
    CustomAdminAuth();
    const history = useHistory()
    const classes = useStyles();





    
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [phase, setPhase] = useState('');
    const [coupontype, setCoupontype] = useState('');
    const [rate, setRate] = useState('');
    const [wait, setwait] = useState('Add Coupon');
    const [disable, setdisable] = useState('disabled');





    function sendQuote(e) {
        e.preventDefault();

        if (coupontype == "percentage" && rate > 99) {
            alert('The Percentage discount can not be grater then 100%')
        } else if (coupontype == "flat" && rate < 0) {
            alert('The Flat discount can not be less then 0')
        } else {
            setwait('Please wait...')
            const response = axios.post(`https://api.woofics.com/api/discount_coupons`, {
                discount_type: phase,
                discount_discription: description,
                rate: rate,
                coupon_type: coupontype,
                expiry_date: date
            },{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              })
                .then((response) => {
                    setwait('Add Coupon')
                    history.push('/couponslist')
                }, (Error) => {
                    setwait('Add Coupon')
                    
                });
        }
    }

    function StyledRadio(props) {
        const classes = useStyles();

        return (
            <Radio
                className={classes.root} percentage
                disableRipple
                color="default"
                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
                {...props}
            />
        );
    }



    function label1(){
        document.getElementById("label1").style.color="black";
        document.getElementById("label2").style.color="grey";
    }
    function label2(){
        document.getElementById("label1").style.color="grey";
        document.getElementById("label2").style.color="black";
    }
    function label3(){
        document.getElementById("label3").style.color="black";
        document.getElementById("label4").style.color="grey";
    }
    function label4(){
        document.getElementById("label3").style.color="grey";
        document.getElementById("label4").style.color="black";
    }
   

    return (
        <>

            <div className="d-sm-flex">
                <StazBar></StazBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    
                    

                   <div className="page-wrapper bg-light">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="text-left col-lg-12 col-xlg-12 col-md-12 mx-auto d-md-block d-none">
                                    <i className="fas fa-chevron-left fa-2x" onClick={() => history.goBack()} style={{ cursor: 'pointer' }}></i>
                                </div>
                                <div className="col-lg-8 col-xlg-9 col-md-12 mx-auto">
                                    <div className="">
                                        <div className="">
                                            <form className="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row mt-5">
                                                    <div className="col-md-6  px-2 w-100 p-0 ">
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend">Coupon Type</FormLabel>
                                                            <RadioGroup defaultValue="two-phase" className="d-inline" aria-label="phase" name="customized-radios">
                                                                <FormControlLabel id="label1" value="feedback" onChange={(e) => setPhase(e.target.value)} onClick={label1} control={<StyledRadio />} label="Feedback" />
                                                                <FormControlLabel id="label2" value="Promotional Sale" onChange={(e) => setPhase(e.target.value)} onClick={label2} control={<StyledRadio />} label="Promotional Sale" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                    <div className="col-md-6  px-2 w-100 p-0 ">
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend">Tipo De Descuento</FormLabel>
                                                            <RadioGroup defaultValue="two-phase" className="d-inline" aria-label="phase" name="customized-radios">
                                                                <FormControlLabel id="label3" value="percentage" onChange={(e) => setCoupontype(e.target.value)} onClick={label3} control={<StyledRadio />} label="Percentage" />
                                                                <FormControlLabel id="label4" value="flat" onChange={(e) => setCoupontype(e.target.value)} onClick={label4} control={<StyledRadio />} label="Flat" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                    <div className="col-md-6 text-center px-2 w-100 p-0 my-4">
                                                        <TextField
                                                            placeholder="Discount Rate"
                                                            id="standard-number"
                                                            fullWidth
                                                            label="Discount Rate"
                                                            type="number"
                                                            onChange={(e) => setRate(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        {coupontype == "percentage" && rate > 99 ?
                                                            <p className="text-danger">El descuento porcentual de lata no debe ser superior al 100% !</p>
                                                            : ''}
                                                        {coupontype == "flat" && rate < 0 ?
                                                            <p className="text-danger">¡El descuento Flat no puede ser inferior a 0!</p>
                                                            : ''}
                                                    </div>
                                                    <div className="col-md-6 text-center px-2 w-100 p-0 my-4">
                                                        <TextField
                                                            id="standard-number"
                                                            fullWidth
                                                            label="Expiry Date"
                                                            type="date"
                                                            onChange={(e) => setDate(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label className="col-md-12 p-0">Descripción Del Descuento</label>
                                                        <div className="col-md-12 border-bottom p-0">
                                                            <textarea rows="4" className="form-control p-0 border-0" placeholder="Add Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group mb-4 mt-4">
                                                    <div className="col-sm-12 text-center">
                                                        <button className={`btn text-white ${description == '' || date == '' || phase == '' || coupontype == '' || rate == '' ? disable : ''}`} style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={sendQuote}>{wait}</button>
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


        </>
    );
}


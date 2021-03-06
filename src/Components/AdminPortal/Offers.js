import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Sidebar'

import jwt_decode from 'jwt-decode'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));




export default function Offers() {
    // CustomProviderAuth();
    const history = useHistory()
    const classes = useStyles();

    const [description, setDescription] = useState('');
    const [comments, setcomments] = useState('');
    const [price, setprice] = useState('');
    const [disable, setdisable] = useState('disabled');
    const [offer, setoffer] = useState('Send Offer');
    //token decode
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    const [serviceCharge, setserviceCharge] = useState([]);


    const { oid } = useParams()

    useEffect(() => {
        getProviderCharge();
    },[])

    function sendQuote(e) {
        e.preventDefault();
        // setoffer('Please wait...')
        
        const {data: response1} = axios.post('https://api.woofics.com/api/link_card/'+decoded.sub,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          }).
        then((response1) => {
            if(response1.data === 0){
                alert("Please link your stripe account with woofics. You can link your card by going in to the profile section by clicking on the profile image");
            }
            else{
                if(window.confirm("Are you sure you want to send this offer, you will be charged "+serviceCharge.charge+"??? for this offer")){
                    if(window.confirm("Can you please confirm again")){
                        const response = axios.post(`https://api.woofics.com/api/offer`, {
                            description: description,
                            time: comments,
                            service_provider_id: decoded.sub,
                            price: price,
                            client_id: oid
                        },{
                            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
                          })
                            .then((response) => {
                                setoffer('Send Offer')
                                setOpenpop(true);
                                setTimeout(() => {
                                    history.push("/providerchat");
                                }, 2000);
                            }, (Error) => {
                                // sucess open popover
                                setOpenpop2(true);
                                
                            });
                    }
                    else{

                    }
                }
                else{

                }
            }
        },(Error) => {
            
        })
        

    }
    function getProviderCharge()
    {
        const { data: response } = axios.get(`https://api.woofics.com/api/service_provider_charge`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                if(response.data[0]==null)
                {
                    setserviceCharge("sorry no service data found");
                }
                else
                {
                    setserviceCharge(response.data[0])
                }
                
                
            }, (Error) => {
                
            });
    }




     //........... sucess open popover
    const [openpop, setOpenpop] = React.useState(false);
    const handleClosepop = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenpop(false);
    };


    const [openpop2, setOpenpop2] = React.useState(false);
    const handleClosepop2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenpop2(false);
    };



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
    const theme = useTheme();

    return (
        <>


            <div className="d-sm-flex">

                <Sidebar></Sidebar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    


                   <div className="page-wrapper bg-light">

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-8 col-xlg-9 col-md-12 mx-auto">
                                    <div className="card">
                                        <div className="card-body">
                                            <form className="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label className="col-md-12 p-0">Descripci??n</label>
                                                        <div className="col-md-12 border-bottom p-0">
                                                            <textarea rows="4" className="form-control p-0 border-0" placeholder="Add Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            onChange={(e) => setcomments(e.target.value)}
                                                            id="standard-textarea"
                                                            label="Days"
                                                            placeholder="Delivery Days  "
                                                            multiline
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }} />                                                </div>
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            id="standard-number"
                                                            placeholder="Service Quotation"
                                                            fullWidth
                                                            label="Price"
                                                            type="number"
                                                            onChange={(e) => setprice(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group mb-4 mt-4">
                                                    <div className="col-sm-12 text-center">
                                                        <button className={`btn text-white ${description == '' || price == '' ? disable : ''}`} style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={sendQuote}>{offer}</button>
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
                        open={openpop2}
                        autoHideDuration={3000}
                        onClose={handleClosepop2}
                        message="Please fill all input feilds!"
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosepop2}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
               
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={openpop}
                    autoHideDuration={3000}
                    onClose={handleClosepop}
                    message="Offer sent!" 
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



        </>
    );
}


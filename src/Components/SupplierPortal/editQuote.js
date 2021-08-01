import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import SideBar from './Sidebar';

import CustomSupplierAuth from "../CustomSupplierAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function Quote() {
    CustomSupplierAuth();
    const history = useHistory()
    // const classes = useStyles();

    const [description, setDescription] = useState('');
    const [comments, setcomments] = useState('');
    const [price, setprice] = useState('');
    const [date, setDate] = useState('');
    const [phase, setPhase] = useState();
    const [progress, setProgress] = useState('Send Quotation');
    const [disable, setDisable] = useState('disabled');

    const[quotationData,setquotationData]=useState([]);

    //token decode
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    var qid = localStorage.getItem("qid");
    const { serrid } = useParams()

    const [service, setservice] = useState([]);
    const [servicet, setservicet] = useState([]);
    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/quotation/${serrid}`)
            .then((response) => {
                setquotationData(response.data[0])
                setDescription(response.data[0].description)
                setcomments(response.data[0].extra_comments)
                setprice(response.data[0].price)
                setDate(response.data[0].delivery_days)
                
                const { data: response2 } = axios.get(`https://api.woofics.com/api/form_details/`+response.data[0].form_id)
                .then((response) => {
                    setservice(response.data.form)
                    setservicet(response.data.package)
                    

                }, (Error) => {
                    
                });

            }, (Error) => {
                
            });

        cardStatus();
        
            
    }, [])

    function cardStatus(){
        const {data : response} = axios.post('https://api.woofics.com/api/purchase_lead', {
                    user_id : decoded.sub,
                    form_id: serrid
                })
                .then((response) => {
                    if(response.data===0){
                        
                        history.push("/quotation");
                    }
                  }, (Error) => {     
                    
                  });
    }

    // 
    // 
    // 

    function sendQuote(e) {
        e.preventDefault();
        alert("Are you sure you want to send this quotation?")
        setProgress('Loading...')
       
            const response = axios.put(`https://api.woofics.com/api/supplier_quotation/`+quotationData.id, {
                description: description,
                extra_comments: comments,
                form_id: quotationData.form_id,
                supplier_id: decoded.sub,
                price: price,
                status: 'pending',
                delivery_days: date
            })
                .then((response) => {
                    setProgress('Send Quotation')
                    localStorage.removeItem('qid')
                    history.push('/sentquotation')
                }, (Error) => {
                    //  
                    setOpenn(true);
                    
                });
        
    }


    const [blog, setBlog] = useState([])

    function getOptions() {
        const { data: response } = axios.get(`https://api.woofics.com/api/payment_phase`)
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                
            });
    }

    useEffect(() => {
        getOptions()
    }, [])


    const [openn, setOpenn] = React.useState(false);
    const [openn2, setOpenn2] = React.useState(false);

    const handleClosee = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenn(false);
    };

    const handleClosee2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenn2(false);
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
    const classes = useStyles();
 
    return (
        <>

            <div className="d-sm-flex">

                <SideBar></SideBar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">

                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-8 col-xlg-9 col-md-12 mx-auto">
                                    <div class="card">
                                        <div class="card-body">
                                            <form class="form-horizontal form-material" style={{ textAlign: 'left' }}>
                                                <div className="row">
                                                    <div className="w-100">
                                                        <h3 className="w-100 text-center">Service Details</h3>
                                                        <table  id="for-table-setting" class="table table-hover">
                                                            <tbody id="data-row">
                                                                <tr>
                                                                    <td>Package Charge</td>
                                                                    <td>{servicet.charge}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Package Name</td>
                                                                    <td>{servicet.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Name</td>
                                                                    <td>{service.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Email</td>
                                                                    <td>{service.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Adverse Weather</td>
                                                                    <td>{service.adverse_weather}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Buy</td>
                                                                    <td>{service.buy}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Carcass Material</td>
                                                                    <td>{service.carcass_material}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Comments</td>
                                                                    <td>{service.comments}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Company</td>
                                                                    <td>{service.company}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Contact</td>
                                                                    <td>{service.contact}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Control System</td>
                                                                    <td>{service.control_system}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Sustomer Type</td>
                                                                    <td>{service.customer_type}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Delivery Time</td>
                                                                    <td>{service.delivery_time}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Description</td>
                                                                    <td>{service.description}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Documents</td>
                                                                    <td>{service.documents}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Entity</td>
                                                                    <td>{service.entity}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Fly Cases</td>
                                                                    <td>{service.fly_cases}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Indoor</td>
                                                                    <td>{service.indoor}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Installation</td>
                                                                    <td>{service.installation}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Model</td>
                                                                    <td>{service.model}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Postal Code</td>
                                                                    <td>{service.postal_code}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Screen Access</td>
                                                                    <td>{service.screen_access}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Screen Height</td>
                                                                    <td>{service.screen_height}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Screen Orientation</td>
                                                                    <td>{service.screen_orientation}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Screen Use</td>
                                                                    <td>{service.screen_use}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Screen Width</td>
                                                                    <td>{service.screen_width}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Sector</td>
                                                                    <td>{service.sector}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Sensor</td>
                                                                    <td>{service.sensor}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Shipping</td>
                                                                    <td>{service.shipping}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Structure</td>
                                                                    <td>{service.structure}</td>
                                                                </tr>


                                                                <tr>
                                                                    <td>Visual Distance</td>
                                                                    <td>{service.visual_distance}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Warranty</td>
                                                                    <td>{service.warranty}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>


                                                    </div> <hr />
                                                    <div className="col-md-12">
                                                        <label class="col-md-12 pt-3">Description</label>
                                                        <div class="col-md-12 border-bottom p-0">
                                                            <textarea rows="4" class="form-control p-0 border-0" placeholder={quotationData.description}  onChange={(e) => setDescription(e.target.value)}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            onChange={(e) => setcomments(e.target.value)}
                                                            id="standard-textarea"
                                                            label="Comments"
                                                            placeholder={quotationData.extra_comments}
                                                            
                                                            multiline
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }} />                                                </div>
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            id="standard-number"
                                                            placeholder={quotationData.price}
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
                                                <div className="row mt-5">
                                                    <div className="col-md-6 text-center px-2 w-100 p-0">
                                                        <TextField
                                                            placeholder={quotationData.delivery_days}
                                                            id="standard-number"
                                                            fullWidth
                                                            
                                                            label="Delivery Days"
                                                            type="number"
                                                            onChange={(e) => setDate(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-6  px-2 w-100 p-0 ">
                                                      
                                                    </div>
                                                </div>
                                                <div class="form-group mb-4 mt-4">
                                                    <div class="col-sm-12 text-center">
                                                        <button class="btn text-white" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={sendQuote}>Update Quotation</button>
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


import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios';
import Sidebar from './Sidebar'

import jwt_decode from 'jwt-decode';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import CustomProviderAuth from "../CustomProviderAuth";
import TextField from '@material-ui/core/TextField';
import { loadStripe } from "@stripe/stripe-js";
const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function ProviderLedger() {
    CustomProviderAuth();
    let history = useHistory();

    const [form, setForm] = useState([]);
    const [article, setArticle] = useState([]);

    const [check, setcheck] = useState('false')
    const[providerName,setProviderName]= useState('')
    const[description,setDescription]=useState('')
    const[currency,setCurrency]=useState('')
    const[amount,setAmount]=useState(0)
    const[userId,setUserId]=useState(0)
    const[totalAmount,setTotalAmount]=useState(0)



    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function getServiceledger() {

        const { data: response } = axios.get(`https://api.woofics.com/api/service_provider_balance/${decoded.sub}`)
            .then((response) => {
                setUserId(decoded.sub)
                setArticle(response.data[0])
                setTotalAmount(response.data.balance)
                console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }
    useEffect(() => {
        getServiceledger();
    }, [])
    const stripePromise = loadStripe("pk_test_51IIWuIApAAjWKIoNrjwEcTyuCykDQVAqXWIBpwsNt1trDbRXD9n6uKPRvZlDKdQLNyIRiKaSAwpPgbUAjhEkqOJ400HEEcjDh1");

    async function stripePayment(e){
        console.log(currency,description,amount,userId);
        e.preventDefault();
        const stripe = await stripePromise;
        const { data: response } = axios.post(`https://api.woofics.com/api/stripe_payment`, {         
            name: providerName,
            description: description,
            currency: 'usd',
            amount: amount,
            user_id: userId
        })
            .then((response) => {
                stripe.redirectToCheckout({
                    sessionId: response.data.session_id,
                });
            }, (Error) => {
                console.log(Error);
            });
    }


    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();

    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }


    return (
        <>

            <div className="d-sm-flex">
                <Sidebar></Sidebar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    




                    <div className="page-wrapper bg-light">
                        <div class="container">
                            <div id="blog" class="row">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="d-md-flex mb-3">
                                                <h1 className="box-title h1 mb-0 text-center mx-auto">Libro Mayor</h1>
                                            </div>


                                            <div class="form-horizontal form-material" style={{ textAlign: 'left', transition:"0.3s"}}>
                                                        <div className="row mt-4 mx-auto">
                                                            <div className="col-lg-8 col-xlg-9 col-md-12 mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                            <div class="card">
                                                            <div class="card-body">
                                                            <div className="row mt-4">
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setProviderName(e.target.value)}
                                                                    label="Name"
                                                                    placeholder="Name"

                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                    label="Description"
                                                                    placeholder="Description"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>  
                                                                
                                                                
                                                                    
                                                            </div>
                                                            <div className="row mt-5">
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setCurrency(e.target.value)}
                                                                    label="Currency"
                                                                    placeholder="Currency"
                                                                    disabled="true"
                                                                    value = "usd"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                            <div className="col-md-6 text-center px-2 w-100 p-0">
                                                            <TextField
                                                                    id="standard-textarea"
                                                                    onChange={(e) => setAmount(e.target.value)}
                                                                    label="Amount"
                                                                    placeholder="Amount"
                                                                    multiline
                                                                    fullWidth
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </div>
                                                                    
                                                                    
                                                            </div>
                                                            <div class="mb-4 mt-4 text-center mx-auto">
                                                                    <div class="col-sm-12 text-center">
                                                                    <button class={`btn text-white mt-2 greenbtn text-white `}  onClick={(e) => stripePayment(e)}>Factura De Pago</button>
                                                                    </div>
                                                            </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 mb-4 mt-4 w-100 text-center mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                                <div class="col-sm-12 text-center">
                                                                    {/* <button class={`btn text-white greenbtn text-white `}  onClick={() => supplierRental()}>Add</button> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                            </div>

                                            




                                            <div className="table-responsive">
                                                <table  id="for-table-setting" className="table no-wrap" style={{tableLayout:"fixed", width:"100%"}}>
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white text-center">#</th>
                                                            <th className="border-top-0 text-white text-center">EQUILIBRIO</th>
                                                            <th className="border-top-0 text-white text-center">CREADO EN</th>
                                                            {/* <th></th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row">
                                                        {
                                                            
                                                            article == '' ? <h3 className="mt-5 text-center"> Nada Que Mostrar!</h3> :
                                                                article.map((val, id) => {
                                                                    return (
                                                                        <>
                                                                            <tr>
                                                                                <td className="txt-oflo text-center">{returnIndex()}</td>
                                                                                <td className="txt-oflo text-center">{val.balance}</td>
                                                                                <td className="txt-oflo text-center">{(val.created_at).slice(0,10)}</td>
                                                                                {/* <td></td> */}
                                                                                {/* <td className="text-danger text-center"><button class={val.locked !== 0 ? "btn text-white btn-danger" : "btn text-white btn-success"} value={val.id} onClick={(e) => history.push(`/ledgerview/${val.id}`)}>View more</button></td> */}
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                })}
                                                                {
                                                            article !== '' ?
                                                            <tr style={{marginTop:'10px'}}><td className="txt-oflo text-center">Cantidad Total : {totalAmount} $ </td>
                                                                <td className="txt-oflo text-center"></td>
                                                                <td className="txt-oflo text-center"><button class={/*val.locked !== 0 ?*/"btn text-white btn-success"}  onClick={() => setcheck('true')}>Generar Factura</button></td>
                                                                {/* <td className="txt-oflo text-center"></td> */}
                                                                
                                                            </tr> : <h3></h3> 
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 gap10"></div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

        </>
    );
}


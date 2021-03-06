import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

import axios from 'axios';
import Sidebar from './Sidebar'

import jwt_decode from 'jwt-decode';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function ProviderLedger() {
    // CustomProviderAuth();
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

        const { data: response } = axios.get(`https://api.woofics.com/api/service_provider_balance/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setUserId(decoded.sub)
                setArticle(response.data[0])
                setTotalAmount(response.data.balance)
                
            }, (Error) => {
                
            });
    }
    useEffect(() => {
        getServiceledger();
    }, [])
    // const stripePromise = loadStripe("pk_test_51IIWuIApAAjWKIoNrjwEcTyuCykDQVAqXWIBpwsNt1trDbRXD9n6uKPRvZlDKdQLNyIRiKaSAwpPgbUAjhEkqOJ400HEEcjDh1");

    // async function stripePayment(e){
        
    //     e.preventDefault();
    //     const stripe = await stripePromise;
    //     const { data: response } = axios.post(`https://api.woofics.com/api/stripe_payment`, {         
    //         name: providerName,
    //         description: description,
    //         currency: 'usd',
    //         amount: amount,
    //         user_id: userId
    //     })
    //         .then((response) => {
    //             stripe.redirectToCheckout({
    //                 sessionId: response.data.session_id,
    //             });
    //         }, (Error) => {
                
    //         });
    // }


    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();

    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }
    function debtFunc(x)
    {
        let y = x*-1
        return y;
    }


    return (
        <>

            <div className="d-sm-flex">
                <Sidebar></Sidebar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    




                    <div className="page-wrapper bg-light">
                        <div className="container">
                            <div id="blog" className="row">
                                <div className="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="d-md-flex mb-3">
                                                <h1 className=" h1 mb-0 text-center mx-auto">Libro Mayor</h1>
                                            </div>


                                            <div className="form-horizontal form-material" style={{ textAlign: 'left', transition:"0.3s"}}>
                                                        <div className="row mt-4 mx-auto">
                                                            <div className="col-lg-8 col-xlg-9 col-md-12 mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                            <div className="card">
                                                            <div className="card-body">
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
                                                            <div className="mb-4 mt-4 text-center mx-auto">
                                                                    <div className="col-sm-12 text-center">
                                                                    <button className={`btn text-white mt-2 greenbtn text-white `}  >Factura De Pago</button>
                                                                    </div>
                                                            </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 mb-4 mt-4 w-100 text-center mx-auto" style={{ display: check === 'true' ? 'block' : 'none' }}>
                                                                <div className="col-sm-12 text-center">
                                                                    {/* <button class={`btn text-white greenbtn text-white `}  onClick={() => supplierRental()}>Add</button> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                            </div>

                                            




                                            <div className="row">
                                                <div className="col-6" >
                                            <div className="table-responsive salman-table-change">
                                                <table  id="for-table-setting" className="table no-wrap" style={{tableLayout:"fixed", width:"100%"}}>
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            
                                                            <th className="border-top-0 text-white text-center">Deuda</th>
                                                            <th className="border-top-0 text-white text-center" >CREADO EN</th>
                                                            {/* <th className="border-top-0 text-white text-center"></th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row">
                                                        {

                                                            article == '' ? <h3 className="mt-5"> Nada Que Mostrar!</h3> :
                                                                article.map((val, id) => {
                                                                    if(val.balance<0)
                                                                    {
                                                                        
                                                                        return (
                                                                            <>
                                                                                <tr>
                                                                                    <td className="txt-oflo text-center">{debtFunc(val.balance)}</td>
                                                                                    <td className="txt-oflo text-center" style={{borderRadius:'0px'}}>{(val.created_at).slice(0, 10)}</td>
                                                                                    {/* <td className="text-success text-center"></td> */}
                                                                                </tr>
                                                                            </>
                                                                        )
                                                                    }
                                                                    
                                                                })             
                                                        }
                                                        {
                                                            article !== '' ?
                                                            <tr style={{marginTop:'10px'}}><td className="txt-oflo text-center">Cantidad Total : {totalAmount} ??? </td>
                                                                <td className="txt-oflo text-center"></td>
                                                                
                                                                
                                                            </tr> : <h3></h3> 
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            </div>
                                            <div className="col-6" >
                                            <div className="table-responsive salman-table-change">
                                                <table  id="for-table-setting" className="table no-wrap" style={{tableLayout:"fixed", width:"100%"}}>
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            
                                                            <th className="border-top-0 text-white text-center" >Cr??dito</th>
                                                            <th className="border-top-0 text-white text-center">CREADO EN</th>
                                                            {/* <th className="border-top-0 text-white text-center"></th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row">
                                                    {

                                                        article == '' ? <h3 className="mt-5"> Nada Que Mostrar!</h3> :
                                                            article.map((val, id) => {
                                                                if(val.balance>0)
                                                                {
                                                                    
                                                                    return (
                                                                        <>
                                                                            <tr>
                                                                                <td className="txt-oflo text-center">{val.balance}</td>
                                                                                <td className="txt-oflo text-center" style={{borderRadius:'0px'}}>{(val.created_at).slice(0, 10)}</td>
                                                                                {/* <td className="text-success text-center"></td> */}
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                }
                                                                
                                                            })             
                                                        }
                                                        {
                                                            article !== '' ?
                                                            <tr style={{marginTop:'10px'}}><td className="txt-oflo text-center"></td>
                                                                <td className="txt-oflo text-center"></td>
                                                                
                                                                
                                                            </tr> : <h3></h3> 
                                                        }
                                                    </tbody>
                                                    </table>
                                                    </div>
                                            </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 gap10"></div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

        </>
    );
}


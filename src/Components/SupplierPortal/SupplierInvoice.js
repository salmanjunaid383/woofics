import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import SideBar from './Sidebar';
import axios from 'axios';
import ProBar from '../AdminPortal/Sidebar'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import jwt_decode from 'jwt-decode'
import CustomAuth from "../CustomAuth";



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function SupplierLedger() {
    // CustomAuth();
    let history = useHistory();
    const [form, setForm] = useState([]);
    const [article, setArticle] = useState([]);
    const [check, setcheck] = useState('false')

    // "name": "supplier",
	// "description": "description",
	// "currency": "usd",
	// "amount": 50,
	// "user_id": 4
    // const[name,setName]= useState('')
    // const[description,setDescription]=useState('')
    // const[currency,setCurrency]=useState('')
    // const[amount,setAmount]=useState(0)
    // const[userId,setUserId]=useState(0)
    // const[totalAmount,setTotalAmount]=useState(0)

    const[data,setData]=useState([])

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function getInvoice() {

        const { data: response } = axios.get(`https://api.woofics.com/api/show_invoices/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setData(response.data)
                
            }, (Error) => {
                
            });
    }
    useEffect(() => {
        getInvoice();
    }, [])
    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();



    // const stripePromise = loadStripe("pk_test_51IIWuIApAAjWKIoNrjwEcTyuCykDQVAqXWIBpwsNt1trDbRXD9n6uKPRvZlDKdQLNyIRiKaSAwpPgbUAjhEkqOJ400HEEcjDh1");
    // async function stripePayment(e){
    //     
    //     e.preventDefault();
    //     const stripe = await stripePromise;
    //     const { data: response } = axios.post(`https://api.woofics.com/api/stripe_payment`, {         
    //         name: name,
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
    //             
    //         });
    // }
    var adminSideBar;
    var clientSideBar;  
    var providerSideBar;
    var supplierSideBar;
    if(token !== null)
    {
        const role = jwt_decode(localStorage.getItem('user_token'))
                        if (role.role === 'Client') {
                            clientSideBar=true;
                        } else if (role.role === 'ServiceProvider')
                            providerSideBar=true;
                        else if (role.role === 'Supplier') {
                            supplierSideBar=true;
                        } else {
                            adminSideBar=true;
                        }
    }


    return (
        <>

            <div className="d-sm-flex">
            {
                    supplierSideBar ? (
                        <SideBar></SideBar>
                    ) : null
                }
                {
                    providerSideBar ? (
                        <ProBar></ProBar>
                    ) : (null)
                }

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                    
                        <div class="container">
                            <div id="blog" class="row ">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-xl-12">
                                            <h3 className="text-change text-center">Rechnung</h3>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                           
                                            <div className="table-responsive salman-table-change">
                                                <table  id="for-table-setting" className="table no-wrap" style={{tableLayout:"fixed", width:"100%"}}>
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white text-center">ID De Factura</th>
                                                            <th className="border-top-0 text-white text-center">Total</th>
                                                            <th className="border-top-0 text-white text-center">Fecha</th>
                                                            <th></th>
                                                            {/* <th className="border-top-0 text-white text-center"></th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row">
                                                        {
                                                            data == '' ? <h3 className="mt-5"> Nada Que Mostrar!</h3> :
                                                                data.map((val, id) => {
                                                                    return (
                                                                        <>
                                                                            <tr>
                                                                                <td className="txt-oflo text-center">{val.invoice_id}</td>
                                                                                <td className="txt-oflo text-center">{val.total}</td>
                                                                                <td className="txt-oflo text-center">{(val.date).slice(0, 10)}</td>
                                                                                <button type="submit" class="btn btn-info" onClick={() => { history.push(`/invoicedetail/${val.id}`)}}>Detalle</button>
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                })             
                                                        }
                                                      
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 gap10"></div>
                           
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

          
        </>
    );
}


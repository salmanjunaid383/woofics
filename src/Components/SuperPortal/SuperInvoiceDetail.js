import React, { useState, useEffect } from "react";
import { Link, useHistory ,useParams} from 'react-router-dom'
import SideBar from './Stazbar';
import axios from 'axios';
import ProBar from '../AdminPortal/Sidebar'
import CustomAdminAuth from "../CustomAdminAuth";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import logo1 from '../LandingPage/images/woofics-new/WhatsApp-Image-2021-08-25-at-2.43-Copy.png'
import TextField from '@material-ui/core/TextField';
import  './invoice.css';
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
    CustomAuth();
    CustomAdminAuth();
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

    const[invoice,setInvoice]=useState([])
    const[item,setItem]=useState([])
    const[user,setUser]=useState([])

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    const { quid } = useParams()
    function getInvoice() {

        const { data: response } = axios.get(`https://api.woofics.com/api/invoice/${quid}`)
            .then((response) => {
                setInvoice(response.data.invoice)
                setItem(response.data.items);
                setUser(response.data.user)
                console.log(response.data)
                
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

            <div className="d-sm-flex" style={{backgroundColor:"#f6f9fc"}}>
            

                
            <div class="container invoice-container"  style={{padding:"7%"}}>
<div class="row">
    				
					<div class="col-xs-12">
						<div class="grid invoice">
							<div class="grid-body">
								<div class="invoice-title">
									<div class="row">
										<div class="col-xs-12">
											<img src={logo1} alt="" height="35"/>
										</div>
									</div>
									<br></br>
									<div class="row">
										<div class="col-xs-12">
											<h2 style={{color:'blue'}}>invoice<br></br>
											<span class="small">order #{invoice.invoice_id}</span></h2>
										</div>
									</div>
								</div>
								<hr></hr>
								<div class="row">
									<div class="col-xs-6">
                                    <address>
											<strong>Billed to:</strong><br></br>
											<span style={{lineHeight: '18px'}}>{user.first_name} {user.last_name}</span><br></br>
											<span style={{lineHeight: '22px'}}>{user.email}</span><br></br>
                                            <span style={{lineHeight: '22px'}}>P:{user.contact_number}</span>
										</address>
									</div>
									<div class="col-xs-6 text-right">
										<address>
                                        <strong>Order Date:</strong><br></br>
											<span style={{lineHeight: '22px'}}>{(invoice.date)}</span>
                                        </address>
									</div>
								</div>
                                <br></br>
								<div class="row">
									<div class="col-md-12">
										<h3>ORDER SUMMARY</h3>
										<table class="table table-striped">
											<thead>
												<tr class="line">
													<td class="text-center"><strong>Id</strong></td>
													<td class="text-center"><strong>Description</strong></td>
													<td class="text-right"><strong>Amount</strong></td>
													<td class="text-right"><strong>SUBTOTAL</strong></td>
												</tr>
											</thead>
											<tbody>
                                                {
                                                    item.map((val,id) => {
                                                        return (
                                                           <>
                                                           <tr>
                                                           <td class="text-center">{val.id}</td>
                                                           <td class="text-center">{val.description}</td>
                                                           <td class="text-right">€{val.amount}</td>
                                                           <td></td>
                                                           </tr>
                                                           </>
                                                        )
                                                   })
                                                }
                                            
												
												<tr>
													<td colspan="2">
													</td><td class="text-right"><strong>Total</strong></td>
													<td class="text-right"><strong>€{invoice.total}</strong></td>
												</tr>
											</tbody>
										</table>
									</div>									
								</div>
								<div class="row">
									<div class="col-md-12 text-center identity">
										<p style={{fontSize:'10px'}}>Copyright © 2021 Woofic.Com, All Rights Reserved</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
</div>
                        
                           
                              
                        
                   
            </div>

          
        </>
    );
}


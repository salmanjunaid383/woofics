import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import Sidebar from './Sidebar'
import Nav from './Nav'
import './Invoice .css'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js";
import Pusher from 'pusher-js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CustomClientAuth from "../CustomClientAuth";




export default function Help() {
   
    let history = useHistory();

    //Adding Feilds

    const [feild, setfeild] = useState([
        { item: '', description: '', qty: '', price: '' }
    ])


    function handleChange(e, index) {
        const { name, value } = e.target;
        const list = [...feild];
        list[index][name] = value;
        setfeild(list);
        console.log(list);
        const quantity = feild.map(a => parseInt(a.qty))
        setqty(quantity.reduce((a, b) => a + b))

        const result = feild.map(a => parseInt(a.price))
        setTotal(result.reduce((a, b) => a + b) * qty)

    }

    function AddMore() {
        setfeild([...feild, { item: '', description: '', qty: '', price: '' }])
    }

    //Remove Feilds
    function RemoveFeild(index) {
        const list = [...feild];
        list.splice(index, 1);
        setfeild(list)
    }

    const [total, setTotal] = useState([]);
    const [qty, setqty] = useState([]);
    const [advance, setAdvance] = useState('');
    const [remaining, setRemaining] = useState('');



    //Stripe

    const stripePromise = loadStripe("pk_test_51IIWuIApAAjWKIoNrjwEcTyuCykDQVAqXWIBpwsNt1trDbRXD9n6uKPRvZlDKdQLNyIRiKaSAwpPgbUAjhEkqOJ400HEEcjDh1");

    async function Stripe(e) {
        e.preventDefault();
        const stripe = await stripePromise;
        const { data: response } = axios.post(`https://api.woofics.com/api/stripe_payment`, {         
            name: "supplier",
            description: "description",
            currency: "usd",
            amount: 50,
            user_id: 4
        })
            .then((response) => {
                stripe.redirectToCheckout({
                    sessionId: response.data.session_id,
                });
            }, (Error) => {
                console.log(Error);
            });
    }
    

    // const [mxg, setMxg] = useState('');
    // var toke = localStorage.getItem('token').toString()
    // var pusher = new Pusher('f7c71cbabef9234b8101', {
    //     cluster: 'ap1'
    // });

    // var channel = pusher.subscribe(toke);


    // const [open, setOpen] = React.useState(false);

    // useEffect(() => {
    //     channel.bind('my-event', function (data) {
    //         setMxg('New Message : ' + " " + JSON.stringify(data.message).replace(/"([^"]+(?="))"/g, '$1'))
    //         if (JSON.stringify(data.message)) {
    //             setOpen(true);
    //         }
    //     })
    // }, [])

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };



    return (
        <>
            <div className="no-printme">
                <i className="fas fa-chevron-left m-4 " onClick={()=>history.goBack()} style={{cursor:'pointer'}}> Back</i>
            </div>
            <div className="page-wrapper printme mx-5">
                <div className="container px-5 ">
                    <div className=" mx-auto" >
                        <div className="card  mx-auto">
                            <div className="card-header p-4">
                                <img src="assets/plugins/images/woofic.jpeg " className="img-fluid p-0 " style={{ width: '150px' }} />
                                <div className="float-right">
                                    Date: <input className="w-75" type="date" />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row mb-4">
                                    <div className="col-sm-6">
                                        <h5 className="mb-3 h5">From:</h5>
                                        <h3 className="text-dark mb-1"><input placeholder="Your Name" className="w-75" /></h3>
                                        <h3 className="text-dark mb-1"><input placeholder="Your Email" className="w-75" /></h3>
                                        <h3 className="text-dark mb-1"><input placeholder="Your Phone No." className="w-75" /></h3>
                                        <div><textarea placeholder="Your Address" className="w-75"></textarea></div>
                                    </div>
                                    <div className="col-sm-6 ">
                                        <h5 className="mb-3 h5">To:</h5>
                                        <h3 className="text-dark mb-1"><input placeholder="Reciever Name" className="w-75" /></h3>
                                        <h3 className="text-dark mb-1"><input placeholder="Reciever Email" className="w-75" /></h3>
                                        <h3 className="text-dark mb-1"><input placeholder="Reciever Phone No." className="w-75" /></h3>
                                        <div><textarea placeholder="Reciever Address" className="w-75"></textarea></div>
                                    </div>
                                </div>
                                <div className="table-responsive-sm">
                                    <table className="table table-striped ">
                                        <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                            <tr>
                                                <th>Item</th>
                                                <th className="w-25">Description</th>
                                                <th className="center">Quantity</th>
                                                <th className="right">Price</th>
                                                <th className="right"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                feild.map((val, i) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td className="left strong"><input className="w-100" type="text" placeholder="Item" name='item' onChange={e => handleChange(e, i)} value={val.item} /></td>
                                                                <td className="left"><input placeholder="Description" name='description' value={val.description} onChange={e => handleChange(e, i)} /></td>
                                                                <td className="right"><input className="w-75" type="text" name='qty' value={val.qty} onChange={e => handleChange(e, i)} /></td>
                                                                <td className="center">$ <input className="w-75" type="number" name='price' value={val.price} onChange={e => handleChange(e, i)} /></td>
                                                                <td className="right">{feild.length !== 1 && <i className="fa fa-remove p-2 text-center pt-1 bg-dark text-light" onClick={(i) => RemoveFeild()}></i>}</td>
                                                                <td className="right">{feild.length - 1 === i && <i className="fa fa-plus p-2 text-center pt-1 bg-dark text-light" onClick={AddMore}></i>}</td>
                                                            </tr>
                                                        </>
                                                    )

                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-lg-4 col-sm-5">
                                    </div>
                                    <div className="col-lg-4 col-sm-5 ml-auto">
                                        <table className="table table-dark text-white">
                                            <tbody>
                                                <tr>
                                                    <td className="left">
                                                        <strong className="text-white">Total</strong>
                                                    </td>
                                                    <td className="right">$ {total ? total : 0}</td>
                                                </tr>
                                                <tr>
                                                    <td className="left">
                                                        <strong className="text-white">Advance (40%)</strong>
                                                    </td>
                                                    <td className="right">$ {advance ? advance : (Math.round(total * 0.4) * qty)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="left">
                                                        <strong className="text-white">Remaining</strong> </td>
                                                    <td className="right">
                                                        <strong className="text-white">$ {remaining ? remaining : (Math.round(total * 0.4) * qty)}</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-primary mx-2 no-printme" onClick={Stripe}>Pay Invoice</button>
                                    <button className="btn btn-primary mx-2 no-printme" onClick={() => window.print()}>Print/Download PDF</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={mxg}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            /> */}
        </>
    );
}


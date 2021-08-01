import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios';
import StazBar from './Sidebar'

import StarRatings from 'react-star-ratings';
import jwt_decode from 'jwt-decode';

import { makeStyles, useTheme } from '@material-ui/core/styles';


import CustomClientAuth from "../CustomClientAuth";



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function Offers() {
    CustomClientAuth();
    let history = useHistory();

    const [form, setForm] = useState([]);
    const [approved, setApproved] = useState("Confirm Offer");
    const [Load, setLoad] = useState(false);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function Feedback() {
        const res = axios.get(`https://api.woofics.com/api/show_offer_client/`+decoded.sub)
            .then((res) => {
                setForm(res.data)
            }, (error) => {
                
            });

    }

    useEffect(() => {
        Feedback();
    }, [])

    function ConfirmOffer(id) {
        setLoad(true)
        const res = axios.put(`https://api.woofics.com/api/offer_approved/${id}`)
            .then((res) => {
                setLoad(false)
                Feedback()
            }, (error) => {
                setLoad(false)
                
            });

        Feedback()
    }

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();



    return (
        <>

            <div className="d-sm-flex">

                <StazBar></StazBar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    


                    <div className="page-wrapper bg-light">
                        <div class="container">
                            <div id="blog" class="row">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="d-md-flex mb-3">
                                                <h1 className="box-title h1 mb-0 text-center mx-auto">Service Provider's Offers</h1>
                                            </div>

                                            {/* {form == '' ? <h3 className="my-md-5 text-center mx-auto w-100">Nothing to show!</h3> :
                                                form.map((val, id) => {
                                                    return (
                                                        <>
                                                            <div className="container">
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-md-12 mx-auto ">
                                                                        <div class="card overflow-hidden border">
                                                                            <div class="card-content">
                                                                                <div class="card-body cleartfix">
                                                                                    <div class="media align-items-stretch">
                                                                                        <div class="align-self-center">
                                                                                            <i class="icon-pencil primary font-large-2 mr-2"></i>
                                                                                        </div>
                                                                                        <div class="media-body">
                                                                                            <h4 className="text-info">{val.description}</h4>
                                                                                            <h3> <span className=" text-muted">Delivery Days: </span> {val.time}</h3>
                                                                                        </div>
                                                                                        <div class="align-self-center">
                                                                                            <h1>{val.price}<span className="text-muted h4"> € </span></h1>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="float-right mb-3">
                                                                                        <button class="btn marginBottom10 ml-3" style={val.locked == 0 ? { backgroundColor: "red", color: "white" } : { backgroundColor: "rgba(7, 72, 138, 0.71)", color: "white" }} onClick={() => ConfirmOffer(val.id)} >{val.locked == 0 ? 'Cancel' : 'Confirm Offer'}</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })} */}

                                            <div className="container">
                                                <div class="row">

                                                    {form.length == 0 ? <h3 className="my-md-5 text-center mx-auto w-100">Nothing to show!</h3> :
                                                        form.map((val, id) => {
                                                            return (
                                                                <>

                                                                    <div class="col-xl-12 col-md-12 mx-auto shadow p-3 mb-3 " style={{ backgroundColor: "white", border: '3px #f95c87 solid', borderRadius: 10 }}>
                                                                        <div className="row">
                                                                            <div className="col-md-2 text-center"><img src={val.profile_image == "xyz.jpg" ? "https://www.pngfind.com/pngs/m/34-349693_circled-user-icon-transparent-background-username-icon-hd.png" : val.profile_image} className="img-fluid for-pic" style={{ width: 100,height:100,borderRadius: 150 }} /></div>
                                                                            <div className="col-md-5">
                                                                                <h5>{val.description}</h5>
                                                                                <h4>{val.first_name + "" + val.last_name}</h4>
                                                                                <StarRatings
                                                                                    starRatedColor='rgb(230, 67, 47)'
                                                                                    rating={val.rating}
                                                                                    starDimension="15px"
                                                                                    starSpacing="3px"
                                                                                />
                                                                                <p><i className="fa fa-phone pr-2 pt-2 "></i>{val.contact_number}</p>
                                                                                <p><i className="fa fa-envelope pr-2 "></i>{val.email}</p>
                                                                                <p><i className="fa fa-question pr-2 "></i>{val.service}</p>
                                                                            </div>
                                                                            <div className="col-md-5 text-right p-md-5 ">
                                                                                <p>All COntract</p>
                                                                                <h3 style={{ fontWeight: 'bold' }}>€ {val.price}</h3>
                                                                                {/* <small>20% discount</small> */}
                                                                            </div>
                                                                        </div>
                                                                        <div className="row py-3 px-2">
                                                                            {/* <span>
                                                                                <button className="px-4 py-2 btn btn-danger mx-3">Chat</button>
                                                                            </span> */}
                                                                            <span className="ml-auto">
                                                                                <button className="p-2 border-danger bg-light btn btn-primary text-dark mx-3" onClick={() => ConfirmOffer(val.id)} >{val.locked === 0 ? 'Cancel' : 'Confirm Offer'}  <i className="fa fa-chevron-right text-danger pl-3 "></i></button>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        }).reverse()}
                                                </div>
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


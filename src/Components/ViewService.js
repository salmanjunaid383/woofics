import React, { useState, useEffect } from "react";
import Footer from "./LandingPage/components/Footer";
import Navbar from "./Navbar";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import StarRatings from 'react-star-ratings';

export default function ViewService() {
    const [blog, setBlog] = useState([]);
    let history = useHistory();

    const { servicei } = useParams()

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/service/${servicei}`)
            .then((response) => {
                if (response) {
                    console.log(response.data)
                    setBlog(response.data)
                }
            }, (Error) => {

                console.log(Error);
            });

    }

    useEffect(() => {
        GetLed();
    }, [])
    return (
        <>
            <Navbar />
            <div className="page-wrapper mt-5 ">
                <div class="container no-gutters ">
                    <div className="row no-gutters">
                        {blog == '' ? <div className="col-md-12 text-center m-5"><div ><h3 className="my-lg-3 mx-auto text-center w-100">No service provider related to this service!</h3></div> </div>
                            : blog.map((val, id) => {
                                return (
                                    <>
                                        <div class="col-md-4 mx-auto">
                                            <div class="card mx-auto mt-4" style={{ width: '18rem' }}>
                                                <div class="card-body">
                                                    <h4 className="mt-0">{val.first_name + " " + val.last_name}
                                                        <img class="card-img-top img-fluid w-25 mx-auto float-left p-2" src={val.profile_image} style={{ borderRadius: "50px" }} />
                                                        <StarRatings
                                                            starRatedColor='rgb(230, 67, 47)'
                                                            rating={val.rating}
                                                            starDimension="15px"
                                                            starSpacing="3px"
                                                        />
                                                    </h4>
                                                    <br />
                                                    <span className="d-flex"><i className="fa fa-map-marker px-2 text-muted "> </i><span><p className="p ">{" " + val.location_of_your_business}</p></span></span>
                                                    <span className="d-flex"><i className="fa fa-envelope px-2 text-muted "> </i><span><p className="p ">{" " + val.email}</p></span></span>
                                                    <span className="d-flex"><i className="fa fa-phone px-2 text-muted "> </i><span><p className="p ">{" " + val.contact_number}</p></span></span>
                                                    <span className="d-flex"><i className="fa fa-area-chart px-2 text-muted "> </i><span><p className="p ">{" " + val.company_size}</p></span></span>


                                                    <hr />
                                                    <div className="d-flex">
                                                        <button class="btn pull-right marginBottom10 " style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} onClick={() => alert("Seems you are not logged in.. Please login or Create your account first!")} >Contact</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

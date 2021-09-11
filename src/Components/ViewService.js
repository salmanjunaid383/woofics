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
        const { data: response } = axios.get(`https://api.woofics.com/api/service/`+servicei,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                if (response) {
                    console.log(response)
                    setBlog(response.data)
                }
            }, (Error) => {

                
            });

    }

    useEffect(() => {
        GetLed();
    }, [])
    return (
        <>
            <Navbar />
            <div className="page-wrapper mt-5 ">
                <div className="container no-gutters ">
                    <div className="row no-gutters">
                        {blog == '' ? <div className="col-md-12 text-center m-5"><div ><h3 className="my-lg-3 mx-auto text-center w-100">Ningún proveedor de servicios relacionado con este servicio!</h3></div> </div>
                            : blog.map((val, id) => {
                                return (
                                    <>
                                        {
                                            <div className="col-md-4 col-lg-6 justify-content-space-around">
                                            <div className="card mx-auto mt-4" style={{ width: '18rem' }}>
                                                {/* <img class="card-img-top img-fluid mx-auto" src={val.bg_image} alt="Backgound image" /> */}
                                                <div className="card-body">
                                                   
                                                    <h4 className="mt-0">{val.first_name + " " + val.last_name}
                                                        <img className="card-img-top img-fluid w-25 mx-auto float-left p-2 ipad-res" src={val.profile_image}  style={{borderRadius:"50px"}}/>
                                                        </h4><br></br>
                                                        <StarRatings
                                                            starRatedColor='rgb(230, 67, 47)'
                                                            rating={3}
                                                            starDimension="15px"
                                                            starSpacing="3px"
                                                        />
                                                    
                                                    <hr />
                                                    <br />
                                                    <i className="fa fa-map-marker px-2 text-muted"> {val.location}</i><br />
                                                    <i className="fa fa-envelope-o px-2 text-muted"> {val.email}</i><br />
                                                    <i className="fa fa-phone px-2 text-muted"> {val.contact_number}</i><br />
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        }
                                        
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

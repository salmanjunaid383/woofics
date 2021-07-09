import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import './BLog.css';
import logo from './LandingPage/images/wooficc.png';
import Navbar from './Navbar'
import Footer from './LandingPage/components/Footer'

export default function Blog() {
    let history = useHistory();


    const [blog, setBlog] = useState([]);
    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/blog`)
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                console.log(Error);
            });
    }, [])


    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    return (
        <>

            {/* <div class="topnav" id="myTopnav">
                <Link to="/" >
                    <img src={logo} className="img-fluid float-left w-50 pl-lg-4" />
                </Link>
                <Link className="sm-mt-3" to="/">Home</Link>
                <Link to="/allblog">Blog</Link>
                <Link to='/contactus'>About Us</Link>
                <Link to='/pricecalculator'>Price Calculator</Link>
                <Link to="/discussionforum">Forum</Link>
                <Link to="/login" className="float-right mr-lg-4"> <button type="submit" class="f-button btn btn-white text-white ">Login/Register</button></Link>
                <a href="javascript:void(0);" class="icon" onClick={myFunction}>
                    <i class="fa fa-bars"></i>
                </a>
            </div> */}

            <Navbar />
            <div className="page-wrapper ">
                <div class="container">
                    <div id="blog" class="row">

                        <div class="col-md-10 mx-auto text-center m-2">
                            <h1 className="text-primary">BLOGS</h1>
                        </div>
                        {/* <div className="col-md-10 text-center mx-auto"> */}

                        <div class="container-fluid">
                            <div class="row ">
                                <div class="card-deck ">
                                    {blog == "" ? <div class="alert alert-success w-100 text-center m-5 col-md-12" role="alert">
                                        No Blog! </div>
                                        : blog.map((val, id) => {
                                            return (
                                                <>
                                                    <div class="col-md-3 mx-auto m-2" onClick={() => history.push(`./blogdetail/${val.id}`)}>
                                                        <div class="card" style={{ height: "25rem", cursor: 'pointer' }} >
                                                            <img src={val.image} alt="..." className="img-fluid" style={{ height: "12rem" }} />
                                                            <div class="card-body">
                                                                <h3 class="card-title">{val.author}</h3>
                                                                <p class="card-text">{(val.article).slice(0, 80) + '...'}</p>
                                                            </div>
                                                            <div class="card-footer">
                                                                <h5 class="card-text">Date: {(val.created_at).slice(0, 10)}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }).reverse()}
                                </div>
                            </div>
                        </div>

                        {/* </div> */}
                        <div class="col-md-12 gap10"></div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}


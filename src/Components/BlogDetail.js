import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import './BLog.css';
import Navbar from './Navbar'
import Footer from './LandingPage/components/Footer'

export default function Blog() {
    let history = useHistory();

    const { blid } = useParams()

    const [blog, setBlog] = useState('');
    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/blog/${blid}`)
            .then((response) => {
                setBlog(response.data)
                
            }, (Error) => {
                
            });
    }, [])


    return (
        <>



            <Navbar />
            <div className="page-wrapper ">
                <div className="container mt-lg-5 pt-lg-5">
                        <div className="text-left col-lg-12 col-xlg-12 col-md-12 mx-auto d-md-block d-none">
                            <i className="fas fa-chevron-left fa-2x" onClick={() => history.goBack()} style={{ cursor: 'pointer' }}></i>
                        </div>
                    <div className="row bg-light p-md-3">
                        <div className="col-md-4 mx-auto">
                            <img src={blog.image} alt="..." className="img-fluid" />
                        </div>
                        <div className="col-md-8 text-left pt-2">
                            <h1 className="card-title">{blog.author}</h1>
                            <h3 className="card-text">{blog.article}</h3>
                            <h5 className="card-text">Fecha: {(blog.created_at)}</h5>
                        </div>

                        {/* <div class="card" >
                                            <div class="card-body">
                                            </div>
                                            <div class="card-footer">
                                            </div>
                                        </div> */}
                    </div>
                </div>

                {/* </div> */}
                <div className="col-md-12 gap10"></div>
            </div>

            <Footer />
        </>
    );
}


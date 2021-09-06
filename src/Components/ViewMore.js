import React, { useState, useEffect } from "react";
import Footer from "./LandingPage/components/Footer";
import Navbar from "./Navbar";
import axios from 'axios';
import { useParams ,useLocation} from "react-router-dom";
import ModalImage from "react-modal-image";
// import "node_modules/video-react/dist/video-react.css";
// import { Player } from 'video-react';

export default function ViewMore() {
    const [blog, setBlog] = useState([]);

    const { category } = useParams()
    const location = useLocation();
    function GetLed() {
        console.log("category is" +category)
        const { data: response } = axios.post(`https://api.woofics.com/api/search_inspired`,{
            category:category
        },{
            headers:window.header
          })
            .then((response) => {
                if (response) {
                    console.log("response is"+response)
                    
                    setBlog(response.data)
                }
            }, (Error) => {
                console.log(Error)
                
            });

    }

    useEffect(() => {
        GetLed();
    }, [])
    return (
        <>
            <div style={{backgroundImage:'linear-gradient(to right, #934CFF 0%, #F62B84 100%)', height:'65px'}}>
            <Navbar />
            </div>
            <div className="page-wrapper mt-5 ">
                <div class="container-fluid no-gutters ">
                    <div className="row no-gutters">
                        {blog == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">Nada que mostrar!</h3></td> </tr>
                            : blog.map((val, id) => {
                                return (
                                    <>
                                        { 
                                            val.content === "image" ? <div className="col-md-4 no-gutters">
                                            <ModalImage className="img-fluid ima hvr-grow"
                                                small={val.url}
                                                large={val.url}
                                                alt={val.name}
                                            />
                                        </div> :<div className="col-md-4 no-gutters"> <video width="100%" height="350" controls > <source src={val.url}></source></video></div>
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

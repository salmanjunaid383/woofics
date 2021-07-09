import React, { useState, useEffect } from "react";
import Footer from "./LandingPage/components/Footer";
import Navbar from "./Navbar";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ModalImage from "react-modal-image";

export default function ViewMore() {
    const [blog, setBlog] = useState([]);

    const { category } = useParams()

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/get_inspired`)
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
                <div class="container-fluid no-gutters ">
                    <div className="row no-gutters">
                        {blog == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">Nothing to show!</h3></td> </tr>
                            : blog.map((val, id) => {
                                return (
                                    <>
                                        {val.category === category ? <div className="col-md-3 no-gutters">
                                            <ModalImage className="img-fluid ima hvr-grow"
                                                small={val.url}
                                                large={val.url}
                                                alt="Hello World!"
                                            />
                                            {/* <img
                                                style={{ height: "250px", width: "100%" }}
                                                className="img-fluid "
                                                src={val.url}
                                            /> */}
                                        </div> : null}
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

import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom'
import axios from 'axios';
import StazBar from './Stazbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CustomAdminAuth from "../CustomAdminAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function ViewServiceMore() {
    CustomAdminAuth();

    let { serid } = useParams();

    const [blog, setBlog] = useState([]);


    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/form/${serid}`)
            .then((response) => {
                if (response) {
                    setBlog(response.data.form)
                    // setservicet(response.data.package)
                    console.log(response.data)
                    console.log(response.data.form);
                }
            }, (Error) => {
                console.log(Error);
            });

    }

    useEffect(() => {
        GetLed();
    }, [])




    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
   

    return (
        <>
            <div className="d-sm-flex">
              
                <StazBar></StazBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="d-md-flex mb-3">
                                        <h3 className="box-title mb-0 h1 mx-auto text-center">Service Detail's</h3>
                                    </div>

                                    <table class="table table-hover">
                                        <tbody>
                                            {/* {servicet ? <>
                                                <tr>
                                                    <td>Package Charge</td>
                                                    <td>{servicet.charge}</td>
                                                </tr>
                                                <tr>
                                                    <td>Package Name</td>
                                                    <td>{servicet.name}</td>
                                                </tr></> : null} */}
                                            <tr>
                                                <td>Name</td>
                                                <td>{blog.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{blog.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Adverse Weather</td>
                                                <td>{blog.adverse_weather}</td>
                                            </tr>
                                            <tr>
                                                <td>Buy</td>
                                                <td>{blog.buy}</td>
                                            </tr>
                                            <tr>
                                                <td>Carcass Material</td>
                                                <td>{blog.carcass_material}</td>
                                            </tr>

                                            <tr>
                                                <td>Comments</td>
                                                <td>{blog.comments}</td>
                                            </tr>
                                            <tr>
                                                <td>Company</td>
                                                <td>{blog.company}</td>
                                            </tr>
                                            <tr>
                                                <td>Contact</td>
                                                <td>{blog.contact}</td>
                                            </tr>
                                            <tr>
                                                <td>Control System</td>
                                                <td>{blog.control_system}</td>
                                            </tr>
                                            <tr>
                                                <td>Sustomer Type</td>
                                                <td>{blog.customer_type}</td>
                                            </tr>
                                            <tr>
                                                <td>Delivery Time</td>
                                                <td>{blog.delivery_time}</td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                                <td>{blog.description}</td>
                                            </tr>
                                            <tr>
                                                <td>Documents</td>
                                                <td>{blog.documents}</td>
                                            </tr>
                                            <tr>
                                                <td>Entity</td>
                                                <td>{blog.entity}</td>
                                            </tr>
                                            <tr>
                                                <td>Fly Cases</td>
                                                <td>{blog.fly_cases}</td>
                                            </tr>
                                            <tr>
                                                <td>Indoor</td>
                                                <td>{blog.indoor}</td>
                                            </tr>
                                            <tr>
                                                <td>Installation</td>
                                                <td>{blog.installation}</td>
                                            </tr>
                                            <tr>
                                                <td>Model</td>
                                                <td>{blog.model}</td>
                                            </tr>
                                            <tr>
                                                <td>Postal Code</td>
                                                <td>{blog.postal_code}</td>
                                            </tr>
                                            <tr>
                                                <td>Screen Access</td>
                                                <td>{blog.screen_access}</td>
                                            </tr>

                                            <tr>
                                                <td>Screen Height</td>
                                                <td>{blog.screen_height}</td>
                                            </tr>
                                            <tr>
                                                <td>Screen Orientation</td>
                                                <td>{blog.screen_orientation}</td>
                                            </tr>
                                            <tr>
                                                <td>Screen Use</td>
                                                <td>{blog.screen_use}</td>
                                            </tr>
                                            <tr>
                                                <td>Screen Width</td>
                                                <td>{blog.screen_width}</td>
                                            </tr>

                                            <tr>
                                                <td>Sector</td>
                                                <td>{blog.sector}</td>
                                            </tr>
                                            <tr>
                                                <td>Sensor</td>
                                                <td>{blog.sensor}</td>
                                            </tr>

                                            <tr>
                                                <td>Shipping</td>
                                                <td>{blog.shipping}</td>
                                            </tr>
                                            <tr>
                                                <td>Structure</td>
                                                <td>{blog.structure}</td>
                                            </tr>


                                            <tr>
                                                <td>Visual Distance</td>
                                                <td>{blog.visual_distance}</td>
                                            </tr>
                                            <tr>
                                                <td>Warranty</td>
                                                <td>{blog.warranty}</td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >

         


        </>
    );
}


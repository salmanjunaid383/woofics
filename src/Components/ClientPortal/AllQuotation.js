import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import "../ClientPortal/allquotation.css"

import axios from 'axios';
import Sidebar from './Sidebar'

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





export default function AllQuotation() {
    CustomClientAuth();
    let history = useHistory();

    const { sid } = useParams();

    const [form, setForm] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');
    const [serviceb, setserviceb] = useState([]);
    const [servicet, setservicet] = useState([]);



    function Feedback() {
        const res = axios.get(`https://api.woofics.com/api/quotation/${sid}`)
            .then((res) => {
                if (res) {
                    setForm(res.data)
                    // history.push('/myservice');
                }
            }, (error) => {
                console.log(Error);
                history.push('/allquotation');

            });

    }


    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/form/${sid}`)
            .then((response) => {
                setserviceb(response.data.form)
                setservicet(response.data.package)
                console.log(response.data)

            }, (Error) => {
                console.log(Error);
            });
        Feedback();
        Services();
    }, [])



    const [data, setData] = useState([]);

    const sortArray = type => {
        const types = {
            price: 'price',
            delivery_days: 'delivery_days',
        };
        const sortProperty = types[type];
        const sorted = form.sort((a, b) =>
            b[sortProperty] - a[sortProperty]
        );
        console.log(sorted);
        setData(sorted);
    };

    const [service, setService] = useState('');

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token);

    function Services() {
        const response = axios
            .get(`https://api.woofics.com/api/form/${sid}`)
            .then(
                (response) => {
                    setService(response.data);
                },
                (error) => {
                    console.log(Error);
                }
            );
    }


    function StartProj(vala) {
        var result = window.confirm("Do you really want to start project with this supplier ?");
        if (result) {
        const response = axios
            .post(`https://api.woofics.com/api/supplier_project`, {
                quotation_id: vala
            })
            .then(
                (response) => {
                    alert("Project started!");
                },
                (error) => {
                    console.log(Error);
                }
            );
        }
    }


    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();





    return (
        <>


            <div className="d-sm-flex">

                <Sidebar></Sidebar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    



                    <div className="page-wrapper bg-light">
                        <div class="container">
                            <div id="blog" class="row ">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12 border bg-light">
                                            <div className="d-md-flex mb-3">
                                                <h1 className="box-title h1 mb-0 text-center mx-auto manage-heading">Manage Requests</h1>
                                            </div>
                                            <select onChange={(e) => sortArray(e.target.value)} className="float-right lowest">
                                                <option value="price">Lowest Price</option>
                                                <option value="delivery_days">Highest Price</option>
                                            </select>
                                            <hr className="w-50" />
                                            <div className="col-md-12 mx-auto w-100">
                                                <div className="w-100">
                                                    <h3 className="w-100 text-center service-detail" style={{fontWeight:"bold"}}>Service Details</h3>
                                                    <table  id="for-table-setting" class="table table-hover">
                                                        <tbody id="data-row">
                                                            {servicet  ? <>
                                                                <tr>
                                                                    <td>Package Charge</td>
                                                                    <td>{servicet.charge}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Package Name</td>
                                                                    <td>{servicet.name}</td>
                                                                </tr></> : null}
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{serviceb.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email</td>
                                                                <td>{serviceb.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Adverse Weather</td>
                                                                <td>{serviceb.adverse_weather}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Buy</td>
                                                                <td>{serviceb.buy}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Carcass Material</td>
                                                                <td>{serviceb.carcass_material}</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Comments</td>
                                                                <td>{serviceb.comments}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Company</td>
                                                                <td>{serviceb.company}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Contact</td>
                                                                <td>{serviceb.contact}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Control System</td>
                                                                <td>{serviceb.control_system}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sustomer Type</td>
                                                                <td>{serviceb.customer_type}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delivery Time</td>
                                                                <td>{serviceb.delivery_time}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Description</td>
                                                                <td>{serviceb.description}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Documents</td>
                                                                <td>{serviceb.documents}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Entity</td>
                                                                <td>{serviceb.entity}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Fly Cases</td>
                                                                <td>{serviceb.fly_cases}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Indoor</td>
                                                                <td>{serviceb.indoor}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Installation</td>
                                                                <td>{serviceb.installation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Model</td>
                                                                <td>{serviceb.model}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Postal Code</td>
                                                                <td>{serviceb.postal_code}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Screen Access</td>
                                                                <td>{serviceb.screen_access}</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Screen Height</td>
                                                                <td>{serviceb.screen_height}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Screen Orientation</td>
                                                                <td>{serviceb.screen_orientation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Screen Use</td>
                                                                <td>{serviceb.screen_use}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Screen Width</td>
                                                                <td>{serviceb.screen_width}</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Sector</td>
                                                                <td>{serviceb.sector}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sensor</td>
                                                                <td>{serviceb.sensor}</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Shipping</td>
                                                                <td>{serviceb.shipping}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Structure</td>
                                                                <td>{serviceb.structure}</td>
                                                            </tr>


                                                            <tr>
                                                                <td>Visual Distance</td>
                                                                <td>{serviceb.visual_distance}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Warranty</td>
                                                                <td>{serviceb.warranty}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div> <hr />
                                            </div>
                                            <div className="table-responsive">
                                                {form == "" ? <h3 className="text-center my-auto">No Quotation!</h3>
                                                    : <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                        <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                            <tr>
                                                                <th className="border-top-0 text-white text-center">DATE</th>
                                                                <th className="border-top-0 text-white text-center">REQUESTS</th>
                                                                <th className="border-top-0 text-white text-center">OFFERS</th>
                                                                <th className="border-top-0 text-white text-center">DELIVERY DAYS</th>
                                                                <th className="border-top-0 text-white text-center">ACTIONS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="data-row" >

                                                            {form.map((val, id) => {
                                                                return (
                                                                    <>
                                                                        <tr style={{ height: '5rem' }} className="border-bottom text-center ">
                                                                            <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                            <td className="text-oflo text-center bold">{val.description.slice(0, 30)}...</td>
                                                                            <td style={{padding:"10px"}} className={val.price > 15000 ? 'txt-oflo text-center bold  badge badge-pill badge-danger' : val.price > 10000 ? 'txt-oflo text-center bold   badge badge-pill badge-success' : val.price > 100 ? 'txt-oflo text-center bold   badge badge-pill badge-info' : val.price > 500 ? 'txt-oflo text-center bold   badge badge-pill badge-warning' : val.price > 1000 ? 'txt-oflo text-center bold   badge badge-pill badge-success' : val.price > 5000 ? 'txt-oflo text-center bold   badge badge-pill badge-secondary' : val.price > 10000 ? 'txt-oflo text-center bold   badge badge-pill badge-primary' : val.price > 20000 ? 'txt-oflo text-center bold   badge badge-pill badge-info' : val.price > 500000 ? 'txt-oflo text-center bold   badge badge-pill badge-danger' : 'txt-oflo text-center bold badge badge-pill badge-danger'}>$ {val.price}</td>
                                                                            <td className="txt-oflo text-center bold">{val.delivery_days} Days</td>
                                                                            <td className="txt-oflo text-center bold">
                                                                                <button class="btn marginBottom10 greenbtn text-white" value={val.id} onClick={() => StartProj(val.id)} >Start project</button>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>}
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


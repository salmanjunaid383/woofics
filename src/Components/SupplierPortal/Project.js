import React, { useState, useEffect } from "react";
import "../../../src/text-change.css"
import { Link, useHistory, useParams } from 'react-router-dom'
import SideBar from './Sidebar';
import axios from 'axios';

import jwt_decode from 'jwt-decode';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import CustomSupplierAuth from "../CustomSupplierAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));




export default function Project() {
    CustomSupplierAuth();
    let history = useHistory();


    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [form, setForm] = useState([]);
    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');
    const [ddays, setdays] = useState('');


    useEffect(() => {

        function Feedback() {
            const res = axios.get(`https://api.woofics.com/api/supplier_projects/${decoded.sub}`)
                .then((res) => {
                    if (res) {
                        setForm(res.data)
                        setdays(parseInt(res.data.due_date))
                    }
                }, (error) => {
                    console.log(Error);
                });

        }
        Feedback();
    }, [])




    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
 
    return (
        <>

            <div className="d-sm-flex">
                <SideBar></SideBar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    


                   <div className="page-wrapper bg-light">
                        <div class="container">
                            <div id="blog" class="row ">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12 border bg-light">
                                            <div className="d-md-flex mb-3">
                                                <h1 className="box-title h1 mb-0 text-center mx-auto">Manage Projects</h1>
                                            </div>
                                            <hr className="w-50" />
                                            <div className="table-responsive">
                                                <table className="table no-wrap">
                                                    <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white text-center" id="text">DATE</th>
                                                            <th className="border-top-0 text-white text-center">REQUESTS</th>
                                                            <th className="border-top-0 text-white text-center">OFFERS</th>
                                                            <th className="border-top-0 text-white text-center">DELIVERY DAYS</th>
                                                            {/* <th className="border-top-0 text-white text-center">PAYMENT PHASE</th> */}
                                                            <th className="border-top-0 text-white text-center">ACTIONS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        {form == '' ? <tr scope="row"><td colspan="4"><h3 className="my-lg-3 mx-auto ">Nothing to show!</h3></td> </tr> :
                                                            form.map((val, id) => {
                                                                return (
                                                                    <>
                                                                        <tr style={{ height: '5rem' }} className="border-bottom">
                                                                            <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                            <td className="text-oflo text-center bold">{val.description.slice(0, 30)}...</td>
                                                                            <td className="txt-oflo text-center bold">$ {val.price}</td>
                                                                            <td className="txt-oflo text-center bold">{val.delivery_days} Days</td>
                                                                            {/* <td className="txt-oflo text-center bold">{val.phase}</td> */}
                                                                            <td className="txt-oflo text-center bold">
                                                                                <button class="btn marginBottom10" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={val.id} onClick={() => history.push(`/supplierprojects/${val.client_id}/${val.id}`)} >More Details</button>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })}
                                                    </tbody>
                                                </table>
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


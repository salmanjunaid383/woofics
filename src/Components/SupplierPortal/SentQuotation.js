import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import SideBar from './Sidebar';
import axios from 'axios';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import jwt_decode from 'jwt-decode'
import CustomSupplierAuth from "../CustomSupplierAuth";
import "../ClientPortal/quotation.css"

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function SentQuotation() {
    CustomSupplierAuth();
    let history = useHistory();
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/show_quotation/${decoded.sub}`)
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                    console.log(response.data)
                }
            }, (Error) => {
                 
                console.log(Error);
            });
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
                                <div class="container-fluid pb-lg-4 quotation-ipad">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12 border bg-light ">
                                            <div className="d-md-flex mb-3">
                                                <h1 className="box-title h1 mb-0 text-center mx-auto">Manage Requests</h1>
                                            </div>
                                            <hr className="w-50" />
                                            <div className="table-responsive">
                                                <table className="table no-wrap">
                                                    <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white text-center">DATE</th>
                                                            <th className="border-top-0 text-white text-center">DESCRIPTION</th>
                                                            <th className="border-top-0 text-white text-center">COMMENTS</th>
                                                            <th className="border-top-0 text-white text-center">DELIVERY DAYS</th>
                                                            <th className="border-top-0 text-white text-center">PRICE</th>
                                                            <th className="border-top-0 text-white text-center">ACTION</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                    {blog == '' ? <tr scope="row"><td colspan="4"><h3 className="my-lg-3 mx-auto ">Nothing to show!</h3></td> </tr> :
                                               blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr style={{ height: '5rem' }} className="border-bottom">
                                                                        <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                        <td className="text-oflo text-center bold">{val.description}...</td>
                                                                        <td className="txt-oflo text-center bold">{val.extra_comments}</td>
                                                                        <td className="txt-oflo text-center bold">{val.delivery_days} Days</td>
                                                                        <td className="txt-oflo text-center bold">{val.price}</td>
                                                                        <td className="txt-oflo text-center bold">
                                                                            <button  className="btn greenbtn text-white" value={val.id} onClick={() => { history.push(`/quote`); localStorage.setItem('qid', val.id) }} class={val.locked == 0 ? 'btn greenbtn text-white' : 'btn greenbtn text-white disabled'}>Edit</button>                                                                    </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-md-12 gap10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

           

        </>
    );
}


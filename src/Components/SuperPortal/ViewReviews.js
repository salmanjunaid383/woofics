import React, { useState, useEffect } from "react";
import {useHistory } from 'react-router-dom'
import StazBar from './Stazbar';
import axios from 'axios';
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

export default function ViewReviews() {
    CustomAdminAuth();
    let history = useHistory();

    const [blog, setBlog] = useState([]);

    function getReg() {

        const { data: response } = axios.get(`https://api.woofics.com/api/review`)
            .then((response) => {
                    setBlog(response.data)
                    console.log(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }

    useEffect(() => {
        getReg();
    }, [])


    const [res, setRes] = useState('');
    function approveReg(e) {
        const { data: response } = axios.put(`https://api.woofics.com/api/approved_review/${e}`)
            .then((response) => {
                if (response) {
                    setRes(response.data)
                    getReg();

                }
            }, (Error) => {
                console.log(Error);
            });

    }
    function blockReg(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/review/${e}`)
            .then((response) => {
                if (response) {
                    getReg();
                }
            }, (Error) => {
                console.log(Error);
            });

    }

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();

   
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
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className="box-title mb-0 text-center mx-auto">Lista De Reseñas</h3>
                                        </div>
                                        <div className="table-responsive">
                                            <table  id="for-table-setting" className="table no-wrap text-center">
                                                <thead id="heading-row" className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        <th className="border-top-0 text-white text-white">NOMBRE</th>
                                                        <th className="border-top-0 text-white text-white">EMAIL</th>
                                                        <th className="border-top-0 text-white text-white">FECHA</th>
                                                        <th className="border-top-0 text-white text-white">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="data-row">
                                                    {blog.map((val, key) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className="txt-oflo">{val.first_name} {val.last_name}</td>
                                                                    <td className="txt-oflo">{val.email}<a href={"mailto:"+val.email} className="float-right pr-lg-4"><i className="fa fa-envelope ml-3 text-primary"></i></a></td>
                                                                    <td className="txt-oflo">{(val.created_at).slice(0, 10)}</td>
                                                                    <td className="text-danger text-center"><button class={val.locked !== 0 ? "btn text-white btn-danger" : "btn text-white btn-success"} value={val.id} onClick={(e)=>approveReg(e.target.value)}>{val.locked !== 0 ? 'Pending...' : 'Approved'}</button><button class="btn text-white btn-danger ml-2" value={val.id} onClick={(e)=>blockReg(e.target.value)}>Borrar</button></td>
                                                                </tr>
                                                            </>
                                                        )
                                                    }).reverse()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

       
        </>
    );
}


import React, { useState, useEffect } from "react";

import axios from 'axios';
import StazBar from './Stazbar';
import { makeStyles} from '@material-ui/core/styles';

import CustomAdminAuth from "../CustomAdminAuth";

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function Registration() {
    CustomAdminAuth();
    const [blog, setBlog] = useState([]);

    function getReg() {

        const { data: response } = axios.get(`https://api.woofics.com/api/getsupplier`)
            .then((response) => {
                setBlog(response.data)
                console.log(response)
            }, (Error) => {
                console.log(Error);
            });
    }

    useEffect(() => {
        getReg();
    }, [])


    const [res, setRes] = useState('');
    function approveReg(e) {
        const { data: response } = axios.put(`https://api.woofics.com/api/approved/${e}`)
            .then((response) => {
                if (response) {
                    setRes(response.data)
                    getReg();

                }
            }, (Error) => {
                console.log(Error);
            });

    }
    const [block, setblock] = useState('');
    function blockReg(e) {
        const { data: response } = axios.put(`https://api.woofics.com/api/blocked/${e}`)
            .then((response) => {
                if (response) {
                    setblock(response.data)
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
        <div class="d-sm-flex">
                <StazBar/>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className="box-title mb-0 mx-auto text-center">Lista De Registro</h3>
                                        </div>
                                        <div className="table-responsive">
                                            <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                    <tr className="heading-row" >
                                                        <th className="">NAME</th>
                                                        <th className="">EMAIL</th>
                                                        <th className="">DATE</th>
                                                        <th className="">ACTIONS</th>
                                                    </tr>
                                                <tbody id="data-row">
                                                    {blog.map((val, key) => {
                                                        return (
                                                            <>
                                                                <tr className="data-row">
                                                                    <td className="txt-oflo">{val.first_name} {val.last_name}</td>
                                                                    <td className="txt-oflo">{val.email}<a href={"mailto:" + val.email} className="float-right pr-lg-4"><i className="fa fa-envelope ml-3 text-primary"></i></a></td>
                                                                    <td className="txt-oflo">{(val.created_at).slice(0, 10)}</td>
                                                                    <td className="text-danger text-center"><button class={val.locked !== 0 ? "btn text-white btn-danger" : "btn text-white btn-success"} onClick={() => approveReg(val.id)}>{val.locked !== 0 ? 'Pending...' : 'Approved'}</button><button class="btn text-white btn-danger ml-2" onClick={() => blockReg(val.id)}>{val.blocked === 0 ? 'Block' : 'Unblock'}</button></td>
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


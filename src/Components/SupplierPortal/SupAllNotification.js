import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios';
import Sidebar from './Sidebar'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import jwt_decode from 'jwt-decode'

import CustomSupplierAuth from "../CustomSupplierAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function SupAllNotification() {
    CustomSupplierAuth();
    let history = useHistory();

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();


    // const container = window !== undefined ? () => window().document.body : undefined;


    const [name, setName] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function notification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`)
            .then((response) => {
                setName(response.data)
                
            }, (Error) => {
                console.log(Error);
            });
    }
    function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
                .then((response) => {
                    notification()
                }, (Error) => {
                        console.log(Error);
                });
}
useEffect(()=>{
    notification()
},[])




    return (
        <>
            <div className="d-sm-flex">

                <Sidebar></Sidebar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                   <div className="page-wrapper bg-light">
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className="box-title mb-0 mx-auto text-center">All Notifications</h3>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table no-wrap">
                                                <tbody>
                                                    {name.map((val, id) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className="txt-oflo">{val.notification}</td>
                                                                    <td className="text-danger"><button class='btn text-white btn-danger' value={val.id} onClick={(e) => notificationDelete(val.id)}>Remove</button></td>
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


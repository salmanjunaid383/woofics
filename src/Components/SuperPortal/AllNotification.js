import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Stazbar'

import { makeStyles } from '@material-ui/core/styles';

import jwt_decode from 'jwt-decode'

import CustomAdminAuth from "../CustomAdminAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function AllNotification() {
    CustomAdminAuth();
    let history = useHistory();

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();


    // const container = window !== undefined ? () => window().document.body : undefined;

    const [newnoti, setnewnoti] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function notification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setnewnoti(response.data)
                seen()
            }, (Error) => {
                
            });
    }
    function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
                .then((response) => {
                    notification()
                }, (Error) => {
                        
                });
}
useEffect(()=>{
    notification()
    seen()
},[])

    const [unseen, setunseen] = useState([]);
    function seen() {
        const { data: response } = axios.get(`https://api.woofics.com/api/unseen/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setunseen(response.data)
            }, (Error) => {
                
            });
    }


    return (
        <>
            <div className="d-sm-flex">

                <Sidebar></Sidebar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                        <div className="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className=" mb-0 mx-auto text-center">Todas Las Notificaciones</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                <tbody id="data-row">
                                                    {newnoti.map((val, id) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className="txt-oflo">{val.notification}</td>
                                                                    <td className="text-danger"><button className='btn text-white btn-danger' value={val.id} onClick={(e)=>notificationDelete(val.id)}>Eliminar</button></td>
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


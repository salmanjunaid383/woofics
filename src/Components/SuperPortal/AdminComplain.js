import React, { useState, useEffect } from "react";
import {useHistory } from 'react-router-dom'
import axios from 'axios';
import StazBar from "./Stazbar";
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


export default function AdminComplain() {
    CustomAdminAuth();
    let history = useHistory();
    const [blog, setBlog] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/complain`,{
            headers:window.header
          })
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                 
                
            });

    }

    useEffect(() => {
        GetLed();
    }, [])

    var index = 0;
    function returnIndex(){
        index = index +1;
        return index;
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
                                            <h3 className=" mb-0 mx-auto text-center">Lista De Quejas</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            {blog == '' ? <div className="my-auto mx-auto w-100 text-center">Nada Que Mostrar...</div>
                                                : <table  id="for-table-setting" className="table no-wrap text-center">
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            
                                                            <th className="border-top-0 text-white ">TÍTULO</th>
                                                            <th className="border-top-0 text-white ">QUEJARSE</th>
                                                            <th className="border-top-0 text-white ">FECHA</th>
                                                            <th className="border-top-0 text-white ">ACCIÓN</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row">

                                                        {blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        
                                                                        <td className="txt-oflo">{val.title}</td>
                                                                        <td className="txt-oflo">{(val.description).slice(0, 20) + "..."}</td>
                                                                        <td className="txt-oflo">{(val.created_at).slice(0, 10)}</td>
                                                                        <td className="text-danger"><button class="btn greenbtn text-white  mx-2" onClick={() => history.push(`/quejarse_respuesta/${val.id}/${val.user_id}`)}>Respuesta</button></td>
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
                        </div>
                    </div>
                </main>
            </div>


        </>
    );
}


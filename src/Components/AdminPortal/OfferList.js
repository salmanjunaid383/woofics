import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import "../AdminPortal/offerlist.css";
import loginside from '../../Images/loginside.jpg'
import axios from 'axios';
import Sidebar from './Sidebar'

import jwt_decode from 'jwt-decode';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import CustomProviderAuth from "../CustomProviderAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function OfferList() {
    CustomProviderAuth();
    let history = useHistory();

    const [form, setForm] = useState([]);
    const [article, setArticle] = useState("");
    const [userId,setUserId]=useState("");


    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    
    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }

    useEffect(() => {

        function Feedback() {
            const res = axios.get(`https://api.woofics.com/api/offer`)
                .then((res) => {
                    if (res) {
                        setForm(res.data)
                        setUserId(decoded.sub)
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

                <Sidebar></Sidebar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    




                   <div className="page-wrapper bg-light">
                        <div class="container">
                            <div id="blog" class="row">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="d-md-flex mb-3">
                                                <h1 className="box-title h1 mb-0 text-center mx-auto">Ofertas Enviadas</h1>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table no-wrap" style={{tableLayout:"fixed", width:"100%"}}>
                                                    <thead className="py-3" style={{ backgroundColor: "#f25c8a" }}>
                                                        <tr>
                                                            <th className="border-top-0 text-center text-white">#</th>
                                                            <th className="border-top-0 text-center text-white">Descripción</th>
                                                            <th className="border-top-0 text-center text-white">Precio</th>
                                                            <th className="border-top-0 text-center text-white">Dias</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                        
                                                        form == ''? <h3  className="mt-5"> Nada Que Mostrar!</h3> :
                                                        form.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td className="text-center" >{returnIndex()}</td>
                                                                        <td className="txt-oflo text-center">{(val.description).slice(0,10)+'...'}</td>
                                                                        <td className="text-oflo text-center">{val.price}</td>
                                                                        <td className="txt-oflo text-center">{val.time}</td>
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


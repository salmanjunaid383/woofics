import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
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



export default function ProviderResponses() {
    CustomProviderAuth();
    let history = useHistory();

    const [form, setForm] = useState([]);
    const [approved, setApproved] = useState("Confirm Offer");
    const classes = useStyles();

    useEffect(()=>{
        if(!localStorage.getItem('user_token')){
            history.push('/')
        }
        
    })
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    function Feedback() {
        const res = axios.get(`https://api.woofics.com/api/help/${decoded.sub}`)
            .then((res) => {
                if (res) {
                    setForm(res.data)
                }
            }, (error) => {
                console.log(Error);
            });

    }

    useEffect(() => {
        Feedback();
    }, [])

    function ConfirmOffer(id) {
        const res = axios.put(`https://api.woofics.com/api/offer_approved/${id}`)
            .then((res) => {
                if (res) {
                    Feedback()
                }
            }, (error) => {
                console.log(Error);
            });

    }

    //Sidebaaaaar/..........................
    // const { window } = props;



    return (
        <>

            <div className="d-sm-flex">

                <Sidebar></Sidebar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    


                   <div className="page-wrapper bg-light">
                        <div class="container p-4">
                            <div class="row">
                                <div className="col-md-10 mx-auto">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-md-12 bold h5">Respuestas de ayuda y soporte</div>
                                                <div class="col-md-12">
                                                    {/* <input class="form-control" type="text" placeholder="Search Query..." /> */}
                                                    <div class="col-md-8 py-2 ml-4" style={{ borderLeft: '4px solid rgba(7, 72, 138, 0.71)' }}>Encuentra Tu Solución...</div>
                                                </div>
                                                {form == '' ? <h3 className="text-center my-auto mx-auto">Nada Que Mostrar!</h3>
                                                    :
                                                    form.map((val, id) => {
                                                        return (
                                                            <>
                                                                <div class="col-md-11 py-4  border-bottom mx-auto"> <Link to={`/providercheckresponse/${val.id}`}> Consulta: {val.description}<i className="fas fa-chevron-right float-right"></i></Link></div>
                                                            </>
                                                        )
                                                    })}
                                            </div>
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


import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios';
import Sidebar from './Sidebar'

import jwt_decode from 'jwt-decode';

import { makeStyles } from '@material-ui/core/styles';

import CustomClientAuth from "../CustomClientAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));




export default function Responses() {
    CustomClientAuth();
    let history = useHistory();

    const [form, setForm] = useState([]);
    const [approved, setApproved] = useState("Confirm Offer");

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    function Feedback() {
        const res = axios.get(`https://api.woofics.com/api/help/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((res) => {
                if (res) {
                    setForm(res.data)
                }
            }, (error) => {
                
            });

    }

    useEffect(() => {
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
                        <div className="container p-4">
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-md-12 bold h5">Respuestas de ayuda y soporte</div>
                                                <div className="col-md-12">
                                                    {/* <input class="form-control" type="text" placeholder="Search Query..." /> */}
                                                <div className="col-md-8 py-2 ml-4" style={{ borderLeft: '4px solid rgba(7, 72, 138, 0.71)' }}>Encuentra tu soluci??n...</div>
                                                </div>
                                                {form == '' ? <h3 className="text-center my-auto mx-auto">??Nada que mostrar!</h3>
                                                    :
                                                    form.map((val, id) => {
                                                        return (
                                                            <>
                                                              <div className="col-md-11 py-4  border-bottom mx-auto"> <Link to={`/checkresponse/${val.id}`}> Consulta: {val.description}<i className="fas fa-chevron-right float-right"></i></Link></div>
                                                            </>
                                                        )
                                                    }).reverse()}
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


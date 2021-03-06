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


export default function ViewContact() {
    CustomAdminAuth();
    
    let history = useHistory();

    const [blog, setBlog] = useState([]);

    function getReg() {

        const { data: response } = axios.get(`https://api.woofics.com/api/contact`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setBlog(response.data)
                
            }, (Error) => {
                
            });
    }

    useEffect(() => {
        getReg();
    }, [])


    const [res, setRes] = useState('');
    function deleteAdv(e) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/contact/${e}`,{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              })
                .then((response) => {
                    if (response) {
                        setRes(response.data)
                        getReg();

                    }
                }, (Error) => {
                    
                });

        }
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
                        <div className="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                    <div className="d-md-flex mb-3">
                                            <h3 className=" mb-0 text-center mx-auto text-change">Ver Contactos</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            <table  id="for-table-setting" className="table no-wrap text-center">
                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        <th className="border-top-0 text-white text-center">NOMBRE</th>
                                                        <th className="border-top-0 text-white text-center">EMAIL</th>
                                                        <th className="border-top-0 text-white text-center">MENSAJE</th>
                                                        <th className="border-top-0 text-white text-center">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="data-row">
                                                    {blog.map((val, key) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className="txt-oflo text-center">{val.name}</td>
                                                                    <td className="txt-oflo text-center">{val.email}<a href={"mailto:" /+ val.email} className="float-right pr-lg-4"><i className="fa fa-envelope ml-3 text-primary"></i></a></td>
                                                                    <td className="txt-oflo text-center"><p className="text-justify">{val.message}</p></td>
                                                                    <td className="text-danger text-center"><button className="btn text-white btn-danger" value={val.id} onClick={(e) => deleteAdv(e.target.value)}>Borrar</button></td>
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
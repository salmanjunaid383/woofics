import React, { useState,useEffect } from "react";
import { useHistory  } from 'react-router-dom'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import StazBar from './Stazbar'
import CustomAdminAuth from "../CustomAdminAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function GetInspired() {
    CustomAdminAuth();
    let history = useHistory();

    const [blog, setBlog] = useState([]);

    function getReg() {

        const { data: response } = axios.get(`https://api.woofics.com/api/questionnaire`,{
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
            const { data: response } = axios.delete(`https://api.woofics.com/api/questionnaire/${e}`,{
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
                                            <h3 className=" mb-0 h1 text-center mx-auto"> Anunciar</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        <th className="border-top-0 text-white text-center">NOMBRE</th>
                                                        <th className="border-top-0 text-white text-center">EMAIL</th>
                                                        <th className="border-top-0 text-white text-center">CAMPAÑA<br />LOCALIZACIÓN</th>
                                                        <th className="border-top-0 text-white text-center">CAMPAÑA<br />DURACIÓN</th>
                                                        <th className="border-top-0 text-white text-center">CONTACTO<br />NÚMERO</th>
                                                        <th className="border-top-0 text-white text-center">PANTALLA<br />TIPO</th>
                                                        <th className="border-top-0 text-white text-center">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="data-row">
                                                    {blog.map((val, key) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className="txt-oflo text-center">{(val.name).slice(0,15)+"..."}</td>
                                                                    <td className="txt-oflo text-center">{(val.email).slice(0,15)+"..."}<a href={"mailto:" + val.email} className="float-right pr-lg-4"><i className="fa fa-envelope ml-3 text-primary"></i></a></td>
                                                                    <td className="txt-oflo text-center">{val.campaign_location}</td>
                                                                    <td className="txt-oflo text-center">{val.campaign_duration}</td>
                                                                    <td className="txt-oflo text-center">{val.contact_number}</td>
                                                                    <td className="txt-oflo text-center">{val.screen_type}</td>
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


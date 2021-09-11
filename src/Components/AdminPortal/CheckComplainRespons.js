import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
import Sidebar from './Sidebar';
import axios from 'axios';

import jwt_decode from 'jwt-decode';

import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function ProviderCheckComplainResponse() {
    // CustomProviderAuth();
    let history = useHistory();
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    const { rresid } = useParams()

    const [blog, setBlog] = useState('');
    const [reponses, setreponses] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/show_help/${rresid}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                
            });

    }

    function getRes() {
        const response = axios.get(`https://api.woofics.com/api/help_response/${rresid}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setreponses(response.data)
            }, (error) => {
                
            });
    }

    useEffect(() => {
        GetLed();
        getRes()
    }, [])

    const [author, setAuthor] = useState("");
    const [article, setArticle] = useState("");



    function Feedback(e) {
        e.preventDefault();
        const res = axios.post(`https://api.woofics.com/api/help_response`, {
            reply: article,
            help_id: rresid,
            title: blog.description,
            user_id: decoded.sub
        },{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((res) => {
                // setOpen3(true);
                getRes()
                setArticle('')
            }, (error) => {
                
            });

    }


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
                        <div className="container-fluid p-5" style={{ height: '100%' }}>
                            <div className="row">
                                <div className="col-lg-8 col-xlg-9 col-md-12 col-sm-12 mx-auto ">
                                    <h4 className="text-center p-4">AYUDA A RESPUESTAS</h4>
                                    <div className="card-body">
                                        <div className="d-flex h5 bold">
                                            Help:  <p className="" style={{ fontSize: 20 }}> {blog.description}</p>
                                        </div>
                                        <div className="border p-md-3 ">
                                            <h3 className="text-center">Respuestas:</h3>
                                            {
                                                reponses.map((val, id) => {
                                                    return (
                                                        <>
                                                            <p className={decoded.sub == val.user_id   ? "text-right text-success" : 'text-left text-primary'} style={{overflow:'hidden'}}>{ decoded.sub==  val.user_id ? "User:" : 'Admin:'} {val.reply}</p>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                        <form className="form-horizontal form-material my-lg-3" style={{ textAlign: 'left' }}>
                                            <label className="col-md-12 p-0 mt-3">Respuesta</label>
                                            <div className="col-md-12 border-bottom p-0">
                                                <textarea rows="4" className="form-control p-0 border-0" value={article} placeholder="Type your reply here..." onChange={(e) => setArticle(e.target.value)}></textarea>
                                            </div>
                                            <div className="form-group mb-4">
                                                <div className="col-sm-12 mt-3 text-center">
                                                    <button className="btn text-white" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={Feedback}>Enviar respuesta</button>
                                                </div>
                                            </div>
                                        </form>
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


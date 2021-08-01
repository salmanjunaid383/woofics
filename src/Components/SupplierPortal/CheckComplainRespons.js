import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'

import axios from 'axios';
import Sidebar from './Sidebar'

import jwt_decode from 'jwt-decode';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import CustomSupplierAuth from "../CustomSupplierAuth";

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));





export default function SupCheckComplainResponse() {
    CustomSupplierAuth();
    let history = useHistory();

    const { resid } = useParams()

    const [blog, setBlog] = useState('');
    const [reponses, setreponses] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/show_help/${resid}`)
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                console.log(Error);
            });

    }

    function getRes() {
        const response = axios.get(`https://api.woofics.com/api/help_response/${resid}`)
            .then((response) => {
                setreponses(response.data)
            }, (error) => {
                console.log(Error);
            });
    }

    useEffect(() => {
        GetLed();
        getRes()
        getData()
    }, [])

    const [author, setAuthor] = useState("");
    const [article, setArticle] = useState("");

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function Feedback(e) {
        e.preventDefault();
        const res = axios.post(`https://api.woofics.com/api/help_response`, {
            reply: article,
            help_id: resid,
            title: blog.description,
            user_id: decoded.sub
        })
            .then((res) => {
                // setOpen3(true);
                getRes()
                setArticle('')
            }, (error) => {
                console.log(Error);
            });

    }


    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();



    const [Imagedata, setImageData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((res) => {
                setImageData(res.data)
            }
            )

    }


    return (
        <>

            <div className="d-sm-flex">

                <Sidebar></Sidebar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    



                   <div className="page-wrapper bg-light">
                        <div class="container-fluid p-5" style={{ height: '100%' }}>
                            <div class="row">
                                <div class="col-lg-8 col-xlg-9 col-md-12 col-sm-12 mx-auto ">
                                    <h4 className="text-center p-4">Respuestas de ayuda</h4>
                                    <div class="card-body">
                                        <div className="d-flex h5 bold">
                                            Help:  <p className="" style={{ fontSize: 20 }}> {blog.description}</p>
                                        </div>
                                        <div className="border p-md-3 ">
                                            <h3 className="text-center">Replies:</h3>
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
                                        <form class="form-horizontal form-material my-lg-3" style={{ textAlign: 'left' }}>
                                            <label class="col-md-12 p-0 mt-3">Reply</label>
                                            <div class="col-md-12 border-bottom p-0">
                                                <textarea rows="4" class="form-control p-0 border-0" value={article} placeholder="Type your reply here..." onChange={(e) => setArticle(e.target.value)}></textarea>
                                            </div>
                                            <div class="form-group mb-4">
                                                <div class="col-sm-12 mt-3 text-center">
                                                    <button class="btn text-white" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={Feedback}>Send Reply</button>
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


import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'

import axios from 'axios';
import Sidebar from './Sidebar'

import jwt_decode from 'jwt-decode';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import CustomClientAuth from "../CustomClientAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function ComplainResponses() {
    CustomClientAuth();
    let history = useHistory();

    const { comid } = useParams()

    const [blog, setBlog] = useState('');
    const [reponses, setreponses] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/show_complain/${comid}`)
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                console.log(Error);
            });

    }

    function getRes() {
        const response = axios.get(`https://api.woofics.com/api/complain_response/${comid}`)
            .then((response) => {
                setreponses(response.data)
            }, (error) => {
                console.log(Error);
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
        const res = axios.post(`https://api.woofics.com/api/complain_response`, {
            response: article,
            complain_id: comid,
            // title: blog.description,
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
    const token = localStorage.getItem('user_token');
    var decoded = jwt_decode(token);

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();


    return (
        <>

            <div className="d-sm-flex">
                <Sidebar></Sidebar>

                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    


                    <div className={classes.toolbar} />

                   <div className="page-wrapper bg-light">
                        <div class="container-fluid" >
                            <div class="row">
                            <div className="text-left col-lg-12 col-xlg-12 col-md-12 mx-auto d-md-block d-none">
                                    <i className="fas fa-chevron-left fa-2x" onClick={() => history.goBack()} style={{ cursor: 'pointer' }}></i>
                                </div>
                                <div class="col-lg-8 col-xlg-9 col-md-12 col-sm-12 mx-auto ">
                                    <h4 className="text-center">COMPLAIN RESPONSES</h4>
                                    <div class="card-body">
                                        <div className="d-flex h5 bold">
                                            Complain: <p className="" style={{ fontSize: 20 }}> {blog.description}</p>
                                        </div>
                                        <div className="border p-md-3 ">
                                            <h3 className="text-center">Replies:</h3>
                                            {
                                                reponses.map((val, id) => {
                                                    return (
                                                        <>
                                                            <p className={decoded.sub == val.user_id   ? "text-right text-success" : 'text-left text-primary'} style={{overflow:'hidden'}}>{ decoded.sub==  val.user_id ? "User:" : 'Admin:'} {val.response}</p>
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


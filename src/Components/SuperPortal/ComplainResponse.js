import React, { useState, useEffect } from "react";
import {useHistory, useParams } from 'react-router-dom'
import axios from 'axios';

import { makeStyles} from '@material-ui/core/styles';
import StazBar from './Stazbar';
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


export default function ComplainResponse() {
    CustomAdminAuth();
    let history = useHistory();

    const { ucid } = useParams()
    const { usid } = useParams()
    const [blog, setBlog] = useState('');
    const [wait, setwait] = useState('Send Reply');
    const [disable, setdisable] = useState('');
    const [reponses, setreponses] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/show_complain/${ucid}`,{
            headers:window.header
          })
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                
            });

    }

    function getRes() {
        const response = axios.get(`https://api.woofics.com/api/complain_response/${ucid}`,{
            headers:window.header
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

    const [article, setArticle] = useState("");



    function Feedback(e) {
        e.preventDefault();
        setwait('Please wait...')
        setdisable('disabled')
        const res = axios.post(`https://api.woofics.com/api/complain_response`, {
            response: article,
            complain_id: ucid,
            user_id: 1,
            title: blog.description,
        },{
            headers:window.header
          })
            .then((res) => {
                setdisable('')
                setwait('Send Reply')
                setOpen3(true);
                getRes()
                setArticle('')
            }, (error) => {
                setdisable('')
                setwait('Send Reply')
                
            });

    }


    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();






  






    // popver Profile


    //send pop

    const [open3, setOpen3] = React.useState(false);

    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen3(false);
    };


    // const container = window !== undefined ? () => window().document.body : undefined;


    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    
    return (
        <>
            <div className="d-sm-flex">

                <StazBar></StazBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                   


                    <div className="page-wrapper bg-light">
                        <div class="container-fluid p-5" style={{ height: '100%' }}>
                            <div class="row">
                                <div class="col-lg-8 col-xlg-9 col-md-12 col-sm-12 mx-auto ">
                                    <h4 className="text-center p-4">RESPUESTAS PARA QUEJAS</h4>
                                    <div class="card-body">
                                        <div className="d-flex h5 bold">
                                        Ayudar:  <p className="" style={{ fontSize: 20 }}> {blog.description}</p>
                                        </div>
                                        <div className="border p-md-3 ">
                                            <h3 className="text-center">Respuestas:</h3>
                                            {
                                                reponses.map((val, id) => {
                                                    return (
                                                        <>
                                                            <p className={decoded.sub == val.user_id ? "text-left text-success" : 'text-right text-primary'} style={{ overflow: 'hidden' }}>{decoded.sub == val.user_id ? "Admin:" : 'User:'} {val.response}</p>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                        <form class="form-horizontal form-material my-lg-3" style={{ textAlign: 'left' }}>
                                            <label class="col-md-12 p-0 mt-3">Respuesta</label>
                                            <div class="col-md-12 border-bottom p-0">
                                                <textarea rows="4" class="form-control p-0 border-0" value={article} placeholder="Type your reply here..." onChange={(e) => setArticle(e.target.value)}></textarea>
                                            </div>
                                            <div class="form-group mb-4">
                                                <div class="col-sm-12 mt-3 text-center">
                                                    <button class={`btn greenbtn text-white ${disable}`}  onClick={Feedback}>{wait}</button>
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


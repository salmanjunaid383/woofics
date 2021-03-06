import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import StazBar from './Stazbar';
import './BLog.css';

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


export default function Blog() {
    CustomAdminAuth();
    let history = useHistory();

    const [blog, setBlog] = useState([]);
    useEffect(() => {
        createBlog();
    }, [])

    function createBlog() {
        const { data: response } = axios.get(`https://api.woofics.com/api/blog`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                
                if (response) {
                    
                    setBlog(response.data)
                }
            }, (Error) => {
                
            });
    }

    function deleteBlog(id) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/blog/${id}`,{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              })
                .then((response) => {
                    createBlog()
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
                        <div className="container">
                            <div className="d-md-flex mb-3">
                                    <h3 className=" mb-0 mx-auto text-center mt-2 text-change"> BLOG </h3>
                            </div>

                            <div id="blog" className="row">

                                <div className="col-md-12">
                                    
                                    <div className="mr-auto mb-3 mt-2">
                                        <a className="btn pull-right greenbtn text-white mb-3" onClick={() => history.push('/createblog')}>Crear Nuevo Blog</a>
                                    </div>
                                   
                                </div>
                                <div className="col-md-10 text-left mx-auto">
                                    {blog == '' ? <div className="my-lg-3 mx-auto text-center w-100">??Nada que mostrar! Empiece a crear blogs...</div>
                                        : blog.map((val, id) => {
                                            return (
                                                <>
                                                    
                                                    <div className="card mb-3 w-100">

                                                        <div className="row ">
                                                            <div className="col-md-4 my-auto">
                                                                <img src={val.image} alt="..."  className="img-fluid"/>
                                                            </div>
                                                            <div className="col-md-8 my-auto">
                                                                <div className="card-body">
                                                                
                                                                    <h3 className="card-title">{val.author}</h3>
                                                                    <h5 className="card-text">{val.article}</h5>
                                                                    <p className="card-text"><small className="text-muted ">Fecha: {(val.created_at).slice(0, 10)}</small></p>
                                                                    <button value={val.id} className="btn btn-danger" onClick={e => deleteBlog(e.target.value)} >Borrar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }).reverse()}

                                </div>
                                <div className="col-md-12 gap10"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>



        </>
    );
}


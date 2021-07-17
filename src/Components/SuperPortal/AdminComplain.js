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


export default function AdminComplain() {
    CustomAdminAuth();
    let history = useHistory();
    const [blog, setBlog] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/complain`)
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                 
                console.log(Error);
            });

    }

    useEffect(() => {
        GetLed();
    }, [])

    var index = 0;
    function returnIndex(){
        index = index +1;
        return index;
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
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className="box-title mb-0 mx-auto text-center">Complain's List</h3>
                                        </div>
                                        <div className="table-responsive">
                                            {blog == '' ? <div className="my-auto mx-auto w-100 text-center">Nothing to show...</div>
                                                : <table className="table no-wrap text-center">
                                                    <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white ">#</th>
                                                            <th className="border-top-0 text-white ">TITLE</th>
                                                            <th className="border-top-0 text-white ">COMPLAIN</th>
                                                            <th className="border-top-0 text-white ">DATE</th>
                                                            <th className="border-top-0 text-white ">ACTION</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{returnIndex()}</td>
                                                                        <td className="txt-oflo">{val.title}</td>
                                                                        <td className="txt-oflo">{(val.description).slice(0, 20) + "..."}</td>
                                                                        <td className="txt-oflo">{(val.created_at).slice(0, 10)}</td>
                                                                        <td className="text-danger"><button class="btn greenbtn text-white  mx-2" onClick={() => history.push(`/complainresponse/${val.id}/${val.user_id}`)}>Response</button></td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>}
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


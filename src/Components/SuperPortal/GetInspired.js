import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import StazBar from './Stazbar'
import CustomAdminAuth from "../CustomAdminAuth";
import { makeStyles } from '@material-ui/core/styles';


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

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/get_inspired`)
            .then((response) => {
                if (response) {
                    console.log(response.data)
                    setBlog(response.data)
                }
            }, (Error) => {

                console.log(Error);
            });

    }
    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }

    useEffect(() => {
        GetLed();
    }, [])

    function DeleteImg(e) {
        var result = window.confirm("Want to delete?");
        if (result) {

            const { data: response } = axios.delete(`https://api.woofics.com/api/get_inspired/${e}`)
                .then((response) => {
                    GetLed()
                }, (Error) => {
                    console.log(Error);
                });
        }
    }



    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();


    return (
        <>
            <div className="d-sm-flex">
                {/* <CssBaseline /> */}

                <StazBar></StazBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                        <div class="container pb-lg-4">
                            <div className="row m-lg-5">
                                <div class="col-md-12 ">
                                    <div className="mr-auto">
                                        <a class="btn pull-right mb-3 greenbtn text-white "  onClick={() => history.push('/createimg')}>Create</a>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className="box-title mb-0 h1 mx-auto text-center ">Image List</h3>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table no-wrap text-center">
                                                <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        <th className="border-top-0 text-white">#</th>
                                                        <th className="border-top-0 text-white">IMAGE NAME</th>
                                                        <th className="border-top-0 text-white">IMAGE LINK</th>
                                                        <th className="border-top-0 text-white">IMAGE CATEGORY</th>
                                                        <th className="border-top-0 text-white">ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {blog == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">Nothing to show! Start creating...</h3></td> </tr>
                                                        : blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{returnIndex()}</td>
                                                                        <td className="txt-oflo">{val.name}</td>
                                                                        <td className="txt-oflo">{(val.url).slice(0, 20)}</td>
                                                                        <td className="txt-oflo">{val.category}</td>
                                                                        <td className="text-danger"><button class="btn text-white greenbtn text-white "><a href={val.url} className="text-white" target="_blank">View Image</a></button><button class="btn text-white btn-danger mx-2" onClick={() => DeleteImg(val.id)}>Delete</button></td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
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


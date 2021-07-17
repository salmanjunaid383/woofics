import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import StazBar from './Stazbar'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CustomAdminAuth from "../CustomAdminAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function LedList() {
    CustomAdminAuth();
    let history = useHistory();
    const [blog, setBlog] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/led`)
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

    function DeleteLed(e) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/led/${e}`)
                .then((response) => {
                    GetLed()
                }, (Error) => {
                    console.log(Error);
                });
        }
    }
    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
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
                                <div class="col-md-12">
                                    <div className="mr-auto mb-5">
                                        <button className="btn greenbtn text-white float-right" onClick={() => history.push('/led')}>Add Led</button>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className="box-title mb-0 text-center mx-auto">Led's List</h3>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table no-wrap text-center">
                                                <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        <th className="border-top-0  text-white">#</th>
                                                        <th className="border-top-0  text-white">NAME</th>
                                                        <th className="border-top-0  text-white">DATE</th>
                                                        <th className="border-top-0  text-white">ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {blog == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">Nothing to show! Start creating projects...</h3></td> </tr>
                                                        : blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{returnIndex()}</td>
                                                                        <td className="txt-oflo">{val.name}</td>
                                                                        <td className="txt-oflo">{(val.created_at).slice(0, 10)}</td>
                                                                        <td className="text-danger"><Link to={`/updateled/${val.id}`}><button class="btn greenbtn text-white " >Update/Details</button></Link><button class="btn text-white btn-danger mx-2" onClick={() => DeleteLed(val.id)}>Delete</button></td>
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


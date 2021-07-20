import React, { useState, useEffect } from "react";
import {useHistory } from 'react-router-dom'
import axios from 'axios';
import { makeStyles} from '@material-ui/core/styles';
import CustomAdminAuth from "../CustomAdminAuth";
import StazBar from './Stazbar'

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function Help() {
    CustomAdminAuth();
    let history = useHistory();
    const [blog, setBlog] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/help`)
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

    function DeleteLed(id) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/help/${id}`)
                .then((response) => {
                    console.log(response.data)
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
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className="box-title mb-0 text-center mx-auto">Help List</h3>
                                        </div>
                                        <div className="table-responsive">
                                            {blog == '' ? <div className="my-auto mx-auto w-100 text-center">Nothing to show...</div>
                                                : <table className="table no-wrap">
                                                    <thead className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white">#</th>
                                                            <th className="border-top-0 text-white">QUERY</th>
                                                            <th className="border-top-0 text-white">DESCRIPTION</th>
                                                            <th className="border-top-0 text-white">DATE</th>
                                                            <th className="border-top-0 text-white">ACTIONS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{returnIndex()}</td>
                                                                        <td className="txt-oflo">{(val.question).slice(0, 20) + "..."}</td>
                                                                        <td className="txt-oflo">{(val.description).slice(0, 20) + "..."}</td>
                                                                        <td className="txt-oflo">{(val.created_at).slice(0, 10)}</td>
                                                                        <td className="text-danger">
                                                                            <button class="btn text-white greenbtn text-white  mx-2" onClick={() => history.push(`/helpresponse/${val.id}`)}>Response</button>
                                                                            <button class="btn text-white btn-danger mx-2" onClick={() => DeleteLed(val.id)}>Delete</button>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            }
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



// const Data = [
//     {
//         name: 'Supplier Dashboard',
//         icon: <DashboardIcon style={{color:"white"}}/>,
//         to: 'supplierdashboard'
//     },
//     {
//         name: 'Projects',
//         icon: <PollIcon  style={{ color: "#cdcdcd" }}/>,
//         to: 'supproject'
//     },
//     {
//         name: 'Todo',
//         icon: <LocalOfferIcon  style={{ color: "#cdcdcd" }}/>,
//         to: 'suppliertodo'
//     },
//     {
//         name: 'Services',
//         icon: <PlaylistAddCheckIcon  style={{ color: "#cdcdcd" }}/>,
//         to: 'quotation'
//     },
//     {
//         name: 'Sent Quotation',
//         icon: <AssistantIcon  style={{ color: "#cdcdcd" }}/>,
//         to: 'sentquotation'
//     },
//     {
//         name: 'Ledger',
//         icon: <BorderColorIcon style={{ color: "white" }} />,
//         to: 'supplierledger'
//     },
//     {
//         name: 'Help',
//         icon: <LiveHelpIcon  style={{ color: "#cdcdcd" }}/>,
//         to: 'suphelp'
//     },
//     {
//         name: 'Complain',
//         icon: <CallEndIcon  style={{ color: "#cdcdcd" }}/>,
//         to: 'supcomplain'
//     },
// ]
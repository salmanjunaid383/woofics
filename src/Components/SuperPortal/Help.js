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
        const { data: response } = axios.get(`https://api.woofics.com/api/help`,{
            headers:window.header
          })
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                }
            }, (Error) => {
                
            });

    }

    useEffect(() => {
        GetLed();
    }, [])

    function DeleteLed(id) {
        var result = window.confirm("Want to delete?");
        if (result) {
            const { data: response } = axios.delete(`https://api.woofics.com/api/help/${id}`,{
                headers:window.header
              })
                .then((response) => {
                    
                    GetLed()
                }, (Error) => {
                    
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
                                            <h3 className=" mb-0 text-center mx-auto">Lista De Ayuda</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            {blog == '' ? <div className="my-auto mx-auto w-100 text-center">Nada Que Mostrar...</div>
                                                : <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            
                                                            <th className="border-top-0 text-white">CONSULTA</th>
                                                            <th className="border-top-0 text-white">DESCRIPCIÓN</th>
                                                            <th className="border-top-0 text-white">FECHA</th>
                                                            <th className="border-top-0 text-white">COMPORTAMIENTO</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row">
                                                        {blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        
                                                                        <td className="txt-oflo">{(val.question).slice(0, 20) + "..."}</td>
                                                                        <td className="txt-oflo">{(val.description).slice(0, 20) + "..."}</td>
                                                                        <td className="txt-oflo">{(val.created_at).slice(0, 10)}</td>
                                                                        <td className="text-danger">
                                                                            <button class="btn text-white greenbtn text-white  mx-2" onClick={() => history.push(`/respuesta_de_ayuda/${val.id}`)}>Respuesta</button>
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
//         to: 'cotización_enviada'
//     },
//     {
//         name: 'Ledger',
//         icon: <BorderColorIcon style={{ color: "white" }} />,
//         to: 'supplierledger'
//     },
//     {
//         name: 'Help',
//         icon: <LiveHelpIcon  style={{ color: "#cdcdcd" }}/>,
//         to: 'ayudar'
//     },
//     {
//         name: 'Complain',
//         icon: <CallEndIcon  style={{ color: "#cdcdcd" }}/>,
//         to: 'suplicar'
//     },
// ]
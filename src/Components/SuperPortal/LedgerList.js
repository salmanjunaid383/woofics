import React, { useState, useEffect } from "react";
import {useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import { makeStyles} from '@material-ui/core/styles';
import CustomAdminAuth from "../CustomAdminAuth";
import StazBar from "./Stazbar";



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
    const { che } = useParams()


    function getSupplierledger() {

        const { data: response } = axios.get(`https://api.woofics.com/api/supplier_ledger_balance`)
            .then((response) => {
                setBlog(response.data)
                // 
            }, (Error) => {
                
            });
    }
    function getServiceledger() {

        const { data: response } = axios.get(`https://api.woofics.com/api/service_provider_balance`)
            .then((response) => {
                setBlog(response.data)
                // 
            }, (Error) => {
                
            });
    }

    useEffect(() => {
        if (che === "supplier") {
            getSupplierledger();
        } else {
            getServiceledger()
        }
    }, [])
  
    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
  
    return (
        <>
            <div className="d-sm-flex" id="text">
                <StazBar></StazBar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper bg-light">
                        <div class="container pb-lg-4" id="text">
                            <div className="row m-lg-5">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div style={{textAlign:"center"}}>
                                            <h3 className="box-title mb-0">Lista de libro mayor</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        <th className="border-top-0 text-white text-center">#</th>
                                                        <th className="border-top-0 text-white text-center">EQUILIBRIO</th>
                                                        <th className="border-top-0 text-white text-center">IDENTIFICACIÓN DEL PROVEEDOR</th>
                                                        <th className="border-top-0 text-white text-center">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="data-row">
                                                    {blog.map((val, key) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className="txt-oflo text-center">{val.id}</td>
                                                                    <td className="txt-oflo text-center">{val.balance}</td>
                                                                    <td className="txt-oflo text-center">{val.supplier_id ? val.supplier_id : val.service_provider_id}</td>
                                                                    <td className="txt-oflo text-center"><button className="btn greenbtn text-white" onClick={(e) => history.push(`/ledgerview/${che}/${val.supplier_id ? val.supplier_id : val.service_provider_id}`)}>Ver más</button></td>
                                                                </tr>
                                                            </>
                                                        )
                                                    }).reverse()}
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
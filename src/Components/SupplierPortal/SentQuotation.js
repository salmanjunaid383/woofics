import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import SideBar from './Sidebar';
import axios from 'axios';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import jwt_decode from 'jwt-decode'
import CustomSupplierAuth from "../CustomSupplierAuth";
import "../ClientPortal/quotation.css"

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function SentQuotation() {
    CustomSupplierAuth();
    let history = useHistory();
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/show_quotation/${decoded.sub}`,{
            headers:window.header
          })
            .then((response) => {
                if (response) {
                    setBlog(response.data)
                    
                }
            }, (Error) => {
                 
                
            });
    }, [])

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
  
    return (
        <>

            <div className="d-sm-flex">
              
                <SideBar></SideBar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                   <div className="page-wrapper bg-light">
                        <div class="container">
                            <div id="blog" class="row ">
                                <div class="container-fluid pb-lg-4 quotation-ipad">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-xl-12 col-lg-12 col-sm-12 border bg-light " style={{width:"1px"}}>
                                            <div className="d-md-flex mb-3">
                                                <h1 className=" h1 mb-0 text-center mx-auto">Gestionar Solicitudes</h1>
                                            </div>
                                            <hr className="w-50" />
                                            <div className="table-responsive salman-table-change">
                                                <table  id="for-table-setting" className="table no-wrap for-table-setting" style={{tableLayout:"auto"}} >
                                                    <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                        <tr>
                                                            <th className="border-top-0 text-white text-center">FECHA</th>
                                                            <th className="border-top-0 text-white text-center">DESCRIPCIÓN</th>
                                                            <th className="border-top-0 text-white text-center">COMENTARIOS</th>
                                                            <th className="border-top-0 text-white text-center">DÍAS DE ENTREGA</th>
                                                            <th className="border-top-0 text-white text-center">PRECIO</th>
                                                            <th className="border-top-0 text-white text-center">ACCIÓN</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-row" >
                                                    {blog == '' ? <tr scope="row"><td colspan="4"><h3 className="my-lg-3 mx-auto ">Nada Que Mostrar!</h3></td> </tr> :
                                               blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr style={{ height: '5rem' }} className="border-bottom">
                                                                        <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                        <td className="text-oflo text-center bold">{val.description}...</td>
                                                                        <td className="txt-oflo text-center bold">{val.extra_comments}</td>
                                                                        <td className="txt-oflo text-center bold">{val.delivery_days} Dias</td>
                                                                        <td className="txt-oflo text-center bold">{val.price}</td>
                                                                        <td className="txt-oflo text-center bold">
                                                                            <button  className="btn greenbtn text-white" value={val.id} onClick={() => { history.push(`/editar_cita/`+val.form_id); localStorage.setItem('qid', val.id) }} class={val.locked == 0 ? 'btn greenbtn text-white' : 'btn greenbtn text-white disabled'}>Editar</button>                                                                    </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-md-12 gap10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

           

        </>
    );
}


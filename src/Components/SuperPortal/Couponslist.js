import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { makeStyles} from '@material-ui/core/styles';
import StazBar from './Stazbar';
import CustomAdminAuth from "../CustomAdminAuth";



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function Coupons() {
    CustomAdminAuth();
    let history = useHistory();
    const [blog, setBlog] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/discount_coupons`)
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

    function DeleteLed(e) {
        var result = window.confirm("Want to delete?");
        if (result) {

            const { data: response } = axios.delete(`https://api.woofics.com/api/discount_coupons/${e}`)
                .then((response) => {
                    GetLed()
                }, (Error) => {
                    
                });
        }
    }


    const [res, setRes] = useState('');

    function ActivateLed(e) {
        var result = window.confirm("Do you want to activate this coupon? Rest of Activated Coupon will be Deactivated!");
        if (result) {
            const { data: response } = axios.put(`https://api.woofics.com/api/active/${e}`)
                .then((response) => {
                    setRes(response.data)
                    GetLed()
                }, (Error) => {
                    
                });
        }
    }

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();

    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }




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
                                    <div className="mr-auto">
                                        <a class="btn pull-right text-white  mb-3 greenbtn" onClick={() => history.push('/supcoupons')}>Crear Cupón</a>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="white-box">
                                        <div className="d-md-flex mb-3">
                                            <h3 className=" mb-0 h1 mx-auto text-center">Lista De Cupones</h3>
                                        </div>
                                        <div className="table-responsive salman-table-change">
                                            <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        
                                                        <th className="border-top-0 text-white text-white">TIPO DE CUPÓN</th>
                                                        <th className="border-top-0 text-white text-white">TIPO DE DESCUENTO</th>
                                                        <th className="border-top-0 text-white text-white">DESCRIPCIÓN</th>
                                                        <th className="border-top-0 text-white text-white">CÓDIGO</th>
                                                        <th className="border-top-0 text-white text-white">FECHA DE CADUCIDAD</th>
                                                        <th className="border-top-0 text-white text-white">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="data-row">

                                                    {blog == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">Nada Que Mostrar...</h3></td> </tr>
                                                        : blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        
                                                                        <td className="txt-oflo">{val.coupon_type}</td>
                                                                        <td className="txt-oflo">{val.discount_type}</td>
                                                                        <td className="txt-oflo">{(val.discount_discription).slice(0, 30) + "..."}</td>
                                                                        <td className="txt-oflo">{val.code}</td>
                                                                        <td className="txt-oflo">{(val.expiry_date).slice(0, 10)}</td>
                                                                        <td className="text-danger"><button class="btn text-white greenbtn"  onClick={() => ActivateLed(val.id)}>{val.active !== 0 ? 'Activated' : 'Activate'}</button><button class="btn text-white btn-danger mx-2" onClick={() => DeleteLed(val.id)}>Borrar</button></td>
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


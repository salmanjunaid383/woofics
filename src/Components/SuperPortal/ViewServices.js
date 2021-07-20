import React, { useState, useEffect } from "react";
import axios from 'axios';
import StazBar from './Stazbar';
import { makeStyles} from '@material-ui/core/styles';
import CustomAdminAuth from "../CustomAdminAuth";
import {useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function ViewServices() {
    CustomAdminAuth();
    let history = useHistory();
    const [blog, setBlog] = useState([]);

    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/form`)
            .then((response) => {
                if (response) {
                    console.log(response.data)
                    setBlog(response.data)
                }
            }, (Error) => {
                 
                console.log(Error);
            });

    }

    useEffect(() => {
        GetLed();
    }, [])


    var returnIndexValue = 0;
    function returnIndex(){
        returnIndexValue = returnIndexValue + 1;
        return returnIndexValue;
    }


    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
  







    // const container = window !== undefined ? () => window().document.body : undefined;




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
                                            <h3 className="box-title mb-0 h1 text-center mx-auto">Lista De Servicios</h3>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table no-wrap">
                                                <thead  className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                    <tr>
                                                        <th className="border-top-0 text-white text-center text-white">#</th>
                                                        <th className="border-top-0 text-white text-center text-white">NOMBRE</th>
                                                        <th className="border-top-0 text-white text-center text-white">DESCRIPCIÓN</th>
                                                        <th className="border-top-0 text-white text-center text-white">EMPRESA</th>
                                                        <th className="border-top-0 text-white text-center text-white">COMENTARIOS</th>
                                                        <th className="border-top-0 text-white text-center text-white">EL TIEMPO DE ENTREGA</th>
                                                        <th className="border-top-0 text-white text-center text-white">EMAIL</th>
                                                        <th className="border-top-0 text-white text-center text-white">COMPORTAMIENTO</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {blog == '' ? <tr scope="row"><td colspan="5"><h3 className="my-lg-3 mx-auto ">¡Nada que mostrar! Empiece a crear proyectos...</h3></td> </tr>
                                                        : blog.map((val, id) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{returnIndex()}</td>
                                                                        <td className="txt-oflo">{val.name}</td>
                                                                        <td className="txt-oflo">{val.description}</td>
                                                                        <td className="txt-oflo">{val.company}</td>
                                                                        <td className="txt-oflo">{val.comments}</td>
                                                                        <td className="txt-oflo">{val.delivery_time}</td>
                                                                        <td className="txt-oflo">{val.email}</td>
                                                                        <td className="text-danger"><button class="btn text-white greenbtn" onClick={() => history.push(`/viewservicemore/${val.id}`)}>Ver más</button></td>
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


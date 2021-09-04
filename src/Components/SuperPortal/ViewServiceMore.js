import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom'
import axios from 'axios';
import StazBar from './Stazbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CustomAdminAuth from "../CustomAdminAuth";


const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));

export default function ViewServiceMore() {
    // CustomAdminAuth();

    let { serid } = useParams();

    const [blog, setBlog] = useState([]);


    function GetLed() {
        const { data: response } = axios.get(`https://api.woofics.com/api/form_details/${serid}`,{
            headers:window.header
          })
            .then((response) => {
                if (response) {
                    setBlog(response.data.form)
                    // setservicet(response.data.package)
                    
                    
                }
            }, (Error) => {
                
            });

    }

    useEffect(() => {
        GetLed();
    }, [])




    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
   

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
                                    <div className="d-md-flex mb-3">
                                        <h3 className=" mb-0 h1 mx-auto text-center">Detalles Del Servicio</h3>
                                    </div>

                                    <table  id="for-table-setting" class="table table-hover">
                                        <tbody id="data-row">
                                            {/* {servicet ? <>
                                                <tr>
                                                    <td>Package Charge</td>
                                                    <td>{servicet.charge}</td>
                                                </tr>
                                                <tr>
                                                    <td>Package Name</td>
                                                    <td>{servicet.name}</td>
                                                </tr></> : null} */}
                                            <tr>
                                                <td>Nombre</td>
                                                <td>{blog.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{blog.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Clima adverso</td>
                                                <td>{blog.adverse_weather}</td>
                                            </tr>
                                            <tr>
                                                <td>Comprar</td>
                                                <td>{blog.buy}</td>
                                            </tr>
                                            <tr>
                                                                <td>Producto</td>
                                                                <td>{blog.product_type}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Imagen del producto</td>
                                                                <td><a style={{color:'grey'}} href={blog.product_image}>Imagen</a></td>
                                                            </tr>
                                            <tr>
                                                <td>Material De La Carcasa</td>
                                                <td>{blog.carcass_material}</td>
                                            </tr>

                                            <tr>
                                                <td>Comentarios</td>
                                                <td>{blog.comments}</td>
                                            </tr>
                                            <tr>
                                                <td>Empresa</td>
                                                <td>{blog.company}</td>
                                            </tr>
                                            <tr>
                                                <td>Contacto</td>
                                                <td>{blog.contact}</td>
                                            </tr>
                                            <tr>
                                                <td>Sistema De Control</td>
                                                <td>{blog.control_system}</td>
                                            </tr>
                                            <tr>
                                                <td>tipo De Cliente</td>
                                                <td>{blog.customer_type}</td>
                                            </tr>
                                            <tr>
                                                <td>El Tiempo De Entrega</td>
                                                <td>{blog.delivery_time}</td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                                <td>{blog.description}</td>
                                            </tr>
                                            <tr>
                                                <td>Documentos</td>
                                                <td>{blog.documents}</td>
                                            </tr>
                                            <tr>
                                                <td>Entidad</td>
                                                <td>{blog.entity}</td>
                                            </tr>
                                            <tr>
                                                <td>Cajas De Moscas</td>
                                                <td>{blog.fly_cases}</td>
                                            </tr>
                                            <tr>
                                                <td>Interior</td>
                                                <td>{blog.indoor}</td>
                                            </tr>
                                            <tr>
                                                <td>Instalación</td>
                                                <td>{blog.installation}</td>
                                            </tr>
                                            <tr>
                                                <td>Modelo</td>
                                                <td>{blog.model}</td>
                                            </tr>
                                            <tr>
                                                <td>Código Postal</td>
                                                <td>{blog.postal_code}</td>
                                            </tr>
                                            <tr>
                                                <td>Acceso a La Pantalla</td>
                                                <td>{blog.screen_access}</td>
                                            </tr>

                                            <tr>
                                                <td>Altura De La Pantalla</td>
                                                <td>{blog.screen_height}</td>
                                            </tr>
                                            <tr>
                                                <td>Orientación De La Pantalla</td>
                                                <td>{blog.screen_orientation}</td>
                                            </tr>
                                            <tr>
                                                <td>Uso De Pantalla</td>
                                                <td>{blog.screen_use}</td>
                                            </tr>
                                            <tr>
                                                <td>Ancho De Pantalla</td>
                                                <td>{blog.screen_width}</td>
                                            </tr>

                                            <tr>
                                                <td>Sector</td>
                                                <td>{blog.sector}</td>
                                            </tr>
                                            <tr>
                                                <td>Sensor</td>
                                                <td>{blog.sensor}</td>
                                            </tr>

                                            <tr>
                                                <td>Transporte</td>
                                                <td>{blog.shipping}</td>
                                            </tr>
                                            <tr>
                                                <td>Estructura</td>
                                                <td>{blog.structure}</td>
                                            </tr>


                                            <tr>
                                                <td>Distancia Visual</td>
                                                <td>{blog.visual_distance}</td>
                                            </tr>
                                            <tr>
                                                <td>Garantía</td>
                                                <td>{blog.warranty}</td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >

         


        </>
    );
}


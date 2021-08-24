import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import "../ClientPortal/allquotation.css"
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';
import Sidebar from './Sidebar'
import Modal from '@material-ui/core/Modal';
import jwt_decode from 'jwt-decode';
import Fade from '@material-ui/core/Fade';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import CustomClientAuth from "../CustomClientAuth";



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    },
    paper: {
        // backgroundColor: theme.palette.background.paper,
        // margin: theme.spacing(15, 2),
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        overflow: 'hidden',
        width: '60%',
        padding:'10%',
        height: 'auto',
        overflowY: 'scroll'
    },

}));





export default function AllQuotation() {
    CustomClientAuth();
    let history = useHistory();

    const { sid } = useParams();

    const [form, setForm] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');
    const [serviceb, setserviceb] = useState([]);
    const [servicet, setservicet] = useState([]);



    function Feedback() {
        const res = axios.get(`https://api.woofics.com/api/quotation/${sid}`)
            .then((res) => {
                if (res) {
                    setForm(res.data)
                    // history.push('/myservice');
                }
            }, (error) => {
                
                history.push('/allquotation');

            });

    }


    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/form_details/${sid}`)
            .then((response) => {
                setserviceb(response.data.form)
                setservicet(response.data.package)
                

            }, (Error) => {
                
            });
        Feedback();
        Services();
    }, [])



    const [data, setData] = useState([]);

    const sortArray = type => {
        const types = {
            price: 'price',
            delivery_days: 'delivery_days',
        };
        const sortProperty = types[type];
        const sorted = form.sort((a, b) =>
            b[sortProperty] - a[sortProperty]
        );
        
        setData(sorted);
    };

    const [service, setService] = useState('');

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token);

    function Services() {
        const response = axios
            .get(`https://api.woofics.com/api/form/${sid}`)
            .then(
                (response) => {
                    setService(response.data);
                },
                (error) => {
                    
                }
            );
    }


    function StartProj(vala) {
        var result = window.confirm("Do you really want to start project with this supplier ?");
        if (result) {
        const response = axios
            .post(`https://api.woofics.com/api/supplier_project`, {
                quotation_id: vala
            })
            .then(
                (response) => {
                    alert("Project started!");
                },
                (error) => {
                    
                }
            );
        }
    }
    function RedoOffer(val){
        var result = window.confirm("Are you sure ?");
        if (result) {
        const response = axios
            .put(`https://api.woofics.com/api/allow/`+val)
            .then(
                (response) => {
                    
                },
                (error) => {
                    
                }
            );
        }
    }
    const[items,setItems]=useState([])
    const [openpop2, setOpenpop2] = React.useState(false);
    const handleOpenpop2 = (val) => {
        const response = axios
            .get(`https://api.woofics.com/api/quotation_items/${val}`)
            .then(
                (response) => {
                    setItems(response.data)
                    console.log(response.data);
                },
                (error) => {
                    
                }
            );
        setOpenpop2(true);
    };
    const handleClosepop2 = () => {
        setOpenpop2(false);
    };


    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();





    return (
        <>


            <div className="d-sm-flex">

                <Sidebar></Sidebar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    



                    <div className="page-wrapper bg-light">
                        <div class="container">
                            <div id="blog" class="row ">
                                <div class="container-fluid pb-lg-4">
                                    <div className="row m-lg-5">
                                        <div className="col-md-12 col-lg-12 col-sm-12 border bg-light">
                                            <div className="d-md-flex mb-3">
                                                <h1 className=" h1 mb-0 text-center mx-auto manage-heading">Gestionar solicitudes</h1>
                                            </div>
                                            <select onChange={(e) => sortArray(e.target.value)} className="float-right lowest">
                                                <option value="price">El precio más bajo</option>
                                                <option value="delivery_days">Precio más alto</option>
                                            </select>
                                            <hr className="w-50" />
                                            <div className="col-md-12 mx-auto w-100">
                                                <div className="w-100">
                                                    <h3 className="w-100 text-center service-detail" style={{fontWeight:"bold"}}>Detalles del servicio</h3>
                                                    <table  id="for-table-setting" class="table table-hover">
                                                        <tbody id="data-row">
                                                            {servicet  ? <>
                                                                <tr>
                                                                    <td>Cargo por paquete</td>
                                                                    <td>{servicet.charge}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Nombre del paquete</td>
                                                                    <td>{servicet.name}</td>
                                                                </tr></> : null}
                                                            <tr>
                                                                <td>Nombre</td>
                                                                <td>{serviceb.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Correo electrónico</td>
                                                                <td>{serviceb.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Clima adverso</td>
                                                                <td>{serviceb.adverse_weather}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Producto</td>
                                                                <td>{serviceb.product_type}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Imagen del producto</td>
                                                                <td><a style={{color:'grey'}} href={serviceb.product_image}>Imagen</a></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Comprar</td>
                                                                <td>{serviceb.buy}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Material de la carcasa</td>
                                                                <td>{serviceb.carcass_material}</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Comentarios</td>
                                                                <td>{serviceb.comments}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Compañía</td>
                                                                <td>{serviceb.company}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Contacto</td>
                                                                <td>{serviceb.contact}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sistema de control</td>
                                                                <td>{serviceb.control_system}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Tipo de Cliente</td>
                                                                <td>{serviceb.customer_type}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>El Tiempo de Entrega</td>
                                                                <td>{serviceb.delivery_time}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Descripción</td>
                                                                <td>{serviceb.description}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Documentos</td>
                                                                <td>{serviceb.documents}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Entidad</td>
                                                                <td>{serviceb.entity}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Cajas de moscas</td>
                                                                <td>{serviceb.fly_cases}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Interior</td>
                                                                <td>{serviceb.indoor}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Instalación</td>
                                                                <td>{serviceb.installation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Modelo</td>
                                                                <td>{serviceb.model}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Código postal</td>
                                                                <td>{serviceb.postal_code}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Acceso a la Pantalla</td>
                                                                <td>{serviceb.screen_access}</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Altura de la Pantalla</td>
                                                                <td>{serviceb.screen_height}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Orientación de la Pantalla</td>
                                                                <td>{serviceb.screen_orientation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Uso de Pantalla</td>
                                                                <td>{serviceb.screen_use}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Ancho de Pantalla</td>
                                                                <td>{serviceb.screen_width}</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Sector</td>
                                                                <td>{serviceb.sector}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sensor</td>
                                                                <td>{serviceb.sensor}</td>
                                                            </tr>

                                                            <tr>
                                                                <td>Transporte</td>
                                                                <td>{serviceb.shipping}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Estructura</td>
                                                                <td>{serviceb.structure}</td>
                                                            </tr>


                                                            <tr>
                                                                <td>Distancia Visual</td>
                                                                <td>{serviceb.visual_distance}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Garantía</td>
                                                                <td>{serviceb.warranty}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div> <hr />
                                            </div>
                                            <div className="table-responsive salman-table-change">
                                                {form == "" ? <h3 className="text-center my-auto">Sin cotización!</h3>
                                                    : <table  id="for-table-setting" className="table no-wrap for-table-setting" >
                                                        <thead id="heading-row"className="py-3" style={{ backgroundColor: "#f25c8a", borderRadius: 10 }}>
                                                            <tr>
                                                                <th className="border-top-0 text-white text-center">FECHA</th>
                                                                <th className="border-top-0 text-white text-center">PETICIONES</th>
                                                                <th className="border-top-0 text-white text-center">Comentario</th>
                                                                <th className="border-top-0 text-white text-center">OFERTAS</th>
                                                                <th className="border-top-0 text-white text-center">DÍAS DE ENTREGA</th>
                                                                <th className="border-top-0 text-white text-center">COMPORTAMIENTO</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="data-row" >

                                                            {form.map((val, id) => {
                                                                return (
                                                                    <>
                                                                        <tr style={{ height: '5rem' }} className="border-bottom text-center ">
                                                                            <td className="txt-oflo text-center bold">{val.created_at.slice(0, 10)}</td>
                                                                            <td className="text-oflo text-center bold">{val.description}...</td>
                                                                            <td className="text-oflo text-center bold">{val.extra_comments}...</td>
                                                                            <td style={{padding:"10px"}} className={val.price > 15000 ? 'txt-oflo text-center bold  badge badge-pill badge-danger' : val.price > 10000 ? 'txt-oflo text-center bold   badge badge-pill badge-success' : val.price > 100 ? 'txt-oflo text-center bold   badge badge-pill badge-info' : val.price > 500 ? 'txt-oflo text-center bold   badge badge-pill badge-warning' : val.price > 1000 ? 'txt-oflo text-center bold   badge badge-pill badge-success' : val.price > 5000 ? 'txt-oflo text-center bold   badge badge-pill badge-secondary' : val.price > 10000 ? 'txt-oflo text-center bold   badge badge-pill badge-primary' : val.price > 20000 ? 'txt-oflo text-center bold   badge badge-pill badge-info' : val.price > 500000 ? 'txt-oflo text-center bold   badge badge-pill badge-danger' : 'txt-oflo text-center bold badge badge-pill badge-danger'}>$ {val.price}</td>
                                                                            <td className="txt-oflo text-center bold">{val.delivery_days} Days</td>
                                                                            <td className="txt-oflo text-center bold">
                                                                            <button class="btn marginBottom10 greenbtn text-white" value={val.id} onClick={() => handleOpenpop2(val.id)} >Detalle</button>
                                                                                <button class="btn marginBottom10 greenbtn text-white" value={val.id} onClick={() => RedoOffer(val.id)} >Rehacer Oferta</button>
                                                                                <button class="btn marginBottom10 greenbtn text-white" value={val.id} onClick={() => StartProj(val.id)} >Iniciar Proyecto</button>
                                                                            </td>
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


                                <div class="col-md-12 gap10"></div>
                            </div>
                        </div>
                    </div>



                </main>
            </div>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openpop2}
            onClose={handleClosepop2}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                
            <Fade in={openpop2}>
                    <div className={classes.paper}>
                        <div className="container rounded">
                            <div className="container bg-white rounded ">
                                <div className="row">

                                <table  id="for-table-setting text-center" class="table table-hover">
                                    <tr>
                                        <td style={{textAlign:"center"}}>Name</td>
                                        <td style={{textAlign:"center"}}>Price</td>
                                    </tr>

                                  <tbody id="data-row"> 
                                  {
                                  items.map((val, id) => {
                                    return (
                                        <>

                                                                <tr>
                                                                    <td>{val.item}</td>
                                                                    <td>{val.price}€</td>
                                                                </tr>    

                                        </>
                                    )
                                  }
                                  )}
                                  </tbody>
                                  </table>
                                                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

        </>
    );
}


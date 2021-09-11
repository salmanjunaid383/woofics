import React from 'react';
import '../css/visual scheme.css';
import pnglogo from '../images/vone.png';
import v3 from '../images/v3.png';
import v4 from '../images/v4.jpg';
import pnglogo2 from '../images/v2.jpg'
import { Link } from 'react-router-dom';

function VisualScheme() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="woofic_visiual_content">
                            <div className="woofic_visiual_representation">
                                cómo funciona la plataforma
                    </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="main-parent">

            <div className="container">
                {/* <div class="woofic_visiual_top"> */}
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <div className="woofic_visiual_left">
                            <div className="woofic_visiual_heading ">
                                Responda Nuestro Cuestionario
                                {/* <div class="woofic_visiual_sub-heading">
                                </div> */}
                            </div>
                            <div className="woofic_visiual_hline">

                            </div>
                            <div className="woofic_visiual_para">
                                En menos de 2 minutos puede completar nuestro formulario, que proporcionará suficiente información para que los proveedores le hagan una oferta formal.
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="woofic_visiual_right">
                            <img className="img-fluid" src={pnglogo} />
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>

            {/* SECOND SECTION */}
            <br />
            <br />
            <br />
            <div className="container">
                {/* <div class="woofic_visiual_top woofic_visual_middle"> */}
                <div className="row second-section">
                    <div className="col-md-4 col-sm-12">
                        <div className="woofic_visiual_right">
                            <img className="img-fluid" src={v3} />
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div className="woofic_visiual_left">
                            <div className="woofic_visiual_heading">
                                Reciba y compare ofertas
                                {/* <div class="woofic_visiual_sub-heading">
                                    Start today for great future
                                </div> */}
                            </div>
                            <div className="woofic_visiual_hline">
                            </div>
                            <div className="woofic_visiual_para">
                                Los proveedores tienen 48 horas para resolver dudas y enviarle una propuesta formal. Una vez recibidas las propuestas, compáralas y negocia con los proveedores.                            </div>
                        </div>
                    </div>

                </div>
                {/* </div> */}
            </div>

            <br />
            <br />
            <br />
            {/* THIRD SECTIONS */}
            <div className="container">
                {/* <div class="woofic_visiual_top"> */}

                <div className="row">
                    <div className="col-md-8 col-sm-12">

                        <div className="woofic_visiual_left">
                            <div className="woofic_visiual_heading ">
                            Contratar a una proveedora
                                    {/* <div class="woofic_visiual_sub-heading">
                                    Start today for great future
                                    </div> */}
                            </div>
                            <div className="woofic_visiual_hline">

                            </div>
                            <div className="woofic_visiual_para">
                            Con Woofic puedes ahorrar hasta un 30%, en lugar de contactar con los proveedores
De forma individual, realiza los trámites online de forma segura.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="woofic_visiual_right">
                            <img className="img-fluid" src={pnglogo2} />
                        </div>
                    </div>
                </div>
              
                {/* Four SECTION */}
            </div>
            <br />
            <br />
            <br />
            <div className="container">
                {/* <div class="woofic_visiual_top woofic_visual_middle"> */}
                <div className="row second-section">
                    <div className="col-md-4 col-sm-12">
                        <div className="woofic_visiual_right">
                            <img className="img-fluid" src={v4} />
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div className="woofic_visiual_left">
                            <div className="woofic_visiual_heading">
                                Califica al proveedor
                                {/* <div class="woofic_visiual_sub-heading">
                                    Start today for great future
                                </div> */}
                            </div>
                            <div className="woofic_visiual_hline">
                            </div>
                            <div className="woofic_visiual_para">
                            Una vez cerrado el proyecto con un proveedor, evalúe según su
experiencia, para que el resto del usuario pueda tomar mejores decisiones.
                           </div>
                        </div>
                    </div>

                </div>
                {/* </div> */}
            </div>

            </div>
            <br />

            {/* <br />
                <br /> */}
            <div className="receive_offer text-center">
                <Link to="/cita_principal">recibir oferta</Link>
            </div>
        </>
    );

}
export default VisualScheme;
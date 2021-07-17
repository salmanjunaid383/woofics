import React from 'react';
import "../css/banner.css"
import banner from '../images/speaker.png'
import one from '../images/one.jpg';
import two from '../images/two.jpg';
import three from '../images/three.jpg';
import four from '../images/four.png';
import five from '../images/five.png';
import six from '../images/six.png';
import seven from '../images/seven.jpg';
import eight from '../images/eight.png';
import { useHistory } from 'react-router-dom';

function Banner(){
    let history = useHistory();

    return(
            <>
           <div class="woofic_banner text-center ">
                <div class="woofic_banner_heading">
                   <span style={{color:"#333333"}}> SERVICIOS </span>/ <span style={{color:"#F72A85"}}>PROFESIONAL</span>
                </div>
                <div class="woofic_banner_sub-heading mb-5   ">
                Encuentre soluciones personalizadas y a medida para sus proyectos
                </div>
                <div class="woofic_first_row">
                    <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/REPAIRS')}>
                        <div class="woofic_element_image">
                            <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={one}/>
                        </div>
                        <div class="woofic_element_heading">
                        REFACCIÓN
                        </div>
                        <div class="woofic_element_paragraph">
                        Reparación y configuración de componentes para pantallas de leds (leds, módulos, chips, tarjetas ...).

                                
                        </div>

                    </div>
                    <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/ELECTRICIAN')}>
                        <div class="woofic_element_image">
                            <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={two}/>
                        </div>
                        <div class="woofic_element_heading">
                        ELECTRICISTA
                        </div>
                        <div class="woofic_element_paragraph">                               
                        Realización de instalaciones y cuadros eléctricos para su proyecto.                               
                        </div>
                    </div>

                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/ARCHITECTS')}>
                                <div class="woofic_element_image">
                                <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={three}/>
                                </div>
                            <div class="woofic_element_heading">
                            ARQUITECTOS / INGENIERAS
                                </div>
                                <div class="woofic_element_paragraph">
                                Proyectos aprobados y cumpliendo con la normativa de cada municipio.
                            </div>

                        </div>
                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/GRAPHIC')}>
                            <div class="woofic_element_image">
                                <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={four}/>
                            </div>
                            <div class="woofic_element_heading">
                            DISEÑADOR GRAFICO
                            </div>
                            <div class="woofic_element_paragraph">
                            Creación de contenido específico (Imagen, video ...) para tu pantalla led.
                            </div>
                        </div>
                    </div>
{/* SECOND ROW */}

                        <div class="woofic_first_row woofic_row_changes">
                        <div class="woofic_first_element p-4  woofic_repair_box" onClick={()=>history.push('/viewservice/SCREEN')}>
                            <div class="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={five}/>
                            </div>
                            <div class="woofic_element_heading">
                            GESTIÓN DE PANTALLAS
                            </div>
                            <div class="woofic_element_paragraph">  
                            Gestión de contenido profesional e inteligente para pantalla LED (software y hardware).
                            </div>
                        </div>
                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/STRUCTURES')}>
                            <div class="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="img-fluid" src={six}/>
                            </div>
                            <div class="woofic_element_heading">
                            ESTRUCTURAS
                            </div>
                            <div class="woofic_element_paragraph">
                            Fabricación de estructuras metálicas a medida (monoposte, fachada, escaparate ...).
                                
                            </div>
                        </div>
                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/ADVERTISE')}>
                            <div class="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={seven}/>
                            </div>
                            <div class="woofic_element_heading">
                            PUBLICIDAD EN PANTALLAS
                            </div>
                            <div class="woofic_element_paragraph">
                                
                            Publicita en pantallas Led en toda España o en tu ciudad.
                                
                            </div>
                        </div>

                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/INSTALLER')}>
                            <div class="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={eight}/>
                            </div>
                            <div class="woofic_element_heading">
                            INSTALADORA
                            </div>
                            <div class="woofic_element_paragraph">
                            Instalaciones y puesta en marcha de soluciones led.
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}
export default Banner;
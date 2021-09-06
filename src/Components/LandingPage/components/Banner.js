import React, { useState, useEffect } from "react";
import "../css/banner.css"
import axios from "axios";
import ModalImage from "react-modal-image";
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
import {Animated} from "react-animated-css";
import pic1 from "../components/space.jpg"

function Banner(){
    let history = useHistory();
    const [inspired,setResponseData]=useState([])
    useEffect(() => {
        const { data: response } = 
        axios.get(`https://api.woofics.com/api/latest_inspired`,{
                    headers:window.header
                  })
                    .then((response) => {
                        setResponseData(response.data)
                    }, (error) => {
                        console.log(error)
                    });
    })

    return(
            <>
                  <div className="offer_sec" style={{textAlign:"center"}}>
                      <h3 style={{padding:"20px", fontWeight:"bold", color:"#F62B84", fontSize:"30px"}}>Get Inspired</h3>
                 
              <div className="pic_sec" style={{padding:"20px"}}>
                {
                    inspired.map((val,id) => {
                        return (
                            <>
                            <div className="col-md-4" >
                            <ModalImage small={val.url}
                                large={val.url}
                                
                                alt={val.name}
                                className="img-fluid ima hvr-grow pic1">
                                
                                                </ModalImage>
                            </div>
                            </>
                        )
                    })
                }
              
                  {/* <div className="pic1">
                      <ModalImage small={pic1}
                         large={pic1}
                        alt={pic1}>

                                                </ModalImage>
                      
                  </div>
                  <div className="pic1">
                  <img src={pic1}/>
                  </div>
                  <div className="pic1">
                  <img src={pic1}/>
                  </div> */}

              </div>
              </div>



           <div class="woofic_banner text-center ">
          
                <div class="woofic_banner_heading">
                   <span style={{color:"#333333"}}> Servicios </span><span style={{color:"#F62B84"}}>/</span> <span style={{color:"#F62B84"}}>profesional</span>
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
                        refacción
                        </div>
                        <div class="woofic_element_paragraph">
                        Reparación y configuración de componentes para pantallas de leds (leds, módulos, chips, tarjetas ...).

                                
                        </div>

                    </div>
                    <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/ELECTRICIAN')}>
                        <div class="woofic_element_image">
                            <img style={{borderRadius:"50%",width:'60px',height:'60px'}}  src={two}/>
                        </div>
                        <div class="woofic_element_heading">
                        electricista
                        </div>
                        <div class="woofic_element_paragraph">                               
                        Realización de instalaciones y cuadros eléctricos para su proyecto.                               
                        </div>
                    </div>

                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/ARCHITECTS')}>
                                <div class="woofic_element_image" style={{overflow:"hidden"}}>
                                <img style={{borderRadius:"50%",width:'70px',height:'70px',marginTop:"-8px", marginLeft:"-5px"}}  src={three}/>
                                </div>
                            <div class="woofic_element_heading">
                            arquitectos / ingenieras
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
                            diseñador grafico
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
                            gestión de pantallas
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
                            estructuras
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
                            publicidad en pantallas
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
                            instaladora
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
import React, { useState, useEffect } from "react";
import "../css/banner.css"
import axios from "axios";
import ModalImage from "react-modal-image";
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
    const [inspired,setResponseData]=useState([])
    useEffect(() => {
        const { data: response } = 
        axios.get(`https://api.woofics.com/api/latest_inspired`,{
                    headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
                  })
                    .then((response) => {
                        setResponseData(response.data)
                    }, (error) => {
                        console.log(error)
                    });
    },[])

    return(
            <>
            <div className="offer_sec"  style={inspired.length  === 0 ? {display:'none'}: {textAlign:"center"}}>
                      <h3 style={{padding:"20px", fontWeight:"bold", color:"#F62B84", fontSize:"30px"}}>Inspírate</h3>
                 
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



           <div className="woofic_banner text-center ">
          
                <div className="woofic_banner_heading">
                   <span style={{color:"#333333"}}> Servicios </span><span style={{color:"#F62B84"}}>/</span> <span style={{color:"#F62B84",textTransform:'capitalize'}}>Profesional</span>
                </div>
                <div className="woofic_banner_sub-heading mb-5   ">
                Encuentre soluciones personalizadas y a medida para sus proyectos
                </div>
                <div className="woofic_first_row">
                    <div className="woofic_first_element p-4" onClick={()=>history.push('/servicio_de_vista/REPAIRS')}>
                        <div className="woofic_element_image">
                            <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={one}/>
                        </div>
                        <div className="woofic_element_heading">
                        Reparaciones
                        </div>
                        <div className="woofic_element_paragraph">
                        Reparación y configuración de componentes para pantallas de leds (leds, módulos, chips, tarjetas ...).

                                
                        </div>

                    </div>
                    <div className="woofic_first_element p-4" onClick={()=>history.push('/servicio_de_vista/ELECTRICIAN')}>
                        <div className="woofic_element_image">
                            <img style={{borderRadius:"50%",width:'60px',height:'60px'}}  src={two}/>
                        </div>
                        <div className="woofic_element_heading">
                        Electricistas
                        </div>
                        <div className="woofic_element_paragraph">                               
                        Realización de instalaciones y cuadros eléctricos para su proyecto.                               
                        </div>
                    </div>

                        <div className="woofic_first_element p-4" onClick={()=>history.push('/servicio_de_vista/ARCHITECTS')}>
                                <div className="woofic_element_image" style={{overflow:"hidden"}}>
                                <img style={{borderRadius:"50%",width:'70px',height:'70px',marginTop:"-8px", marginLeft:"-5px"}}  src={three}/>
                                </div>
                            <div className="woofic_element_heading">
                            Arquitectura / Ingeniería
                                </div>
                                <div className="woofic_element_paragraph">
                                Realización de proyectos visados y cumpliando las normativas
                            </div>

                        </div>
                        <div className="woofic_first_element p-4" onClick={()=>history.push('/servicio_de_vista/GRAPHIC')}>
                            <div className="woofic_element_image">
                                <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={four}/>
                            </div>
                            <div className="woofic_element_heading">
                            Diseño Gráfico
                            </div>
                            <div className="woofic_element_paragraph">
                            Creación de contenido especifico para tu pantalla Led y LCD
                            </div>
                        </div>
                    </div>
{/* SECOND ROW */}

                        <div className="woofic_first_row woofic_row_changes">
                        <div className="woofic_first_element p-4  woofic_repair_box" onClick={()=>history.push('/servicio_de_vista/SCREEN')}>
                            <div className="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={five}/>
                            </div>
                            <div className="woofic_element_heading">
                            gestión de pantallas
                            </div>
                            <div className="woofic_element_paragraph">  
                            Soluciones para la gestión profesional e inteligentes de pantallas led y LCD
                            </div>
                        </div>
                        <div className="woofic_first_element p-4" onClick={()=>history.push('/servicio_de_vista/STRUCTURES')}>
                            <div className="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="img-fluid" src={six}/>
                            </div>
                            <div className="woofic_element_heading">
                            estructuras
                            </div>
                            <div className="woofic_element_paragraph">
                            Fabricación de estructuras metálicas a medida (monoposte, fachada, escaparate ...).
                                
                            </div>
                        </div>
                        <div className="woofic_first_element p-4" onClick={()=>history.push('/servicio_de_vista/ADVERTISE')}>
                            <div className="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={seven}/>
                            </div>
                            <div className="woofic_element_heading">
                            publicidad 
                            </div>
                            <div className="woofic_element_paragraph">
                                
                            Anunciate y consigue anunciantes
                                
                            </div>
                        </div>

                        <div className="woofic_first_element p-4" onClick={()=>history.push('/servicio_de_vista/INSTALLER')}>
                            <div className="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={eight}/>
                            </div>
                            <div className="woofic_element_heading">
                            Instalaciones
                            </div>
                            <div className="woofic_element_paragraph">
                            Instalaciones, configuraciones y puestas en marcha de soluciones led.
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}
export default Banner;
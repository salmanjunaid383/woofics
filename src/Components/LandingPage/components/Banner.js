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
                   <span style={{color:"#333333"}}> SERVICES </span>/ <span style={{color:"#F72A85"}}>PROFESSTIONAL</span>
                </div>
                <div class="woofic_banner_sub-heading mb-5   ">
                Find personalized and tailored solutions for your projects
                </div>
                <div class="woofic_first_row">
                    <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/REPAIRS')}>
                        <div class="woofic_element_image">
                            <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={one}/>
                        </div>
                        <div class="woofic_element_heading">
                        REPAIRS
                        </div>
                        <div class="woofic_element_paragraph">
                        Component repair and configuration for led screens (leds, modules, chips, cards ...).

                                
                        </div>

                    </div>
                    <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/ELECTRICIAN')}>
                        <div class="woofic_element_image">
                            <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={two}/>
                        </div>
                        <div class="woofic_element_heading">
                        ELECTRICIAN
                        </div>
                        <div class="woofic_element_paragraph">                               
                        Realization of installations and electrical panels for your project.                               
                        </div>
                    </div>

                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/ARCHITECTS')}>
                                <div class="woofic_element_image">
                                <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={three}/>
                                </div>
                            <div class="woofic_element_heading">
                            ARCHITECTS / ENGINEERS
                                </div>
                                <div class="woofic_element_paragraph">
                                Projects approved and complying with the regulations of each municipality.
                            </div>

                        </div>
                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/GRAPHIC')}>
                            <div class="woofic_element_image">
                                <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={four}/>
                            </div>
                            <div class="woofic_element_heading">
                            GRAPHIC DESIGNER
                            </div>
                            <div class="woofic_element_paragraph">
                            Creation of specific content (Image, video ...) for your led screen.
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
                            SCREEN MANAGEMENT
                            </div>
                            <div class="woofic_element_paragraph">  
                            Professional and intelligent content management for led display (software and hardware).
                            </div>
                        </div>
                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/STRUCTURES')}>
                            <div class="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="img-fluid" src={six}/>
                            </div>
                            <div class="woofic_element_heading">
                            STRUCTURES
                            </div>
                            <div class="woofic_element_paragraph">
                            Manufacture of custom metal structures (monopost, facade, showcase ...).
                                
                            </div>
                        </div>
                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/ADVERTISE')}>
                            <div class="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={seven}/>
                            </div>
                            <div class="woofic_element_heading">
                            ADVERTISE ON SCREENS
                            </div>
                            <div class="woofic_element_paragraph">
                                
                            Advertise on Led screens throughout Spain or in your city.
                                
                            </div>
                        </div>

                        <div class="woofic_first_element p-4" onClick={()=>history.push('/viewservice/INSTALLER')}>
                            <div class="woofic_element_image">
                             <img style={{borderRadius:"50%",width:'60px',height:'60px'}} className="" src={eight}/>
                            </div>
                            <div class="woofic_element_heading">
                            INSTALLER
                            </div>
                            <div class="woofic_element_paragraph">
                            Installations and commissioning of led solutions.
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}
export default Banner;
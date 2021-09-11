import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../css/footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import footer_logo from '../images/woofics-new/WhatsApp-Image-2021-08-25-at-2.43-Copy.png';





function Footer() {
    const [label,setLabel]=useState('');
    const [value,setValue]=useState('');
    
    const [dot,getDot]=useState([]);

    const [text,getText]=useState([]);
    var index=1;

    function GetDot(){
        const { data: response } = axios.get(`https://api.woofics.com/api/footer`)
            .then((response) => {
                if(response.data)
                {
                    getDot(response.data);
                }
                
                
            }, (Error) => {
                
            });
        
            const { data: responses } = axios.get(`https://api.woofics.com/api/slogun`)
            .then((response) => {
                if(response.data)
                getText(response.data);
                
            }, (Error) => {
                
            });
    }
    useEffect(() => {
        GetDot();
    }, [])

  


    return (
        <>
            {/* <div style={{marginTop:'-50px' }}> */}
            {/* <div class="woofic_footer"> */}
            

            
            <div className="container-fluid my-auto pt-5 pb-5 backimg" style={{bottom:'0px'}} >
                <div className="row text-center my-auto pt-5 ipad">
                    <div className="col-md-4 col-sm-12 text-center wooficsfooter footer-margin" >

                        <div className="woofic_footer_content text-center">
                            <div className="woofic_flex_parent">

                                <div className="woofic_left_side">
                                    <div className="woofic_footer_logo mb-4 ">
                                        <img src={footer_logo} style={{ width: 250 }} />
                                    </div>
                                    <div className="text-white mb-4 p leftside-text">
                                        {
                                            text.map((val,id) => {
                                                return (
                                                    <>
                                                    {val.slogun}
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="woofic_social_logo ">
                                        <a target="_blank" href="https://www.facebook.com/Woofic-110333384466812" rel="noreferrer"> <FacebookIcon className="text-white mx-2" /></a>
                                        <a target="_blank" href="https://www.instagram.com/woofics_com/" rel="noreferrer"> <InstagramIcon className="text-white mx-2" /></a>
                                        <a target="_blank" href="https://twitter.com/Woofic1" rel="noreferrer"> <TwitterIcon className="text-white mx-2" /></a>
                                        <a target="_blank" href="https://www.linkedin.com/company/woofic" rel="noreferrer"> <LinkedInIcon className="text-white mx-2" /></a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12  text-center marginclass footer-margin footer-new" >

                        <div className="woofic_middle_side text-center mb-3 mx-auto">
                            <ol>
                                <li className="my-3">
                                    <Link className="text-white h5" to="/sobre_nosotros/1">  Sobre nosotras </Link>
                                </li>
                                <li className="my-3">
                                    <Link className="text-white h5" to="/sobre_nosotros/3" style={{textTransform:"capitalize"}}> Contacto </Link>
                                </li>
                                <li className="my-3">
                                    <Link className="text-white h5" to="/allblog" style={{textTransform:"capitalize"}}> Blog </Link>
                                </li>
                                <li className="my-3">
                                    <Link className="text-white h5" to="/sobre_nosotros/2" style={{textTransform:"capitalize"}}> Preguntas más frecuentes </Link>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="col-md-4 col-sm-12 pr-md-5 marginclass footer-margin footer-new" >
                        <div className="row  text-center wooficslogo footer-right-side" >
                        {
                            dot.map((val,id) => {
                                return (
                                    <>
                                        <div className="col-md-6 col-sm-12 col-xs-6" >
                                            <img src={val.value} className="footerLogo"  alt={val.label}/>
                                        </div>
                                    </>
                                )
                            })
                        }
                            


                        </div>
                    </div>
                </div>

                {/* </div> */}
                
            </div>
            <div className="container-fluid woofic_search_sec text-center" style={{ backgroundColor: '#934CFF' }}>
                <div className="row p-lg-2">
                    <div className="col-sm-12 col-md-12 text-center">
                        <div className="text-white text-center">
                            Copyright © 2021 Woofic.com, todos los derechos reservados

                            <div className=" mt-3 text-center">
                                <div className=" text-center ">
                                    <div className=" text-center d-flex justify-content-center footer-label">
                                        <div className="border-right px-2">
                                            <Link  to="/Condiciones-Términos" className="text-white">Términos Y Condiciones</Link>
                                        </div>
                                        <div className="mx-2 ">
                                            <Link to="/Política-de-privacidad"  className="text-white">Política De Privacidad</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            
        </>
    );
}
export default Footer;
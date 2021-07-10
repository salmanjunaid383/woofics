import React from 'react';
import '../css/footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import footer_logo from '../images/Woofic-2.png';
import footer_logo2 from '../images/Logo-2.png';
import footer_logo3 from '../images/Logo-3.png';
import footer_logo4 from '../images/Logo-1.png';
import footer_logo5 from '../images/Logo-4.png';
import { Link } from 'react-router-dom'



function Footer() {
    return (
        <>
            {/* <div style={{marginTop:'-50px' }}> */}
            {/* <div class="woofic_footer"> */}
            <div class="container-fluid my-auto pt-5 pb-5 backimg" >
                <div class="row text-center my-auto pt-5 ipad">
                    <div class="col-md-4 col-sm-12 text-center wooficsfooter footer-margin" >

                        <div class="woofic_footer_content text-center">
                            <div class="woofic_flex_parent">

                                <div class="woofic_left_side">
                                    <div class="woofic_footer_logo mb-4 ">
                                        <img src={footer_logo} style={{ width: 250 }} />
                                    </div>
                                    <div class="text-white mb-4 p leftside-text">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                    </div>
                                    <div class="woofic_social_logo ">
                                        <a target="_blank" href="https://www.facebook.com/Woofic-110333384466812"> <FacebookIcon className="text-white mx-2" /></a>
                                        <a target="_blank" href="woofic.com@gmail.com"> <InstagramIcon className="text-white mx-2" /></a>
                                        <a target="_blank" href="woofic.com@gmail.com"> <TwitterIcon className="text-white mx-2" /></a>
                                        <a target="_blank" href="https://www.linkedin.com/company/woofic"> <LinkedInIcon className="text-white mx-2" /></a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12  text-center marginclass footer-margin" >

                        <div class="woofic_middle_side text-center mb-3 mx-auto">
                            <ol>
                                <li className="my-3">
                                    <Link className="text-white h5" to="/aboutus">  ABOUT US </Link>
                                </li>
                                <li className="my-3">
                                    <Link className="text-white h5" to="/contact"> CONTACT </Link>
                                </li>
                                <li className="my-3">
                                    <Link className="text-white h5" to="/allblog"> BLOG </Link>
                                </li>
                                <li className="my-3">
                                    <Link className="text-white h5" to="/discussionforum"> FAQ </Link>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-12 pr-md-5 marginclass footer-margin" >
                        <div className="row  text-center wooficslogo footer-right-side" >
                            <div className="col-md-6 col-sm-12 col-xs-6">
                                <a href="https://stripe.com/" target="_blank" >  <img src={footer_logo4} className="footerLogo" /></a>

                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-6">
                                <a href="https://www.google.com/partners/" target="_blank">  <img src={footer_logo2} className="footerLogo" /></a>

                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-6">

                                <a href="https://www.thawte.com/" target="_blank">  <img src={footer_logo3} className="footerLogo" /></a>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-6">
                                <a href="https://www.trustpilot.com/" target="_blank">  <img src={footer_logo5} className="footerLogo" /></a>

                            </div>


                        </div>
                    </div>
                </div>

                {/* </div> */}
            </div>
            <div className="container-fluid woofic_search_sec text-center " style={{ backgroundColor: '#934cff' }}>
                <div className="row p-lg-2">
                    <div className="col-sm-12 col-md-12 text-center">
                        <div className="text-white text-center">
                            Copyright © 2021 Woofic.com, all rights reserved

                            <div class=" mt-3 text-center">
                                <div class=" text-center ">
                                    <div class=" text-center d-flex justify-content-center footer-label">
                                        <div className=" border-right px-2  ">
                                            <a href="https://carnovo.com/en/terms-and-conditions" target="_blank" className="text-white">TERMS AND CONDITIONS</a>
                                        </div>
                                        <div className=" border-right px-2">
                                            <a href="https://carnovo.com/en/legal-notice" target="_blank" className="text-white">LEGAL WARNING</a>
                                        </div>
                                        <div className="mx-2 ">
                                            <a href="https://carnovo.com/es/politica-de-privacidad" target="_blank" className="text-white">PRIVACY POLICY</a>
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
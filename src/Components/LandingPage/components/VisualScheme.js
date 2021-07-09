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
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div class="woofic_visiual_content">
                            <div class="woofic_visiual_representation">
                                 HOW THE PLATFORM WORKS
                    </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="main-parent">

            <div class="container">
                {/* <div class="woofic_visiual_top"> */}
                <div class="row">
                    <div className="col-md-8 col-sm-12">
                        <div class="woofic_visiual_left">
                            <div class="woofic_visiual_heading ">
                                Answer Our Questionnaire
                                {/* <div class="woofic_visiual_sub-heading">
                                </div> */}
                            </div>
                            <div class="woofic_visiual_hline">

                            </div>
                            <div class="woofic_visiual_para">
                                In less than 2 minutes you can fill out our form, which will provide enough information for suppliers to make you a formal offer.
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div class="woofic_visiual_right">
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
            <div class="container">
                {/* <div class="woofic_visiual_top woofic_visual_middle"> */}
                <div class="row">
                    <div className="col-md-4 col-sm-12">
                        <div class="woofic_visiual_right">
                            <img className="img-fluid" src={v3} />
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div class="woofic_visiual_left">
                            <div class="woofic_visiual_heading">
                                Receive and Compare Offers
                                {/* <div class="woofic_visiual_sub-heading">
                                    Start today for great future
                                </div> */}
                            </div>
                            <div class="woofic_visiual_hline">
                            </div>
                            <div class="woofic_visiual_para">
                                Suppliers have 48 hours to resolve doubts and send you a formal proposal. Once the proposals are received, compare them and negotiate with the suppliers.                            </div>
                        </div>
                    </div>

                </div>
                {/* </div> */}
            </div>

            <br />
            <br />
            <br />
            {/* THIRD SECTIONS */}
            <div class="container">
                {/* <div class="woofic_visiual_top"> */}

                <div class="row">
                    <div className="col-md-8 col-sm-12">

                        <div class="woofic_visiual_left">
                            <div class="woofic_visiual_heading ">
                            Hire a Provider
                                    {/* <div class="woofic_visiual_sub-heading">
                                    Start today for great future
                                    </div> */}
                            </div>
                            <div class="woofic_visiual_hline">

                            </div>
                            <div class="woofic_visiual_para">
                            With Woofic you can save up to 30%, instead of contacting the suppliers
individually, you carry out the procedures online safely.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div class="woofic_visiual_right">
                            <img className="img-fluid" src={pnglogo2} />
                        </div>
                    </div>
                </div>
              
                {/* Four SECTION */}
            </div>
            <br />
            <br />
            <br />
            <div class="container">
                {/* <div class="woofic_visiual_top woofic_visual_middle"> */}
                <div class="row">
                    <div className="col-md-4 col-sm-12">
                        <div class="woofic_visiual_right">
                            <img className="img-fluid" src={v4} />
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div class="woofic_visiual_left">
                            <div class="woofic_visiual_heading">
                                Rate the Provider
                                {/* <div class="woofic_visiual_sub-heading">
                                    Start today for great future
                                </div> */}
                            </div>
                            <div class="woofic_visiual_hline">
                            </div>
                            <div class="woofic_visiual_para">
                            Once the project with a supplier is closed, evaluate according to your
experience, so that the rest of the user can make better decisions.
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
            <div class="receive_offer text-center">
                <Link to="/quotemain">RECEIVE OFFER</Link>
            </div>
        </>
    );

}
export default VisualScheme;
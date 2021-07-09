import React, { useState, useEffect } from "react";
import Footer from "./LandingPage/components/Footer";
import Navbar from "./Navbar";
import axios from 'axios';
import { useHistory } from "react-router";

export default function GetInspire() {
  const [blog, setBlog] = useState([]);
  const history = useHistory();
  // const cb = () => {
  //  console.log(window.scrollY)
  // };
  // window.addEventListener('scroll', () => {
  //   console.log("event fired")
  // })


  function GetLed() {
    const { data: response } = axios.get(`https://api.woofics.com/api/get_inspired`)
      .then((response) => {
        if (response) {
          console.log(response.data)
          setBlog(response.data)
        }
      }, (Error) => {

        console.log(Error);
      });

  }

  const viewMore = (category) => {
    history.push(`/viewmore/${category}`)
  }

  useEffect(() => {
    GetLed();
  }, [])
  return (
    <>
      <Navbar />
      <div className="page-wrapper mt-5 ">
        <div class="container-fluid no-gutters ">
          <div className="row no-gutters">

            <div onClick={() => viewMore('HOTELS')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Hotels.jpg" />
              <div class="mid">
                <div class="tex">HOTELS</div>
              </div>
            </div>
            <div onClick={() => viewMore('RESTAURANTS')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/restaurant.jpg" />
              <div class="mid">
                <div class="tex">RESTAURANTS</div>
              </div>

            </div>
            <div onClick={() => viewMore('RETAIL')} className="cont col-md-6" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Retail-Shop.jpg" />
              <div class="mid">
                <div class="tex">RETAIL</div>
              </div>

            </div>

            {/* <ModalImage
              small={urlToTinyImageFile}
              large={urlToHugeImageFile}
              alt="Hello World!"
            /> 
                <ModalImage className="img-fluid ima hvr-grow"
                small={"../../assets/plugins/images/Images/Retail-Shop.jpg"}
                large={"../../assets/plugins/images/Images/Retail-Shop.jpg"}
                alt="Hello World!" onClick={() => viewMore('FAIRS')}
              />             
              */}

          </div>
          <div className="row no-gutters">
            <div onClick={() => viewMore('FAIRS')} className="cont col-md-6" style={{ height: "600px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Fairs.jpg" />
              <div class="mid">
                <div class="tex">FAIRS</div>
              </div>

            </div>
            <div className=" col-md-6" style={{ height: "300px", cursor: 'pointer' }}>
              <div className="row no-gutters">
                <div onClick={() => viewMore('EVENTS')} className="cont col-md-6" style={{ height: "300px", cursor: 'pointer' }}>
                  <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Events.jpg" />
                  <div class="mid">
                    <div class="tex">EVENTS</div>
                  </div>

                </div>
                <div onClick={() => viewMore('SPORTS')} className="cont col-md-6" style={{ height: "300px", cursor: 'pointer' }}>
                  <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Sports.jpg" />
                  <div class="mid">
                    <div class="tex">SPORTS</div>
                  </div>

                </div>
              </div>
              <div className="row no-gutters">
                <div onClick={() => viewMore('HEALTH')} className="cont col-md-12" style={{ height: "300px", cursor: 'pointer' }}>
                  <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Healkth.jpg" />
                  <div class="mid">
                    <div class="tex">HEALTH</div>
                  </div>

                </div>
              </div>

            </div>
          </div>
          <div className="row no-gutters">
            <div onClick={() => viewMore('ADVERTISING')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Advertising.jpg" />
              <div class="mid">
                <div class="tex">ADVERTISING</div>
              </div>

            </div>
            <div onClick={() => viewMore('PUBLIC')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Public-Sector.jpg" />
              <div class="mid">
                <div class="tex">PUBLIC</div>
              </div>

            </div>
            <div onClick={() => viewMore('INFORMATION')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Information.jpg" />
              <div class="mid">
                <div class="tex">INFORMATION</div>
              </div>

            </div>
            <div onClick={() => viewMore('LARGE')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/restaurant.jpg" />
              <div class="mid">
                <div class="tex">LARGE</div>
              </div>

            </div>
          </div>
          <div className="row no-gutters">
            <div onClick={() => viewMore('SHOPPING')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Large-Surfaces.jpg" />
              <div class="mid">
                <div class="tex">SHOPPING</div>
              </div>

            </div>
            <div onClick={() => viewMore('CONCERTS')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Concerts.jpg" />
              <div class="mid">
                <div class="tex">CONCERTS</div>
              </div>

            </div>
            <div onClick={() => viewMore('AUTOMOTIVE')} className="cont col-md-6" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/images/Images/Automotive.jpg" />
              <div class="mid">
                <div class="tex">AUTOMOTIVE</div>
              </div>

            </div>

          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
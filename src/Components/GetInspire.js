import React, { useState, useEffect } from "react";
import Footer from "./LandingPage/components/Footer";
import Navbar from "./Navbar";
import axios from 'axios';
import { useHistory } from "react-router";

export default function GetInspire() {
  const [blog, setBlog] = useState([]);
  const history = useHistory();
  // const cb = () => {
  //  
  // };
  // window.addEventListener('scroll', () => {
  //   
  // })


  function GetLed() {
    const { data: response } = axios.get(`https://api.woofics.com/api/get_inspired`)
      .then((response) => {
        if (response) {
          
          setBlog(response.data)
        }
      }, (Error) => {

        
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
            <section className="nav-section" style={{backgroundImage:"linear-gradient(to right, #934CFF 10%, #F62B84)",height:"60px"}} >
            <Navbar />
            </section>
            
      <div className="page-wrapper mt-5 ">
        <div class="container-fluid no-gutters ">
          <div className="row no-gutters">

            <div onClick={() => viewMore('Hotel')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Hotel.jpeg" />
              <div class="mid">
                <div class="tex">Hotels</div>
              </div>
            </div>
            <div onClick={() => viewMore('Restaurante')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Restaurante.jpeg" />
              <div class="mid">
                <div class="tex">Restaurante</div>
              </div>

            </div>
            <div onClick={() => viewMore('Varios')} className="cont col-md-6" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }}  src="../../assets/plugins/inspired_images/Varios.jpeg" />
              <div class="mid">
                <div class="tex">Varios</div>
              </div>

            </div>

            

          </div>

          <div className="row no-gutters">

            <div onClick={() => viewMore('Ferias')} className="cont col-md-6" style={{ height: "600px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Ferias.jpeg"/>
              <div class="mid">
                <div class="tex">Ferias</div>
              </div>

            </div>

            <div className="col-md-6" style={{ height: "300px", cursor: 'pointer' }}>

              <div className="row">
                <div onClick={() => viewMore('Eventos')} className="cont col-md-6" style={{ height: "300px", cursor: 'pointer', paddingRight:'0px' }}>
                  <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Eventos.jpeg" />
                  <div class="mid">
                    <div class="tex">Eventos</div>
                  </div>

                </div>
                <div onClick={() => viewMore('Deporte')} className="cont col-md-6" style={{ height: "300px", cursor: 'pointer',paddingLeft:'0px' }}>
                  <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Deporte.jpeg" />
                  <div class="mid">
                    <div class="tex">Deporte</div>
                  </div>

                </div>
              </div>

              <div className="row ">
                <div onClick={() => viewMore('Publicidad')} className="cont col-md-12" style={{ height: "300px", cursor: 'pointer' }}>
                  <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Publicidads.jpeg"/>
                  <div class="mid">
                    <div class="tex">Publicidad</div>
                  </div>

                </div>
              </div>

            </div>
          </div>
          <div className="row no-gutters">
            <div onClick={() => viewMore('Salud')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Salud.png" />
              <div class="mid">
                <div class="tex">Salud</div>
              </div>

            </div>
            <div onClick={() => viewMore('Sector')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Sector_Publico.jpeg" />
              <div class="mid">
                <div class="tex">Sector Publico</div>
              </div>

            </div>
            <div onClick={() => viewMore('Informacion')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Informacion.png" />
              <div class="mid">
                <div class="tex">Informacion</div>
              </div>

            </div>
            <div onClick={() => viewMore('Automocion')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Automocion.jpeg" />
              <div class="mid">
                <div class="tex">Automocion</div>
              </div>

            </div>
          </div>
          <div className="row no-gutters">
            
            <div onClick={() => viewMore('Conciertos')} className="cont col-md-6" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Conciertos_Exterior.jpeg" />
              <div class="mid">
                <div class="tex">Conciertos Exterior</div>
              </div>

            </div>
            <div onClick={() => viewMore('Tiendas')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Tiendas.jpeg"/>
              <div class="mid">
                <div class="tex">Tiendas</div>
              </div>

            </div>
            <div onClick={() => viewMore('Centros')} className="cont col-md-3" style={{ height: "300px", cursor: 'pointer' }}>
              <img className="img-fluid ima hvr-grow" style={{ height: "100%", width: "100%" }} src="../../assets/plugins/inspired_images/Centros_Comerciales.jpeg"/>
              <div class="mid">
                <div class="tex">Centros Comerciales</div>
              </div>

            </div>

          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
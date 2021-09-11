import React, { useState, useEffect,useRef } from "react";
import { useHistory } from "react-router-dom";
import {Animated} from "react-animated-css";
import "../css/last news.css";
import useOnScreen from "./OnScreen";
import axios from "axios";

function LastNews() {
  const history = useHistory();
  const domRef = React.useRef();
  const [blog, setBlog] = useState([]);
  const [supp, setsupp] = useState([]);
  const ref = useRef()
  const isVisible = useOnScreen(ref)
    
  


  useEffect(() => {
    // console.log("window varaible "+window.name)
    const { data: response } = axios
      .get(`https://api.woofics.com/api/blog`,{
        headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
      })
      .then(
        (response) => {
          if (response) {
            console.log("blog response "+ response);
            setBlog(response.data);
          }
        },
        (Error) => {
          console.log("blog response" + Error)
        }
      );

    const { data: respons } = axios
      .get(`https://api.woofics.com/api/data_of_interest`,{
        headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
      })
      .then(
        (respons) => {
          if (respons) {
            setsupp(respons.data);
          }
        },
        (Error) => {
          console.log(Error)
        }
      );
  }, []);


  return (
    <>
    
    
      <div className="container text-center mx-auto">
        <div className="woofic_lastnewner">
          <div className="row text-center">
            <div className="col-sm-12 col-md-12">
              <div className="woofic_lastnews_header">
                <div className="woofic_lastnews_heading">datos de interés</div>
                <div className="woofic_lastnews_hline"></div>
              </div>
            </div>
            <div
              className="row mx-auto"
              ref={ref}
              style={{
                height: "80%",
                width: "65%",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                
              }}>
              { supp.length>0 ?
              supp.map((val, id) => {
                return (
                  <>
                  
                  <Animated animationIn="fadeInLeft"  animationInDuration={1000} isVisible={isVisible}>
                    <div
                      className="text-center"
                      style={{ width: "250px", padding: "0" }}
                    >
                      <div
                        className="border shadow rounded for-gradient"
                        style={{
                          height: "130px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "15px"
                        
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <h2 style={{color:"#fff", fontWeight:"900",marginBottom:"2px"}}>{val.value}</h2>
                          <div className="woofic_lastnews_content_description">
                            <h3>{val.label}</h3> <br />
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                    </Animated>
                   
                  </>
                );
              }): null}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="woofic_lastnews_below_header">
                {/* <div class="woofic_visiual_left"> */}
                <div className="woofic_lastnews_heading text-center">
                  Últimas noticias
                  <div className="woofic_lastnews_sub-heading">
                    Empiece hoy para un gran futuro
                  </div>
                </div>
                <div className="woofic_lastnews_hline"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="woofic_lastnews_cards_container"
          onClick={() => history.push("/allblog")}
        >
          <div className="woofic_lastnews_card container ">
            <div className="row ">
              {
              blog.slice(0, 3).map((val, id) => {
                return (
                  <>
                    {" "}
                    <div className="col-sm-12 col-md-4 text-center">
                      <div className="woofic_last-news_cards">
                        <img src={val.image} />
                        <div className="woofic_lastnews_card-heading text-center">
                          {val.author.slice(0, 40)}
                        </div>
                        <div className="woofic_lastnews_card-subheading text-center">
                          {val.article.slice(0, 180) + "..."}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center mx-auto mt-lg-5">
        <div className="row mx-auto">
          <div className="col-sm-12 col-md-12">
            <div className="woofic_lastnews_header">
              <div className="woofic_lastnews_heading">preguntas frecuentes</div>
              <div className="woofic_lastnews_hline"></div>
            </div>
          </div>
          <div className="col-md-10 mx-auto">
            <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0">
                    <button
                      className="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Cómo actúa Woofic?
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    Woofic envía a sus colaboradores (proveedores) el
                    cuestionario cumplimentado por el cliente, en un plazo
                    máximo de 48 horas que los proveedores tienen para responder
                    preguntas y presentar un oferta vinculante.
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0">
                    <button
                      className="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      ¿Por qué tengo que registrarme?
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    Woofic es una plataforma integral, en la que recibirás y
                    gestionarás ofertas, realizarás calificaciones de
                    proveedores y muchas más ventajas, por eso es necesario
                    registrarse, ser poder acceder a su panel de administración
                    personal.
                  </div>
                </div>
              </div>
              {/* <div class="card">
                <div class="card-header" id="headingThree">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Why use Woofic instead of contracting directly with the
                      provider?
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    Make secure payments through the platform. The conditions
                    are set by you, penalties for delays, blocking the last
                    payment until it has been installed or delivered. Woofic has
                    insurance in case the supplier does not deliver the screen
                    or the delivery is not in optimal condition. Many more
                    advantages HERE.
                  </div>
                </div>
              </div> */}
              <div className="card">
                <div className="card-header" id="headingFour">
                  <h2 className="mb-0">
                    <button
                      className="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      ¿Woofic favorece a alguna empresa?
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseFour"
                  className="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    No. Woofic.com es un portal totalmente independiente, solo
                    ponemos clientes en contacto con proveedores y cada
                    proveedor hace su oferta personalizada directamente al
                    cliente final, el El orden en el que se muestran los
                    resultados por defecto es por orden. de llegada, la primera
                    cita se muestra en la posición 1, por lo que en.
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingFive">
                  <h2 className="mb-0">
                    <button
                      className="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      ¿Cómo gana dinero Woofic.com?
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseFive"
                  className="collapse"
                  aria-labelledby="headingFive"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    Nuestro servicio es completamente gratuito. Las ofertas que
                    harás encontrar de los diferentes proveedores en Woofic son
                    los mismos que encontrarás en cada empresa. No existen
                    comisiones, sin incrementos de precio. Cada vez que un
                    proyecto, se contrate producto o servicio, cobramos una
                    comisión a al proveedor, nunca al usuario.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LastNews;

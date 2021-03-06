import React, { useState } from "react";
import Footer from "./LandingPage/components/Footer";
import Navbar from "./Navbar";
import TextField from '@material-ui/core/TextField';
import axios from "axios";

export default function Advertise() {



  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState(0);
  const [campaignlocation, setcampaignlocation] = useState("");
  const [campaignduration, setcampaignduration] = useState(0);
  const [videoduration, setvideoduration] = useState(0);
  const [screentype, setscreentype] = useState("");
  const [contenttype, setcontenttype] = useState("");

  function Message() {
    const res = axios.post(`https://api.woofics.com/api/questionnaire`, {
      name: name,
      email: email,
      contact_number: number,
      campaign_location: campaignlocation,
      campaign_duration: campaignduration,
      video_duration: videoduration,
      screen_type: screentype,
      content_type: contenttype,
    })
      .then((response) => {
        
        alert("Mensaje enviado!")
      }, (Error) => {
        
        alert("Disculpe, algo salió mal, por favor pruebe de nuevo más tarde")
        
      });
  }
  return (
    <>
            <section className="nav-section" style={{backgroundImage:"linear-gradient(to right, #934CFF 10%, #F62B84)",height:"60px"}} >
            <Navbar />
            </section>
            
      <div className="page-wrapper">
        <div className="container-fluid " style={{ backgroundImage: 'url(https://www.gimage.es/wp-content/uploads/2018/02/contacto.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <div className="row">
            <div className="col-md-10">
              <h1 className="mt-5 ml-3 " style={{ fontSize: "6vw", fontWeight: '500', textTransform: 'uppercase', lineHeight: '1em', letterSpacing: '-1.5px', color: 'white', fontFamily: '"Rubik", Sans-serif', }}>
              ¿Quieres encontrar espacios publicitarios led donde puedas
                 ¿anunciar?
              </h1>
              {/* <br /> */}
              <h3 className="ml-3" style={{ color: 'white', fontSize: 20 }}>
              Woofic es socio de las principales agencias de publicidad led en
                 España.
                <br />
                <br />
                <br />
                ¿Si estás pensando en publicidad y no sabes cómo?
              </h3>
              {/* <button className="btn btn-primary p-2 ml-3 mb-5">REQUEST A BUDGET</button> */}
            </div>
          </div>
        </div>
        <div className="container.fluid">
          <div className="" style={{ height: '100%' }}>
            <div className="container">
              <div className="row mx-auto">
                <div className="col-md-12  mt-md-5 pt-md-5 w-75">
                  <h3>Por favor llene este formulario a continuación:</h3>
                  <span>
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Nombre" onChange={(e) => setname(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Correo electrónico" onChange={(e) => setemail(e.target.value)} />
                  </span>
                  <span>
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" type="number" label="Número de teléfono" onChange={(e) => setnumber(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Ubicación de la campaña" onChange={(e) => setcampaignlocation(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" type="number" label="Duración de la campaña" onChange={(e) => setcampaignduration(e.target.value)} />
                  </span>
                  <span>
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" type="number" label="Duración del video" onChange={(e) => setvideoduration(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Tipo de pantalla" onChange={(e) => setscreentype(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Tipo de contenido" onChange={(e) => setcontenttype(e.target.value)} />
                  </span>
                  <br />
                  <br />
                  <br />


                  <button className="btn btn-primary ml-3" onClick={Message}>Entregar</button>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

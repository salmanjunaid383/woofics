import React, { useState } from "react";
import Footer from "./LandingPage/components/Footer";
import Navbar from "./Navbar";
import TextField from '@material-ui/core/TextField';
import axios from "axios";

export default function Advertise() {



  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [campaignlocation, setcampaignlocation] = useState("");
  const [campaignduration, setcampaignduration] = useState("");
  const [videoduration, setvideoduration] = useState("");
  const [screentype, setscreentype] = useState("");
  const [contenttype, setcontenttype] = useState("");

  function Message() {
    const res = axios.post(`https://api.woofics.com/api/advertise_questionnaire`, {
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
        console.log(response)
        alert("Message Sent!")
      }, (Error) => {
        alert(Error)
        console.log(Error);
      });
  }
  return (
    <>
      <Navbar />
      <div className="page-wrapper mt-5 ">
        <div class="container-fluid " style={{ backgroundImage: 'url(https://www.gimage.es/wp-content/uploads/2018/02/contacto.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <div className="row">
            <div className="col-md-10">
              <h1 className="mt-5 ml-3 " style={{ fontSize: "6vw", fontWeight: '500', textTransform: 'uppercase', lineHeight: '1em', letterSpacing: '-1.5px', color: 'white', fontFamily: '"Rubik", Sans-serif', }}>
                Do you want to find led advertising spaces where you can
                advertise?
              </h1>
              {/* <br /> */}
              <h3 className="ml-3" style={{ color: 'white', fontSize: 20 }}>
                Woofic is a partner of the main led advertising agencies in
                Spain.
                <br />
                <br />
                <br />
                If you are thinking of advertising and do not know how?
              </h3>
              {/* <button className="btn btn-primary p-2 ml-3 mb-5">REQUEST A BUDGET</button> */}
            </div>
          </div>
        </div>
        <div className="container.fluid">
          <div className="" style={{ height: '100%' }}>
            <div class="container">
              <div class="row mx-auto">
                <div className="col-md-12  mt-md-5 pt-md-5 w-75">
                  <h3>Please fill this form below:</h3>
                  <span>
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Name *" onChange={(e) => setname(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Email *" onChange={(e) => setemail(e.target.value)} />
                  </span>
                  <span>
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" type="number" label="Contact Number *" onChange={(e) => setnumber(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Campaign Location *" onChange={(e) => setcampaignlocation(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" type="number" label="Campaign Duration *" onChange={(e) => setcampaignduration(e.target.value)} />
                  </span>
                  <span>
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" type="number" label="Video Duration *" onChange={(e) => setvideoduration(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Screen Type *" onChange={(e) => setscreentype(e.target.value)} />
                    <TextField className="w-md-25 mx-3 my-1" id="standard-basic" label="Content Type *" onChange={(e) => setcontenttype(e.target.value)} />
                  </span>
                  <br />
                  <br />
                  <br />


                  <button className="btn btn-primary ml-3" onClick={Message}>Submit</button>

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

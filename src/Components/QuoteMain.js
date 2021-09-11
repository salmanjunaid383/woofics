import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import reg from "../Images/rmbg.png";
import clsx from "clsx";
import "../Components/ClientPortal/quotemain.css";

import firebase from "./Firebase";
import "../Components/quotemain.css";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Client from "./Client";
import logo1 from './LandingPage/images/woofics-new/WooficsLogo.png'
import Backdrop from "@material-ui/core/Backdrop";

import Typography from "@material-ui/core/Typography";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

import Navbar from "./Navbar";

import Footer from "./LandingPage/components/Footer";
import ScrollToTop from "./ScrollToTop";

import monoposte from "../Images/structure/monoposte.jpg";
import pared from "../Images/structure/pared.jpg";
import mupi from "../Images/structure/tothem.jpg";
import truss from "../Images/structure/truss.jpg";
import frontpic from "../Components/Frontal-min.png";
import rearpic from "../Components/Trasero-min.png";
import custom from "../Images/structure/A medida-min.jpeg"
import screen from "../Images/structure/No, Solo pantalla-min.jpeg";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    // margin: theme.spacing(15, 2),
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    overflow: "hidden",
    width: "100%",
    height: "90vh",
    overflowY: "scroll",
  },
  typography: {
    padding: theme.spacing(2),
    color: "black",
  },
  typographyLink: {
    color: "black",
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "white",
    boxShadow: "none",
    border: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundImage: "linear-gradient(180deg, #F62B84 0%, #ff14ff 100%)",
    width: drawerWidth,
    boxShadow: "none",
    border: "none",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  typography: {
    padding: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "#cdcdcd",
    fontWeight: "bolder",
  },
  // background-image:linear-gradient(180deg, #ff14ff 0%, #F62B84 100%);
  item: {
    color: "white",
    margin: "0px",
    "&:hover": {
      color: "white",
      margin: "0px",
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "500ch",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function QuoteMain() {
  let history = useHistory();
  ScrollToTop();
  const [modelState, setModelState] = useState(false);
  const [productType, setProductType] = useState("");
  const [prdouctTypeImg, setProductTypeImg] = useState("");
  const [description, setdescription] = useState("");
  const [buy, setbuy] = useState("");
  const [indoor, setindoor] = useState("");
  const [install, setinstall] = useState("");
  const [model, setmodel] = useState("");
  const [visuald, setvisuald] = useState("");
  const [screenuse, setscreenuse] = useState("");
  const [screenbase, setscreenbase] = useState();
  const [screenheight, setscreenheight] = useState();
  const [screenaccess, setscreenaccess] = useState("");
  const [screenorientation, setscreenorientation] = useState("");
  const [controlsys, setcontrolsys] = useState("");
  const [adverseweather, setadverseweather] = useState("");
  const [structure, setstructure] = useState("");
  const [deliverytime, setdeliverytime] = useState("");
  const [shipping, setshipping] = useState("");
  const [sensor, setsensor] = useState("");
  const [warranty, setwarranty] = useState("");
  const [carcass, setcarcass] = useState("");
  const [flycases, setflycases] = useState("");
  const [entity, setentity] = useState("");
  const [name, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [company, setcompany] = useState("");
  const [customertype, setcustomertype] = useState("");
  const [sector, setsector] = useState("");
  const [postalcode, setpostalcode] = useState();
  const [comments, setcomments] = useState("");
  const [expiredate, setexpiredate] = useState("");
  const [clientid, setclientid] = useState("");
  
  const [doc, setdoc] = useState("");
  const [email, setemail] = useState("");

  const [minDistance,setMinDistance]=useState("");
  const [maxDistance,setMaxDistance]=useState("");
  const [anyQuestion,setAnyQuestion]=useState("");
  const [city,setCity]=useState("");
  const [telephone,setTelephone]=useState("");
  const [progress, setprogress] = useState("Publica tu servicio?");

  const [price, setPrice] = useState("");
  const [malik, setmalik] = useState("disabled");
  console.log(screenuse);

  useEffect(() => {
    if (modelState === false) {
      Swal.fire({
        title: "Woofics.com",
        html:
          "<p style='font-size:14px'>Woofic es una plataforma integral que le permite obtener cotizaciones personalizadas de " +
          "diferentes proveedores, negocia con ellos y haz el pedido. Todo con la máxima transparencia" +
          "y seguridad, por eso es necesario registrarse, para poder acceder a su gestión" +
          "panel.</p>",
      });
    }
    setModelState(true);
  }, []);

  function SendService(i) {
    const token = localStorage.getItem("user_token");
    if (token === null) {
      Swal.fire({
        title: "Woofics.com",
        html: "<p> Inicie sesión o regístrese para publicar la oferta.</p>",
      });
      // alert("")
      handleOpenpop2();
    } else {
      var decoded = jwt_decode(token);

      if (i === 2) {
        if (name === "" || contact === "") {
          Swal.fire({
            title: "Woofics.com",
            html: "<p> Por favor rellene el formulario.</p>",
          });
        } else {
          setprogress("Espere por favor...");

          console.log();
          const { data: response } = axios
            .post(
              `https://api.woofics.com/api/form`,
              {
                product_type: productType,
                product_image: prdouctTypeImg,
                description: description,
                buy: buy,
                indoor: indoor,
                installation: install,
                model: model,
                visual_distance: visuald,
                screen_use: screenuse,
                screen_width: screenbase,
                screen_height: screenheight,
                screen_access: screenaccess,
                screen_orientation: screenorientation,
                control_system: controlsys,
                adverse_weather: adverseweather,
                structure: structure,
                delivery_time: deliverytime,
                shipping: shipping,
                sensor: sensor,
                warranty: warranty,
                carcase_material: carcass,
                fly_cases: flycases,
                name: name,
                contact: contact,
                company: company,
                customer_type: customertype,
                sector: sector,
                postal_code: postalcode,
                comments: comments,
                entity: entity,
                email: email,
                minimum_distance:minDistance,
                maximum_distance:maxDistance,
                any_question:anyQuestion,
                city_of_installation:city,
                telephone:telephone,
                documents: doc,
                client_id: decoded.sub,
              },
              {
                headers: window.header,
              }
            )
            .then(
              (response) => {
                setprogress("Published");
                Swal.fire({
                  title: "Woofics.com",
                  html: "<p>Gracias por tu tiempo. En 48 horas recibirás las mejores ofertas personalizadas para tu proyecto..</p>",
                });
                // alert('THANK YOU FOR YOUR TIME.  WITHIN 48 HOURS, YOU WILL RECEIVE THE BEST PERSONALIZED OFFERS FOR YOUR PROJECT ')
                history.push("/miservicio");
              },
              (error) => {
                setprogress("Publica tu servicio");
                Swal.fire({
                  title: "Woofics.com",
                  html: "<p>Dejaste algunos campos vacíos!</p>",
                });
                // alert('You left some feilds empty !')
                console.log(error.message);
              }
            );
        }
      } else {
        setprogress("Please wait...");

        const { data: response } = axios
          .post(
            `https://api.woofics.com/api/form`,
            {
              product_type: productType,
              product_image: prdouctTypeImg,
              description: description,
              buy: buy,
              indoor: indoor,
              installation: install,
              model: model,
              visual_distance: visuald,
              screen_use: screenuse,
              screen_width: screenbase,
              screen_height: screenheight,
              screen_access: screenaccess,
              screen_orientation: screenorientation,
              control_system: controlsys,
              adverse_weather: adverseweather,
              structure: structure,
              delivery_time: deliverytime,
              shipping: shipping,
              sensor: sensor,
              warranty: warranty,
              carcase_material: carcass,
              fly_cases: flycases,
              name: name,
              contact: contact,
              company: company,
              customer_type: customertype,
              sector: sector,
              postal_code: postalcode,
              comments: comments,
              entity: entity,
              email: email,
              minimum_distance:minDistance,
              maximum_distance:maxDistance,
              any_question:anyQuestion,
              city_of_installation:city,
              telephone:telephone,
              documents: doc,
              client_id: decoded.sub,
            },
            {
              headers: window.header,
            }
          )
          .then(
            (response) => {
              setprogress("Published");
              Swal.fire({
                title: "Woofics.com",
                html: "<p>Gracias por tu tiempo. En 48 horas recibirás las mejores ofertas personalizadas para tu proyecto..</p>",
              });
              // alert('THANK YOU FOR YOUR TIME.  WITHIN 48 HOURS, YOU WILL RECEIVE THE BEST PERSONALIZED OFFERS FOR YOUR PROJECT ')
              history.push("/miservicio");
            },
            (error) => {
              setprogress("Publica tu servicio");
              Swal.fire({
                title: "Woofics.com",
                html: "<p>Dejaste algunos campos vacíos!</p>",
              });
              // alert('You left some feilds empty !')
            }
          );
      }
    }
  }

  const [selectingstatus, setSelectingStatus] = useState("false");

  //   if(screenuse!=""){

    //     if(screenuse=="Others"){
    //     setSelectingStatus("true")
    //     console.log("status: ",selectingstatus)
    //     }
    //     else{
    //   setSelectingStatus("false")
    //     console.log(selectingstatus)
    //   }
  // }

  const [openpop2, setOpenpop2] = React.useState(false);
  const handleOpenpop2 = () => {
    setOpenpop2(true);
  };
  const handleClosepop2 = () => {
    setOpenpop2(false);
  };
  const uploadfile = async (e) => {
    const file = e.target.files[0];
    const type = file.type;
    const image = type.split("/");

    const ImagesRef = firebase.storage().ref("images").child(file.name);
    await ImagesRef.put(file);
    ImagesRef.getDownloadURL().then((url) => {
      setdoc(url);
    });
  };
  function NumberChange5() {
    setstructure("Custom")
    setstructurecolor("5");
  }

  function NumberChange6() {
    setstructure("No")
    setstructurecolor("6");
  }

  const data1 = [
    {
      id: 1,
      author: "Pantalla Led",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F1%20Pantalla%20Led.jpg?alt=media&token=b16abc9b-2761-4c90-8ebb-62f9154205fc",
    },
    {
      id: 2,
      author: "Pantalla Curve",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F2%20Pantalla%20Curva.jpg?alt=media&token=0c2cc35a-7674-4bf0-8b33-cff9c4d3a058",
    },
    {
      id: 3,
      author: "Suelo Led",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F3%20Suelo%20Led.jpg?alt=media&token=8437ff8d-1f7d-4dc9-9f79-7c518a367663",
    },
    {
      id: 4,
      author: "MUPI",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F4%20MUPI.jpg?alt=media&token=a821c0fe-58a8-4cb3-96ae-cc54cd404c4c",
    },
    {
      id: 5,
      author: "Pantalla Deporte",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F5%20Pantalla%20Deporte.jpg?alt=media&token=3f77b49a-c4f9-4c4a-80e1-b3a1510e202c",
    },
    {
      id: 6,
      author: "Cortina Led",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F6%20Cortina%20Led.jpg?alt=media&token=be806081-84cd-45b7-8d3e-075145564c98",
    },
    {
      id: 7,
      author: "Rotulo Led",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F7%20Rotulo%20led.jpg?alt=media&token=5042ce73-c1ff-49dc-aa71-0f0e23d234cd",
    },
  ];

  const data2 = [
    {
      author: "LCD Tactil",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F1%20LCD%20TACTIL.jpg?alt=media&token=d8afa667-7a4f-42e2-9526-eee13f46da41",
    },
    {
      author: "LCD Exterior",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F2%20LCD%20EXTERIOR.jpg?alt=media&token=79f052d6-19ea-45e8-914d-fd052b53042a",
    },
    {
      author: "LCD Alto Brillo",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F3%20LCD%20ALTO%20BRILLO.jpg?alt=media&token=54ced319-2b12-4c53-8f7c-9bb72f4638a6",
    },
    {
      author: "Video Wall",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2F4%20VIDEO%20WALL.jpg?alt=media&token=27e1a0e2-fbf6-4add-a2de-86e4ea48082b",
    },
  ];
  const date3 = [
    {
      id: 12,
      author: "Circulo",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fcirculo.jpg?alt=media&token=dfafe6c4-edb8-4e4d-8cb1-e89a2973e438",
    },
    {
      id: 13,
      author: "Cruz Farmacia",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fcruz%20farmacia.webp?alt=media&token=0f7ec9d8-8562-4a4c-916b-da9c630df172",
    },
    {
      id: 14,
      author: "Cubo",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fcubo.jpg?alt=media&token=30c6341d-9f17-4869-8bbc-099ff2dfac07",
    },
    {
      id: 15,
      author: "Esfera Led",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fesfera%20led.jpg?alt=media&token=c8ad7f37-ff72-482d-8051-49d4223b7df1",
    },
    {
      id: 16,
      author: "Farola",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Ffarola.jpg?alt=media&token=2bff213e-44b4-4972-8bb3-36ef65227b0f",
    },
    {
      id: 17,
      author: "Gasolinera",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fgasolinera.jpg?alt=media&token=949f80e0-cb79-46f3-912f-d5440223fe9c",
    },
    {
      id: 18,
      author: "Hexagono",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fhexagono.png?alt=media&token=83a8635b-4c43-4b1c-861b-5a2a1f83ecc4",
    },
    {
      id: 19,
      author: "Immobiliaria",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Finmobiliaria.jpg?alt=media&token=fa984875-3c88-4bdd-a7dd-befbba365eef",
    },
    {
      id: 20,
      author: "Lcd espejo",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Flcd%20espejo.jpg?alt=media&token=ba5ec55b-c463-4a90-885f-766e291c915e",
    },
    {
      id: 21,
      author: "Marcador",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fmarcador.png?alt=media&token=f0e897b7-68d8-4c04-aecb-1dcfeae39b72",
    },
    {
      id: 22,
      author: "Proyector",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fproyector.jpg?alt=media&token=53187343-1ac7-42c4-8307-890996b7da15",
    },
    {
      id: 23,
      author: "Sistema Control",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FSistema%20control.jpg?alt=media&token=4c92069a-faf3-4349-a167-9ce9c79c5f22",
    },
    {
      id: 24,
      author: "Supermercado",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fsupermercado.jpg?alt=media&token=d1190837-1089-47c6-922d-52f695c30c78",
    },
    {
      id: 25,
      author: "Taxi",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Ftaxi.jpg?alt=media&token=38c182dd-25fa-4103-b7c9-4a655bcc029f",
    },
    {
      id: 26,
      author: "Truss",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Ftruss.jpg?alt=media&token=91965c01-efcf-4836-87c0-cb28b0688e65",
    },
    {
      id: 27,
      author: "Ventilador",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2Fventilador.png?alt=media&token=2322b0e4-1bf0-4ba5-b943-d54b1a22bad8",
    },
  ];
  const date4 = [
    {
      id: 1,
      author: "Conciertos",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FCONCIERTOS.jpg?alt=media&token=82ffd5dc-4cda-4648-9897-a263a2477aed",
    },
    {
      id: 2,
      author: "Evento Deportivo",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FEVENTO%20DEPORTIVO.jpg?alt=media&token=f6e94203-8cc3-47b7-84cb-a9f1fb09705d",
    },
    {
      id: 3,
      author: "Ferias",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FFERIAS.jpg?alt=media&token=b01bc4bb-acdf-4ecf-a6e7-9691ce259200",
    },
    {
      id: 4,
      author: "Imagen Coprativa",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FIMAGEN%20CORPORATIVA.jpg?alt=media&token=d04cf5b5-bdd6-4b54-99b4-e954324179b9",
    },
    {
      id: 5,
      author: "Informacion",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FINFORMACION.jpg?alt=media&token=d80a4ce7-90a8-4eb6-8025-435c19819329",
    },
    {
      id: 6,
      author: "Plato Tv",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FPLATO%20TV.jpeg?alt=media&token=a2f934b0-b660-4e8e-8339-b255c3fa6eb7",
    },
    {
      id: 7,
      author: "Presentacion",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FPRESENTACION.jpg?alt=media&token=8b6c88ab-c211-479d-afe5-4824b65f0923",
    },
    {
      id: 8,
      author: "Publicidad",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FPUBLICIDAD.jpg?alt=media&token=38703e61-d5d6-4e06-8e65-1df15f2956af",
    },
    {
      id: 9,
      author: "Sala De Control",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FSALA%20DE%20CONTROL.jpg?alt=media&token=04a06afa-19f1-4efd-952b-89bee1e4902a",
    },
    {
      id: 10,
      author: "Trafico",
      image:
        "https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FTRAFICO.jpg?alt=media&token=2781f3be-f12b-408a-8834-5eb12ecba004",
    },
    {
      id: 11,
      author:'Other',
      image:"https://firebasestorage.googleapis.com/v0/b/woofic-306700.appspot.com/o/images%2FOtros%20Proyectos.png?alt=media&token=af250fdd-3625-41ee-a9cb-c465f967c59e"
    }
  ];

  function getSteps() {
    // , 'Use', 'Dimension', 'Orientation', 'Extreme Wheather', 'Basic Info'
    return [
      "Tipo de producto",
      "Uso",
      "Pantalla",
      "Instalación",
      "Datos adicionales",
      "Detalles de contacto"
    //   style={{backgroundColor:"pink"}}
    ];
  }
  const [screenDisplay, setScreenDisplay] = useState("block");
  const [lcdDisplay, setLcdDisplay] = useState("none");
  const [variosDisplay, setVariousDisplay] = useState("none");
  function showLedType(i) {
    if (i === 1) {
      setScreenDisplay("block");
      setLcdDisplay("none");
      setVariousDisplay("none");
    }
    if (i === 2) {
      setScreenDisplay("none");
      setLcdDisplay("block");
      setVariousDisplay("none");
    }
    if (i === 3) {
      setScreenDisplay("none");
      setLcdDisplay("none");
      setVariousDisplay("block");
    }
  }
  const [buycolor, setbuycolor] = useState("");
  const [indoorcolor, setindoorcolor] = useState("");
  const [screenaccesscolor, setscreenaccesscolor] = useState("");
  const [structurecolor, setstructurecolor] = useState("");
  function setProductTypefunc(name, image) {
    setProductType(name);
    setProductTypeImg(image);
  }
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div className="w-100  my-lg-5">
            <div className="container">
              <div className="row" style={{ paddingBottom: "5px" }}>
                <div className="col-md-4">
                  <a
                    className="text-center w-100 text-dark frank-color-blue"
                    onClick={() => showLedType(1)}
                  >
                    <button className="s-button">Pantallas Led</button>
                  </a>
                </div>
                <div className="col-md-4">
                  <a
                    className="text-center w-100 text-dark frank-color-blue"
                    onClick={() => showLedType(2)}
                  >
                    <button className="s-button">LCD</button>
                  </a>
                </div>
                <div className="col-md-4">
                  <a
                    className="text-center w-100 text-dark frank-color-blue"
                    onClick={() => showLedType(3)}
                  >
                    <button className="s-button">Varios</button>
                  </a>
                </div>
              </div>
              <div className="row" style={{display:"flex",justifyContent:"center" }}>
                <div id="screens" style={{ display: screenDisplay }}>
                  {data1.map((val, id) => {
                    return (
                      <>
                        <div
                          className="col-md-4 img-box"
                          style={{ padding: "5px" }}
                        >
                          {productType === val.author ? (
                            <h4 value={val.author} style={{ color: "#ff14ff" }}>
                              {val.author}
                            </h4>
                          ) : (
                            <h4 value={val.author}>{val.author}</h4>
                          )}

                          <img
                            src={val.image}
                            alt={val.author}
                            data-toggle="tool-tip"
                            width="150px"
                            height="150px"
                            onClick={(e) => {
                              setProductTypefunc(val.author, val.image);
                            }}
                            style={{ cursor: "pointer" }}
                          ></img>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div id="lcd" style={{ display: lcdDisplay }}>
                {data2.map((val, id) => {
                  return (
                    <>
                      <div className="col-md-4" style={{ padding: "5px" }}>
                        {productType === val.author ? (
                          <h4 value={val.author} style={{ color: "#ff14ff" }}>
                            {val.author}
                          </h4>
                        ) : (
                          <h4 value={val.author}>{val.author}</h4>
                        )}
                        <img
                          src={val.image}
                          alt={val.author}
                          data-toggle="tool-tip"
                          width="150px"
                          height="150px"
                          onClick={(e) => {
                            setProductTypefunc(val.author, val.image);
                          }}
                          style={{ cursor: "pointer" }}
                        ></img>
                      </div>
                    </>
                  );
                })}
              </div>

              <div id="various" style={{ display: variosDisplay }}>
                {date3.map((val, id) => {
                  return (
                    <>
                      <div className="col-md-4" style={{ padding: "5px" }}>
                        {productType === val.author ? (
                          <h4 value={val.author} style={{ color: "#ff14ff" }}>
                            {val.author}
                          </h4>
                        ) : (
                          <h4 value={val.author}>{val.author}</h4>
                        )}
                        <img
                          src={val.image}
                          alt={val.author}
                          data-toggle="tool-tip"
                          width="150px"
                          height="150px"
                          onClick={(e) => {
                            setProductTypefunc(val.author, val.image);
                          }}
                          style={{ cursor: "pointer" }}
                        ></img>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="w-100  my-lg-5">
            <h4 className="text-center w-100 text-dark frank-color-blue">
              Quiere comprar o alquilar
            </h4>
            {/* <div style={{display:"flex",justifyContent:"space-around", alignItems:"center", width:"35%", margin:"auto"}}> */}
            <input
              value="Buy"
              onChange={(e) => {
                setbuy(e.target.value);
                setbuycolor("true");
              }}
              type="radio"
              name="emotion"
              id="sad"
              className="input-hidden "
            />
            <label htmlFor="sad">
              {/* <img
                            src={shopping}
                            alt="I'm sad"
                            className="mx-lg-5 p-2" style={{ cursor: "pointer", color:"#ff14ff" }} /> */}
              <div className="mx-lg-3 p-2">
                <i
                  className="fa fa-shopping-cart"
                  style={
                    buycolor === "true"
                      ? {
                          cursor: "pointer",
                          fontSize: "40px",
                          color: "#ff14ff",
                        }
                      : { cursor: "pointer", fontSize: "40px" }
                  }
                ></i>
              </div>

              <h4
                className="text-center"
                style={
                  buycolor === "true"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                COMPRA
              </h4>
            </label>

            <input
              value="Rental"
              onChange={(e) => {
                setbuy(e.target.value);
                setbuycolor("false");
              }}
              type="radio"
              name="emotion"
              id="happy"
              className="input-hidden"
            />
            <label htmlFor="happy">
              {/* <img
                            src="data:image/png;base64,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"
                            alt="I'm happy" className="p-2" style={{ cursor: "pointer" }} /> */}

              <div className="mx-lg-3 p-2">
                <i
                  className=" fa fa-archive"
                  style={
                    buycolor === "false"
                      ? {
                          cursor: "pointer",
                          fontSize: "40px",
                          color: "#ff14ff",
                        }
                      : { cursor: "pointer", fontSize: "40px" }
                  }
                ></i>
              </div>
              <h4
                className="text-center"
                style={
                  buycolor === "false"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                ALQUILER
              </h4>
            </label>
            {/* </div> */}
            <br />
            <br />

            <h4 className="text-center w-100 text-dark frank-color-blue">
              Quieres para interior o exterior
            </h4>
            <input
              value="indoor"
              onChange={(e) => {
                setindoor(e.target.value);
                setindoorcolor("true");
              }}
              type="radio"
              name="ff"
              id="sadd"
              className="input-hidden "
            />
            <label htmlFor="sadd">
              {/* <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3VMEMNOqtMCbm09-ybyc_roZbsJG2UdT_wXZze1yQrIGlnQFIm5nHnOy2Ko8-7t56TFA&usqp=CAU"
                            alt="I'm sad"
                            className="mx-lg-5 p-2" style={{ cursor: "pointer" }} /> */}

              <div className="mx-lg-3 p-2">
                <i
                  className=" fa fa-home"
                  style={
                    indoorcolor === "true"
                      ? {
                          cursor: "pointer",
                          fontSize: "40px",
                          color: "#ff14ff",
                        }
                      : { cursor: "pointer", fontSize: "40px" }
                  }
                ></i>
              </div>
              <h4
                className="text-center"
                style={
                  indoorcolor === "true"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                INTERIOR
              </h4>
            </label>

            <input
              value="outdoor"
              onChange={(e) => {
                setindoor(e.target.value);
                setindoorcolor("false");
              }}
              type="radio"
              name="ff"
              id="happyy"
              className="input-hidden"
            />
            <label htmlFor="happyy">
              {/* <img
                            src="data:image/png;base64,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"
                            alt="I'm happy" className="p-2" style={{ cursor: "pointer" }} /> */}

              <div className="mx-lg-3 p-2">
                <i
                  className=" fa fa-sun-o"
                  style={
                    indoorcolor === "false"
                      ? {
                          cursor: "pointer",
                          fontSize: "40px",
                          color: "#ff14ff",
                        }
                      : { cursor: "pointer", fontSize: "40px" }
                  }
                ></i>
              </div>
              <h4
                className="text-center"
                style={
                  indoorcolor === "false"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                EXTERIOR
              </h4>
            </label>
            <br />
            <br />

            <h4 className="text-center w-100 text-dark frank-color-pink">
              Instalación fija o instalación para evento
            </h4>
            <div className="w-100  my-lg-2">
            <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setinstall(e.target.value)}
                >
                  <FormControlLabel
                    value="Instalación Fija"
                    control={<Radio color="primary" />}
                    label="Instalación Fija"
                  />
                  <FormControlLabel
                    value="Instalación Para Evento"
                    control={<Radio color="primary" />}
                    label="Instalación Para Evento"
                  />
                </RadioGroup>
              </FormControl>{" "}
            </div>
            <br />
            <br />

            <div style={{ marginTop: "-18px" }}>
              <h4 className="text-center w-100 text-dark frank-color-blue">
                Conoce el modelo que busca
              </h4>
              <FormControl component="fieldset">
                <br></br>
                <div
                  style={{ display: "flex", justifyContent: "space-around " }}
                >
                  <TextField
                    onChange={(e) => setmodel(e.target.value)}
                    className="w-50"
                    id="outlined-basic"
                    label="Model no"
                    style={{ marginRIght: "10px" }}
                    variant="outlined"
                  />
                  <RadioGroup
                    row
                    aria-label="position"
                    constolsys="posiconstolsys"
                    defaultValue="top"
                    onChange={(e) => setmodel(e.target.value)}
                  >
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </div>
              </FormControl>
            </div>
            <br />
            <br />
            <div style={{ marginTop: "-18px" }}>
              <h4 className="text-center w-100 text-dark d-inline frank-color-pink">
                Distancia de visión máxima y mínima
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <TextField
                    type="number"
                    onChange={(e) => setMaxDistance(e.target.value)}
                    style={{ width: "80px" }}
                    className="mx-lg-2"
                    id="outlined-basic"
                    label="Max (m)"
                    variant="outlined"
                  />
                  {/* <TextField type="number" onChange={(e) => setscreenheight(e.target.value)} className="w-25 mx-lg-2" id="outlined-basic" label="Maximum" variant="outlined" /> */}
                </div>
                <div>
                  <TextField
                    type="number"
                    onChange={(e) => setMinDistance(e.target.value)}
                    style={{ width: "80px" }}
                    className="mx-lg-2"
                    id="outlined-basic"
                    label="Min (m)"
                    variant="outlined"
                  />
                  {/* <TextField type="number" onChange={(e) => setscreenheight(e.target.value)} className="w-25 mx-lg-2" id="outlined-basic" label="Maximum" variant="outlined" /> */}
                </div>
              </div>
            </div>
            <br />
            <br />
            <h4 className="text-center w-100 text-dark frank-color-blue">
              Uso de la pantalla
            </h4>
            <div className="w-100  my-lg-5">
              <div className="row">
                {date4.map((val, id) => {
                  return (
                    <>
                      <div className="col-md-4" style={{ padding: "5px" }}>
                        {screenuse === val.author ? (
                          <h4 value={val.author} style={{ color: "#ff14ff" }}>
                            {val.author}
                          </h4>
                        ) : (
                          <h4 value={val.author}>{val.author}</h4>
                        )}
                        <img
                          src={val.image}
                          alt={val.author}
                          data-toggle="tool-tip"
                          width="150px"
                          height="150px"
                          onClick={(e) => {
                            setscreenuse(val.author);
                          }}
                          style={{ cursor: "pointer" }}
                        ></img>
                      </div>
                    </>
                  );
                })}
                 
              </div>
          
            </div>
           
          </div>
        );
      case 2:
        return (
          <div className="w-100 my-lg-5">
            <div>
              <h4 className="text-center w-100 text-dark d-inline frank-color-blue">
                Dimensión de la pantalla
              </h4>
              <div style={{ marginTop: "10px" }}>
                <TextField
                  value={screenbase}
                  type="number"
                  onChange={(e) => setscreenbase(e.target.value)}
                  className="w-30 mx-lg-2"
                  id="outlined-basic"
                  label="Base (m) "
                  variant="outlined"
                />
                <TextField
                  value={screenheight}
                  type="number"
                  onChange={(e) => setscreenheight(e.target.value)}
                  className="w-30 mx-lg-2"
                  id="outlined-basic"
                  label="Height (m) "
                  variant="outlined"
                />
              </div>
            </div>
            <br />
            <br />
            <h4 className="text-center w-100 text-dark frank-color-blue">
              Acceso a la pantalla
            </h4>
            <input
              value="el frente"
              onChange={(e) => {
                setscreenaccess(e.target.value);
                console.log(e.target.value)
                setscreenaccesscolor("true");
              }}
              type="radio"
              name="fqf"
              id="sadd"
              className="input-hidden "
            />
            <label htmlFor="sadd" style={{ marginRight: "10px" }}>
              <div className="mx-lg-4 p-2 front-rear-pic">
                <img
                  src={frontpic}
                  style={
                    screenaccesscolor === "true"
                      ? {
                          cursor: "pointer",
                          fontSize: "40px",
                          color: "#ff14ff",
                        }
                      : { cursor: "pointer", fontSize: "40px" }
                  }
                />
              </div>
              <h4
                className="text-center"
                style={
                  screenaccesscolor === "true"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                Acceso frontal
              </h4>
            </label>

            <input
              value="trasero"
              onChange={(e) => {
                setscreenaccess(e.target.value);
                setscreenaccesscolor("false");
                console.log(e.target.value)
              }}
              type="radio"
              name="fqf"
              id="happpy"
              className="input-hidden"
            />
            <label htmlFor="happpy">
              <div className="mx-lg-4 p-2 front-rear-pic">
                <img
                  src={rearpic}
                  className=" fa fa-sun-o"
                  style={
                    screenaccesscolor === "false"
                      ? {
                          cursor: "pointer",
                          fontSize: "40px",
                          color: "#ff14ff",
                        }
                      : { cursor: "pointer", fontSize: "40px" }
                  }
                />
              </div>
              <h4
                className="text-center"
                style={
                  screenaccesscolor === "false"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                Acceso trasero
              </h4>
            </label>
            <br />
            <br />
            <h4
              className="text-center w-100 text-dark frank-color-blue"
              style={{ marginTop: "15px", marginBottom: "10px" }}
            >
              cuantas pantallas necesitas
            </h4>
            <TextField
              type="number"
              className="w-30 mx-lg-2"
              id="outlined-basic"
              label="pantallas"
              variant="outlined"
            />
            <br />
            <p>
              Aclaración: si la pantalla es de doble cara, cada lado cuenta como
              una pantalla.{" "}
            </p>

            <br />
            <br />

            <p className="d-inline w-100">
              <h4
                className="text-center w-100 text-dark frank-color-blue"
                style={{ marginTop: "15px" }}
              >
                Sistema de control
              </h4>
              <FormControl component="fieldset">
                <RadioGroup
                  style={{ justifyContent: "center" }}
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setcontrolsys(e.target.value)}
                >
                  <FormControlLabel
                    value="Synchrone (transmisión en vivo)"
                    control={<Radio color="primary" />}
                    label="Synchrone (transmisión en vivo)"
                  />
                  <FormControlLabel
                    value="Asincrónico (de memoria)"
                    control={<Radio color="primary" />}
                    label="Asincrónico (de memoria)"
                  />
                  <FormControlLabel
                    value="Procesador de video (gestiona diferentes señales)"
                    control={<Radio color="primary" />}
                    label="Procesador de video (gestiona diferentes señales)"
                  />
                </RadioGroup>
              </FormControl>
            </p>
            <br />
            <br />
            <br />
            <br />
          </div>
        );
      case 3:
        return (
          <div className="w-100 my-lg-5">
            <h4 className="text-center w-100 text-dark frank-color-blue">
              Orientación de la pantalla
            </h4>
            <input
              type="radio"
              name="fqwgqwfq"
              id="ssaad"
              className="input-hidden "
              value="north"
              onChange={(e) => setscreenorientation(e.target.value)}
            />

            <label value="north" htmlFor="ssaad">
              <img
                src="data:image/png;base64,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"
                alt="North"
                className="mx-lg-4 p-2"
                style={{ cursor: "pointer" }}
              />
              <h4 className="text-center">NORTE</h4>
            </label>

            <input
              type="radio"
              name="fqwgqwfq"
              id="hahappy"
              className="input-hidden"
              value="south"
              onChange={(e) => setscreenorientation(e.target.value)}
            />
            <label value="South" htmlFor="hahappy">
              <img
                src="data:image/png;base64,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"
                alt="south"
                className="mx-lg-4 p-2"
                style={{ cursor: "pointer", transform: "rotate(180deg)" }}
              />
              <h4 className="text-center">SUR</h4>
            </label>
            <input
              type="radio"
              name="fqwgqwfq"
              id="uugly"
              className="input-hidden"
              value="east"
              onChange={(e) => setscreenorientation(e.target.value)}
            />
            <label value="East" htmlFor="uugly">
              <img
                src="data:image/png;base64,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"
                alt="east"
                className="mx-lg-4 p-2"
                style={{ cursor: "pointer", transform: "rotate(90deg)" }}
              />
              <h4 className="text-center">ESTE</h4>
            </label>
            <input
              type="radio"
              name="fqwgqwfq"
              id="ds"
              className="input-hidden"
              value="west"
              onChange={(e) => setscreenorientation(e.target.value)}
            />
            <label value="West" htmlFor="ds">
              <img
                src="data:image/png;base64,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"
                alt="west"
                className="mx-lg-4 p-2"
                style={{ cursor: "pointer", transform: "rotate(270deg)" }}
              />
              <h4 className="text-center">OESTE</h4>
            </label>

            <br />
            <br />
            <p className="d-inline w-100">
              <h4
                className="text-center w-100 text-dark frank-color-blue"
                style={{ marginBottom: "10px", marginTop: "15px" }}
              >
                Está la pantalla expuesta a condiciones climáticas adversas
              </h4>
              <FormControl component="fieldset">
                <RadioGroup
                  style={{ justifyContent: "center" }}
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setadverseweather(e.target.value)}
                >
                  <FormControlLabel
                    value="Cerca del mar"
                    control={<Radio color="primary" />}
                    label="Cerca del mar"
                  />
                  <FormControlLabel
                    value="Montaña alta"
                    control={<Radio color="primary" />}
                    label="Montaña alta"
                  />
                  <FormControlLabel
                    value="Poco extremo"
                    control={<Radio color="primary" />}
                    label="Poco extremoE"
                  />
                  <FormControlLabel
                    value="Ventilación de calor"
                    control={<Radio color="primary" />}
                    label="Ventilación de calor"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio color="primary" />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </p>
            <br />
            <br />
            <br />
            <h4
              className="text-center w-100 text-dark frank-color-blue"
              style={{ marginTop: "-10px" }}
            >
              Necesitas estructura
            </h4>
            <input
              type="radio"
              name="fqwfqwfas"
              id="dsdqq"
              className="input-hidden "
              value="Pared"
              onChange={(e) => {
                setstructure(e.target.value);
                setstructurecolor("4");
              }}
            />

            <label value="Pared" htmlFor="dsdqq">
              <div className="mx-lg-4 p-2">
                {/* <i className=" fa fa-certificate" style={structurecolor === "1" ? { cursor: 'pointer', fontSize:"40px",color: "#ff14ff"  } : { cursor: 'pointer', fontSize:"40px"  } }></i> */}
                <img src={pared} style={{ height: "100px", width: "100px" }} />
              </div>
              <h4
                className="text-center mx-lg-2"
                style={
                  structurecolor === "4"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                Pared
              </h4>
            </label>

            <input
              type="radio"
              name="fqwfqwfas"
              id="dsdq"
              className="input-hidden "
              value="Monoposte"
              onChange={(e) => {
                setstructure(e.target.value);
                setstructurecolor("1");
              }}
            />

            <label value="Monoposte" htmlFor="dsdq">
              <div className="mx-lg-4 p-2">
                {/* <i className=" fa fa-certificate" style={structurecolor === "1" ? { cursor: 'pointer', fontSize:"40px",color: "#ff14ff"  } : { cursor: 'pointer', fontSize:"40px"  } }></i> */}
                <img
                  src={monoposte}
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
              <h4
                className="text-center mx-lg-2"
                style={
                  structurecolor === "1"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                Monoposte
              </h4>
            </label>

            <input
              type="radio"
              name="fqwfqwfas"
              id="Truss for events"
              className="input-hidden"
              value="Truss for events"
              onChange={(e) => {
                setstructure(e.target.value);
                setstructurecolor("2");
              }}
            />
            <label value="Truss for events" htmlFor="Truss for events">
              <div className="mx-lg-4 p-2">
                {/* <i className=" fa fa-building-o" style={structurecolor === "2" ? { cursor: 'pointer', fontSize:"40px",color: "#ff14ff"  } : { cursor: 'pointer', fontSize:"40px"  } }></i> */}
                <img src={truss} style={{ height: "100px", width: "100px" }} />
              </div>
              <h4
                className="text-center mx-lg-2"
                style={
                  structurecolor === "2"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                Truss para eventos
              </h4>
            </label>

            <input
              type="radio"
              name="fqwfqwfas"
              id="Mupi"
              className="input-hidden"
              value="Mupi"
              onChange={(e) => {
                setstructure(e.target.value);
                setstructurecolor("3");
              }}
            />
            <label value="Mupi" htmlFor="Mupi">
              <div className="mx-lg-4 p-2">
                {/* <i className=" fa fa-cog" style={structurecolor === "3" ? { cursor: 'pointer', fontSize:"40px",color: "#ff14ff"  } : { cursor: 'pointer', fontSize:"40px"  } }></i> */}
                <img src={mupi} style={{ height: "100px", width: "100px" }} />
              </div>
              <h4
                className="text-center mx-lg-2"
                style={
                  structurecolor === "3"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                Mupi
              </h4>
            </label>

            <input
              type="radio"
              name="fqwfqwfas"
              id="Custom"
              className="input-hidden"
              value="Personalizado"
              onChange={(e) => {
                setstructure(e.target.value);
                setstructurecolor("5");
              }}
            />
            <label value="Personalizado" htmlFor="Custom">
              <div className="mx-lg-4 p-2">
                <img src={custom} style={{ height: "100px", width: "100px" }} />
              </div>
              <h4
                className="text-center mx-lg-2"
                style={
                  structurecolor === "5"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                Personalizado
              </h4>
            </label>
            <input
              type="radio"
              name="fqwfqwfas"
              id="screenNo"
              className="input-hidden"
              value="No"
              onChange={(e) => {
                setstructure(e.target.value);
                setstructurecolor("6");
              }}
            />
            <label value="Personalizado" htmlFor="screenNo">
              <div className="mx-lg-4 p-2">
                <img src={screen} style={{ height: "100px", width: "100px" }} />
              </div>
              <h4
                className="text-center mx-lg-2"
                style={
                  structurecolor === "6"
                    ? { cursor: "pointer", color: "#ff14ff" }
                    : { cursor: "pointer" }
                }
              >
                No, Solo pantalla
              </h4>
            </label>
            <br />
            <p className="d-inline w-100">
              <h4
                className="text-center w-100 text-dark frank-color-blue"
                style={{ marginTop: "15px" }}
              >
                El tiempo de entrega
              </h4>
              <FormControl component="fieldset">
                <RadioGroup
                  style={{ justifyContent: "center" }}
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setdeliverytime(e.target.value)}
                >
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Seleccionar fecha de calander"
                    value="date"
                  />
                  {deliverytime === "date" ? (
                    <>
                      {" "}
                      <TextField
                        id="date"
                        label="Select date"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setdeliverytime(e.target.value)}
                        className="mr-3"
                      />{" "}
                    </>
                  ) : null}
                  <FormControlLabel
                    value="2 semanas de stock (en stock)"
                    control={<Radio color="primary" />}
                    label="2 semanas de stock (en stock)"
                  />
                  <FormControlLabel
                    value="4 semanas de avión, (fabricación express)"
                    control={<Radio color="primary" />}
                    label="4 semanas de avión, (fabricación express)"
                  />
                  <FormControlLabel
                    value="8 semanas de barco (fabricación estándar)"
                    control={<Radio color="primary" />}
                    label="8 semanas de barco (fabricación estándar)"
                  />
                  <FormControlLabel
                    value="TAN PRONTO COMO SEA POSIBLE"
                    control={<Radio color="primary" />}
                    label="TAN PRONTO COMO SEA POSIBLE"
                  />
                  <FormControlLabel
                    value="NO ES URGENTE, TENGO TIEMPO"
                    control={<Radio color="primary" />}
                    label="NO ES URGENTE, TENGO TIEMPO"
                  />
                </RadioGroup>
              </FormControl>
            </p>

            <br />
            <br />
          </div>
        );
      case 4:
        return (
          <div className="w-100 my-lg-5">
            <br />
            <br />
            <p className="d-inline w-100">
              {/* FRANK LATEST CHANGE */}
              {/* <h4 className="text-center w-100 text-dark frank-color-blue">INSTALACIÓN O ENVÍO?</h4> */}
              <h4 className="text-center w-100 text-dark frank-color-blue">
                TIPO DE SERVICIO A CONTRATAR
              </h4>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setdeliverytime(e.target.value)}
                >
                  <FormControlLabel
                    value="Instalación"
                    control={<Radio color="primary" />}
                    label="INSTALACIÓN (EL PROVEEDOR SE ENCARGA DE TODO)"
                  />
                  <FormControlLabel
                    value="Transporte"
                    control={<Radio color="primary" />}
                    label="ENVÍO (EL PROVEEDOR ENVIAR EL PRODUCTO, NO INSTALA)"
                  />
                </RadioGroup>
              </FormControl>
            </p>
            <br />
            <br />
            <br />
            <p className="d-inline w-100">
              <h4 className="text-center w-100 text-dark frank-color-blue">
                SENSOR DE BRILLO / SENSOR DE TEMPERATURA
              </h4>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setsensor(e.target.value)}
                >
                  <FormControlLabel
                    value="Sensor de brillo"
                    control={<Radio color="primary" />}
                    label="Sensor de brillo"
                  />
                  <FormControlLabel
                    value="SENSOR DE TEMPERATURA"
                    control={<Radio color="primary" />}
                    label="SENSOR DE TEMPERATURA"
                  />
                  <FormControlLabel
                    value="NO"
                    control={<Radio color="primary" />}
                    label="NO"
                  />
                </RadioGroup>
              </FormControl>
            </p>
            <br />
            <br />
            <br />
            <p className="d-inline w-100">
              <h4 className="text-center w-100 text-dark frank-color-blue">
                POSIBILIDAD DE AUMENTAR LA GARANTÍA
              </h4>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setwarranty(e.target.value)}
                >
                  <FormControlLabel
                    value="2 años (se debe seleccionar por defecto)"
                    control={<Radio color="primary" />}
                    label="2 años (se debe seleccionar por defecto)"
                  />
                  <FormControlLabel
                    value="3 años"
                    control={<Radio color="primary" />}
                    label="3 años"
                  />
                  <FormControlLabel
                    value="4 años"
                    control={<Radio color="primary" />}
                    label="4 años"
                  />
                  <FormControlLabel
                    value="5 años"
                    control={<Radio color="primary" />}
                    label="5 años"
                  />
                </RadioGroup>
              </FormControl>
            </p>
            <br />
            <br />
            <br />
            {/* frank changes may be implemented  */}
            <p className="d-inline w-100">
              <h4 className="text-center w-100 text-dark frank-color-blue">
                MATERIAL CARCASA
              </h4>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setcarcass(e.target.value)}
                >
                  <FormControlLabel
                    value="CHAPA"
                    control={<Radio color="primary" />}
                    label="CHAPA (acabado básico)"
                  />
                  <FormControlLabel
                    value="PLÁSTICO SLIM MODEL 8mm thick"
                    control={<Radio color="primary" />}
                    label="PLÁSTICO (acabado medio)"
                  />
                  <FormControlLabel
                    value="ALUMINIO"
                    control={<Radio color="primary" />}
                    label="ALUMINIO( acabado superior)"
                  />
                  <FormControlLabel
                    value="INDIFERENTE"
                    control={<Radio color="primary" />}
                    label="INDIFERENTE (Por si no lo tienes claro)"
                  />
                </RadioGroup>
              </FormControl>
            </p>
            <br />
            <br />
            <br />

            <p className="d-inline w-100">
              <h4 className="text-center w-100 text-dark frank-color-blue">
                CASOS DE MOSCA
              </h4>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setflycases(e.target.value)}
                >
                  <FormControlLabel
                    value="YES"
                    control={<Radio color="primary" />}
                    label="YES"
                  />
                  <FormControlLabel
                    value="NO"
                    control={<Radio color="primary" />}
                    label="NO"
                  />
                </RadioGroup>
              </FormControl>
            </p>
            <br />
            <br />
            <br />

            <p className="d-inline w-100">
              <h4 className="text-center w-100 text-dark frank-color-blue">
                QUE ERES
              </h4>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  constolsys="posiconstolsys"
                  defaultValue="top"
                  onChange={(e) => setentity(e.target.value)}
                >
                  <FormControlLabel
                    value="ENTIDAD PÚBLICA"
                    control={<Radio color="primary" />}
                    label="ENTIDAD PÚBLICA"
                  />
                  <FormControlLabel
                    value="Entidad privada"
                    control={<Radio color="primary" />}
                    label="Entidad privada"
                  />
                </RadioGroup>
              </FormControl>
            </p>
            <br />
            <br />
            <br />

            <div>
              <h4
                style={{ textTransform: "uppercase", marginBottom: "5px" }}
                className="text-center w-100 text-dark frank-color-blue"
              >
                tienes alguna pregunta
              </h4>
              <TextField
                type="text"
                multiline
                className="w-50 mx-lg-2"
                id="outlined-basic"
                label="Tiene usted alguna pregunta"
                variant="outlined"
                onChange={(e) => setAnyQuestion(e.target.value)}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <div className="row">
              <div
                className="col-md-12 my-lg-2"
                style={{ display: "flex", justifyContent: "center" }}
              >
                  {/* frank changes */}
                <TextField
                  onChange={(e) => setname(e.target.value)}
                  className="mx-1"
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                />{" "}
               
                
                {/* frank change  */}
                <TextField
                  
                  onChange={(e) => setCity(e.target.value)}
                  className="mx-1"
                  id="outlined-basic"
                  label="ciudad de instalación"
                  variant="outlined"
                />
                
                <TextField
                  onChange={(e) => setcompany(e.target.value)}
                  className="mx-1"
                  id="outlined-basic"
                  label="nombre de empresa"
                  variant="outlined"
                />{" "}
              </div>
              <div
                className="col-md-12 my-lg-2"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  type="number"
                  onChange={(e) => setTelephone(e.target.value)}
                  className="mx-1"
                  id="outlined-basic"
                  label="teléfono"
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => setpostalcode(e.target.value)}
                  className="mx-1"
                  id="outlined-basic"
                  label="Código postal"
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => setemail(e.target.value)}
                  className="mx-1"
                  id="outlined-basic"
                  label="Correo electrónico"
                  variant="outlined"
                />{" "}
                </div>

                <div className="col-md-12 col-xl-12">
                <TextField style={{width:"68%",margin:"auto"}}
                  onChange={(e) => setdescription(e.target.value)}
                  className="mx-1"
                  id="outlined-basic"
                  label="Comentarios"
                  variant="outlined"
                />
                </div>
              
              {/* <div className="col-md-12 my-lg-2" style={{display:"flex",justifyContent:"center"}}></div><TextField onChange={(e) => setPrice(e.target.value)} className="w-25" id="outlined-basic" label="Price?" variant="outlined" /> */}
            </div>
            <div className="w-100 my-lg-2">
              {" "}
              <p className="d-inline w-100">
                <h4
                  className="text-center w-100 text-dark frank-color-blue"
                  style={{ marginTop: "25px" }}
                >
                  Intermediaria / cliente final
                </h4>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    constolsys="posiconstolsys"
                    defaultValue="top"
                    onChange={(e) => setcustomertype(e.target.value)}
                  >
                    <FormControlLabel
                      value="Intermediaria"
                      control={<Radio color="primary" />}
                      label="Intermediaria"
                    />
                    <FormControlLabel
                      value="Cliente final"
                      style={{ marginLeft: "-20px" }}
                      control={<Radio color="primary" />}
                      label="Cliente final"
                    />
                  </RadioGroup>
                </FormControl>
              </p>
            </div>
            <div className="w-100 my-lg-2">
              {" "}
              <p className="d-inline w-100">
                <h4
                  className="text-center w-100 text-dark frank-color-blue"
                  style={{ marginTop: "10px" }}
                >
                  Sector
                </h4>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    constolsys="posiconstolsys"
                    defaultValue="top"
                    onChange={(e) => setsector(e.target.value)}
                  >
                    <FormControlLabel
                      style={{ textAlign: "left" }}
                      value="SPORT"
                      control={<Radio color="primary" />}
                      label="SPORT"
                    />
                    <FormControlLabel
                      style={{ textAlign: "left" }}
                      value="RETAIL"
                      control={<Radio color="primary" />}
                      label="RETAIL"
                    />
                    <FormControlLabel
                      style={{ textAlign: "left" }}
                      value="PUBLIC"
                      control={<Radio color="primary" />}
                      label="PUBLIC"
                    />
                    <FormControlLabel
                      style={{ textAlign: "left" }}
                      value="HEALTH"
                      control={<Radio color="primary" />}
                      label="HEALTH"
                    />
                    <FormControlLabel
                      style={{ textAlign: "left" }}
                      value="MOTOR"
                      control={<Radio color="primary" />}
                      label="MOTOR"
                    />
                    <FormControlLabel
                      style={{ textAlign: "left" }}
                      value="OCIO"
                      control={<Radio color="primary" />}
                      label="OCIO"
                    />
                    <FormControlLabel
                      style={{ textAlign: "left" }}
                      value="HOTELS"
                      control={<Radio color="primary" />}
                      label="HOTELS"
                    />
                    <FormControlLabel
                      style={{ textAlign: "left" }}
                      value="CONGRESSES"
                      control={<Radio color="primary" />}
                      label="CONGRESSES"
                    />
                    <FormControlLabel
                      style={{ textAlign: "left" }}
                      value="OTHER"
                      control={<Radio color="primary" />}
                      label="OTHER"
                    />
                  </RadioGroup>
                </FormControl>
              </p>
            </div>
            <h4 className="text-center w-100 text-dark frank-color-pink">
              Adjuntar documentos e imágenes
            </h4>
            <div className="w-100 my-lg-2">
              <TextField
                onChange={uploadfile}
                className="w-50 p-25 my-2"
                id="outlined-basic"
                type="file"
                variant="outlined"
              />{" "}
            </div>
          </div>
        );
      default:
    }
  }

  const classes = useStyles();

  function StyledRadio(props) {
    const classes = useStyles();

    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

  // const container = window !== undefined ? () => window().document.body : undefined;

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    window.scrollTo(0, 0);
    console.log(activeStep);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep <= 3) {
      if (activeStep === 0) {
        if (productType === "" || prdouctTypeImg === "") {
          Swal.fire({
            title: "Woofics.com",
            html: "<p>Por favor seleccione un producto !.</p>",
          });
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
      if (activeStep === 1) {
        if (
          buy === "" ||
          indoor === "" ||
          install === "" ||
          model === "" ||
         
          screenuse === ""
        ) {
          Swal.fire({
            title: "Woofics.com",
            html: "<p>Por favor rellene el formulario !.</p>",
          });
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
      if (activeStep === 2) {
        if (
          screenheight === "" ||
          screenbase === "" ||
          screenaccess === "" ||
          controlsys === ""
        ) {
          Swal.fire({
            title: "Woofics.com",
            html: "<p>Por favor rellene el formulario !.</p>",
          });
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
      if (activeStep === 3) {
        if (
          screenorientation === "" ||
          adverseweather === "" ||
          structure === "" ||
          deliverytime === ""
        ) {
          Swal.fire({
            title: "Woofics.com",
            html: "<p>Por favor rellene el formulario !.</p>",
          });
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [display1, setDisplay1] = useState("none");
  const [display2, setDisplay2] = useState("none");
  const [display3, setDisplay3] = useState("block");

  function Displayone() {
    setDisplay1("none");
    setDisplay2("block");
    setDisplay3("none");
  }
  function Displaytwo() {
    setDisplay1("block");
    setDisplay2("none");
    setDisplay3("none");
  }
  function Displaythree() {
    setDisplay1("none");
    setDisplay2("none");
    setDisplay3("block");
  }

  return (
    <>
      <section
        className="nav-section"
        style={{
          backgroundImage: "linear-gradient(to right, #ff14ff 10%, #F62B84)",
          height: "60px",
        }}
      >
        <Navbar />
      </section>

      <div className="page-wrapper" style={{ display: display1 }}>
        <div className="container-fluid acc-to-frac">
          <div className="row">
            <div className="col-md-12 pr-5">
              <i
                className="fa fa-chevron-left fa-2x"
                style={{
                  cursor: "pointer",
                  marginBottom: "20px",
                  marginLeft: "20px",
                }}
                onClick={() => Displaythree()}
              ></i>
            </div>
            {/* <div class="col-xl-6 col-md-12 left-side-pic">
                            <img src={salman} style={{width:"100%", height:"100%"}}/>
                        </div> */}
            <div className="col-xl-12 col-lg-12  mx-auto text-center right-side ">
              {/* col-xlg-9 col-md-9 */}
              <div className={classes.root}>
                <div
                  className="d-none d-md-block mt-md-4"
                  style={{ width: "95%", margin: "auto" }}
                >
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                <div>
                  {activeStep === steps.length ? (
                    <div className="w-100 text-center my-md-5 my-sm-0">
                      <Typography className={classes.instructions}>
                        Todos los pasos completados
                      </Typography>
                      <Button
                        // disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Atrás
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => SendService(2)}
                      >
                        {progress}
                      </Button>
                    </div>
                  ) : (
                    <div className="back-next">
                      <Typography className={classes.instructions}>
                        {getStepContent(activeStep)}
                      </Typography>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.backButton}
                        >
                          Atrás
                        </Button>
                        <Button
                          variant="contained"
                          malik
                          color="primary"
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-wrapper " style={{ display: display2 }}>
        <div className="container  pt-lg-5 mt-lg-5">
          <div className="col-md-12 pr-5">
            <i
              className="fa fa-chevron-left fa-2x"
              style={{ cursor: "pointer" }}
              onClick={() => Displaythree()}
            ></i>
          </div>
          <div className="row text-center">
            <div className="w-100  my-lg-5">
              <div className="container">
                <div className="row" style={{ paddingBottom: "5px" }}>
                  <div className="col-md-4">
                    <a
                      className="text-center w-100 text-dark frank-color-blue"
                      onClick={() => showLedType(1)}
                    >
                      <button className="s-button">Pantallas Led</button>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a
                      className="text-center w-100 text-dark frank-color-blue"
                      onClick={() => showLedType(2)}
                    >
                      <button className="s-button">LCD</button>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a
                      className="text-center w-100 text-dark frank-color-blue"
                      onClick={() => showLedType(3)}
                    >
                      <button className="s-button">Various</button>
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div id="screens" style={{ display: screenDisplay }}>
                    {data1.map((val, id) => {
                      return (
                        <>
                          <div
                            className="col-md-4 img-box "
                            style={{ padding: "5px" }}
                          >
                            {productType === val.author ? (
                              <h4
                                value={val.author}
                                style={{ color: "#ff14ff" }}
                              >
                                {val.author}
                              </h4>
                            ) : (
                              <h4 value={val.author}>{val.author}</h4>
                            )}
                            <img
                              src={val.image}
                              alt={val.author}
                              data-toggle="tool-tip"
                              width="150px"
                              height="150px"
                              onClick={(e) => {
                                setProductTypefunc(val.author, val.image);
                              }}
                              style={{ cursor: "pointer" }}
                            ></img>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>

                <div id="lcd" style={{ display: lcdDisplay }}>
                  {data2.map((val, id) => {
                    return (
                      <>
                        <div className="col-md-4" style={{ padding: "5px" }}>
                          {productType === val.author ? (
                            <h4 value={val.author} style={{ color: "#ff14ff" }}>
                              {val.author}
                            </h4>
                          ) : (
                            <h4 value={val.author}>{val.author}</h4>
                          )}
                          <img
                            src={val.image}
                            alt={val.author}
                            data-toggle="tool-tip"
                            width="150px"
                            height="150px"
                            onClick={(e) => {
                              setProductTypefunc(val.author, val.image);
                            }}
                            style={{ cursor: "pointer" }}
                          ></img>
                        </div>
                      </>
                    );
                  })}
                </div>

                <div id="various" style={{ display: variosDisplay }}>
                  {date3.map((val, id) => {
                    return (
                      <>
                        <div className="col-md-4" style={{ padding: "5px" }}>
                          {productType === val.author ? (
                            <h4 value={val.author} style={{ color: "#ff14ff" }}>
                              {val.author}
                            </h4>
                          ) : (
                            <h4 value={val.author}>{val.author}</h4>
                          )}

                          <img
                            src={val.image}
                            alt={val.author}
                            data-toggle="tool-tip"
                            width="150px"
                            height="150px"
                            onClick={(e) => {
                              setProductTypefunc(val.author, val.image);
                            }}
                            style={{ cursor: "pointer" }}
                          ></img>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-100 mx-auto mt-md-4">
              <h4 className="text-center w-100 text-dark frank-color-blue">
                Quiere comprar o alquilar
              </h4>
              {/* <div style={{display:"flex",justifyContent:"space-around", alignItems:"center", width:"35%", margin:"auto"}}> */}
              <input
                value="Buy"
                onChange={(e) => {
                  setbuy(e.target.value);
                  setbuycolor("true");
                }}
                type="radio"
                name="emotion"
                id="sad"
                className="input-hidden "
              />
              <label htmlFor="sad">
                {/* <img
                        src={shopping}
                        alt="I'm sad"
                        className="mx-lg-5 p-2" style={{ cursor: "pointer", color:"#ff14ff" }} /> */}
                <div className="mx-lg-3 p-2">
                  <i
                    className="fa fa-shopping-cart"
                    style={
                      buycolor === "true"
                        ? {
                            cursor: "pointer",
                            fontSize: "40px",
                            color: "#ff14ff",
                          }
                        : { cursor: "pointer", fontSize: "40px" }
                    }
                  ></i>
                </div>

                <h4
                  className="text-center"
                  style={
                    buycolor === "true"
                      ? { cursor: "pointer", color: "#ff14ff" }
                      : { cursor: "pointer" }
                  }
                >
                  COMPRA
                </h4>
              </label>

              <input
                value="Rental"
                onChange={(e) => {
                  setbuy(e.target.value);
                  setbuycolor("false");
                }}
                type="radio"
                name="emotion"
                id="happy"
                className="input-hidden"
              />
              <label htmlFor="happy">
                {/* <img
                        src="data:image/png;base64,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"
                        alt="I'm happy" className="p-2" style={{ cursor: "pointer" }} /> */}

                <div className="mx-lg-3 p-2">
                  <i
                    className=" fa fa-archive"
                    style={
                      buycolor === "false"
                        ? {
                            cursor: "pointer",
                            fontSize: "40px",
                            color: "#ff14ff",
                          }
                        : { cursor: "pointer", fontSize: "40px" }
                    }
                  ></i>
                </div>
                <h4
                  className="text-center"
                  style={
                    buycolor === "false"
                      ? { cursor: "pointer", color: "#ff14ff" }
                      : { cursor: "pointer" }
                  }
                >
                  ALQUILER
                </h4>
              </label>
              {/* </div> */}
              <br />
              <br />

              <label className="for-question-mobile frank-color-pink">
                ¡Háganos saber lo que quiere! Mencione todo a continuación:
              </label>
              <textarea
                onChange={(e) => setdescription(e.target.value)}
              ></textarea>
            </div>
            <div className="w-100 mx-auto ">
              <h4 className="text-center w-100 text-dark for-name-sec frank-color-pink">
                Nombre
              </h4>
              <div className="w-100 my-lg-2">
                <TextField
                  onChange={(e) => setname(e.target.value)}
                  className="w-50"
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                />{" "}
              </div>
              <h4 className="text-center w-100 text-dark for-name-sec frank-color-pink">
                Contacto
              </h4>
              <div className="w-100 my-lg-2">
                <TextField
                  type="number"
                  onChange={(e) => setcontact(e.target.value)}
                  className="w-50"
                  id="outlined-basic"
                  label="Teléfono"
                  variant="outlined"
                />{" "}
              </div>
              <h4 className="text-center w-100 text-dark for-name-sec frank-color-pink">
                Nombre de empresa
              </h4>
              <div className="w-100 my-lg-2">
                <TextField
                  onChange={(e) => setcompany(e.target.value)}
                  className="w-50"
                  id="outlined-basic"
                  label="Nombre de empresa"
                  variant="outlined"
                />{" "}
              </div>
              {/* <h4 className="text-center w-100 text-dark">Price</h4> */}
              {/* <div className="w-100 my-lg-2"><TextField onChange={(e) => setPrice(e.target.value)} className="w-50" id="outlined-basic" label="Price" variant="outlined" /> </div> */}
              <div>
                <h4 className="text-center w-100 text-dark d-inline frank-color-blue">
                  Dimensión de la pantalla
                </h4>
                <div style={{ marginTop: "10px" }}>
                  <TextField
                    value={screenbase}
                    type="number"
                    onChange={(e) => setscreenbase(e.target.value)}
                    className="w-30 mx-lg-2"
                    id="outlined-basic"
                    label="Base (m)"
                    variant="outlined"
                  />
                  <TextField
                    value={screenheight}
                    type="number"
                    onChange={(e) => setscreenheight(e.target.value)}
                    className="w-30 mx-lg-2"
                    id="outlined-basic"
                    label="Height (m) "
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="w-100 my-lg-2">
                <p className="d-inline w-100 ">
                  <h4
                    className="text-center w-100 text-dark frank-color-blue"
                    style={{ marginTop: "50px", marginBottom: "20px" }}
                  >
                    Intermediaria / cliente final
                  </h4>
                  <div className="w-50 text-center float-left end-customer-right ">
                    <input
                      type="radio"
                      name="q3"
                      className="w-25 text-right"
                      onChange={(e) => setcustomertype(e.target.value)}
                      value="Intermediary"
                    />
                    Intermediaria
                  </div>
                  <div className="w-50 text-center float-left ">
                    <input
                      type="radio"
                      name="q3"
                      className="w-25 text-right"
                      onChange={(e) => setcustomertype(e.target.value)}
                      value="End customer"
                    />{" "}
                    Cliente final
                  </div>
                </p>
              </div>

              <h4
                className="text-center w-100 text-dark sector frank-color-blue"
                style={{ marginTop: "50px", marginBottom: "20px" }}
              >
                Sector
              </h4>
              <div className="for-question-res" style={{ display: "flex" }}>
                <div className="w-100">
                  <input
                    type="radio"
                    name="q1"
                    className="w-25 text-center"
                    onChange={(e) => setsector(e.target.value)}
                    value="SPORT"
                  />
                  Deporte
                </div>

                <div className="w-100 ">
                  <input
                    type="radio"
                    name="q1"
                    className="w-25 text-center"
                    onChange={(e) => setsector(e.target.value)}
                    value="RETAIL"
                  />
                  Al por menor
                </div>

                <div className="w-100">
                  <input
                    type="radio"
                    name="q1"
                    className="w-25 text-center"
                    onChange={(e) => setsector(e.target.value)}
                    value="PUBLIC"
                  />
                  Pública
                </div>
                <div className="w-100 ">
                  <input
                    type="radio"
                    name="q1"
                    className="w-25 text-center"
                    onChange={(e) => setsector(e.target.value)}
                    value="HEALTH"
                  />
                  Salud
                </div>
                <div className="w-100">
                  <input
                    type="radio"
                    name="q1"
                    className="w-25 text-center"
                    onChange={(e) => setsector(e.target.value)}
                    value="MOTOR"
                  />
                  Motora
                </div>
                <div className="w-100 for-ques-mob">
                  <input
                    type="radio"
                    name="q1"
                    className="w-25 text-center"
                    onChange={(e) => setsector(e.target.value)}
                    value="OCIO"
                  />
                  Ocio
                </div>
                <div className="w-100 for-ques-mob ">
                  <input
                    type="radio"
                    name="q1"
                    className="w-25 text-center"
                    onChange={(e) => setsector(e.target.value)}
                    value="HOTELS"
                  />
                  Hotel
                </div>
                <div className="w-100">
                  <input
                    type="radio"
                    name="q1"
                    className="w-25 text-center"
                    onChange={(e) => setsector(e.target.value)}
                    value="CONGRESSES"
                  />
                  Congreso
                </div>
                <div className="w-100">
                  <input
                    type="radio"
                    name="OTHERS"
                    className="w-25 text-center"
                    onChange={(e) => setsector(e.target.value)}
                    value="OTHERS"
                  />
                  Other
                </div>
              </div>
              {/* </p> */}
              {/* </div> */}
              <h4
                className="text-center w-100 text-dark for-name-sec frank-color-blue"
                style={{ marginTop: "50px" }}
              >
                Código postal
              </h4>
              <div className="w-100 my-lg-2">
                <TextField
                  onChange={(e) => setpostalcode(e.target.value)}
                  className="w-50"
                  id="outlined-basic"
                  label="código postal"
                  variant="outlined"
                />{" "}
              </div>
              <h4 className="text-center w-100 text-dark for-name-sec frank-color-blue">
                Correo electrónico
              </h4>
              <div className="w-100 my-lg-2">
                <TextField
                  onChange={(e) => setemail(e.target.value)}
                  className="w-50"
                  id="outlined-basic"
                  label="Correo electrónico"
                  variant="outlined"
                />{" "}
              </div>
              <h4 className="text-center w-100 text-dark for-name-sec frank-color-blue">
                Adjuntar documentos e imágenes
              </h4>
              <div className="w-100 my-lg-2">
                <TextField
                  onChange={uploadfile}
                  className="w-50 p-25 my-2"
                  id="outlined-basic"
                  type="file"
                  variant="outlined"
                />
              </div>
              <h4 className="text-center w-100 text-dark for-name-sec frank-color-blue">
                Comentarios
              </h4>
              <div className="w-100 my-lg-2">
                <TextField
                  onChange={(e) => setcomments(e.target.value)}
                  className="w-50"
                  multiline
                  id="outlined-basic"
                  label="Comentarios"
                  variant="outlined"
                />{" "}
              </div>
            </div>
            <div className="w-100 text-center mx-auto my-3 ">
              <button
                className="btn btn-primary"
                onClick={() =>
                  description === "" ||
                  name === "" ||
                  contact === "" ||
                  company === "" ||
                  customertype === "" ||
                  sector === "" ||
                  postalcode === null ||
                  comments === "" ||
                  email === ""
                    ? alert("por favor complete estos")
                    : SendService(1)
                }
              >
                {progress}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-wrapper bg-light" style={{ display: display3 }}>
        <div className="container-fluid">
          <div className="row">
            <h3 className="text-dark w-100 pl-lg-5">Sabes lo que buscas </h3>
            <div className="w-100 pl-lg-5">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio color="primary" />}
                    label="Yes"
                    onClick={() => Displayone()}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio color="primary" />}
                    label="No"
                    onClick={() => Displaytwo()}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openpop2}
                onClose={handleClosepop2}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openpop2}>
                    <div className={classes.paper}>
                        <div className="container rounded">
                            <div className="container bg-white rounded ">
                                <div className="row">
                                    <div className="col-md-12 col-lg-6 col-sm-12 p-0 m-0 d-none d-lg-block mx-auto p-5">
                                        <div className="row d-block text-center ml-3">
                                            <img
                                                src={logo1}
                                                className="img-fluid w-50 mx-auto text-center mb-3"
                                            />
                                        </div>
                                        <h3
                                            className=" py-3
                                         h3 bolder"
                                        >
                                            <b>Accede a la mayor comunidad de soluciones LED de Europa
                                            </b>
                                        </h3>
                                        <h5 className=" py-3 h5 text-muted">
                                        ¡Pasa Al Siguiente Nivel,Obten las mejores ofertas de provedores certificados y todo desde un mismo lugar!
                                        </h5>
                                        <b>Si tienes alguna duda te asesoramos sin compromiso </b>
                                        <h5 className=" py-34 h5">
                                            <i className="fa fa-phone"> </i>{" "}
                                            <u>
                                                <a href="callto:34648411313" className="text-dark">
                                                    {" "}
                                                    +34 648 411 313
                                                </a>
                                            </u>{" "}
                                            or{" "}
                                            <u>
                                                <a href="/contacto" className="text-dark">
                                                    {" "}
                                                    te llamaremos gratis
                                                </a>
                                            </u>{" "}
                                        </h5>
                                        <img
                                            className="img-fluid w-75 mx-auto"
                                            src={reg}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignSelf: "center",
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-sm-12 mx-auto">
                                        <span
                                            className="float-right pr-2"
                                            onClick={handleClosepop2}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <i className="fa fa-times fa-2x pt-2"></i>
                                        </span>
                                        <div className=" py-3 px-4">
                                            <div style={{ display: display1 }}>
                                                <Client></Client>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
    </>
  );
}

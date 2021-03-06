import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Popover from '@material-ui/core/Popover';
// import { Alert, Button } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import CookieBanner from 'react-cookie-banner';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
// import ServiceProviderForm from './ServiceProviderForm'
// import Supplier from './Supplier'
import ReCAPTCHA from "react-google-recaptcha";
// import side_image from './LandingPage/images/img-01.png';
import { Link, useHistory,useLocation } from 'react-router-dom';
import WhatsAppWidget from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';
import reg from "../Images/rmbg.png";
import Client from './Client';
// import ReactDom from 'react-dom';
import './LandingPage/css/LandingPage.css';
// import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import logo1 from './LandingPage/images/woofics-new/WooficsLogo.png'
import logo2 from './LandingPage/images/woofics-new/WhatsApp-Image-2021-08-25-at-2.43-Copy.png';
// import { useWindowScroll } from 'react-use';
// import transitions from '@material-ui/core/styles/transitions';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        // backgroundColor: theme.palette.background.paper,
        // margin: theme.spacing(15, 2),
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        overflow: 'hidden',
        width: '100%',
        height: '90vh',
        overflowY: 'scroll'
    },
    typography: {
        padding: theme.spacing(2),
        color: 'black'
    },
    typographyLink: {
        color:'black',
    },
}));

function Navbar() {

    const [offset, setOffset] = useState(0);
    const [nnav, setnnav] = useState(false)
    var isFirstImage = true;
    const [navState,setNavState]=useState(false)

    const [urll, seturll] = useState('')
    const [namee, setnamee] = useState('')
    const [profile_image, setprofile_image] = useState('')
    const [navbar, setNavBar] = useState(false)
    const [mediaState,setMediaState]=useState(false)
    const [landingPage,setLandingPage]=useState(true)

    const [logoImg, setLogo] = useState(false);

    const [anchorElStaz, setAnchorElStaz] = React.useState(null);
    
   
    const handleClickStaz = (event) => {
        setAnchorElStaz(event.currentTarget);   
    };

    const handleCloseStaz = () => {
        setAnchorElStaz(null);
    };
    const location = useLocation();

    const openStaz = Boolean(anchorElStaz);
    const idStaz = openStaz ? 'simple-popover' : undefined;
    let profileImageStaz = "https://image.flaticon.com/icons/png/512/147/147144.png"
    useEffect(() => {
        if(location.pathname!=="/")setLandingPage(false);
        console.log("pathname is" +location.pathname);
            if (localStorage.getItem('user_token'))
                {
                    
                    var decoded = jwt_decode(localStorage.getItem("user_token"))
                    const { data: response } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
                        .then((response) => {
                            setnamee(response.data.first_name)
                            setprofile_image(response.data.profile_image)
                            
                            
                        })
    
                }
               
            
            

        // if (localStorage.getItem('url')) {
        //     if (localStorage.getItem('url')) {

        //     } 
        // } else {
        // }
    }, [])

    

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav pb-1 pt-1 fixed-top text-white") {
            x.className = "topnav pb-1 pt-1 fixed-top text-white responsive";
          
        } else {
            x.className = "topnav pb-1 pt-1 fixed-top text-white";
           
        }
    }

    const classes = useStyles();
    const [openpop, setOpenpop] = React.useState(false);

    const handleOpenpop = () => {
        setOpenpop(true);
    };

    const handleClosepop = () => {
        setOpenpop(false);
    };

    const [openpop2, setOpenpop2] = React.useState(false);

    const handleOpenpop2 = () => {
        setOpenpop2(true);
    };

    const handleClosepop2 = () => {
        setOpenpop2(false);
    };


    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setcaptcha] = useState(false);
    const [wait, setWait] = useState('Iniciar Sesi??n')



    var token = localStorage.getItem("user_token");

    const [show, setShow] = useState(true);
    const [disable, setDisable] = useState('disabled')

    function LoginBtn(e) {
        e.preventDefault();
        //             || captcha === false

        if (email === "" || password === "") {
            setOpen2(true)
        }
        else if (password.length < 8) {
            setOpen(true)
        }
        else {
            setWait('Please wait...')
            const { data: response } = axios.post(`https://api.woofics.com/api/login`, {
                email: email,
                password: password,
            })
                .then((response) => {
                    localStorage.setItem('user_token', response.data);
                    if (response) {
                        setWait('Iniciar Sesi??n')
                        console.log("pathname is"+location.pathname)
                        const role = jwt_decode(localStorage.getItem('user_token'))
                        if(location.pathname!=="/cita_principal")
                        {
                            if (role.role === 'Client') {
                                localStorage.setItem('url', "/tablero")
                                history.push("/tablero");
                            } else if (role.role === 'ServiceProvider') {
                                localStorage.setItem('url', "/tablerodeadministraci??n")
                                history.push("/tablerodeadministraci??n");
                            }
                            else if (role.role === 'Supplier') {
                                localStorage.setItem('url', "/tablero_de_proveedores")
                                history.push("/tablero_de_proveedores");
                            } else {
                                localStorage.setItem('url', "/tablerodemandos")
                                history.push("/tablerodemandos");
                            }
                        }
                        
                        
                    }
                    // 
                }, (error) => {
                    setWait('Iniciar Sesi??n')
                    setOpen3(true)
                    if(location.pathname!=="/cita_principal")
                    {
                        history.push('/');
                    }
                    
                });
        }
    }
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };


    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen3(false);
    };

    //AuthGuard


    function onChange() {
        setcaptcha(true)
    }






    // Google Auth

    const responseGoogle = (respons) => {
        const res = axios.post(`https://api.woofics.com/api/google`, {
            google: respons.profileObj,
        })
            .then((response) => {
                localStorage.setItem('user_token', response.data);
                if (response) {
                    const role = jwt_decode(localStorage.getItem('user_token'))
                    if (role.role === 'Client') {
                        localStorage.setItem('url', "/tablero")
                        history.push("/tablero");
                    } else if (role.role === 'ServiceProvider') {
                        localStorage.setItem('url', "/tablerodeadministraci??n")
                        history.push("/tablerodeadministraci??n");
                    }
                    else if (role.role === 'Supplier') {
                        localStorage.setItem('url', "/tablero_de_proveedores")
                        history.push("/tablero_de_proveedores");
                    } else {
                        localStorage.setItem('url', "/tablerodemandos")
                        history.push("/tablerodemandos");
                    }
                }
                
            }, (error) => {
                setOpen3(true)
                
                history.push('/');
            });
    }

    //SIgnup Account

    const [display1, setDisplay1] = useState('block')
    const [display2, setDisplay2] = useState('none')
    const [display3, setDisplay3] = useState('none')
    const [buttonclr1, setbuttonclr1] = useState('btn btn-primary text-white')
    const [buttonclr2, setbuttonclr2] = useState('')
    const [buttonclr3, setbuttonclr3] = useState('')

    function Displayone() {
        setDisplay1('block')
        setDisplay2('none')
        setDisplay3('none')
        setbuttonclr1('btn btn-primary text-white')
        setbuttonclr2('')
        setbuttonclr3('')
    }
    function Displaytwo() {
        setDisplay1('none')
        setDisplay2('block')
        setDisplay3('none')
        setbuttonclr1('')
        setbuttonclr2('btn btn-primary text-white')
        setbuttonclr3('')
    }
    function Displaythree() {
        setDisplay1('none')
        setDisplay2('none')
        setDisplay3('block')
        setbuttonclr1('')
        setbuttonclr2('')
        setbuttonclr3('btn btn-primary text-white')
    }
    let profileLink = "";
    try{
        const role = jwt_decode(localStorage.getItem('user_token'))
        if (role.role === 'Client') {
            profileLink="/tablero"
        } else if (role.role === 'ServiceProvider') {
            profileLink="/tablerodeadministraci??n"
        }
        else if (role.role === 'Supplier') {
            profileLink="/tablero_de_proveedores"
        } else {
            profileLink="/tablerodemandos"
        }
    }
    catch{
        
    }
    
                    

    // const [ad, setad] = useState('')
    // const [ser, setser] = useState('')

    const responseFacebook = (response) => {
        
        
        const res = axios.post(`https://api.woofics.com/api/facebook`, {
            userId: response.userID,
            name: response.name,
            email:response.email,
            picture:response.picture.data
        })
            .then((response) => {
                console.log(response)
                localStorage.setItem('user_token', response.data);
                if (response) {
                    const role = jwt_decode(localStorage.getItem('user_token'))
                    if (role.role === 'Client') {
                        localStorage.setItem('url', "/tablero")
                        history.push("/tablero");
                    } else if (role.role === 'ServiceProvider') {
                        localStorage.setItem('url', "/tablerodeadministraci??n")
                        history.push("/tablerodeadministraci??n");
                    }
                    else if (role.role === 'Supplier') {
                        localStorage.setItem('url', "/tablero_de_proveedores")
                        history.push("/tablero_de_proveedores");
                    } else {
                        localStorage.setItem('url', "/tablerodemandos")
                        history.push("/tablerodemandos");
                    }
                }
                
            }, (error) => {
                setOpen3(true)
                
                history.push('/');
            });
    }


    const componentClicked = (response) => {
        console.warn(response)
    }
    
    function changeBackground() {
        if (window.scrollY >= 50) {

            try {
                setNavState(true);
               
                setLogo(true);
               
                
            }
            catch {

            }

        }
        else {
   
            try {
                setNavState(false);
                setLogo(false)
               
            }
            catch {

            }

        }



    }
    window.addEventListener('scroll', changeBackground, true);



    return (
        <>
            {/* ${colorChange?"bg-dark" : "bg-light"} */}

            <div className="container.fluid ">
                <div className="woofic_background  my-auto ">
                    <div className={navState ? "topnav topnavresponsive pb-1 pt-1 fixed-top " : landingPage ? "topnav pb-1 pt-1 fixed-top" : "topnav pb-1 pt-1 fixed-top nonLandingPageNav" } id="myTopnav" style={{height:"65px"}}>
                        <Link to="/">
                                
                                <img
                                src={logoImg ? logo1 : logo2}
                                className="pl-lg-4 mr-5 pt-1 "
                                id="woofic-logo"
                                /> 

                            
                            
                        </Link>
                        <Link className="pt-3 taglink hover-effect for-res" to="/" id="" >
                        Inicio
                        </Link>
                        <Link to="/foro_de_discusi??n_del_cliente" className="pt-3 taglink for-res" id="" >
                            Foro
                        </Link>
                       
                        {/* <Link to="/foro_de_discusion" className="pt-3 ">Forum</Link> */}
                        <Link to="/cita_principal"  className="pt-3 taglink hover-effect for-res" id="">
                        Recibir Ofertas
                        </Link>
                        {/* <Link to="/anunciar" className="pt-3 ">Tools</Link> */}

                        {/* <Link to="/calculadora_de_precios" className="pt-3 " id="">
                            Price Calculator
                        </Link> */}

                        {/* <Link to="/inspirada" className="pt-3 " id="">
                            Get Inspire
                        </Link> */}

                        <Link id="scroll-effect" className="for-res"  style={{marginLeft:"-12px",marginTop:"1px"}} >
                            {/* Advertise */}
                            
                            <div className="dropdown hover-effect">
                                <button className={navState ? "dropbtn dropbtnresponse" :"dropbtn" } id="dropDownLink">Herramientas</button>
                                <div className="dropdown-content">
                                <Link to="/calculadora_de_precios" className="pt-3 "  id="taglink4" style={{color:"#000", textAlign:"left"}}>
                                    <span style={{textAlign:"left"}}>Calculadora</span>
                                </Link>

                                <Link to="/inspirada" className="pt-3 " id="taglink5" style={{color:"#000"}}>
                                    Insp??rate
                                </Link>

                                <Link to="/anunciar"  className="pt-3 " id="taglink6" style={{color:"#000"}}>
                                Anunciate
                                </Link>
                                </div>
                                </div>
                        </Link>

                        <Link id="scroll-effect " className="salman for-res"  style={{marginLeft:"-12px",marginTop:"1px"}} >
                            {/* Advertise */}
                            
                            <div className="dropdown hover-effect">
                                <button className={navState ? "dropbtn dropbtnresponse" :"dropbtn" } id="dropDownLink">Opciones de Perfil</button>
                                <div className="dropdown-content">
                                <Typography className={classes.typography}>
                        <Link className="profile-pic pt-3 text-blackStaz" to={profileLink}   id="text-blackStaz">
                            <i className="fa fa-user mx-3 text-blackStaz"></i>
                            <span className="text-black font-medium mr-3 text-blackStaz" style={{textTransform:'capitalize'}}>Perfil</span>
                        </Link>
                    </Typography>
                    <Typography className={classes.typography}>
                        <a className="profile-pic"  style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() => { localStorage.removeItem('user_token');localStorage.removeItem('url'); history.push('/') ; handleCloseStaz()}}>
                            <i className="fa fa-sign-out mx-3 text-blackStaz"></i>
                            <span className="text-black font-medium mr-3 text-blackStaz login-option-class" style={{textTransform:'capitalize'}}>Cerrar sesi??n</span>
                        </a>
                    </Typography>
                                </div>
                                </div>
                        </Link>
                        {localStorage.getItem("user_token") ? (
                            <>
                                <a className="profile-pic float-right text-blackStaz" style={{marginRight:"20px"}} aria-describedby={idStaz} variant="contained" color="primary" onClick={handleClickStaz}>
                                        <span className="text-white font-medium "><img className="img-fluid mb-2 pro-pic" src={profile_image !== null ? profile_image : profileImageStaz} style={{ width: "40px", marginTop:"-8px", borderRadius:"50px"}} /></span>
                                        {/* https://image.flaticon.com/icons/png/512/147/147144.png */}
                                </a>
                            </>
                        ) : (
                            <>
                                {" "}
                                <Link
                                    className="float-right p-0 m-0"
                                    style={{ textAlign: "justify", marginRight: 20 }}
                                >
                                    <button
                                        type="submit"
                                        className="f-button btn btn-white text-white p-2 mr-5 mt-2 ml-2 nav-button-join"
                                        onClick={handleOpenpop2}
                                    >
                                        <b>??nete Ahora</b>{" "}
                                    </button>
                                </Link>
                                <Link className="float-right p-0 m-0">
                                    <button
                                        type="submit"
                                        className="f-button btn btn-white text-white p-2 ml-5 mt-2 nav-button-sign"
                                        onClick={handleOpenpop}
                                    >
                                        <i className="fa fa-sign-out"> </i> <b>Area Cliente</b>
                                    </button>
                                </Link>
                            </>
                        )}
                        <a href="javascript:void(0);" className="icon" onClick={myFunction} >
                            <i className="fa fa-bars" id="taglink7"></i>
                        </a>
                    </div>
                    <div className="container-fluid w-100">
                        <div
                            id="google_translate_element"
                            className="float-right"
                            style={{
                                position: "fixed",
                                float: "right",
                                top: "10%",
                                right: "30px",
                                zIndex: "10",
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openpop}
                onClose={handleClosepop}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openpop}>
                    <div className={classes.paper}>
                        <div
                            className="container rounded"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div className="container w-75 bg-white rounded ">
                                <div className="row text-center">
                                    <div className="col-md-12 shadow text-center">
                                        <span
                                            className="float-right "
                                            onClick={handleClosepop}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <i className="fa fa-times fa-2x pt-2"></i>
                                        </span>
                                        
                                        <img
                                            src={logo1}
                                            alt="Woofics"
                                            className=" mx-auto text-center my-2"
                                            style={{ width: "200px",marginRight:'5px' }}
                                        />
                                        <p
                                            className="p"
                                            onClick={handleOpenpop2}
                                            style={{ cursor: "pointer", backgroundColor:"rgb(249, 92, 135)", borderRadius:"5px", width:"175px", padding:"5px", margin:"auto",marginBottom:"10px", color:"#fff", fontWeight:"900" }}
                                        >
                                            ??Crea una cuenta?
                                        </p>
                                    </div>
                                    <div className="col-md-7 col-lg-7 col-sm-12  pr-lg-5 my-auto ">
                                        <div className=" py-3 px-4">
                                            <div className="row w-100 mx-auto">
                                                <label className="mb-1">
                                                    <h6
                                                        className="mb-0 text-sm "
                                                        style={{ fontWeight: "bolder" }}
                                                    >
                                                        Direcci??n de correo electr??nico
                                                    </h6>
                                                </label>{" "}
                                                <input
                                                    className="mb-4"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    required
                                                    name="email"
                                                    placeholder="Introduzca una direcci??n de correo electr??nico v??lida"
                                                />{" "}
                                            </div>
                                            <div className="row w-100 mx-auto">
                                                {" "}
                                                <label className="mb-1">
                                                    <h6
                                                        className="mb-0 text-sm"
                                                        style={{ fontWeight: "bolder" }}
                                                    >
                                                        Contrase??a
                                                    </h6>
                                                </label>{" "}
                                                <input
                                                    type="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    name="password"
                                                    placeholder="Introducir la contrase??a"
                                                />{" "}
                                            </div>
                                            <div className="row mb-4 w-100 ">
                                                <div className="custom-control custom-checkbox custom-control-inline">
                                                    <a
                                                        className=" mb-0 text-sm"
                                                        onClick={() => history.push("/forgetpwd")}
                                                    >
                                                        ??Has olvidado tu contrase??a?
                                                    </a>{" "}
                                                </div>
                                            </div>
                                            <ReCAPTCHA
                                                className="w-100 mx-auto text-center pt-1"
                                                sitekey="6LdoMp4aAAAAABcnCJ8oy37evhsb3fxEyNvJcdhd"
                                                onChange={onChange}
                                            />
                                            {captcha == false ? (
                                                <small className="text-danger">Requerida*</small>
                                            ) : (
                                                ""
                                            )}
                                            <div className="mb-4 mt-2 text-center">
                                                <button
                                                    type="submit"
                                                    className={`btn btn-blue w-100 shadow py-2 ${email == "" || password == "" ? disable : ""
                                                        }`}
                                                    style={{
                                                        backgroundColor: "#2ECC71",
                                                        borderRadius: 50,
                                                    }}
                                                    onClick={LoginBtn}
                                                >
                                                    {wait}
                                                </button>
                                            </div>

                                            {/* <div className="row mb-4 pl-3 pr-auto pt-3"> <small classNam    e="font-weight-bold">Don't have an account? <Link className="text-danger" onClick={handleOpenpop2}>Register</Link></small> </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-lg-5 col-sm-12 p-0 m-0 d-none d-lg-block">
                                        <div className="row pr-4 pt-4">
                                            <div className="text-center my-auto mx-auto text-center">
                                                <div className="col-md-12 mt-3 text-center">
                                                    <FacebookLogin
                                                        appId="546365809890817"
                                                        // autoLoad={true}
                                                        // render={renderProps => (
                                                        // <div className="facebook text-center mr-3">
                                                        //     <div className="fa fa-facebook"></div>
                                                        // </div>
                                                        // )}
                                                        
                                                        fields="name,email,picture"
                                                        onClick={componentClicked}
                                                        callback={responseFacebook}
                                                        cssClass="btnFacebook text-center py-2"
                                                        icon={
                                                            <div className="pt-1">
                                                                    <i className="fa fa-facebook text-primary"></i>
                                                                    <span className="pl-2 " style={{fontSize:'16px'}}>
                                                                    Iniciar sesi??n con Facebook
                                                                    </span>
                                                                </div>
                                                        }
                                                        textButton="&nbsp;&nbsp;
                                                        "
                                                    />
                                                </div>
                                                <div className="col-md-12 mt-3 text-center">
                                                    <GoogleLogin
                                                        clientId="101523716211-l7m06jsccfe7fa6u3tdinal5fofer8qt.apps.googleusercontent.com"
                                                        render={(renderProps) => (
                                                            <div
                                                                className="btnFacebook text-center py-2"
                                                                onClick={renderProps.onClick}
                                                                disabled={renderProps.disabled}
                                                            >
                                                                <div className="pt-1">
                                                                    <i className="fa fa-google text-danger"></i>
                                                                    <span className="pl-2 ">
                                                                    Inicia sesi??n con Google
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        cssClass="btnFacebook"
                                                        // buttonText="Login"
                                                        onSuccess={responseGoogle}
                                                        onFailure={responseGoogle}
                                                        cookiePolicy={"single_host_origin"}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-5 text-center">
                                                <p className="px-2 p text-mute">
                                                    Haciendo click en ???Entra con Facebook???, ???Entra con
                                                    Google??? aceptas la Politica de privacidad y
                                                    Condiciones que se presenta{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

            {/* Register Modal............................... */}

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
                                            <b><span style={{textTransform:'capitalize'}}>Accede</span> a la mayor comunidad de proveedores <span style={{textTransform:'uppercase'}}>Led</span> y <span style={{textTransform:'uppercase'}}>LCD</span> de <span style={{textTransform:'capitalize'}}>Europa</span>
                                            </b>
                                        </h3>
                                        {/* <h5 className=" py-3 h5 text-muted">
                                        ??Pasa Al Siguiente Nivel,Obten las mejores ofertas de provedores certificados y todo desde un mismo lugar!
                                        </h5> */}
                                        <b><span style={{textTransform:'capitalize'}}>Si</span>tienes alguna duda te asesoramos sin compromiso </b>
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
                                                <Client />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <div
                style={{
                    position: "fixed",
                    float: "right",
                    bottom: "0px",
                    right: "0px",
                    zIndex: "100",
                    backgroundColor: "rgba(7, 72, 138, 0.71)",
                    borderRadius: "50px",
                }}
            >
                <WhatsAppWidget phoneNumber="+34648411313" textReplyTime="Normalmente responde en un d??a"  message="??Hola! ??Qu?? podemos hacer por ti?"
                companyName="Woofics" sendButton="Enviar" placeholder="Escribe un mensaje"/>
            </div>
            <div
                style={{
                    position: "fixed",
                    bottom: "0px",
                    right: "0px",
                    left: "0px",
                    zIndex: "100",
                    backgroundColor: "rgba(7, 72, 138, 0.71)",
                    borderRadius: "50px",
                }}
                className="text-center"
            >
                <CookieBanner
                    message="Este sitio web utiliza cookies para ofrecerle la informaci??n m??s relevante. Acepte las cookies para un rendimiento ??ptimo."
                    onAccept={() => { }}
                    cookie="user-has-accepted-cookies"
                    buttonMessage="Aceptar"
                />
            </div>

            <Popover
                id={idStaz}
                open={openStaz}
                anchorEl={anchorElStaz}
                onClose={handleCloseStaz}
                disableScrollLock={true}
                className="profilePopover"
                
                body={<div className="profilePopover">Contenido de Popover</div>}
                // container={anchorElStaz.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography} style={{textTransform:'capitalize'}} >
                        <Link className="profile-pic pt-3 text-blackStaz" to={profileLink}  style={{textTransform:'capitalize'}}  id="text-blackStaz">
                            <i className="fa fa-user mx-3 text-blackStaz"></i>
                            <span className="text-black font-medium mr-3 text-blackStaz" style={{textTransform:'capitalize'}}> Perfil</span>
                        </Link>
                    </Typography>
                    <Typography className={classes.typography} style={{textTransform:'capitalize'}}>
                        <a className="profile-pic" style={{textTransform:'capitalize'}} onClick={() => { localStorage.removeItem('user_token');localStorage.removeItem('url'); history.push('/') ; handleCloseStaz()}}>
                            <i className="fa fa-sign-out mx-3 text-blackStaz"></i>
                            <span className="text-black font-medium mr-3 text-blackStaz login-option-class" style={{textTransform:'none'}} >Cerrar Sesi??n</span>
                        </a>
                    </Typography>
            </Popover>

            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={"Password must be 8 digits long !"}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open2}
                autoHideDuration={6000}
                onClose={handleClose2}
                message={"Please fill all feilds!"}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose2}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open3}
                autoHideDuration={6000}
                onClose={handleClose3}
                message={"Wrong email password!"}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose3}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </>
    );
}
export default Navbar;
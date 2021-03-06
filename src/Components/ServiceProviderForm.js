import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import reg from "../Images/rmbg.png"
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import logo from './LandingPage/images/woofics-new/WooficsLogo.png'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '500ch',
    },
  }, icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  }, item: {
    backgroundColor: "rgb(11 104 197)",
    boxShadow: '3px 0px 5px gray',
    borderRadius: "10px",
    color: 'white',
    margin: '0px'
    , "&:hover": {
      backgroundColor: "rgb(11 104 197)",
      boxShadow: '3px 0px 5px gray',
      borderRadius: "10px",
      color: 'white',
      margin: '0px'
    }
  },
}));


export default function ServiceProvider() {
  let history = useHistory();
  const classes = useStyles();

  const [service, setservice] = useState("");
  const [nameBusiness, setnameBusiness] = useState("");
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, settelephone] = useState("");
  const [location, setLocation] = useState("");
  const [contact_number, setContact] = useState("");
  const [companySize, setcompanySize] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [wait, setWait] = useState('Register')
  const [disable, setDisable] = useState('disabled')

  const [check, setcheck] = useState("supplier");

  function SendLoginDetails(e) {
    e.preventDefault();
    if (
      nameBusiness === "" ||
      name === "" ||
      email === "" ||
      telephone === "" ||
      location === "" ||
      companySize === "" ||
      password === "" ||
      cpassword === ""
    ) {
      setOpen2(true)
    } else if (password.length < 8) {
      setOpen(true)
    }
    else if (password !== cpassword) {
      alert("Incorrect password!")
    } else {
      setWait('Please wait...')
      const { data: response } = axios.post(check === "supplier" ?
        `https://api.woofics.com/api/supplier` : `https://api.woofics.com/api/provider`,
        {
          first_name: name,
          last_name: lastname,
          email: email,
          service: service ? service : " ",
          rating: 0,
          location_of_your_business: location,
          name_of_your_business: nameBusiness,
          password: password,
          contact_number: telephone,
          company_size: companySize,
          profile_image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
        },{
          headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
        })
        .then((response) => {
          setWait('Register')
          setOpen3(true)
          setTimeout(() => {
            history.push("/");
          }, 3000);
        }).catch((error) => {
          if (error.response) {
            setWait('Register')
            alert("Something went wrong! Please try later...");
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



  function StyledRadio(props) {
    const classes = useStyles();

    return (
      <Radio
        className={classes.root} percentage
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }


  return (
    <>


      <div className="container-fluid px-lg-5 mt-lg-3 mt-md-2 mt-sm-1 mx-auto w-100 ">
        <div className="">
          <div className="row d-flex ">
            <div className="col-lg-12 mx-auto ">
              <div className=" px-lg-4 py-auto pt-4">
                <div className="align-item-center">
                  <div className="col-md-6 col-lg-6 col-sm-12 p-0 m-0 mx-auto p-5">
                    <div className="row d-block text-center ml-3">
                      <img src={logo} alt="Logo" className="img-fluid w-50 mx-auto text-center mb-3" />
                    </div>
                    <h3 className=" py-3 h3 bolder"><b>Consiga nuevos clientes</b></h3>
                    <h5 className=" py-3 h5">??Pasa al siguiente nivel, llega a donde nunca has estado antes y descubre nuevas oportunidades!</h5>
                    <b>Te asesoramos sin compromiso</b>
                    <h5 className=" py-34 h5"><i className="fa fa-phone"> </i> <u><a href="callto:680494729" className="text-dark"> 680 49 47 29</a></u> o <u><Link  to="/contacto" className="text-dark"> te llamaremos gratis</Link></u> </h5>
                    <img className="img-fluid w-75 mx-auto" src={reg} style={{ display: "flex", justifyContent: 'center', alignSelf: 'center' }} />
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-12 mx-auto">
                    <div className=" py-3 px-lg-4 px-2 ">
                      <div className="border rounded">
                        <div className="w-100 rounded no-gutters">
                          <h5 className="h2 text-green text-center m-0 py-3">??nete gratis!</h5>
                        </div>
                        <div className="px-md-4 px-2 py-3">

                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Nombre de su empresa</h6>
                            </label> <input className="mb-4" onChange={(e) => setnameBusiness(e.target.value)} type="email" required name="email" placeholder="Entre aqu??" />
                          </div>

                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Nombre de pila</h6>
                            </label> <input className="mb-4" onChange={(e) => setname(e.target.value)} type="email" required name="email" placeholder="Entre aqu??" />
                          </div>
                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Apellido</h6>
                            </label> <input className="mb-4" onChange={(e) => setlastname(e.target.value)} type="email" required name="email" placeholder="Entre aqu??" />
                          </div>


                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}> Direcci??n de correo electr??nico</h6>
                            </label> <input className="mb-4" onChange={(e) => setEmail(e.target.value)} type="email" required name="email" placeholder="Entre aqu??" />
                          </div>

                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Tel??fono</h6>
                            </label> <input className="mb-4" onChange={(e) => settelephone(e.target.value)} type="email" required name="email" placeholder="Entre aqu??" />
                          </div>

                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Tama??o de la empresa</h6>
                            </label> <input className="mb-4" onChange={(e) => setcompanySize(e.target.value)} type="email" required name="email" placeholder="Entre aqu??" />
                          </div>

                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Ubicaci??n de su negocio (c??digo postal)</h6>
                            </label> <input className="mb-4" onChange={(e) => setLocation(e.target.value)} type="email" required name="email" placeholder="Entre aqu??" />
                          </div>


                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Clave</h6>
                            </label> <input className="mb-4" onChange={(e) => setPassword(e.target.value)} type="password" required name="password" placeholder="Entre aqu??" />
                          </div>

                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>confirmar Contrase??a</h6>
                            </label>
                            <input className="mb-4" onChange={(e) => setCpassword(e.target.value)} type="password" required name="password" placeholder="Entre aqu??" />
                          </div>

                          <div className="row w-100 mx-auto">
                            <label className="mb-1">
                              <h6 className="mb-0 text-sm pr-3" style={{ fontWeight: 'bolder' }}>Qu?? haces principalmente:</h6>
                            </label>
                            <select onChange={(e) => setcheck(e.target.value)}>
                              <option value="supplier">Proveedora</option>
                              <option value="service">Proveedor de servicio</option>
                            </select>
                          </div>


                          {check === "service" ? <div className="row w-100 mx-auto ">
                            <div className="col-md-12  px-2 w-100 p-0 pt-3" >
                              <FormControl component="fieldset">
                                <FormLabel component="legend">Tu servicio:</FormLabel>
                                <RadioGroup defaultValue="two-phase" className="d-inline" aria-label="phase" name="customized-radios" style={{textTransform:"lowercase"}}>
                                  <FormControlLabel value="REPAIRS" onChange={(e) => setservice(e.target.value)} control={<StyledRadio />} label="REFACCI??N" />
                                  <FormControlLabel value="ELECTRICIAN" onChange={(e) => setservice(e.target.value)} control={<StyledRadio />} label="ELECTRICISTA" />
                                  <FormControlLabel value="ARCHITECTS" onChange={(e) => setservice(e.target.value)} control={<StyledRadio />} label="ARQUITECTOS / INGENIEROS" />
                                  <FormControlLabel value="GRAPHIC" onChange={(e) => setservice(e.target.value)} control={<StyledRadio />} label="DISE??ADOR GRAFICO" />
                                  <FormControlLabel value="SCREEN" onChange={(e) => setservice(e.target.value)} control={<StyledRadio />} label="GESTI??N DE PANTALLAS" />
                                  <FormControlLabel value="STRUCTURES" onChange={(e) => setservice(e.target.value)} control={<StyledRadio />} label="ESTRUCTURAS" />
                                  <FormControlLabel value="ADVERTISE" onChange={(e) => setservice(e.target.value)} control={<StyledRadio />} label="PUBLICIDAD EN PANTALLAS" />
                                  <FormControlLabel value="INSTALLER" onChange={(e) => setservice(e.target.value)} control={<StyledRadio />} label="INSTALADOR" />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </div> : null}
                        </div>
                        <div className="row mb-3 pl-4 mx-auto text-center">
                          <small className="font-weight-bold mx-auto text-center">
                          ??Ya eres usuario?  &nbsp;
                            <Link className="text-danger" to="/">
                            Acceso
                            </Link>
                          </small>
                        </div>
                        <div className="row mb-3 pl-4">
                          <button
                            type="submit"
                            className={`btn btn-blue text-center mx-auto mt-2 w-75 ${name === "" ||
                              lastname === "" ||
                              email === "" ||
                              telephone === "" ||
                              location === "" ||
                              password === "" ||
                              cpassword === "" ? disable : ''
                              }`}
                            onClick={SendLoginDetails} style={{ backgroundColor: 'green', borderRadius: 50 }}
                          >
                            {wait}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              </div>
            </div>
          </div>
        </div>
      </div>










      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={"Password must be 8 digits long !"}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open2}
        autoHideDuration={6000}
        onClose={handleClose2}
        message={"Please fill all feilds!"}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open3}
        autoHideDuration={6000}
        onClose={handleClose3}
        message={"We will review your apllication, and will email you as soon as possible!"}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

import React, { useState } from "react";
import { useHistory,useLocation } from "react-router-dom";
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


export default function Client() {
  let history = useHistory();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState(""); 
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [contact_number, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [wait, setWait] = useState('Register')
  const [disable, setDisable] = useState('disabled')
  const pathLocation = useLocation();

  function SendLoginDetails(e) {
    e.preventDefault();
    if (
      firstname === " " ||
      lastname === " " ||
      email === " " ||
      sector === " " ||
      contact_number === " " ||
      location === " " ||
      password === " " ||
      cpassword === " "
    ) {
      setOpen4(true)
    } else if (password.length < 8) {
      setOpen(true)
    } else if (password !== cpassword) {
      setOpen3(true)
    }
    else {
      setWait('Please wait...')
      const { data: response } = axios.post(
        `https://api.woofics.com/api/client`,
        {
          first_name: firstname,
          last_name: lastname,
          email: email,
          sector: sector,
          location: location,
          contact_number: contact_number,
          password: password,
          profile_image: 'https://image.flaticon.com/icons/png/512/147/147144.png'
        }).then((response) => {
          setWait('Register')
          setOpen4(true)
          if(pathLocation.pathname!=="/cita_principal")
          {
            setTimeout(() => {
              history.push("/");
            }, 3000);
          }
          
        }).catch((error) => {
          if (error.response) {
            setWait('Register')
            alert(error.response.data.message);
          }
        });
    }
  }


  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

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


  const handleClose4 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen4(false);
  };

  return (
    <>

      <div className=" py-auto pt-4 ">
        <div className="align-item-center">
          <div className="row border rounded">
            <div className="w-100 no-gutters">
              <h5 className="h2 text-green text-center m-0 py-3">Únete Gratis!</h5>
            </div>
            <div className="px-4 py-3">

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Primer Nombre</h6> 
                </label> <input className="mb-4" onChange={(e) => setFirstname(e.target.value)} type="email" required name="email" placeholder="Primer nombre" />
              </div>

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Apellido</h6>
                </label> <input className="mb-4" onChange={(e) => setLastname(e.target.value)} type="email" required name="email" placeholder="Apellido" />
              </div>


              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Dirección de correo electrónico</h6>
                </label> <input className="mb-4" onChange={(e) => setEmail(e.target.value)} type="email" required name="email" placeholder="Dirección de correo electrónico" />
              </div>


              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Sector</h6>
                </label> <input className="mb-4" onChange={(e) => setSector(e.target.value)} type="email" required name="email" placeholder="Sector" />
              </div>


              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Localización</h6>
                </label> <input className="mb-4" onChange={(e) => setLocation(e.target.value)} type="email" required name="email" placeholder="Localización" />
              </div>

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Número de teléfono</h6>
                </label> <input className="mb-4" onChange={(e) => setContact(e.target.value)} type="email" required name="email" placeholder="Número de teléfono" />
              </div>

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Clave</h6>
                </label> <input className="mb-4" onChange={(e) => setPassword(e.target.value)} type="password" required name="password" placeholder="Contraseña" />
              </div>

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>confirmar Contraseña</h6>
                </label> <input className="mb-4" onChange={(e) => setCpassword(e.target.value)} type="password" required name="password" placeholder="confirmar Contraseña" />
              </div>
            </div>
            <div className="row  mb-3 pl-4 w-100">
              <button
                type="submit"
                className={`btn btn-blue text-center mx-auto mt-2 w-75 ${firstname === "" ||
                  lastname === "" ||
                  email === "" ||
                  sector === "" ||
                  contact_number === "" ||
                  location === "" ||
                  password === "" ||
                  cpassword === "" ? disable : ''}`}
                onClick={SendLoginDetails} style={{ backgroundColor: "green", borderRadius: 50 }}
              >
                {wait}
              </button>
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
        message={"La contraseña debe tener 8 dígitos!"}
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
        message={"Por favor complete todos los campos!"}
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
        message={"Contraseña incorrecta"}
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
        open={open4}
        autoHideDuration={6000}
        onClose={handleClose4}
        message={"¡Por favor revise su correo electrónico para verificar su cuenta!"}
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

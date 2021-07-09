import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import signupside from "../Images/star.png";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Alert, Button } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



export default function Supplier() {
  let history = useHistory();


  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [supplies, setSupplies] = useState("");
  const [location, setLocation] = useState("");
  const [contact_number, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const[wait,setWait] = useState('Register')
  const [disable, setDisable] = useState('disabled')


  function SendLoginDetails(e) {
    e.preventDefault();
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      supplies === "" ||
      contact_number === "" ||
      location === "" ||
      password === "" ||
      cpassword === ""
    ) {
      setOpen2(true)
    } else if (password.length < 8) {
      setOpen(true)
    } else {
      setWait('Please wait...')
      const { data: response } = axios.post(
        `https://api.woofics.com/api/supplier`,
        {
          first_name: firstname,
          last_name: lastname,
          email: email,
          supplies: supplies,
          location: location,
          contact_number: contact_number,
          password: password,
          profile_image: 'https://image.flaticon.com/icons/png/512/147/147144.png',
          rating: 0
        }).then((response) => {
          alert('We will review your apllication, and will email you as soon as possible')
          history.push("/")
          setWait('Register')
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

  return (
    <>


      <div className="container-fluid px-5 mt-lg-3 mt-md-2 mt-sm-1 mx-auto w-100 ">
        <div className="">
          <div className="row d-flex ">
            <div className="col-lg-6 mx-auto border">
              <div className=" px-4 py-auto pt-4">
                <div className="align-item-center">
                  <div className="row d-block text-center">
                    <img src="assets/plugins/images/woofic.jpeg " className="img-fluid w-50 mx-auto text-center mb-3" />
                    <p>Register as: Supplier</p>
                  </div>
                  <div className="row ">
                    <div className="col-md-6">
                      <TextField className="mb-2"
                        id="Outlined-basic "
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        onChange={(e) => setFirstname(e.target.value)}
                        // name="fulname"
                      />

                    </div>
                    <div className="col-md-6">
                      <TextField className="mb-2"
                        id="Outlined-basic "
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        onChange={(e) => setLastname(e.target.value)}
                        // name="fulname"
                      />
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-6">

                    <TextField className="mb-2"
                      id="outlined-basic"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      // name="fulname"
                    />
                  </div>
                  <div className="col-md-6">

                    <TextField className="mb-2"
                      id="Outlined-basic "
                      fullWidth
                      label="Supplies"
                      variant="outlined"
                      onChange={(e) => setSupplies(e.target.value)}
                      // name="fulname"
                    />
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-6">
                    <TextField className="mb-2"
                      id="Outlined-basic "
                      fullWidth
                      label="Location"
                      variant="outlined"
                      onChange={(e) => setLocation(e.target.value)}
                      // name="fulname"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField className="mb-2"
                      id="Outlined-basic "
                      fullWidth
                      label="Contact Number"
                      variant="outlined"
                      type="number"
                      onChange={(e) => setContact(e.target.value)}
                      // name="fulname"
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-6">

                    <TextField className="mb-2"
                      id="outlined-basic"
                      label="Password"
                      fullWidth
                      variant="outlined"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      type="password"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField className="mb-2"
                      type="password"
                      id="outlined-basic"
                      label="Confirm Passoword"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setCpassword(e.target.value)}
                      name="cpassword"
                    />
                  </div>
                </div>
                <div className="row mb-3 pl-4">
                  <button
                    type="submit"
                    className={`btn btn-blue text-center mx-auto mt-2 ${
                      firstname === "" ||
                      lastname === "" ||
                      email === "" ||
                      supplies === "" ||
                      contact_number === "" ||
                      location === "" ||
                      password === "" ||
                      cpassword === "" ? disable : ''
                    }`}
                    onClick={SendLoginDetails} style={{ backgroundColor: 'rgb(3, 89, 117)' }}
                  >
                    {wait}
                  </button>
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
        message={"Something went wrong !"}
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

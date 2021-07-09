import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import signupside from "../Images/star.png";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { green } from "@material-ui/core/colors";


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
          setTimeout(() => {
            history.push("/");
          }, 3000);
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
            <div className="w-100 bg-success no-gutters">
              <h5 className="h5 text-white text-center m-0 py-3">Join for free!</h5>
            </div>
            <div className="px-4 py-3">

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>First Name</h6>
                </label> <input className="mb-4" onChange={(e) => setFirstname(e.target.value)} type="email" required name="email" placeholder="Enter a valid address" />
              </div>

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Last Name</h6>
                </label> <input className="mb-4" onChange={(e) => setLastname(e.target.value)} type="email" required name="email" placeholder="Enter a valid address" />
              </div>


              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Email Address</h6>
                </label> <input className="mb-4" onChange={(e) => setEmail(e.target.value)} type="email" required name="email" placeholder="Enter a valid address" />
              </div>


              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Sector</h6>
                </label> <input className="mb-4" onChange={(e) => setSector(e.target.value)} type="email" required name="email" placeholder="Enter a valid address" />
              </div>


              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Location</h6>
                </label> <input className="mb-4" onChange={(e) => setLocation(e.target.value)} type="email" required name="email" placeholder="Enter a valid address" />
              </div>

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Contact Number</h6>
                </label> <input className="mb-4" onChange={(e) => setContact(e.target.value)} type="email" required name="email" placeholder="Enter a valid address" />
              </div>

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Password</h6>
                </label> <input className="mb-4" onChange={(e) => setPassword(e.target.value)} type="password" required name="password" placeholder="Enter a valid address" />
              </div>

              <div className="row w-100 mx-auto">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm " style={{ fontWeight: 'bolder' }}>Confirm Password</h6>
                </label> <input className="mb-4" onChange={(e) => setCpassword(e.target.value)} type="password" required name="password" placeholder="Enter a valid address" />
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
        message={"Incorrect Password"}
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
        message={"Please check your email to verify your account!"}
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

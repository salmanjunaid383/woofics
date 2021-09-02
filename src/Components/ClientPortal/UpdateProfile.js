import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Sidebar from '../ClientPortal/Sidebar'

import jwt_decode from 'jwt-decode'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';




import { makeStyles, useTheme } from '@material-ui/core/styles';

import firebase from '../Firebase'


import './Todo.css'
import CustomClientAuth from "../CustomClientAuth";

const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));



export default function UpdateProfile() {
    CustomClientAuth();

    const history = useHistory();

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [sector, setSector] = useState("");
    const [location, setLocation] = useState("");
    const [contact_number, setContact] = useState("");
    const [progress, setProgress] = useState("Update Profile")
    const [imageUrl, setImageUrl] = useState('')

    const [opennoti, setOpennoti] = React.useState(false);
    const handleClosenoti = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpennoti(false);
    };

    function LoginBtn(e) {
        e.preventDefault();
        setProgress("Loading...")
        const { data: response } = axios.put(
            `https://api.woofics.com/api/client/${decoded.sub}`,
            {
                first_name: firstname,
                last_name: lastname,
                email: email,
                sector: sector,
                location: location,
                contact_number: contact_number,
                profile_image: imageUrl
            },{
                headers:window.header
              }).then((response) => {
                setOpennoti(true);
                setProgress('Update Profile')
                setTimeout(() => {
                    history.push("/dashboard");
                }, 1000);
            }, (Error) => {
                 
            });

    }


    //socail buttons disabled
    const [socialauth, setsocialauth] = useState([])
    const [googleauth, setgoogleauth] = useState('')
    const [facebookauth, setfacebookauth] = useState('')
    const [instgramauth, setinstgramauth] = useState('')
    const [profilImaege, setProfileImage] = useState('')

    // useEffect(() => {
    function getSocialData() {
        const res = axios.get(`https://api.woofics.com/api/social_media/${decoded.sub}`,{
            headers:window.header
          })
            .then((res) => {
                
                setsocialauth(res.data)
                res.data.map((val) => {
                    if (val.app == 'Google') {
                        setgoogleauth('disabled')
                    }
                    else if (val.app == 'Facebook') {
                        setfacebookauth('disabled')
                    }
                    else if (val.app == 'Instagram') {
                        setinstgramauth('disabled')
                    }
                })
            })
    }


    const [data, setData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`,{
            headers:window.header
          })
            .then((res) => {
                
                setData(res.data)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)
                setEmail(res.data.email)
                setSector(res.data.sector)
                setLocation(res.data.location)
                setContact(res.data.contact_numberr)
                setImageUrl(res.data.profile_image)
                getSocialData()
            }
            )

    }
    useEffect(() => {
        getData()
    }, [])
    // getSocialData()


    // }, [])


    // Google Auth

    const [google_email, setGoogle_email] = useState('')
    // const [disabled,setDisable_google_btn] = useState(false)


    const responseGoogle = (respons) => {
        
        
        const res = axios.post(`https://api.woofics.com/api/social_media`, {
            email: respons.profileObj.email,
            app: 'Google',
            user_id: decoded.sub
        },{
            headers:window.header
          })
            .then((res) => {
                
                // setDisable_google_btn(true)
                setOpenpop(true);
                getData()
            }
            ).catch((Error) => {
                      
                
            })
    }


    const responseFacebook = (response) => {
        const res = axios.post(`https://api.woofics.com/api/social_media`, {
            email: response.email,
            app: 'Facebook',
            user_id: decoded.sub
        },{
            headers:window.header
          })
            .then((response) => {
                setOpenpop(true);
                getData()
            }, (error) => {
             
                
            });
    }


    
    const [openpop, setOpenpop] = useState(false)
    const handleClosepop = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenpop(false);
    };


    //Facebook Auth

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();

    //..............................IMagse
    const [imageProgress, setImageProgress] = useState('')


    const onchange = async (e) => {
        setImageProgress('Loading...')
        const file = e.target.files[0];
        const ImagesRef = firebase.storage().ref('images').child(file.name);
        await ImagesRef.put(file)
        ImagesRef.getDownloadURL().then((url) => {
            setImageProgress('')
            setImageUrl(url)
            const { data: response } = axios.put(
                `https://api.woofics.com/api/client/${decoded.sub}`,
                {
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                    sector: sector,
                    location: location,
                    contact_number: contact_number,
                    profile_image: imageUrl
                },{
                    headers:window.header
                  }).then((response) => {
                    setImageProgress('')
                }, (Error) => {
                     
                });
        })
    }

    return (
        <>

            <div className="d-sm-flex">
                <Sidebar></Sidebar>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    

                    <div className="page-wrapper px-lg-5">
                        <div class="container-fluid">
                            <div class="row mx-auto border bg-light">
                                <div class="col-lg-8 col-xlg-9 col-md-12 col-sm-12 ">
                                    <div class="">
                                        <div class="card-body">
                                            <form class="form-horizontal form-material" >
                                                <div className="row">
                                                    <div class="form-group mb-4 col-md-6">
                                                        <label class="col-md-6 p-0 bold">Primer Nombre</label>
                                                        <input type="text" defaultValue={data.first_name}
                                                            class="form-control p-0 border-0" onChange={(e) => setFirstname(e.target.value)} /> </div>
                                                    <div class="form-group mb-4 col-md-6">
                                                        <label class="col-md-6 p-0 bold">Apellido</label>
                                                        <input type="text" defaultValue={data.last_name}
                                                            class="form-control p-0 border-0" onChange={(e) => setLastname(e.target.value)} /> </div>
                                                </div>
                                                <div className="row">

                                                    <div class="form-group mb-4 col-md-6">
                                                        <label for="example-email" class="col-md-12 p-0">Correo Electrónico</label>
                                                        <input type="email" defaultValue={data.email}
                                                            class="form-control p-0 border-0" name="example-email"
                                                            id="example-email1" onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                    <div class="form-group mb-4 col-md-6">
                                                        <label class="col-md-12 p-0">Telefono no</label>
                                                        <input type="text" defaultValue={data.contact_number}
                                                            class="form-control p-0 border-0" onChange={(e) => setContact(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div class="form-group mb-4 row col-md-6">
                                                        <label class="col-md-12 p-0">Sector</label>
                                                        <input type="text" defaultValue={data.sector}
                                                            class="form-control p-0 border-0" onChange={(e) => setSector(e.target.value)} />
                                                    </div>
                                                    <div class="form-group mb-4 row col-md-6">
                                                        <label class="col-md-12 p-0">Localización</label>
                                                        <input type="text" defaultValue={data.location}
                                                            class="form-control p-0 border-0" onChange={(e) => setLocation(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div class="form-group mb-4">
                                                    <div class="col-sm-12 text-center ">
                                                        <button class="btn text-white" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={LoginBtn}>{progress}</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-xlg-3 col-md-12 border-left">
                                    <div class="">
                                        <div class=" pt-5 w-50 mx-auto" >
                                            <img alt="user" className="img-fluid" src={imageUrl} />
                                            {imageProgress}
                                        </div>
                                        {/* value={Data.img} */}
                                        <input type="file" id='file' name='img' onChange={onchange}  className='imagesinput mx-auto' accept='image/*' />
                                    </div>
                                    <div className="text-center">
                                        <h5 className="h5">Conecta Tus Cuentas Sociales</h5>
                                        <FacebookLogin
                                                    appId="2736881086597729"
                                                    // autoLoad={true}
                                                    // render={renderProps => (
                                                        // <div className="facebook text-center mr-3">
                                                        //     <div className="fa fa-facebook"></div>
                                                        // </div>
                                                    // )}
                                                    icon="fa fa-facebook"
                                                    fields="name,email,picture"
                                                    // onClick={componentClicked}
                                                    callback={responseFacebook}
                                                    cssClass="my-facebook-button"
                                                    textButton={<span class="ml-3">Facebook</span>}
                                                     />
                                        <GoogleLogin
                                            clientId="101523716211-l7m06jsccfe7fa6u3tdinal5fofer8qt.apps.googleusercontent.com"
                                            render={renderProps => (
                                                <div onClick={renderProps.onClick} disabled={renderProps.disabled} className={`col-md-12 bg-danger text-light my-2 p-2 border btn btn-success ${googleauth}`} >
                                                    <i className="fa fa-google"> Google</i>
                                                </div>
                                            )}
                                            buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
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
                        open={openpop}
                        autoHideDuration={6000}
                        onClose={handleClosepop}
                        message={"Your Social Account has been connected with Woofic"}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosepop}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </main>
            </div>



        </>
    );
}


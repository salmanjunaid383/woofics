import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Sidebar from '../AdminPortal/Sidebar'

import jwt_decode from 'jwt-decode'



import { makeStyles, useTheme } from '@material-ui/core/styles';

import firebase from '../Firebase'



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));


export default function UpdateProfile() {
    // CustomProviderAuth();
    // useEffect(() => {
    //     if (!localStorage.getItem('user_token')) {
    //         history.push('/')
    //     }

    // })

    const history = useHistory();

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [firstname, setFirstname] = useState("");
    const [bname, setbname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [size, setsize] = useState("");
    const [location, setLocation] = useState("");
    const [contact_number, setContact] = useState("");
    const [ProfileImage, setProfileImage] = useState("");
    const [servic, setservic] = useState("");
    const [rat, setrat] = useState("");
    const [progress, setprogress] = useState("Update Profile");

    const [card,setCard]=useState("");
    const [cardName,setCardName]=useState("")
    const[cvc,setCvc]=useState("")
    const[expMonth,setExpMonth]=useState("")
    const[expYear,setExpYear]=useState("")
    const[stripeEmail,setStripeEmail]=useState("")
    const [cardData,setCardData]=useState("");

    const [cardProgress,setCardProgress]=useState("Update Credit Card")

    function updateCard(e){
        e.preventDefault();
        setCardProgress("Loading... ")
        const { data: response } = axios.post(
            `https://api.woofics.com/api/save_card`,
            {
                name: cardName,
                card_number: card,
                exp_month: expMonth,
                exp_year: expYear,
                cvc: cvc,
                user_id:decoded.sub
                
            },{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              }).then((response) => {
                
                setCardProgress('Card Info Save Successfully')
                getCreditCardData();
                // setOpenpop(true);
            }, (Error) => {
                
                setCardProgress('Update Profile')
            });

    }
    function getCreditCardData(){
        const {data: response} = axios.get(`https://api.woofics.com/api/get_card_details/`+decoded.sub,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response)=> {
                setCardData(response.data);
                
            }, (Error) => {
                
            })
    }
    useEffect(() => {
        getCreditCardData();
    },[])

    function LoginBtn(e) {
        e.preventDefault();
        setprogress('Loading...')
        const { data: response } = axios.put(
            `https://api.woofics.com/api/provider/${decoded.sub}`,
            {
                first_name: firstname,
                last_name: lastname,
                email: email,
                contact_number: contact_number,
                profile_image: ProfileImage,
                company_size: size,
                location_of_your_business: location,
                name_of_your_business: bname,
                service: servic,
                rating:rat,
            },{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              }).then((response) => {
                setprogress('Update Profile')
                // history.push("/tablerodeadministraci??n");
            }, (Error) => {

            });
    }

    const [data, setData] = useState('');

    useEffect(() => {
        function getData() {
            const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`,{
                headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
              })
                .then((res) => {
                    
                    setData(res.data)
                    setFirstname(res.data.first_name)
                    setLastname(res.data.last_name)
                    setEmail(res.data.email)
                    setsize(res.data.company_size)
                    setLocation(res.data.location_of_your_business)
                    setContact(res.data.contact_number)
                    setProfileImage(res.data.profile_image)
                    setservic(res.data.service)
                    setrat(res.data.rating)
                }
                )

        }
        getData()
    }, [])









    //Sidebaaaaar/..........................
    // const { window } = props;
    const theme = useTheme();
    const classes = useStyles();

    //..............................IMagse
    const [imageLoading, setImageLoading] = useState()


    const onchange = async (e) => {
        setImageLoading('Loading...')
        const file = e.target.files[0];
        const ImagesRef = firebase.storage().ref('images').child(file.name);
        await ImagesRef.put(file)
        ImagesRef.getDownloadURL().then((url) => {
            setProfileImage(url)
            const { data: response } = axios.put(
                `https://api.woofics.com/api/provider/${decoded.sub}`,
                {
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                    contact_number: contact_number,
                    profile_image: ProfileImage,
                    company_size: size,
                    location_of_your_business: location,
                    name_of_your_business: bname,
                    service: servic
                },{
                    headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
                  }).then((response) => {
                    setImageLoading('')
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
                    




                    <div className="page-wrappe px-lg-5 w-100">
                        <div className="container-fluid">
                            <div className="row bg-light border">
                                <div className="col-lg-8 col-xlg-8 col-md-12 col-sm-12 mx-auto  ">
                                    <div className="card-body">
                                        <form className="form-horizontal form-material" >
                                            <div className="row">
                                                <div className="form-group mb-4 col-md-6">
                                                    <label className="col-md-6 p-0 bold">Primer Nombre</label>
                                                    <input type="text" defaultValue={data.first_name}
                                                        className="form-control p-0 border-0" onChange={(e) => setFirstname(e.target.value)} /> </div>
                                                <div className="form-group mb-4 col-md-6">
                                                    <label className="col-md-6 p-0 bold">Apellido</label>
                                                    <input type="text" defaultValue={data.last_name}
                                                        className="form-control p-0 border-0" onChange={(e) => setLastname(e.target.value)} /> </div>
                                            </div>
                                            <div className="row">

                                                <div className="form-group mb-4 col-md-6">
                                                    <label htmlFor="example-email" className="col-md-12 p-0">Correo Electr??nico</label>
                                                    <input type="email" defaultValue={data.email}
                                                        className="form-control p-0 border-0" name="example-email"
                                                        id="example-email1" onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                                <div className="form-group mb-4 col-md-6">
                                                    <label className="col-md-12 p-0">Phone No</label>
                                                    <input type="text" defaultValue={data.contact_number}
                                                        className="form-control p-0 border-0" onChange={(e) => setContact(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group mb-4 row col-md-6">
                                                    <label className="col-md-12 p-0">Service </label>
                                                    <input type="text" defaultValue={data.service}
                                                        className="form-control p-0 border-0" onChange={(e) => setservic(e.target.value)} />
                                                </div>
                                                <div className="form-group mb-4 row col-md-6">
                                                    <label className="col-md-12 p-0">Location</label>
                                                    <input type="text" defaultValue={data.location_of_your_business}
                                                        className="form-control p-0 border-0" onChange={(e) => setLocation(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group mb-4 row col-md-6">
                                                    <label className="col-md-12 p-0">Tama??o de la empresa </label>
                                                    <input type="text" defaultValue={data.company_size}
                                                        className="form-control p-0 border-0" onChange={(e) => setsize(e.target.value)} />
                                                </div>
                                                <div className="form-group mb-4 row col-md-6">
                                                    <label className="col-md-12 p-0">Nombre del Negocio</label>
                                                    <input type="text" defaultValue={data.name_of_your_business ? data.name_of_your_business : ""}
                                                        className="form-control p-0 border-0" onChange={(e) => setbname(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group mb-4">
                                                <div className="col-sm-12 text-center">
                                                    <button className="btn text-white" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={LoginBtn}>{progress}</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xlg-3 col-md-12">
                                    <div className="py-auto">
                                        <div className=" pt-5 mt-5 w-50 mx-auto" >
                                            <img alt="user" className="img-fluid" src={ProfileImage} />
                                        </div>
                                        <input type="file" id='file' name='img' onChange={onchange}  className='imagesinput mx-auto' accept='image/*' />
                                        <h3 className="w-100 text-center">{imageLoading}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-wrapper px-lg-5">
                        <div className="container-fluid">
                            <div className="row border bg-light">
                                <div className="col-lg-8 col-xlg-8 col-md-8 mx-auto ">
                                    <div className="">
                                        <div className="card-body">
                                            <form className="form-horizontal form-material" >
                                            <div className="row">
                                            <div className="form-group mb-4 col-md-6">
                                                    <label className="col-md-6 p-0 bold">Card no</label>
                                                    <input type="text" defaultValue={cardData !== "" ? "**** **** **** "+cardData.card.last4 : null}
                                                        placeholder="Enter card number without space" className="form-control p-0 border-0" onChange={(e) => setCard(e.target.value)} /> </div>
                                                <div className="form-group mb-4 col-md-6">
                                                    <label className="col-md-6 p-0 bold">Name</label>
                                                    <input type="text" defaultValue={cardData !== "" ? cardData.billing_details.name : null}
                                                      className="form-control p-0 border-0" onChange={(e) => setCardName(e.target.value)} /> </div>
                                            
                                            </div>

                                            <div className="row">
                                            <div className="form-group mb-4 col-md-6">
                                                    <label className="col-md-6 p-0 bold">Expiry Month</label>
                                                    <input type="text" defaultValue={cardData !== "" ? cardData.card.exp_month : null}
                                                        className="form-control p-0 border-0" onChange={(e) => setExpMonth(e.target.value)} /> </div>
                                                <div className="form-group mb-4 col-md-6">
                                                    <label className="col-md-6 p-0 bold">Expiry Year</label>
                                                    <input type="text"  defaultValue={cardData !== "" ? cardData.card.exp_year : null}
                                                      className="form-control p-0 border-0" onChange={(e) => setExpYear(e.target.value)} /> </div>
                                            
                                            </div>  

                                            <div className="row">
                                            <div className="form-group mb-4 col-md-6">
                                                    <label className="col-md-6 p-0 bold">CVC</label>
                                                    <input type="text" defaultValue={cardData !== "" ? "***" : null}
                                                        className="form-control p-0 border-0" onChange={(e) => setCvc(e.target.value)} /> </div>
                                                
                                            
                                            </div>                                              
                                            <div className="form-group mb-4">
                                                    <div className="col-sm-12 text-center">
                                                        <button className="btn text-white" disabled={cardData !== "" ? true:false} style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)' }} onClick={updateCard}>{cardProgress}</button>
                                                    </div>
                                                </div>

                                            </form>
                                            </div>
                                            </div>
                                            </div>
                                            <div className="col-lg-4 col-xlg-3 col-md-12"></div>
                                            </div>
                                            </div>
                                            </div>

                </main>
            </div>


        </>
    );
}


import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import "../ClientPortal/Suppliers.css"
import axios from 'axios';
import StazBar from './Sidebar'
import StarRatings from 'react-star-ratings';
import './BLog.css';
import jwt_decode from 'jwt-decode'
import { makeStyles } from '@material-ui/core/styles';
import CustomClientAuth from "../CustomClientAuth";
const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));




export default function Supppliers() {
    CustomClientAuth();
    let history = useHistory();

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)


    const [rating1, setRating1] = useState(4);

    const [suppliers, setSuppliers] = useState([]);


    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/get_provider`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setSuppliers(response.data)
                

            }, (Error) => {
                
            });
    }, [])


    const [name, setName] = useState('');

    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`,{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                setName(response.data.first_name + " " + response.data.last_name)
            }, (Error) => {
                
            });
    })


    // const[suser,setaUser] = useState('');
    // const[sname,setaName] = useState('');

    function SendData(user, uname, uimage) {
        const { data: response } = axios.post(`https://api.woofics.com/api/associate`, {
            main_user: decoded.sub,
            associate_user: user,
            avatar: uimage ? uimage : "xyz.png",
            associate_name: uname,
            main_name: name
        },{
            headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
            .then((response) => {
                    history.push('/chat')
            }, (Error) => {
                 console.log(Error);
                
            });
    }

  //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();

    return (
        <>

            <div className="d-sm-flex">
                <StazBar></StazBar>
                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    



                   <div className="page-wrapper bg-light">
                        <div className="container">
                            <div className="row ipad-change" id="blog " >
                                {suppliers.map((val, id) => {
                                    return (
                                        <>
                                            <div className="col-md-4 col-lg-6 justify-content-space-around">
                                                <div className="card mx-auto mt-4" style={{ width: '18rem' }}>
                                                    {/* <img class="card-img-top img-fluid mx-auto" src={val.bg_image} alt="Backgound image" /> */}
                                                    <div className="card-body">
                                                       
                                                        <h4 className="mt-0">{val.first_name + " " + val.last_name}
                                                            <img className="card-img-top img-fluid w-25 mx-auto float-left p-2 ipad-res" src={val.profile_image}  style={{borderRadius:"50px"}}/>
                                                            <StarRatings
                                                                starRatedColor='rgb(230, 67, 47)'
                                                                rating={3}
                                                                starDimension="15px"
                                                                starSpacing="3px"
                                                            />
                                                        </h4>
                                                        <i className="fa fa-concierge-bell px-2 text-muted"> {val.service}</i><br />
                                                        <br />
                                                        <i className="fa fa-map-marker px-2 text-muted"> {val.location}</i><br />
                                                        <hr />
                                                        <div className="d-flex">
                                                        <button className="btn pull-right marginBottom10 " style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} onClick={() => history.push(`/detalles_del_proveedor/${val.id}`)} >Más Detalles</button>
                                                        <button className="btn pull-right marginBottom10  mx-3" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={val.id} onClick={() => SendData(val.id, val.first_name + " " + val.last_name, val.profile_image )} >Chat</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                                <div className="col-md-12 gap10"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>



        </>
    );
}


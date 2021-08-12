import "../ClientPortal/dashboard.css"
import React, { useState, useEffect } from "react";
import {useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import CustomClientAuth from "../CustomClientAuth";
import { makeStyles} from '@material-ui/core/styles';
import StazBar from './Sidebar';



const useStyles = makeStyles((theme) => ({

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    }

}));




export default function ProviderDetails() {
    CustomClientAuth();
    const {pid} = useParams()

    let history = useHistory();

  
    const [suppliers, setSuppliers] = useState([]);
    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/users/${pid}`)
            .then((response) => {
                    setSuppliers(response.data)
            }, (Error) => {
                 
                
            });
            const { data: responseA } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((response) => {
                setName(response.data.first_name + " " + response.data.last_name)
            }, (Error) => {
                
            });  
    }, [])


    
    const [name, setName] = useState('');

 


    // const[suser,setaUser] = useState('');
    // const[sname,setaName] = useState('');

    function SendData(user, uname,uimge) {
        const { data: response } = axios.post(`https://api.woofics.com/api/associate`, {
            main_user: decoded.sub,
            associate_user: user,
            avatar: uimge,
            associate_name: uname,
            main_name: name
        })
            .then((response) => {
                if (response) {
                    history.push('/chat')
                }
            }, (Error) => {
                
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
                                    <div class="container w-100 ">
                                    <div class="d-md-flex mb-3">
                                        <h3 class=" h1 mb-0 text-center mx-auto">PROVEEDOR DE SERVICIO</h3>
                                    </div>
                                        <div class="row w-100 mx-auto">
                                            <div class="twPc-div w-100 mx-auto ">
                                                <a class="twPc-bg twPc-block"></a>
                
                                                <div class="twPc-div w-100 mx-auto  p-4">
                                                <button class="btn pull-right marginBottom10" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={suppliers.id} onClick={() => SendData(suppliers.id, suppliers.first_name + " " + suppliers.last_name,suppliers.profile_image)} >Chat</button>
                
                                                    <a title="Mert S. Kaplan" href="" class="twPc-avatarLink">
                                                        <img alt="P. Image" src={suppliers.profile_image} class="twPc-avatarImg" />
                                                    </a>
                
                                                    <div class="twPc-divUser">
                                                        <div class="twPc-divName">
                                                            <a href="">{suppliers.first_name+" "+ suppliers.last_name}</a>
                                                        </div>
                                                        <span>
                                                            <a href=""><i className="fa fa-map-marker" >   </i>   <span>  {suppliers.location}</span></a>
                                                        </span>
                                                    </div>
                
                                                    {/* <div class="twPc-divStats">
                                                        <ul class="twPc-Arrange">
                                                            <li class="twPc-ArrangeSizeFit">
                                                                <a href="" title="9.840 Tweet">
                                                                    <span class="twPc-StatLabel twPc-block">Tweets</span>
                                                                    <span class="twPc-StatValue">9.840</span>
                                                                </a>
                                                            </li>
                                                            <li class="twPc-ArrangeSizeFit">
                                                                <a href="/following" title="885 Following">
                                                                    <span class="twPc-StatLabel twPc-block">Following</span>
                                                                    <span class="twPc-StatValue">885</span>
                                                                </a>
                                                            </li>
                                                            <li class="twPc-ArrangeSizeFit">
                                                                <a href="/followers" title="1.810 Followers">
                                                                    <span class="twPc-StatLabel twPc-block">Followers</span>
                                                                    <span class="twPc-StatValue">1.810</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                            </div>
                </main>
            </div>



        </>
    );
}


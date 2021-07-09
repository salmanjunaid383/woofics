import React, { useState, useEffect } from "react";
import {useParams,Link} from 'react-router-dom';
import './Emailver.css'
import axios from 'axios'
import sucess from './ClientPortal/success.gif'


export default function Emailver(props) {

const {uuid} = useParams() 

useEffect(() => {
    const { data: response } = axios.post(`https://api.woofics.com/api/activate/${uuid}`)
    .then((response) => {
    }, (Error) => {
        console.log(Error);
    });
},[])


 return(
     <>
<div class="container">
   <div class="row">
      <div class="col-md-6 mx-auto mt-5">
         <div class="payment">
            <div class="payment_header">
               <div class="check"></div>
            </div>
            <div class="content-success py-4">
               <h1>Email Verified !</h1>
               <Link to="/" className="btn btn-success my-4">Login</Link>
            </div>
            
         </div>
      </div>
   </div>
</div>
     </>
 )
}
import React, { useEffect } from "react";
import {useParams,Link} from 'react-router-dom';
import './Emailver.css'
import axios from 'axios'


export default function Emailver(props) {

const {uuid} = useParams() 

useEffect(() => {
    const { data: response } = axios.post(`https://api.woofics.com/api/activate/${uuid}`)
    .then((response) => {
    }, (Error) => {
        
    });
},[])


 return(
     <>
<div className="container">
   <div className="row">
      <div className="col-md-6 mx-auto mt-5">
         <div className="payment">
            <div className="payment_header">
               <div className="check"></div>
            </div>
            <div className="content-success py-4">
               <h1>Correo verificado !</h1>
               <Link to="/" className="btn btn-success my-4">Acceso</Link>
            </div>
            
         </div>
      </div>
   </div>
</div>
     </>
 )
}
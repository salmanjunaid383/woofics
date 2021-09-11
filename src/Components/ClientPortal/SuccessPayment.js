import React, { useEffect } from "react";
import {useParams,Link} from 'react-router-dom';
import './SuccessPayment.css'
import axios from 'axios'


export default function SuccessPayment(props) {
   
const {pid} = useParams()  


useEffect(() => {
    const { data: response } = axios.post(`https://api.woofics.com/api/payment_success/${pid}`,{
      headers:{ Authorization: `Bearer ${localStorage.getItem("user_token")}` }
    })
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
               <h1>Pago Exitoso !</h1>
               <Link to="/project" className="btn btn-success my-4">Ir a Casa</Link>
            </div>
            
         </div>
      </div>
   </div>
</div>
     </>
 )
}
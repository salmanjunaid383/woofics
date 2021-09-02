import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
export default function CustomClientAuth() {
  let history = useHistory();
  useEffect(() => {
    try {
      const token = localStorage.getItem("user_token")
      const role = jwt_decode(localStorage.getItem("user_token"));
      if (!localStorage.getItem('user_token')) {
        history.push('/')
    }
    else{
      const { data: response } = axios.post(`https://api.woofics.com/api/admin_token`,null, {
        headers : {Authorization : `Bearer ${token}`}
      }).then(response => {
  
      }, Error => {
        history.push('/login')
      })
      
    }
      
    } catch {
      history.push("/login");
    }
  })
  
}

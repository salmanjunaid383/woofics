import jwt_decode from "jwt-decode";
import { useEffect } from "react";

import { useHistory } from "react-router-dom";
export default function CustomProviderAuth() {
  let history = useHistory();
  useEffect(() => {
    try {
      let currentDate = new Date();
      const token = localStorage.getItem("user_token")
      const role = jwt_decode(localStorage.getItem("user_token"));
      if (!localStorage.getItem('user_token')) {
        localStorage.clear(); history.push('/')
    }
    else{
      if(role.exp * 1000 < currentDate.getTime() )
      {
        localStorage.clear(); history.push('/')
      }
      if(role.role === "ServiceProvider"){

      }
      else{
        history.push('/')
      }
      
    }
      
    } catch {
      history.push('/')
    }
  },[history])
  
}

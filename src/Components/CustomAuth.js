import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
export default function CustomAuth(){
    let history = useHistory();
   useEffect(() => {
    try{
        const token = localStorage.getItem("user_token");
        if(token === null)
        {
            history.push("/login");
        }
        else{
            
        }
    }
    catch{
        history.push("/login");
    }
   })
    
   
}
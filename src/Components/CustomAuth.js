import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
export default function CustomAuth(){
    let history = useHistory();
   
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
   
}
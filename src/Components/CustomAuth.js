import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
export default function CustomAuth(){
    let history = useHistory();
    const token = localStorage.getItem("user_token");
    if(token === null)
    {
        history.push("/login");
    }
    else{
        
    }
}
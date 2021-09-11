import { useEffect } from "react";
import { useHistory } from "react-router-dom";
export default function CustomAuth(){
    let history = useHistory();
   useEffect(() => {
    try{
        const token = localStorage.getItem("user_token");
        if(token === null)
        {
            localStorage.clear(); history.push("/login");
        }
        else{
            
        }
    }
    catch{
        localStorage.clear();history.push("/login");
    }
   })
    
   
}
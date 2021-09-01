import jwt_decode from 'jwt-decode'
import {
    Link,
    useHistory
} from 'react-router-dom'
export function ReturnToken(){
    try{
        var token = localStorage.getItem('user_token')
        console.log(token);
        
    }
    catch{

    }
    return (
        token
    );
    
}
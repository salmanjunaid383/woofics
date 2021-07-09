import jwt_decode from 'jwt-decode'
import { Link, useHistory } from 'react-router-dom'
export default function CustomSupplierAuth() {
    let history = useHistory();
    try{
        const role = jwt_decode(localStorage.getItem('user_token'))
    if(role != null)
    {
        if (role.role === 'Supplier') {
            
        }
        else{
            history.push("");
        }
    }
    else
    {
        history.push('/login');
    }
    }
    catch{
        history.push('/login')
    }
    
}
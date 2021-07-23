import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
export default function CustomProviderAuth() {
  let history = useHistory();
  try {
    const role = jwt_decode(localStorage.getItem("user_token"));
    if (!localStorage.getItem('user_token')) {
              history.push('/')
          }
    else{
      if (role != null) {
        if (role.role === "ServiceProvider") {
        } else {
          history.push("");
        }
      } else {
        history.push("/login");
      }
    }
    
  } catch {
    history.push("/login");
  }
}

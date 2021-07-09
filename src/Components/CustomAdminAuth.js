import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
export default function CustomAdminAuth() {
  let history = useHistory();
  try {
    const role = jwt_decode(localStorage.getItem("user_token"));
    if (role != null) {
      if (role.role === "Administrator") {
      } else {
        history.push("");
      }
    } else {
      history.push("/login");
    }
  } catch {
    history.push("/login");
  }
}

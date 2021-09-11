import jwt_decode from "jwt-decode";
class Auth{
    constructor() {
        this.authenticated = false;
      }
      customerAuth(){
        
        try {
          let currentDate = new Date();
          const token = localStorage.getItem("user_token")
          const role = jwt_decode(localStorage.getItem("user_token"));
          if (!localStorage.getItem('user_token')) {
            this.authenticated = false;
        }
        else{
          if(role.exp * 1000 < currentDate.getTime() )
          {
            localStorage.clear(); this.authenticated = false;
          }
          console.log("role is" +role.role)
          if(role.role === "Client"){
              console.log("role check")
            this.authenticated  = true;
          }
          else{
            this.authenticated  = false;
          }
          
        }
          return this.authenticated   
        }
         catch {
          localStorage.clear(); this.authenticated  = false;
          return this.authenticated 
        }
      }
}
export default new Auth();

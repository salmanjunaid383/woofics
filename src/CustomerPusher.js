// import Pusher from 'pusher-js';
// import { useEffect } from 'react';
// import jwt_decode from 'jwt-decode'
// export default function CustomerPusher(){
//     var token = localStorage.getItem("user_token");
//     var decoded = jwt_decode(token)
//     const pusher = new Pusher('e22c56269c9258608b2c', {
//         cluster: 'ap1'
//       });;
   
//         const channel = pusher.subscribe(""+decoded.sub+"");   
//         
//         channel.bind("my-event",function(returnData){
//         });
    
// }
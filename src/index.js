import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
try{

  var token = localStorage.getItem('user_token')
  if(token){
    window.header = { Authorization: `Bearer ${token}` };
  }
  
}
catch{
  
}








const element = (
  <App></App>
)
ReactDOM.render(
  // <React.StrictMode>
    element,
  // </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

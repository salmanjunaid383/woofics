import React from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'


  var firebaseConfig = {
    apiKey: "AIzaSyA6zmsZkdViQSVKk5phF77E-fFbhYyvBsI",
    authDomain: "woofic-306700.firebaseapp.com",
    projectId: "woofic-306700",
    storageBucket: "woofic-306700.appspot.com",
    messagingSenderId: "953117298789",
    appId: "1:953117298789:web:270e45d0d486c2e0c4368c",
    measurementId: "G-CRVNVFCZKJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  const storage = firebase.storage()

  export  {
    storage, firebase as default
  }
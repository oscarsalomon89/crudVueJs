import * as firebase from "firebase";

 var config = { 
    apiKey: "AIzaSyAKKZe2YgGwWfBGyqYg897jPBUbXLmrdVI",
    authDomain: "appvuej.firebaseapp.com",
    databaseURL: "https://appvuej.firebaseio.com",
    projectId: "appvuej",
    storageBucket: "appvuej.appspot.com",
    messagingSenderId: "274503393068"
  };

  var app = firebase.initializeApp(config)

  export const db = app.database()
  export const storage = firebase.storage()
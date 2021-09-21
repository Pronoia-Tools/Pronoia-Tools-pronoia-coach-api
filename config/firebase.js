// Import the functions you need from the SDKs you need
const { initializeApp, getApps, getApp } = require("firebase/app");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrROLkR7XYHcsTtv1qe5lbOca_kZj3DNI",
  authDomain: "pronoia-test.firebaseapp.com",
  projectId: "pronoia-test",
  storageBucket: "pronoia-test.appspot.com",
  messagingSenderId: "794892406032",
  appId: "1:794892406032:web:ff1e25b4bcbcf0b5f4a995",
  measurementId: "G-PXX7Y3W977"
};

// Initialize Firebase
// const firebase = initializeApp(firebaseConfig);

// module.exports = firebase;

let firebase;

if (getApps().length === 0) {
    try { 
        firebase = initializeApp(firebaseConfig);
    } catch (e) { 
        console.log(e); 
    }
} else {
    firebase = getApp();
}


module.exports = firebase;


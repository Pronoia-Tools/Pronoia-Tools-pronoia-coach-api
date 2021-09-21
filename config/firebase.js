const { initializeApp, getApps, getApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const config = require('./config');

let firebase;

if (getApps().length === 0) {
    try { 
        firebase = initializeApp(config.firebase);
        const analytics = getAnalytics(firebase);
    } catch (e) { 
        console.log(e); 
    }
} else {
    firebase = getApp();
}



module.exports = firebase;


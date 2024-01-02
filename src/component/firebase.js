


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// import { getFi/restore } from "@firebase/firestore"

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    // apiKey: "AIzaSyCOdTpdQOWtGIwogitWbpPoOXhU8KdRrmU",
    // authDomain: "donationapp-9066c.firebaseapp.com",
    // // databaseURL: "https://donationapp-9066c-default-rtdb.firebaseio.com",
    // projectId: "donationapp-9066c",
    // storageBucket: "donationapp-9066c.appspot.com",
    // messagingSenderId: "593657592722",
    // appId: "1:593657592722:web:929bd0e9551a0534f71f4b",
    // measurementId: "G-W0DHNLN2KX"

    apiKey: "AIzaSyD7gRbI7HAfBZkSYBniKp96Zaz-Q_KigOk",
    authDomain: "videopost-4d08d.firebaseapp.com",
    projectId: "videopost-4d08d",
    storageBucket: "videopost-4d08d.appspot.com",
    messagingSenderId: "1099072624953",
    appId: "1:1099072624953:web:0a0b1fa4bf7afa1053f0e8",
    measurementId: "G-TXP9VLZVGP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)
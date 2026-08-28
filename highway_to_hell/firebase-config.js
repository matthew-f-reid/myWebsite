// ============================================================
// FIREBASE CONFIG — for the "highway-to-hell" project.
// ============================================================
const firebaseConfig = {
    apiKey: "AIzaSyDXg7r1z0m3vW4WaLIcSo2hrI-URIZvhu4",
    authDomain: "highway-to-hell-7857c.firebaseapp.com",
    projectId: "highway-to-hell-7857c",
    storageBucket: "highway-to-hell-7857c.firebasestorage.app",
    messagingSenderId: "540113855411",
    appId: "1:540113855411:web:0a6479376b8007ddf4a1c6",
    measurementId: "G-KPNDDTQR7W"
};

firebase.initializeApp(firebaseConfig);

// Global reference to the Firestore database, used in sketch.js
const db = firebase.firestore();


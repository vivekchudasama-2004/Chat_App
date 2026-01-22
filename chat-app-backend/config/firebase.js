const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const firebaseConfig = require('../firebaseConfig'); // Keep the original config file or move its content here. I will just import it.

let db;
try {
    const appFirebase = initializeApp(firebaseConfig);
    db = getFirestore(appFirebase);
    console.log("Firebase initialized (Modular)");
} catch (error) {
    console.warn("Error initializing Firebase.");
    console.error(error.message);
}

module.exports = { db };

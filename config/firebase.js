// Initializing Firebase Admin SDK using Service Account credentials.
// These variables are loaded from the .env file for security.

const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://restapiassignment-3785e-default-rtdb.firebaseio.com",
});

const db = admin.database();

module.exports = db;

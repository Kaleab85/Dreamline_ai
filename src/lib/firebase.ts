// Go to your Firebase project console, navigate to Project settings,
// and under "Your apps", select the web app.
// Copy the firebaseConfig object and paste it here.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "dreamline-consultancy",
  "appId": "1:97682561835:web:b51571c48176454b57c36e",
  "storageBucket": "dreamline-consultancy.firebasestorage.app",
  "apiKey": "AIzaSyAyBhsy_GIxRo8krWwv2NTJmtVY0wBzPJk",
  "authDomain": "dreamline-consultancy.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "97682561835"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

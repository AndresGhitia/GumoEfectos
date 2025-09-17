import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYTH7BNSx3qpBJpE-EiZAInjL_UhEi2WE",
  authDomain: "gumo-efectos.firebaseapp.com",
  projectId: "gumo-efectos",
  storageBucket: "gumo-efectos.firebasestorage.app",
  messagingSenderId: "600143223800",
  appId: "1:600143223800:web:666bfb657353a71eff540d",
  measurementId: "G-JFWYBB6FWF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
auth.languageCode = 'es'; // Con esta linea se fuerza el idioma español
export const db = getFirestore(app);
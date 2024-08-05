import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/* const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
}; */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEeispisl0te0WD9fnQO03Zd8fQYegNAk",
  authDomain: "e-pharmacy-62760.firebaseapp.com",
  databaseURL:
    "https://e-pharmacy-62760-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "e-pharmacy-62760",
  storageBucket: "e-pharmacy-62760.appspot.com",
  messagingSenderId: "927387468596",
  appId: "1:927387468596:web:8898de5216e6120361db61",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;

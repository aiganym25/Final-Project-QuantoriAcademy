import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAp6fANbDXax-KEdlXDYLm6adqmNt2m0E",
  authDomain: "authentification-final-project.firebaseapp.com",
  projectId: "authentification-final-project",
  storageBucket: "authentification-final-project.appspot.com",
  messagingSenderId: "1067839974276",
  appId: "1:1067839974276:web:0f1dc4f14971e8fcb74bd1",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

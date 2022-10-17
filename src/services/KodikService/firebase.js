import { initializeApp } from "firebase/app";

export const initializeFirebase = () => {
   const firebaseConfig = {
      apiKey: "AIzaSyBTfwWjI-O6fs4GoO91SaGEmJZfGIGQ_ew",
      authDomain: "shuriken-5ea9e.firebaseapp.com",
      projectId: "shuriken-5ea9e",
      storageBucket: "shuriken-5ea9e.appspot.com",
      messagingSenderId: "1000371645896",
      appId: "1:1000371645896:web:90c4d05b4808ffffa2e4fd",
      measurementId: "G-J0X8LS6R21"
   };

   const app = initializeApp(firebaseConfig);
}
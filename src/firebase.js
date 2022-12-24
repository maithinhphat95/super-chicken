// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // databaseURL: "https://api-super-chicken-default-rtdb.firebaseio.com/",
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "api-super-chicken.firebaseapp.com",
  projectId: "api-super-chicken",
  storageBucket: "api-super-chicken.appspot.com",
  messagingSenderId: "806763035420",
  appId: "1:806763035420:web:02563736361ee5974318d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

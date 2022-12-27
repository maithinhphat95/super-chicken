// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEPc3tL8WQcaoIW4WWKzwtBUK6dCWRNn0",
  authDomain: "api-super-chicken.firebaseapp.com",
  databaseURL: "https://api-super-chicken-default-rtdb.firebaseio.com",
  projectId: "api-super-chicken",
  storageBucket: "api-super-chicken.appspot.com",
  messagingSenderId: "806763035420",
  appId: "1:806763035420:web:02563736361ee5974318d9",
};

// Initialize Firebase App
const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);
const database = getDatabase(firebase);

export { database, auth };
export default firebase;

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC5OZzYbBmxvnGxTj-m3U98S1o6S0GQk0Y",
  authDomain: "dinopokerapp.firebaseapp.com",
  databaseURL: "https://dinopokerapp-default-rtdb.firebaseio.com",
  projectId: "dinopokerapp",
  storageBucket: "dinopokerapp.appspot.com",
  messagingSenderId: "524389525362",
  appId: "1:524389525362:web:31e72c281474b411b9dfeb",
  measurementId: "G-0ERBZRHF15",
};

export const appFirebase = initializeApp(firebaseConfig);

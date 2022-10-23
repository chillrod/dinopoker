import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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

if (typeof window !== "undefined") {
  initializeAppCheck(appFirebase, {
    provider: new ReCaptchaV3Provider(
      "6Le5V5ghAAAAAOBc-YdHrILbimG6Vzw57rNJvFoo"
    ),
    isTokenAutoRefreshEnabled: true,
  });
}
